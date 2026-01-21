import { EditorView } from '@codemirror/view'
import { OnUpdate } from './on-update'
import { CurrentNodeField } from './current-node'
import { basicSetup } from './basic-setup'
import { DequelEditorOptions } from './options'
import { Suggestions } from './suggestions/suggestions'
import { DequelLang } from '../dequel-lang'

export class DequelEditor {
  constructor(parent: HTMLElement, opts: DequelEditorOptions) {
    return new EditorView({
      extensions: [
        basicSetup(),
        DequelLang(),
        DequelEditorOptions.of(opts),
        CurrentNodeField,
        opts.suggestions ? Suggestions : [],
        OnUpdate(opts.onUpdate),
      ],
      parent,
      doc: opts.value,
    })
  }
}
