import { Facet } from '@codemirror/state'
import { OnUpdateCallbackFn } from './on-update'

export type DequelEditorOptions = {
  value: string
  /** Base endpoint URL for API requests (e.g., "/api/dql") */
  endpoint?: string
  onUpdate: OnUpdateCallbackFn
  onSubmit?: () => void
  suggestions: boolean
}

export const DequelEditorOptions = Facet.define<DequelEditorOptions>()
