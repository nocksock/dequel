import { EditorView } from '@codemirror/view'
import { OnUpdate } from './on-update'
import { CurrentNodeField } from './current-node'
import { basicSetup } from './basic-setup'
import { DequelEditorOptions } from './options'
import { Suggestions } from './suggestions/suggestions'
import { CompletionSchemaField, CompletionFetcher } from './completion'
import { DequelLang } from '../dequel-lang'

export type DequelEditor = EditorView

export const createDequelEditor = (parent: HTMLElement, opts: DequelEditorOptions): DequelEditor =>
  new EditorView({
    extensions: [
      basicSetup(),
      DequelLang(),
      DequelEditorOptions.of(opts),
      CurrentNodeField,
      CompletionSchemaField,
      opts.autocompletionsEndpoint ? CompletionFetcher : [],
      opts.suggestions ? Suggestions : [],
      OnUpdate(opts.onUpdate),
    ],
    parent,
    doc: opts.value,
  })
