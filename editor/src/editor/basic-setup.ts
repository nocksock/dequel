import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
  startCompletion,
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
  autocompletion({
    activateOnTyping: true,
    activateOnTypingDelay: 0,
  }),
  // Trigger completion when '.' is typed (for relationship paths)
  EditorView.inputHandler.of((view, _from, _to, text) => {
    if (text === ".") {
      // Schedule completion after the '.' is inserted
      setTimeout(() => startCompletion(view), 0);
    }
    return false; // Don't prevent default handling
  }),
  history(),
  indentOnInput(),
  EditorView.lineWrapping,
];
