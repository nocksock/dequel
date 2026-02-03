import { syntaxTree } from '@codemirror/language'
import { NodeIterator, SyntaxNode, Tree } from '@lezer/common'
import { StateField, Text } from '@codemirror/state'
import { ANY_CONDITION } from '../dequel-lang/parser'

// These are helper functions to work with the syntax tree of code parsed by
// Lezer in CodeMirror.

// Finds the closest ancestor node with the given name.
export const closest = (name: string, node: SyntaxNode) => {
  while (node.parent) {
    if (node.parent.name === name) {
      return node.parent
    }
    node = node.parent
  }
  return null
}

// Predicate to check if a node has a parent with the given name.
export const hasParent = (name: string, node: SyntaxNode) =>
  !!closest(name, node)

// Predicate to check if a character is whitespace.
export const isWhitespace = (char: string) => char.trim() === ''

export const CurrentNodeField = StateField.define<SyntaxNode | null>({
  create: () => null,
  update: (_value, { state }) => {
    const { anchor } = state.selection.main
    const tree = syntaxTree(state)
    const curNode = tree.resolve(anchor, -1)
    return curNode.node
  },
})

// Flattens a NodeIterator into an array of node names.
// Can be useful to get the hierarchy of nodes from a given node up to the root,
// like a path representation of the syntax tree.
export const flattenStack = (
  stack: NodeIterator | null,
  acc: string[] = []
): string[] =>
  stack ? flattenStack(stack.next, [...acc, stack.node.name]) : acc

// Condition handling

export interface ConditionParts {
  prefix: '' | '-' | '!'
  field: string
  predicate: string
  node: SyntaxNode
}

export type Transform = (parts: ConditionParts) => Omit<ConditionParts, 'node'>

/**
 * Find the closest condition node (Condition, ExcludeCondition, or IgnoredCondition).
 */
export const closestCondition = (node: SyntaxNode): SyntaxNode | null => {
  // Check if the node itself is a condition
  if (ANY_CONDITION.includes(node.name)) return node

  // Check ancestors
  for (const conditionType of ANY_CONDITION) {
    const found = closest(conditionType, node)
    if (found) return found
  }
  return null
}

/**
 * Parse a condition syntax node into structured parts.
 */
export function parseCondition(node: SyntaxNode, doc: Text): ConditionParts {
  const prefix =
    node.name === 'ExcludeCondition'
      ? '-'
      : node.name === 'IgnoredCondition'
        ? '!'
        : ''

  const fieldNode = node.getChild('Field')
  const predicateNode = node.getChild('Predicate')

  return {
    prefix,
    field: fieldNode ? doc.sliceString(fieldNode.from, fieldNode.to) : '',
    predicate: predicateNode ? doc.sliceString(predicateNode.from, predicateNode.to) : '',
    node,
  }
}

/**
 * Serialize condition parts back to a string.
 */
export function serializeCondition(parts: Omit<ConditionParts, 'node'>): string {
  return `${parts.prefix}${parts.field}:${parts.predicate}`
}

// Field context

/**
 * Get the Field node for the condition at the current cursor position.
 */
export const getFieldContext = (node?: SyntaxNode | null): SyntaxNode | null => {
  if (!node) return null

  if (node.name === 'Field') {
    return node
  }

  // Inside a value (Identifier, String, Number, etc.)
  if (node.name === 'Identifier' && hasParent('Value', node)) {
    return closestCondition(node)?.getChild('Field') ?? null
  }

  // On the colon separator
  if (node.name === ':') {
    return closestCondition(node)?.getChild('Field') ?? null
  }

  // Fallback: check if we're inside any condition type
  const condition = closestCondition(node)
  if (condition) {
    return condition.getChild('Field')
  }

  return null
}

/**
 * Get the Field node, with extended handling for whitespace after ":".
 */
export const getFieldContextWithTree = (
  tree: Tree,
  pos: number,
  node?: SyntaxNode | null
): SyntaxNode | null => {
  // First try the standard approach
  const result = getFieldContext(node)
  if (result) return result

  // If we're on Query/QueryList (outside a condition), scan backwards to find
  // if there's a ":" that belongs to an incomplete condition
  if (node && (node.name === 'Query' || node.name === 'QueryList')) {
    // Walk backwards through positions to find a condition
    for (let scanPos = pos - 1; scanPos >= 0; scanPos--) {
      const scanNode = tree.resolveInner(scanPos, -1)

      // Found a colon - get its parent condition's field
      if (scanNode.name === ':') {
        const condition = closestCondition(scanNode)
        if (condition) {
          return condition.getChild('Field')
        }
      }

      // Found a condition - we're in the matcher area
      if (ANY_CONDITION.includes(scanNode.name)) {
        return scanNode.getChild('Field')
      }

      // Stop if we hit whitespace between conditions or start of doc
      // But continue through whitespace that's after a ":"
      if (scanNode.name === 'Query' || scanNode.name === 'QueryList') {
        continue // Keep scanning
      }

      // Found something else (like a complete condition's value) - stop
      if (scanNode.name !== 'Query' && scanNode.name !== 'QueryList') {
        break
      }
    }
  }

  return null
}
