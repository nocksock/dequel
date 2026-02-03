import { TransactionSpec } from "@codemirror/state";
import { SyntaxNode } from "@lezer/common";
import { ActionContext } from "./suggestions";
import { raise } from "../../lib/error";
import { closest, isWhitespace } from "../../lib/syntax";
import { ANY_CONDITION } from "../../dequel-lang/parser";

// Find the closest condition node (Condition, ExcludeCondition, or IgnoredCondition)
const closestCondition = (node: SyntaxNode): SyntaxNode | null => {
  for (const conditionType of ANY_CONDITION) {
    const found = closest(conditionType, node);
    if (found) return found;
  }
  return null;
};

/**
  * In CodeMirror, a "transaction" represents a set of changes to be applied
  * to the editor's state. It is the fundamental unit of change in the editor.
  * https://codemirror.net/docs/ref/#state.TransactionSpec
  */
export function createTransaction({
  view,
  node,
  action,
}: ActionContext): TransactionSpec {
  switch (action.type) {
    case "insert": {
      return {
        changes: view.state.changes({
          from: node.from,
          insert: action.value,
        }),
      };
    }

    case "appendDoc": {
      return {
        selection: {
          anchor: view.state.doc.length + action.value.length,
        },
        changes: view.state.changes({
          from: view.state.doc.length,
          insert: action.value,
        }),
      };
    }

    case "append": {
      const query = closest("Query", node) || node;
      const charAt = view.state.sliceDoc(node.to, node.to + 1);
      const prefix = isWhitespace(charAt) ? "" : " ";
      const value = prefix + action.value;

      return {
        selection: {
          anchor: query.to + value.length,
        },
        changes: view.state.changes({
          from: query.to,
          insert: value,
        }),
      };
    }

    case "setMatcher": {
      const matcher = closest("Matcher", node) || node;

      return {
        selection: {
          anchor: matcher.from + action.value.indexOf("|") + 1,
        },
        changes: view.state.changes({
          from: matcher.from + 1, // FIXME: ":" is somehow part of the matcher's range
          to: matcher.to,
          insert: action.value.replace("|", ""),
        }),
      };
    }

    case "replaceCondition": {
      const condition =
        closest("Condition", node) || raise("no condition found");

      return {
        selection: {
          anchor: condition.from + action.value.length,
        },
        changes: view.state.changes({
          from: condition.from,
          to: condition.to,
          insert: action.value,
        }),
      };
    }

    case "negateCondition": {
      const condition = closestCondition(node);
      if (!condition) return {};

      const isExclude = condition.name === "ExcludeCondition";
      if (isExclude) {
        // Remove the "-" prefix
        return {
          selection: { anchor: condition.from },
          changes: view.state.changes({
            from: condition.from,
            to: condition.from + 1,
            insert: "",
          }),
        };
      } else {
        // Add "-" prefix (and remove "!" if present)
        const isIgnored = condition.name === "IgnoredCondition";
        return {
          selection: { anchor: condition.from + 1 },
          changes: view.state.changes({
            from: condition.from,
            to: condition.from + (isIgnored ? 1 : 0),
            insert: "-",
          }),
        };
      }
    }

    case "disableCondition": {
      const condition = closestCondition(node);
      if (!condition) return {};

      const isIgnored = condition.name === "IgnoredCondition";
      if (isIgnored) {
        // Remove the "!" prefix
        return {
          selection: { anchor: condition.from },
          changes: view.state.changes({
            from: condition.from,
            to: condition.from + 1,
            insert: "",
          }),
        };
      } else {
        // Add "!" prefix (and remove "-" if present)
        const isExclude = condition.name === "ExcludeCondition";
        return {
          selection: { anchor: condition.from + 1 },
          changes: view.state.changes({
            from: condition.from,
            to: condition.from + (isExclude ? 1 : 0),
            insert: "!",
          }),
        };
      }
    }

    default: {
      const _exhaustive: never = action.type;
      return {};
    }
  }
}
