import { SyntaxNode, Tree } from "@lezer/common";
import { isProduction } from "../../lib/env";
import { closest } from "../../lib/syntax";
import { ANY_CONDITION } from "../../dequel-lang/parser";

// Find the closest condition node (Condition, ExcludeCondition, or IgnoredCondition)
const closestCondition = (node: SyntaxNode): SyntaxNode | null => {
  for (const conditionType of ANY_CONDITION) {
    const found = closest(conditionType, node);
    if (found) return found;
  }
  return null;
};

// Check if node has a parent that is a Value
const hasValueParent = (node: SyntaxNode): boolean => {
  let current: SyntaxNode | null = node;
  while (current?.parent) {
    if (current.parent.name === "Value") return true;
    current = current.parent;
  }
  return false;
};

export const getSuggestionContext = (node?: SyntaxNode | null) => {
  if (!node) return null;

  if (node.name === "Field") {
    return node;
  }

  // Inside a value (Identifier, String, Number, etc.)
  if (node.name === "Identifier" && hasValueParent(node)) {
    return closestCondition(node)?.getChild("Field") ?? null;
  }

  // On the colon separator
  if (node.name === ":") {
    return closestCondition(node)?.getChild("Field") ?? null;
  }

  // Fallback: check if we're inside any condition type
  const condition = closestCondition(node);
  if (condition) {
    return condition.getChild("Field");
  }

  return null;
};

// Extended version that also handles whitespace after ":" by looking at tree position
export const getSuggestionContextWithTree = (
  tree: Tree,
  pos: number,
  node?: SyntaxNode | null
): SyntaxNode | null => {
  // First try the standard approach
  const result = getSuggestionContext(node);
  if (result) return result;

  // If we're on Query/QueryList (outside a condition), scan backwards to find
  // if there's a ":" that belongs to an incomplete condition
  if (node && (node.name === "Query" || node.name === "QueryList")) {
    // Walk backwards through positions to find a condition
    for (let scanPos = pos - 1; scanPos >= 0; scanPos--) {
      const scanNode = tree.resolveInner(scanPos, -1);

      // Found a colon - get its parent condition's field
      if (scanNode.name === ":") {
        const condition = closestCondition(scanNode);
        if (condition) {
          return condition.getChild("Field");
        }
      }

      // Found a condition - we're in the matcher area
      if (ANY_CONDITION.includes(scanNode.name)) {
        return scanNode.getChild("Field");
      }

      // Stop if we hit whitespace between conditions or start of doc
      // But continue through whitespace that's after a ":"
      if (scanNode.name === "Query" || scanNode.name === "QueryList") {
        continue; // Keep scanning
      }

      // Found something else (like a complete condition's value) - stop
      if (scanNode.name !== "Query" && scanNode.name !== "QueryList") {
        break;
      }
    }
  }

  return null;
};
