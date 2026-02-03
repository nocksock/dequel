import { createDequelEditor } from './editor/index.js'
import type { DequelEditor } from './editor/index.js'
import { CompletionSchemaEffect } from './editor/completion.js'
import { SuggestionSchemaEffect } from './editor/suggestions/suggestions.js'
import { raise } from './lib/error.js'
import axios from 'axios'

const inputEvent = new Event('input')

export class DequelEditorElement extends HTMLElement {
  static formAssociated = true
  static observedAttributes = ['value', 'autocompletions', 'suggestions']

  #value = this.getAttribute('value') || ''
  #endpoint = this.getAttribute('endpoint') || raise('endpoint is required on dequel-editor')
  #autocompletions = this.getAttribute('autocompletions') || ''
  #internals: ElementInternals
  editor?: DequelEditor

  constructor() {
    super()
    this.#internals = this.attachInternals()
  }

  connectedCallback() {
    if (this.editor) return;
    // Check if there's a suggestions container for this editor
    const hasSuggestions = !!document.querySelector(`[for="${this.id}"]`)

    this.editor = createDequelEditor(this, {
      value: this.value,
      completionEndpoint: this.#endpoint,
      autocompletionsEndpoint: this.#autocompletions || undefined,
      suggestions: hasSuggestions,
      onUpdate: value => {
        this.#value = value
        console.log('DequelEditorElement updated value:', value)
        this.dispatchEvent(inputEvent)
      },
    })
  }

  get value() {
    return this.#value
  }

  set value(value) {
    this.#value = value
    this.#internals.setFormValue(value)
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'value': {
        this.value = newValue
        break
      }
      case 'autocompletions': {
        this.#autocompletions = newValue
        if (this.editor && newValue) {
          this.fetchCompletions(newValue)
        }
        break
      }
      case 'suggestions': {
        if (this.editor && newValue) {
          this.fetchSuggestions(newValue)
        }
        break
      }
    }
  }

  private fetchCompletions(endpoint: string) {
    axios.get(endpoint)
      .then(({ data }) => {
        this.editor?.dispatch({
          effects: CompletionSchemaEffect.of(data),
        })
      })
      .catch(console.error)
  }

  private fetchSuggestions(endpoint: string) {
    axios.get(endpoint)
      .then(({ data }) => {
        this.editor?.dispatch({
          effects: SuggestionSchemaEffect.of(data),
        })
      })
      .catch(console.error)
  }

  get form() {
    return this.#internals.form
  }

  get name() {
    return (
      this.getAttribute('name') || raise('name is a required on dequel-editor')
    )
  }

  get type() {
    return this.localName
  }
}

if (!customElements.get('dequel-editor')) {
  customElements.define('dequel-editor', DequelEditorElement)
}
