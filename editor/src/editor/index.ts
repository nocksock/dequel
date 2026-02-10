import { EditorView, keymap } from '@codemirror/view'
import { OnUpdate } from './on-update'
import { CurrentNodeField } from './current-node'
import { basicSetup } from './basic-setup'
import { DequelEditorOptions } from './options.js'
import { Suggestions } from './suggestions/suggestions'
import { SchemaField } from './completion.js'
import { DequelLang } from '../dequel-lang'

export type DequelEditor = EditorView

const submitKeymap = (onSubmit?: () => void) =>
  onSubmit
    ? keymap.of([{
        key: 'Ctrl-Enter',
        mac: 'Cmd-Enter',
        run: () => {
          onSubmit()
          return true
        },
      }])
    : []

export const createDequelEditor = (parent: HTMLElement, opts: DequelEditorOptions): DequelEditor =>
  new EditorView({
    extensions: [
      basicSetup(),
      DequelLang(),
      DequelEditorOptions.of(opts),
      CurrentNodeField,
      SchemaField,
      // Schema is fetched externally and pushed via SchemaEffect
      opts.suggestions ? Suggestions : [],
      OnUpdate(opts.onUpdate),
      submitKeymap(opts.onSubmit),
    ],
    parent,
    doc: opts.value,
  })
