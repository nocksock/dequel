import { syntaxTree } from '@codemirror/language'
import { NodeIterator } from '@lezer/common'
import { StateField } from '@codemirror/state'
import { SyntaxNode } from '@lezer/common'

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
