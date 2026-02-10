import { Facet } from '@codemirror/state'
import { OnUpdateCallbackFn } from './on-update'
import { DequelEditorElement } from '../element'

export type DequelEditorOptions = {
  value: string
  /** Base endpoint URL for API requests (e.g., "/api/dql") */
  endpoint?: string
  /** Collection name for schema fetching (e.g., "books") */
  collection?: string
  onUpdate: OnUpdateCallbackFn
  onSubmit?: () => void
  suggestions?: boolean,
  root: DequelEditorElement
}

export const DequelEditorOptions = Facet.define<DequelEditorOptions>()
