import { TransactionSpec } from "@codemirror/state";
import { ActionContext } from "./suggestions";
import { raise } from "../../lib/error";
import { closest, isWhitespace } from "../../lib/syntax";

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
          anchor: matcher.from + action.value.indexOf("*") + 1,
        },
        changes: view.state.changes({
          from: matcher.from + 1, // FIXME: ":" is somehow part of the matcher's range
          to: matcher.to,
          insert: action.value.replace("*", ""),
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
  }
}
