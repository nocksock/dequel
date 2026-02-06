import { syntaxTree } from "@codemirror/language";
import { StateField } from "@codemirror/state";
import { SyntaxNode } from "@lezer/common";

export const CurrentNodeField = StateField.define<SyntaxNode | null>({
  create: () => null,
  update: (_value, { state }) => {
    const { anchor } = state.selection.main;
    const tree = syntaxTree(state);
    const curNode = tree.resolve(anchor, -1);
    return curNode.node;
  },
});
