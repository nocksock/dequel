import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { render } from 'preact'
import { SyntaxNode } from '@lezer/common'
import { StateEffect, StateField } from '@codemirror/state'
import axios from 'axios'
import { SuggestionView } from '../../components/SuggestionView'
import { raise } from '../../lib/error'
import { Optional } from '../../lib/types'

export type SuggestionsAPIResponse = Record<
  string,
  {
    title?: string
    description?: string
    values: {
      action: SuggestionAction
      description: string
      label: string
    }[]
  }
>

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
      this.#dom =
        document.querySelector(`[for="${view.dom.parentElement?.id}"]`) ||
        raise(`no suggestion container found`)

      const endpoint = this.#dom.getAttribute('endpoint')
      if (endpoint) {
        this.fetchSuggestions(view, endpoint)
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

export type ActionContext = {
  view: EditorView
  node: SyntaxNode
  field: Optional<SyntaxNode>
  action: SuggestionAction
}

export type SuggestionAction = {
  type: 'insert' | 'replaceCondition' | 'append' | 'appendDoc' | 'setMatcher' | 'negateCondition' | 'disableCondition'
  value: string
}
