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
    const node = tree.resolve(anchor, -1);
    return {
      node,
      path: flattenStack(tree.resolveStack(anchor, -1)),
    };
  },
});
