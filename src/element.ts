import { DequelEditor } from './editor/index.js'
import { raise } from './lib/error.js'

const inputEvent = new Event('input')

export class DequelEditorElement extends HTMLElement {
  static formAssociated = true
  static observedAttributes = ['value']

  #value!: string
  #endpoint: string
  #internals: ElementInternals
  editor?: DequelEditor

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#endpoint =
      this.getAttribute('endpoint') || 'http://localhost:4000/api/edq'
    this.#value = this.getAttribute('value') || ''
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
