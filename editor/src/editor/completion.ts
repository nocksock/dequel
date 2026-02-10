import { syntaxTree } from "@codemirror/language";
import { CompletionContext, Completion } from "@codemirror/autocomplete";
import { StateEffect, StateField } from "@codemirror/state";
import { EditorView, ViewPlugin } from "@codemirror/view";
import axios from "axios";
import { dequelParser } from "../dequel-lang/language";
import { DequelEditorOptions } from "./options.js";
import { closest } from "../lib/syntax";

export type CompletionField = {
  label: string;
  type: string;
  info?: string;
};

export type Schema = {
  fields: CompletionField[];
  values?: Record<string, string[]>;
};

export const SchemaEffect = StateEffect.define<Schema>();

export const SchemaField = StateField.define<Schema>({
  create: () => ({ fields: [] }),
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
  autocomplete: (context: CompletionContext) => {
    const tree = syntaxTree(context.state);
    const nodeBefore = tree.resolveInner(context.pos, -1);
    const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos);
    const tagBefore = /[\w.]*$/.exec(textBefore);
    if (!tagBefore && !context.explicit) return null;

    const from = tagBefore ? nodeBefore.from + tagBefore.index : context.pos;

    // Get dynamic schema from state
    const schema = context.state.field(SchemaField, false);

    // Check if we're in a value position (after a colon)
    // Node could be ":" or an Identifier inside a Value
    const condition = closest("Condition", nodeBefore);
    const fieldNode = condition?.getChild("Field");
    const colonNode = condition?.getChild(":");

    if (fieldNode && colonNode && context.pos > colonNode.to) {
      // We're after the colon, so we're in value position
      const fieldName = context.state.doc.sliceString(fieldNode.from, fieldNode.to);
      const values = schema?.values?.[fieldName];

      if (values?.length) {
        const options: Completion[] = values.map((v) => ({
          label: v,
          type: "value",
        }));

        return {
          from,
          options,
        };
      }
    }

    // Field name completions
    if (nodeBefore.name === "Field" && schema?.fields?.length) {
      const options: Completion[] = schema.fields.map((f) => ({
        label: f.label,
        type: f.type,
        info: f.info,
      }));

      return {
        from,
        options,
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
