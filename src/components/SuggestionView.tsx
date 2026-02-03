import { useState } from 'preact/hooks'
import { EditorView } from '@codemirror/view'
import { syntaxTree } from '@codemirror/language'
import { CurrentNodeField } from '../editor/current-node'
import { getFieldContextWithTree } from '../lib/syntax'
import { SuggestionSchemaField } from '../editor/suggestions/suggestions'
import { getActions, applyAction, ActionContext, SuggestionAction } from '../lib/actions'
import { closestCondition } from '../lib/syntax'
import { renderState } from '../lib/debug'

export type SuggestionViewProps = {
  view: EditorView
}

function buildActionContext(view: EditorView): ActionContext | null {
  const { state } = view
  const current = state.field(CurrentNodeField)
  if (!current) return null

  const tree = syntaxTree(state)
  const cursorPos = state.selection.main.anchor
  const fieldNode = getFieldContextWithTree(tree, cursorPos, current.node)
  const fieldValue = fieldNode ? state.doc.sliceString(fieldNode.from, fieldNode.to) : null
  const condition = closestCondition(current.node)

  return {
    view,
    state,
    node: current.node,
    field: fieldValue,
    condition,
  }
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

  const ctx = buildActionContext(view)
  if (!ctx) return null

  const actions = getActions(ctx)
  const modifiers = actions.filter((a) => a.type === 'transform')
  const values = actions.filter((a) => a.type !== 'transform')

  const createClickHandler =
    (action: SuggestionAction): React.MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.preventDefault()
      view.dispatch(applyAction(ctx, action))
      view.focus()
    }

  const tree = syntaxTree(state)
  const cursorPos = state.selection.main.anchor
  const fieldNode = getFieldContextWithTree(tree, cursorPos, current.node)
  const fieldValue = fieldNode ? state.doc.sliceString(fieldNode.from, fieldNode.to) : '*'
  const schemaForField = suggestionSchema[fieldValue] ?? suggestionSchema['*']

  return (
    <div className="card space-y-3">
      <h2 className="divider text-sm font-semibold text-base-content/70">
        {schemaForField?.title || 'Narrow your search'}
      </h2>

      {schemaForField?.description && (
        <p className="text-sm text-base-content/60 mb-2">{schemaForField.description}</p>
      )}

      {values.length > 0 && (
        <ul className="grid gap-2">
          {values.map((action) => (
            <li key={action.id} className="contents">
              <button className="btn justify-start" onClick={createClickHandler(action)}>
                <span className="font-medium font-mono text-primary">{action.label}</span>
                <span className="text-base-content/60 text-xs">
                  {action.description}
                  {showDebug && (
                    <span className="badge badge-ghost badge-xs ml-1">{action.type}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {modifiers.length > 0 && (
        <div className="mt-4">
          <h3 className="divider text-xs text-base-content/50">Condition modifiers</h3>
          <div className="flex gap-2">
            {modifiers.map((action) => {
              const isActive =
                (action.id === 'negate' && ctx.condition?.name === 'ExcludeCondition') ||
                (action.id === 'disable' && ctx.condition?.name === 'IgnoredCondition')

              return (
                <button
                  key={action.id}
                  className={`btn btn-sm flex-1 ${isActive ? 'btn-active' : ''}`}
                  onClick={createClickHandler(action)}
                  title={action.description}
                >
                  <span className="font-mono">{action.label}</span>
                  <span className="text-xs">{action.description}</span>
                </button>
              )
            })}
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
            onChange={() => setShowDebug((d) => !d)}
          />
        </label>
      </div>

      {showDebug && (
        <div className="mockup-code mt-3 text-xs">
          <pre>
            <code>{`${fieldNode?.name || ''}<${fieldValue}> + Node(${current.node.type.name}<${state.doc.sliceString(
              current.node.from,
              current.node.to
            )}>)`}</code>
          </pre>
        </div>
      )}

      {showDebug && (
        <div className="collapse collapse-arrow bg-base-200 mt-2">
          <input type="checkbox" />
          <div className="collapse-title text-xs py-2 min-h-0">full state</div>
          <div
            className="collapse-content text-xs"
            dangerouslySetInnerHTML={{ __html: renderState(view.state) }}
          />
        </div>
      )}
    </div>
  )
}
