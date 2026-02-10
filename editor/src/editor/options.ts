import { Facet } from '@codemirror/state'
import { OnUpdateCallbackFn } from './on-update'
import { DequelEditorElement } from '../element'
import type { SchemaCache } from './completion'

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
  /** Schema cache for relationship path resolution */
  schemaCache?: SchemaCache
}

export const DequelEditorOptions = Facet.define<DequelEditorOptions>()
