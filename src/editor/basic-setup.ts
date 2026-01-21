import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { history } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import {
  defaultKeymap,
  historyKeymap,
  standardKeymap,
} from "@codemirror/commands";
import { indentOnInput } from "@codemirror/language";

/**
 * Codemirror is extremely modular. This basic setup includes everything
 * necessary to have a basic-editor with minimal features. Put anything that is
 * *not* related to the extension or language in here.
 */
export const basicSetup = () => [
  keymap.of([
    ...historyKeymap,
    ...defaultKeymap,
    ...standardKeymap,
    ...completionKeymap,
    ...closeBracketsKeymap,
  ]),
  closeBrackets(),
  autocompletion(),
  history(),
  indentOnInput(),
  EditorView.lineWrapping,
];
