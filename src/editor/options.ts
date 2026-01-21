import { Facet } from '@codemirror/state'
import { OnUpdateCallbackFn } from './on-update'

export type DequelEditorOptions = {
  value: string
  completionEndpoint: string
  onUpdate: OnUpdateCallbackFn
  suggestions: boolean
}

export const DequelEditorOptions = Facet.define<DequelEditorOptions>()
