import { Facet } from '@codemirror/state'
import { OnUpdateCallbackFn } from './on-update'

export type DequelEditorOptions = {
  value: string
  completionEndpoint: string
  autocompletionsEndpoint?: string
  onUpdate: OnUpdateCallbackFn
  onSubmit?: () => void
  suggestions: boolean
}

export const DequelEditorOptions = Facet.define<DequelEditorOptions>()
