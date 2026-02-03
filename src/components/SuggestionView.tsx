import { useState } from 'preact/hooks'
import { BugIcon } from 'lucide-react'
import { EditorView } from '@codemirror/view'
import { CurrentNodeField } from '../editor/current-node'
import { createTransaction } from '../editor/suggestions/createTransaction'
import { getSuggestionContext } from '../editor/suggestions/getSuggestionContext'
import {
  SuggestionSchemaField,
  SuggestionAction,
} from '../editor/suggestions/suggestions'
import { renderState } from '../lib/debug'

export type SuggestionViewProps = {
  view: EditorView
}

export function SuggestionView({ view, view: { state } }: SuggestionViewProps) {
  const [showDebug, setShowDebug] = useState(false)
  const current = state.field(CurrentNodeField)
  const suggestionSchema = state.field(SuggestionSchemaField)

  if (!current) {
    return null
  }

  if (!suggestionSchema) {
    return (
      <p className="flex items-center gap-2 text-base-content/70">
        <span className="loading loading-spinner loading-sm" />
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
    <div className="card">
      <h2 className="divider text-sm font-semibold text-base-content/70">
        {suggestions?.title || 'Narrow your search'}
      </h2>

      {suggestions?.description && (
        <p className="text-sm text-base-content/60 mb-2">{suggestions.description}</p>
      )}

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2">
        {suggestions?.values?.map(({ description, action, label }) => (
          <li key={label || action.value} className="contents">
            <button
              className="btn justify-start"
              onClick={createClickHandler(action)}
            >
              <span className="font-medium font-mono text-primary">
                {label || action.value}
              </span>
              <span className="text-base-content/60 text-xs">
                {description}
                {showDebug && (
                  <span className="badge badge-ghost badge-xs ml-1">{action.type}</span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowDebug(d => !d)}
          className={`btn btn-ghost btn-xs btn-square ${showDebug ? 'btn-active' : ''}`}
          title="Toggle debug info"
        >
          <BugIcon size={14} />
        </button>
      </div>



      {showDebug && (
        <div className="mockup-code mt-3 text-xs">
          <pre><code>{`${field?.name || ''}<${fieldValue}> + Node(${current.node.type.name}<${state.doc.sliceString(
            current.node.from,
            current.node.to
          )}>)`}</code></pre>
        </div>
      )}

      {showDebug && (
        <div className="collapse collapse-arrow bg-base-200 mt-2">
          <input type="checkbox" />
          <div className="collapse-title text-xs py-2 min-h-0">
            full state
          </div>
          <div
            className="collapse-content text-xs"
            dangerouslySetInnerHTML={{
              __html: renderState(view.state),
            }}
          />
        </div>
      )}
    </div>
  )
}
