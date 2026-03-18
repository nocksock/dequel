import { syntaxTree } from "@codemirror/language";
import { CompletionContext, Completion } from "@codemirror/autocomplete";
import { StateEffect, StateField } from "@codemirror/state";
import axios from "axios";
import { dequelParser } from "../dequel-lang/language";
import { DequelEditorOptions } from "./options.js";
import { closest } from "../lib/syntax";

export type FieldDefinition = {
  type: string;
  info?: string;
  schema?: string;      // For relationships: target collection name
  cardinality?: string; // "has_many" for has_many relationships
  values?: string[];    // For keyword fields: allowed values
};

export type Schema = {
  fields: Record<string, FieldDefinition>;
};

export class SchemaCache {
  private cache = new Map<string, Promise<Schema>>();

  constructor(private endpoint: string) {}

  get(collection: string): Promise<Schema> {
    if (!this.cache.has(collection)) {
      this.cache.set(
        collection,
        axios
          .get(`${this.endpoint}/${collection}/schema`)
          .then((r) => r.data)
          .catch(() => ({ fields: {} })) // Empty on error
      );
    }
    return this.cache.get(collection)!;
  }

  // Called when base schema is set via effect
  prime(collection: string, schema: Schema) {
    this.cache.set(collection, Promise.resolve(schema));
  }
}

export async function resolvePathSchema(
  pathSegments: string[], // ["author"] for "author.|"
  baseSchema: Schema,
  cache: SchemaCache
): Promise<Schema | null> {
  let schema = baseSchema;

  for (const segment of pathSegments) {
    const field = schema.fields[segment];
    if (field?.type !== "relationship" || !field.schema) {
      return null; // Not a valid relationship path
    }
    schema = await cache.get(field.schema);
  }

  return schema;
}

export const SchemaEffect = StateEffect.define<Schema>();

export const SchemaField = StateField.define<Schema>({
  create: () => ({ fields: {} }),
  update: (value, tr) => {
    for (const effect of tr.effects) {
      if (effect.is(SchemaEffect)) {
        return effect.value;
      }
    }
    return value;
  },
});

export const DequelAutocomplete = dequelParser.data.of({
  autocomplete: async (context: CompletionContext) => {
    const tree = syntaxTree(context.state);
    const nodeBefore = tree.resolveInner(context.pos, -1);
    const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos);
    const tagBefore = /[\w.]*$/.exec(textBefore);
    if (!tagBefore && !context.explicit) return null;

    const from = tagBefore ? nodeBefore.from + tagBefore.index : context.pos;

    // Get dynamic schema from state
    const schema = context.state.field(SchemaField, false);

    // Get schema cache from options facet
    const options = context.state.facet(DequelEditorOptions);
    const schemaCache = options[0]?.schemaCache;

    // Check if we're in a value position (after a colon)
    // Node could be ":" or an Identifier inside a Value
    const condition = closest("Condition", nodeBefore);
    const fieldNode = condition?.getChild("Field");
    const colonNode = condition?.getChild(":");

    if (fieldNode && colonNode && context.pos > colonNode.to) {
      // We're after the colon, so we're in value position
      const fieldName = context.state.doc.sliceString(fieldNode.from, fieldNode.to);
      const values = schema?.fields[fieldName]?.values;

      if (values?.length) {
        const completions: Completion[] = values.map((v) => ({
          label: v,
          type: "value",
        }));

        return {
          from,
          options: completions,
        };
      }
    }

    // Field name completions
    if (nodeBefore.name === "Field" && schema && Object.keys(schema.fields).length) {
      // Get the full field text to check for relationship paths
      const fieldText = context.state.doc.sliceString(nodeBefore.from, context.pos);
      const pathSegments = fieldText.split(".");

      // If there's a path (e.g., "author.na" or "author."), resolve the relationship
      if (pathSegments.length > 1 && schemaCache) {
        const pathPrefix = pathSegments.slice(0, -1); // ["author"]
        const fromPos = nodeBefore.from + fieldText.lastIndexOf(".") + 1;

        const resolvedSchema = await resolvePathSchema(
          pathPrefix,
          schema,
          schemaCache
        );

        if (resolvedSchema) {
          const completions: Completion[] = Object.entries(resolvedSchema.fields).map(([name, f]) => ({
            label: name,
            type: f.type,
            info: f.info,
          }));

          return {
            from: fromPos,
            options: completions,
          };
        }

        // Invalid relationship path - no completions
        return {
          from: fromPos,
          options: [],
        };
      }

      // No path, just return base schema fields
      const completions: Completion[] = Object.entries(schema.fields).map(([name, f]) => ({
        label: name,
        type: f.type,
        info: f.info,
      }));

      return {
        from,
        options: completions,
      };
    }

    // Fallback to empty if no schema loaded
    if (nodeBefore.name === "Field") {
      return {
        from,
        options: [],
      };
    }

    return null;
  },
});
