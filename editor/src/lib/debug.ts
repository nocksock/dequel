import { syntaxTree } from "@codemirror/language";
import { EditorState } from "@codemirror/state";

export const renderState = (state: EditorState) => {
  const tree = syntaxTree(state);

  let lists = "";
  tree.iterate({
    enter({ type, from, to }) {
      lists += `<ul><li class="pl-8">${
        type.name
      } (${from}→${to}): ${state.doc.sliceString(from, to)}`;
    },
    leave() {
      lists += "</ul>";
    },
  });
  return lists;
};
