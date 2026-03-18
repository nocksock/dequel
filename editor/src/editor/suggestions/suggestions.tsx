import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { render } from 'preact'
import { StateEffect, StateField } from '@codemirror/state'
import { SuggestionView } from '../../components/SuggestionView'

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
    #dom: HTMLElement | null = null
    #hostId: string | undefined

    constructor(view: EditorView) {
      this.#hostId = (view.dom.getRootNode() as ShadowRoot).host?.id
    }

    #findTarget(): HTMLElement | null {
      if (!this.#dom && this.#hostId) {
        this.#dom = document.querySelector(`dequel-suggestions[for="${this.#hostId}"]`)
      }
      return this.#dom
    }

    update(update: ViewUpdate) {
      const target = this.#findTarget()
      if (target) {
        render(<SuggestionView view={update.view} />, target)
      }
    }
  }
)
