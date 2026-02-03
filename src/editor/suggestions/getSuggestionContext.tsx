import { SyntaxNode } from "@lezer/common";
import { isProduction } from "../../lib/env";
import { raise } from "../../lib/error";
import { hasParent, closest } from "../../lib/syntax";
import { ANY_CONDITION } from "../../dequel-lang/parser";

export const getSuggestionContext = (node?: SyntaxNode | null) => {
  if (!node) return null;

  !isProduction && console.log("suggestion context around", node.name);

  if (node.name === "Field") {
    return node;
  }

  if (node.name === "Identifier" && hasParent("Value", node)) {
    return (
      closest("Condition", node)?.getChild("Field") ||
      raise("field not found for Identifier in Value")
    );
  }

  if (node.name === ":") {
    return (
      closest("Condition", node)?.getChild("Field") ||
      raise('field not found in ":" ')
    );
  }

  // Fallback: check if we're inside any condition type
  // This handles whitespace after ":" and other edge cases
  for (const conditionType of ANY_CONDITION) {
    const condition = closest(conditionType, node);
    if (condition) {
      return condition.getChild("Field");
    }
  }

  return null;
};
