import { SyntaxNode } from "@lezer/common";
import { isProduction } from "../../lib/env";
import { raise } from "../../lib/error";
import { hasParent, closest } from "../../lib/syntax";

export const getSuggestionContext = (node?: SyntaxNode | null) => {
  !isProduction && console.log("suggestion context around", node?.name);

  if (node?.name === "Field") {
    return node;
  }

  if (node?.name === "Identifier" && hasParent("Value", node)) {
    return (
      closest("Condition", node)?.getChild("Field") ||
      raise("field not found for Identifier in Value")
    );
  }

  if (node?.name == ":") {
    return (
      closest("Condition", node)?.getChild("Field") ||
      raise('field not found in ":" ')
    );
  }

  return null; // fieldValue => "*"
};
