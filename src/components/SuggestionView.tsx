import { Loader2Icon, PlusCircle } from 'lucide-react'
import { EditorView } from '@codemirror/view'
import { CurrentNodeField } from '../editor/current-node'
import { createTransaction } from '../editor/suggestions/createTransaction'
import { getSuggestionContext } from '../editor/suggestions/getSuggestionContext'
import {
  SuggestionSchemaField,
  SuggestionAction,
} from '../editor/suggestions/suggestions'
import { renderState } from '../lib/debug'
import { isProduction } from '../lib/env'

export type SuggestionViewProps = {
  view: EditorView
}

export function SuggestionView({ view, view: { state } }: SuggestionViewProps) {
  const current = state.field(CurrentNodeField)
  const suggestionSchema = state.field(SuggestionSchemaField)

  if (!current) {
    return null
  }

  if (!suggestionSchema) {
    return (
      <p className="dequel-suggestions-loading">
        <Loader2Icon className="animate-spin " />
        Loading suggestions...
      </p>
    )
  }

  const field = getSuggestionContext(current.node)
  const fieldValue = field ? state.doc.sliceString(field.from, field.to) : '*'
  const suggestions = suggestionSchema[fieldValue]

  const createClickHandler =
    (action: SuggestionAction): React.MouseEventHandler<HTMLButtonElement> =>
    e => {
      e.preventDefault()
      view.dispatch(
        createTransaction({
          view,
          field,
          node: current.node,
          action,
        })
      )

      view.focus()
    }

  return (
    <div>
      <h2 className="text-sm font-semibold mb-2 opacity-70">
        {suggestions?.title || 'Narrow your search'}
      </h2>
      {suggestions?.description && <p className="text-sm opacity-60 mb-2">{suggestions.description}</p>}

      <ul className="flex flex-col">
        {suggestions?.values?.map(({ description, action, label }) => (
          <li className='suggestion' key={label || action.value}>
            <button
              onClick={createClickHandler(action)}
            >
              <span className="suggestion-label">
                {label || action.value}
              </span>
              <p className="suggestion-type">
                {description}
                {!isProduction && (
                  <span className="opacity-50 text-xs"> ({action.type})</span>
                )}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {!isProduction && (
        <p className="bg-black text-white p-4">
          {`${field?.name || ''}<${fieldValue}> + Node(${current.node.type.name}<${state.doc.sliceString(
            current.node.from,
            current.node.to
          )}>)`}
        </p>
      )}

      {!isProduction && (
        <details>
          <summary>
            debug
          </summary>

          <div
            dangerouslySetInnerHTML={{
              __html: renderState(view.state),
            }}
          ></div>
        </details>
      )}
    </div>
  )
}
