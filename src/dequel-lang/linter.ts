import { syntaxTree } from "@codemirror/language";
import { Diagnostic } from "@codemirror/lint";
import { EditorView } from "@codemirror/view";

// currently we're not using this, but keeping it around for when we implement
// linting features (which we'll eventually do)

export function lintExample(view: EditorView): readonly Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  syntaxTree(view.state).iterate({
    enter: ({ type, from, to }) => {
      if (type.isError) {
        diagnostics.push({
          from,
          to,
          severity: "error",
          message: "Syntax error",
        });
      }
    },
  });

  return diagnostics;
}

