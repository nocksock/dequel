import { syntaxTree } from "@codemirror/language";
import { linter, Diagnostic } from "@codemirror/lint";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { SyntaxNode } from "@lezer/common";
import { gettext } from "../lib/i18n";
import { parseCondition, ConditionParts } from "../lib/syntax";
import { Schema, SchemaCache } from "../editor/completion";

// Type definitions

type FieldInfo = {
  type: string;
  values?: string[];
};

type FieldValidationResult =
  | { ok: true; fieldInfo: FieldInfo; schema: Schema }
  | { ok: false; error: string };

// Validation functions

function validateNumber(value: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(value);
}

function validateBoolean(value: string): boolean {
  return /^(true|false|yes|no)$/i.test(value);
}

function validateDate(value: string): boolean {
  return /^\d{4}(-\d{2}(-\d{2})?)?$/.test(value);
}

function validateKeyword(value: string, allowed: string[]): boolean {
  return allowed.some((v) => v.toLowerCase() === value.toLowerCase());
}

// Field validation with relationship path resolution

async function validateField(
  fieldPath: string,
  baseSchema: Schema,
  schemaCache: SchemaCache | undefined
): Promise<FieldValidationResult> {
  const segments = fieldPath.split(".");
  let schema = baseSchema;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const field = schema.fields[segment];

    if (!field) {
      return { ok: false, error: gettext("Unknown field: %1", segment) };
    }

    // If not last segment, must be a relationship
    if (i < segments.length - 1) {
      if (field.type !== "relationship" || !field.schema) {
        return {
          ok: false,
          error: gettext("%1 is not a relationship", segment),
        };
      }

      if (!schemaCache) {
        // Can't resolve relationship without cache - skip validation
        return {
          ok: true,
          fieldInfo: { type: "string" },
          schema,
        };
      }

      schema = await schemaCache.get(field.schema);
    } else {
      // Last segment - return field info
      return {
        ok: true,
        fieldInfo: {
          type: field.type,
          values: field.values,
        },
        schema,
      };
    }
  }

  return { ok: false, error: gettext("Invalid field path") };
}

// Value validation

function validateValue(
  value: string,
  fieldInfo: FieldInfo
): { severity: "error" | "warning"; message: string } | null {
  // Strip quotes if present
  const cleanValue = value.replace(/^"|"$/g, "");

  // Skip validation for commands like contains(), after(), etc.
  if (/^\w+\(.*\)$/.test(value)) {
    return null;
  }

  // Skip validation for ranges
  if (/\.\./.test(value)) {
    return null;
  }

  // Skip validation for comparison operators in value
  if (/^[<>]=?/.test(cleanValue)) {
    return null;
  }

  switch (fieldInfo.type) {
    case "number":
      if (!validateNumber(cleanValue)) {
        return {
          severity: "error",
          message: gettext('Expected number, got "%1"', cleanValue),
        };
      }
      break;

    case "boolean":
      if (!validateBoolean(cleanValue)) {
        return {
          severity: "error",
          message: gettext("Expected boolean (true/false/yes/no)"),
        };
      }
      break;

    case "date":
      if (!validateDate(cleanValue)) {
        return {
          severity: "error",
          message: gettext("Expected date format: YYYY, YYYY-MM, or YYYY-MM-DD"),
        };
      }
      break;

    case "keyword":
      if (fieldInfo.values && !validateKeyword(cleanValue, fieldInfo.values)) {
        return {
          severity: "warning",
          message: gettext('"%1" is not a known value', cleanValue),
        };
      }
      break;
  }

  return null;
}

// Extract conditions from syntax tree

function collectConditions(
  state: EditorState
): Array<{ node: SyntaxNode; parts: ConditionParts }> {
  const conditions: Array<{ node: SyntaxNode; parts: ConditionParts }> = [];
  const doc = state.doc;

  syntaxTree(state).iterate({
    enter: ({ type, node }) => {
      if (type.name === "Condition" || type.name === "ExcludeCondition") {
        const parts = parseCondition(node, doc);
        conditions.push({ node, parts });
      }
    },
  });

  return conditions;
}

// Main linter

export function dequelLinter(
  getSchema: (state: EditorState) => Schema | undefined,
  getSchemaCache: (state: EditorState) => SchemaCache | undefined
) {
  return linter(async (view: EditorView): Promise<readonly Diagnostic[]> => {
    const state = view.state;
    const schema = getSchema(state);

    // No schema loaded - no validation
    if (!schema || Object.keys(schema.fields).length === 0) {
      return [];
    }

    const schemaCache = getSchemaCache(state);
    const conditions = collectConditions(state);
    const diagnostics: Diagnostic[] = [];

    for (const { node, parts } of conditions) {
      const fieldNode = node.getChild("Field");
      const predicateNode = node.getChild("Predicate");

      if (!fieldNode || !parts.field) {
        continue;
      }

      // Validate field exists
      const fieldResult = await validateField(parts.field, schema, schemaCache);

      if (!fieldResult.ok) {
        diagnostics.push({
          from: fieldNode.from,
          to: fieldNode.to,
          severity: "error",
          message: fieldResult.error,
        });
        continue;
      }

      // Validate value against field type
      if (predicateNode && parts.predicate) {
        const valueResult = validateValue(parts.predicate, fieldResult.fieldInfo);

        if (valueResult) {
          diagnostics.push({
            from: predicateNode.from,
            to: predicateNode.to,
            severity: valueResult.severity,
            message: valueResult.message,
          });
        }
      }
    }

    return diagnostics;
  });
}

// Syntax error linter (kept from original for reference)

export function syntaxErrorLinter(view: EditorView): readonly Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  syntaxTree(view.state).iterate({
    enter: ({ type, from, to }) => {
      if (type.isError) {
        diagnostics.push({
          from,
          to,
          severity: "error",
          message: gettext("Syntax error"),
        });
      }
    },
  });

  return diagnostics;
}
