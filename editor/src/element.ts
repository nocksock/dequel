import type { DequelEditor } from './editor/index.js'
import { CompletionFetcher, CompletionSchemaEffect, CompletionSchemaField } from './editor/completion.js'
import { Suggestions, SuggestionSchemaEffect } from './editor/suggestions/suggestions.js'
import { raise } from './lib/error.js'
import { detectLocale, loadTranslations } from './lib/i18n.js'
import axios from 'axios'
import { EditorView, keymap } from '@codemirror/view'
import { basicSetup } from './editor/basic-setup.js'
import { DequelLang } from './dequel-lang/language.js'
import { CurrentNodeField } from './editor/current-node.js'
import { OnUpdate } from './editor/on-update.js'
import { DequelEditorOptions } from './editor/options.js'

const submitKeymap = (onSubmit?: () => void) =>
    onSubmit
        ? keymap.of([{
            key: 'Ctrl-Enter',
            mac: 'Cmd-Enter',
            run: () => {
                onSubmit()
                return true
            },
        }])
        : []


export class DequelEditorElement extends HTMLElement {
    static formAssociated = true
    static observedAttributes = ['value', 'autocompletions', 'suggestions', 'locale']

    #value = ''
    #autocompletions?: string
    #endpoint?: string
    #internals: ElementInternals
    editor?: DequelEditor

    constructor() {
        super()
        this.#internals = this.attachInternals()
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        if (this.editor) return;

        this.#value = this.getAttribute('value') || ''
        this.#endpoint = this.getAttribute('endpoint') || raise('endpoint is required on dequel-editor')
        this.#autocompletions = this.getAttribute('autocompletions') || ''

        // Initialize i18n with locale detection
        const locale = detectLocale(this.getAttribute('locale'))
        if (locale !== 'en') {
            import(`./locales/${locale}.json`)
                .then((mod) => loadTranslations(mod.default, locale))
                .catch(() => console.warn(`[dequel-editor] No translations for locale: ${locale}`))
        }

        // Check if there's a suggestions container for this editor
        const hasSuggestions = !!document.querySelector(`[for="${this.id}"]`)

        this.editor = new EditorView({
            extensions: [
                basicSetup(),
                DequelLang(),
                CurrentNodeField,
                CompletionSchemaField,
                DequelEditorOptions.of({
                    value: this.#value,
                    endpoint: this.#endpoint,
                    onUpdate: () => {},
                    suggestions: hasSuggestions,
                }),
                this.#autocompletions ? CompletionFetcher : [],
                hasSuggestions ? Suggestions : [],
                OnUpdate(value => {
                    this.value = value
                    this.dispatchEvent(new CustomEvent('input', { bubbles: true, detail: value }))
                }),
                submitKeymap(() => {
                    this.form?.requestSubmit()
                }),
            ],
            parent: this.shadowRoot!,
            doc: this.value,
        })
    }

    get value() {
        return this.#value || ""
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
            case 'locale': {
                const locale = detectLocale(newValue)
                if (locale !== 'en') {
                    import(`./locales/${locale}.json`)
                        .then((mod) => loadTranslations(mod.default, locale))
                        .catch(() => console.warn(`[dequel-editor] No translations for locale: ${locale}`))
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
