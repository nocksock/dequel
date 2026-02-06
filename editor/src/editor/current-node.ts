import { syntaxTree } from "@codemirror/language";
import { StateField } from "@codemirror/state";
import { SyntaxNode } from "@lezer/common";
import { flattenStack } from "../lib/syntax";

export type CurrentNode = {
  node: SyntaxNode;
  path: string[];
};

export const CurrentNodeField = StateField.define<CurrentNode | null>({
  create: () => null,
  update: (_value, { state }) => {
    const { anchor } = state.selection.main;
    const tree = syntaxTree(state);
    // In Lezer (CodeMirror's parser), tree.resolve(pos, side) finds the syntax
    // node at a given position. The side parameter controls behavior at node
    // boundaries:
    //
    //   - -1: Prefer the node that ends at this position (look left/backward)
    //   -  1: Prefer the node that starts at this position (look right/forward)
    //   -  0: Return the innermost node containing the position
    const node = tree.resolve(anchor, -1);
    return {
      node,
      path: flattenStack(tree.resolveStack(anchor, -1)),
    };
  },
});
