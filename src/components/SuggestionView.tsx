import { useState } from 'preact/hooks'
import { EditorView } from '@codemirror/view'
import { syntaxTree } from '@codemirror/language'
import { SyntaxNode } from '@lezer/common'
import { CurrentNodeField } from '../editor/current-node'
import { createTransaction } from '../editor/suggestions/createTransaction'
import { getSuggestionContextWithTree } from '../editor/suggestions/getSuggestionContext'
import {
  SuggestionSchemaField,
  SuggestionAction,
} from '../editor/suggestions/suggestions'
import { renderState } from '../lib/debug'
import { closest } from '../lib/syntax'
import { ANY_CONDITION } from '../dequel-lang/parser'

// Find the closest condition node (Condition, ExcludeCondition, or IgnoredCondition)
const closestCondition = (node: SyntaxNode): SyntaxNode | null => {
  // Check if the node itself is a condition
  if (ANY_CONDITION.includes(node.name)) return node

  // Check ancestors
  for (const conditionType of ANY_CONDITION) {
    const found = closest(conditionType, node)
    if (found) return found
  }
  return null
}

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

  const tree = syntaxTree(state)
  const cursorPos = state.selection.main.anchor
  const field = getSuggestionContextWithTree(tree, cursorPos, current.node)
  const fieldValue = field ? state.doc.sliceString(field.from, field.to) : '*'
  const suggestions = suggestionSchema[fieldValue]

  // Check if we're inside a condition for universal suggestions
  const condition = closestCondition(current.node)
  const isExcluded = condition?.name === 'ExcludeCondition'
  const isIgnored = condition?.name === 'IgnoredCondition'

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
    <div className="card  space-y-3">
      <h2 className="divider text-sm font-semibold text-base-content/70">
        {suggestions?.title || 'Narrow your search'}
      </h2>

      {suggestions?.description && (
        <p className="text-sm text-base-content/60 mb-2">{suggestions.description}</p>
      )}

      <ul className="grid gap-2">
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

      {condition && (
        <div className="mt-4">
          <h3 className="divider text-xs text-base-content/50">Condition modifiers</h3>
          <div className="flex gap-2">
            <button
              className={`btn btn-sm flex-1 ${isExcluded ? 'btn-active' : ''}`}
              onClick={createClickHandler({ type: 'negateCondition', value: '' })}
              title={isExcluded ? 'Remove negation' : 'Negate this condition'}
            >
              <span className="font-mono">-</span>
              <span className="text-xs">{isExcluded ? 'Un-negate' : 'Negate'}</span>
            </button>
            <button
              className={`btn btn-sm flex-1 ${isIgnored ? 'btn-active' : ''}`}
              onClick={createClickHandler({ type: 'disableCondition', value: '' })}
              title={isIgnored ? 'Enable condition' : 'Disable this condition'}
            >
              <span className="font-mono">!</span>
              <span className="text-xs">{isIgnored ? 'Enable' : 'Disable'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end items-center gap-2">
        <label className="label cursor-pointer gap-2">
          <span className="label-text text-xs text-base-content/50">Debug</span>
          <input
            type="checkbox"
            className="toggle toggle-xs"
            checked={showDebug}
            onChange={() => setShowDebug(d => !d)}
          />
        </label>
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
