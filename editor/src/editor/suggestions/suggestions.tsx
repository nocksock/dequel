import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { render } from 'preact'
import { StateEffect, StateField } from '@codemirror/state'
import axios from 'axios'
import { SuggestionView } from '../../components/SuggestionView'
import { raise } from '../../lib/error'
import { DequelEditorOptions } from '../options'

/**
 * Action type in API responses.
 */
export type APIAction = {
  type: 'setPredicate' | 'append' | 'insert'
  value: string
  /** Only for 'insert' type - where to insert */
  position?: 'cursor' | 'end'
}

/**
 * Value suggestion in API responses.
 */
export type APIValue = {
  label: string
  description?: string
  action: APIAction
}

/**
 * Field configuration in API responses.
 */
export type APIFieldConfig = {
  title?: string
  description?: string
  /** Field type - determines available predicates */
  type?: 'text' | 'keyword' | 'uuid' | 'date'
  /** Custom values (combined with type-based predicates) */
  values?: APIValue[]
}

/**
 * API response format for suggestions.
 * Keys are field names or '*' for global suggestions.
 */
export type SuggestionsAPIResponse = Record<string, APIFieldConfig>

const SuggestionSchemaEffectType = StateEffect.define<SuggestionsAPIResponse>()

export const SuggestionSchemaField = StateField.define<SuggestionsAPIResponse>({
  create: () => ({}),
  update: (value, tr) => {
    for (const effect of tr.effects) {
      if (effect.is(SuggestionSchemaEffectType)) {
        return effect.value
      }
    }
    return value
  },
})

export const SuggestionSchemaEffect = SuggestionSchemaEffectType

export const Suggestions = ViewPlugin.fromClass(
  class {
    #dom: HTMLElement

    constructor(view: EditorView) {
      const hostId = (view.dom.getRootNode() as ShadowRoot).host?.id
      this.#dom =
        document.querySelector(`[for="${hostId}"]`) ||
        raise(`no suggestion container found`)

      const options = view.state.facet(DequelEditorOptions)[0]
      const baseEndpoint = options?.endpoint
      if (baseEndpoint) {
        this.fetchSuggestions(view, `${baseEndpoint}/suggestions`)
      }
    }

    fetchSuggestions(view: EditorView, endpoint: string) {
      axios
        .get(endpoint)
        .then(({ data }) => {
          view.dispatch({
            effects: SuggestionSchemaEffectType.of(data),
          })
        })
        .catch(console.error)
    }

    update(update: ViewUpdate) {
      render(<SuggestionView view={update.view} />, this.#dom)
    }
  },
  {
    // @ts-ignore
    provide: v => [SuggestionSchemaField, v],
  }
)
