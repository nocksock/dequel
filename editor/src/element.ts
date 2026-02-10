import type { DequelEditor } from './editor/index.js'
import { SchemaEffect, SchemaField } from './editor/completion.js'
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
    static observedAttributes = ['value', 'autocompletions', 'suggestions', 'locale', 'collection']

    #value = ''
    #collection!: string
    #internals: ElementInternals
    editor?: DequelEditor

    constructor() {
        super()
        this.#internals = this.attachInternals()
        this.attachShadow({ mode: 'open' })
    }

    get collection() {
        return this.getAttribute('collection') || raise('collection attribute is required on dequel-editor')
    }

    get endpoint() {
        return this.getAttribute('endpoint') || raise('endpoint is required on dequel-editor')
    }

    get currentSchemaEndpoint() {
        return `${this.endpoint}/${this.collection}/schema`
    }

    get currentSuggestionEndpoint() {
        return `${this.endpoint}/${this.collection}/suggestions`
    }

    get value() {
        return this.#value || ""
    }

    set value(value) {
        this.#value = value
        this.#internals.setFormValue(value)
    }

    get form() {
        return this.#internals.form
    }

    get name() {
        return (
            this.getAttribute('name') || raise('name is a required on dequel-editor')
        )
    }

    connectedCallback() {
        if (this.editor) return;

        this.#value = this.value

        // Initialize i18n with locale detection
        const locale = detectLocale(this.getAttribute('locale'))
        if (locale !== 'en') {
            import(`./locales/${locale}.json`)
                .then((mod) => loadTranslations(mod.default, locale))
                .catch(() => console.warn(`[dequel-editor] No translations for locale: ${locale}`))
        }

        this.editor = new EditorView({
            extensions: [
                basicSetup(),
                DequelLang(),
                CurrentNodeField,
                SchemaField,
                DequelEditorOptions.of({
                    root: this,
                    value: this.#value,
                    endpoint: this.endpoint,
                    collection: this.#collection,
                    onUpdate: () => { },
                }),
                OnUpdate(newValue => {
                    this.value = newValue
                    this.dispatchEvent(new CustomEvent('input', { bubbles: true, detail: newValue }))
                }),
                submitKeymap(() => {
                    this.form?.requestSubmit()
                }),
            ],
            parent: this.shadowRoot!,
            doc: this.value,
        })
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        switch (name) {
            case 'value': {
                this.value = newValue
                break
            }

            case 'collection': {
                this.updateSchema()
                this.updateSuggestions()
                break
            }

            case 'endpoint': {
                this.updateSchema()
                this.updateSuggestions()
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

    private updateSchema() {
        axios.get(this.currentSchemaEndpoint)
            .then(({ data }) => {
                this.editor?.dispatch({
                    effects: SchemaEffect.of(data),
                })
            })
            .catch(console.error)
    }

    private updateSuggestions() {
        axios.get(this.currentSuggestionEndpoint)
            .then(({ data }) => {
                this.editor?.dispatch({
                    effects: SuggestionSchemaEffect.of(data),
                })
            })
            .catch(console.error)
    }
}

if (!customElements.get('dequel-editor')) {
    customElements.define('dequel-editor', DequelEditorElement)
}
