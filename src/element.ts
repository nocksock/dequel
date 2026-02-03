import { DequelEditor } from './editor/index.js'
import { raise } from './lib/error.js'

const inputEvent = new Event('input')

export class DequelEditorElement extends HTMLElement {
  static formAssociated = true
  static observedAttributes = ['value']

  #value = this.getAttribute('value') || ''
  #endpoint = this.getAttribute('endpoint') || raise('endpoint is required on dequel-editor')
  #internals: ElementInternals
  editor?: DequelEditor

  constructor() {
    super()
    this.#internals = this.attachInternals()
  }

  connectedCallback() {
    if (this.editor) return;
    this.editor = new DequelEditor(this, {
      value: this.value,
      completionEndpoint: this.#endpoint,
      suggestions: !!this.getAttribute('suggestions'),
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

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'value': {
        this.value = newValue
      }
    }
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
