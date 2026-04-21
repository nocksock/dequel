import { useState, useEffect } from 'preact/hooks'
import { EditorView } from '@codemirror/view'
import { syntaxTree } from '@codemirror/language'
import { CurrentNodeField } from '../editor/current-node'
import { getFieldContextWithTree, closestCondition } from '../lib/syntax'
import { SuggestionSchemaField } from '../editor/suggestions/suggestions'
import { SchemaField, Schema, FieldDefinition, resolvePathSchema } from '../editor/completion'
import { DequelEditorOptions } from '../editor/options'
import { getActions, applyAction, ActionContext, SuggestionAction } from '../lib/actions'
import { renderState } from '../lib/debug'
import { gettext } from '../lib/i18n'
import {
  getSuggestionsAsync,
  getValuePosition,
  SuggestionsResult,
} from '../lib/suggestions'

type SuggestionViewProps = {
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


// Type-specific predicates
export type PredicateSuggestion = {
  label: string
  value: string  // Can contain | to mark cursor position
  description: string
}

export function getTypePredicates(fieldType: string): PredicateSuggestion[] {
  switch (fieldType) {
    case 'string':
      return [
        { label: 'contains()', value: 'contains(|)', description: 'Contains text' },
        { label: 'starts_with()', value: 'starts_with(|)', description: 'Starts with text' },
        { label: 'ends_with()', value: 'ends_with(|)', description: 'Ends with text' },
        { label: 'one_of()', value: 'one_of(|)', description: 'One of multiple values' },
      ]
    case 'number':
      return [
        { label: '>', value: '>', description: 'Greater than' },
        { label: '<', value: '<', description: 'Less than' },
        { label: '>=', value: '>=', description: 'Greater than or equal' },
        { label: '<=', value: '<=', description: 'Less than or equal' },
        { label: '..', value: '|..', description: 'Range (e.g., 10..50)' },
      ]
    case 'date':
      return [
        { label: 'after()', value: 'after(|)', description: 'After date' },
        { label: 'before()', value: 'before(|)', description: 'Before date' },
        { label: '..', value: '|..', description: 'Date range (e.g., 2020..2024)' },
      ]
    case 'boolean':
      return [
        { label: 'true', value: 'true', description: 'True' },
        { label: 'false', value: 'false', description: 'False' },
        { label: 'yes', value: 'yes', description: 'Yes (alias for true)' },
        { label: 'no', value: 'no', description: 'No (alias for false)' },
      ]
    default:
      return []
  }
}

export function SuggestionView({ view, view: { state } }: SuggestionViewProps) {
  const [showDebug, setShowDebug] = useState(false)
  const [suggestions, setSuggestions] = useState<SuggestionsResult | null>(null)
  const [resolvedFieldInfo, setResolvedFieldInfo] = useState<FieldDefinition | null>(null)
  const current = state.field(CurrentNodeField)
  const suggestionSchema = state.field(SuggestionSchemaField)
  const schema = state.field(SchemaField, false)

  // Get schema cache from options
  const options = state.facet(DequelEditorOptions)
  const schemaCache = options[0]?.schemaCache

  // Check if cursor is in value position (need this early for the useEffect)
  const { inValue, fieldName: currentFieldName } = getValuePosition(state)

  // Get suggestions using async function (handles all schema resolution)
  useEffect(() => {
    getSuggestionsAsync(state, schema ?? null, schemaCache ?? null)
      .then(setSuggestions)
      .catch(() => setSuggestions(null))
  }, [state.doc.toString(), state.selection.main.anchor, schema, schemaCache])

  // Resolve field info when in value position (handles relationship paths like "author.bio")
  useEffect(() => {
    if (!inValue || !currentFieldName || !schema) {
      setResolvedFieldInfo(null)
      return
    }

    const pathParts = currentFieldName.split('.')
    if (pathParts.length === 1) {
      // Simple field - lookup directly
      setResolvedFieldInfo(schema.fields[pathParts[0]] || null)
    } else if (schemaCache) {
      // Relationship path - resolve schema then lookup field
      const relationshipPath = pathParts.slice(0, -1)
      const finalField = pathParts[pathParts.length - 1]

      resolvePathSchema(relationshipPath, schema, schemaCache)
        .then((resolved) => {
          setResolvedFieldInfo(resolved?.fields[finalField] || null)
        })
        .catch(() => setResolvedFieldInfo(null))
    } else {
      setResolvedFieldInfo(null)
    }
  }, [inValue, currentFieldName, schema, schemaCache])

  if (!current) {
    return null
  }

  if (!suggestionSchema || !suggestions) {
    return (
      <p className="flex items-center gap-2 text-base-content/70">
        <span className="loading loading-spinner loading-sm" />
        {gettext('Loading suggestions...')}
      </p>
    )
  }

  const ctx = buildActionContext(view)
  if (!ctx) return null

  const actions = getActions(ctx)
  const values = actions.filter((a) => a.type !== 'transform')

  const createClickHandler =
    (action: SuggestionAction) =>
    (e: MouseEvent) => {
      e.preventDefault()
      view.dispatch(applyAction(ctx, action))
      view.focus()
    }

  const tree = syntaxTree(state)
  const cursorPos = state.selection.main.anchor
  const fieldNode = getFieldContextWithTree(tree, cursorPos, current.node)
  const fieldValue = fieldNode ? state.doc.sliceString(fieldNode.from, fieldNode.to) : '*'
  const schemaForField = suggestionSchema[fieldValue] ?? suggestionSchema['*']

  // For rendering
  const fieldsTitle = suggestions.debug.currentPath
    ? suggestions.debug.currentPath.slice(0, -1)
    : gettext('Fields')

  // Hide curated suggestions when typing a field or in value position
  const isTypingField = !!suggestions.debug.partialField || !!suggestions.debug.currentPath
  const showCurated = !isTypingField && !inValue

  // Get current field info for value suggestions (uses resolvedFieldInfo from useEffect)
  const currentField = resolvedFieldInfo
  const fieldValues = currentField?.values
  const typePredicates = currentField ? getTypePredicates(currentField.type) : []

  return (
    <div className="card space-y-3">
      {/* Value/Predicate suggestions - shown when cursor is after colon */}
      {inValue && currentFieldName && (
        <section>
          <h3 className="divider text-sm font-semibold text-base-content/70">
            {currentFieldName}
          </h3>

          {/* Show field values if available */}
          {fieldValues && fieldValues.length > 0 && (
            <>
              <p className="text-xs text-base-content/50 mb-2">{gettext('Values')}</p>
              <ul className="space-y-1">
                {fieldValues.map((v) => (
                  <li key={v}>
                    <button
                      type="button"
                      className="w-full btn btn-sm btn-ghost justify-start"
                      onClick={() => {
                        view.dispatch(applyAction(ctx, {
                          type: 'setPredicate',
                          id: `value-${v}`,
                          label: v,
                          value: `"${v}"`,
                        }))
                        view.focus()
                      }}
                    >
                      <span className="font-mono text-secondary">{v}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Show type-specific predicates */}
          {typePredicates.length > 0 && (
            <>
              <p className="text-xs text-base-content/50 mb-2 mt-3">{gettext('Operators')}</p>
              <ul className="space-y-1">
                {typePredicates.map((pred) => (
                  <li key={pred.label}>
                    <button
                      type="button"
                      className="w-full btn btn-sm btn-ghost justify-start gap-2"
                      onClick={() => {
                        view.dispatch(applyAction(ctx, {
                          type: 'setPredicate',
                          id: `predicate-${pred.label}`,
                          label: pred.label,
                          value: pred.value,
                        }))
                        view.focus()
                      }}
                    >
                      <span className="font-mono text-primary">{pred.label}</span>
                      <span className="text-xs text-base-content/50">{pred.description}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {/* Schema-based field suggestions - rendered from getSuggestions items */}
      {!inValue && suggestions.items.length > 0 && (
        <section>
          <h3 className="divider text-sm font-semibold text-base-content/70">
            {fieldsTitle}
          </h3>
          <ul className="space-y-1">
            {suggestions.items.map((item) => {
              const key = item.type === 'field' || item.type === 'field-negated'
                ? `${item.type}-${item.name}`
                : `${item.type}-${item.name}-${item.value}`

              switch (item.type) {
                case 'field':
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        className="w-full btn btn-sm btn-ghost justify-start gap-2"
                        onClick={() => {
                          view.dispatch(applyAction(ctx, {
                            type: 'append',
                            id: key,
                            label: `${item.name}${item.suffix}`,
                            value: `${item.name}${item.suffix}${item.suffix === ':' ? '|' : ''}`,
                          }))
                          view.focus()
                        }}
                      >
                        <span className="font-mono text-primary">{item.name}{item.suffix}</span>
                        <span className="text-xs text-base-content/50">{item.fieldType}</span>
                        {item.isRelationship && <span className="text-xs text-base-content/40">→</span>}
                      </button>
                    </li>
                  )

                case 'field-negated':
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        className="w-full btn btn-sm btn-ghost justify-start gap-2"
                        onClick={() => {
                          view.dispatch(applyAction(ctx, {
                            type: 'append',
                            id: key,
                            label: `-${item.name}:`,
                            value: `-${item.name}:|`,
                          }))
                          view.focus()
                        }}
                      >
                        <span className="font-mono text-error">-{item.name}:</span>
                        <span className="text-xs text-base-content/50">{gettext('exclude')}</span>
                      </button>
                    </li>
                  )

                case 'field-value':
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        className="w-full btn btn-sm btn-ghost justify-start"
                        onClick={() => {
                          view.dispatch(applyAction(ctx, {
                            type: 'append',
                            id: key,
                            label: `${item.name}:"${item.value}"`,
                            value: `${item.name}:"${item.value}"`,
                          }))
                          view.focus()
                        }}
                      >
                        <span className="font-mono text-secondary">{item.name}:"{item.value}"</span>
                      </button>
                    </li>
                  )

                case 'field-value-negated':
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        className="w-full btn btn-sm btn-ghost justify-start"
                        onClick={() => {
                          view.dispatch(applyAction(ctx, {
                            type: 'append',
                            id: key,
                            label: `-${item.name}:"${item.value}"`,
                            value: `-${item.name}:"${item.value}"`,
                          }))
                          view.focus()
                        }}
                      >
                        <span className="font-mono text-error">-{item.name}:"{item.value}"</span>
                      </button>
                    </li>
                  )
              }
            })}
          </ul>
        </section>
      )}

      {/* Curated suggestions - hidden when typing a field or in value position */}
      {showCurated && <section>
        <h3 className="divider text-sm font-semibold text-base-content/70">
          {schemaForField?.title || gettext('Suggestions')}
        </h3>

        {schemaForField?.description && (
          <p className="text-sm text-base-content/60 mb-2">{schemaForField.description}</p>
        )}

        {values.length > 0 && (
          <>
            <ul className="space-y-3">
              {values.map((action) => (
                <li key={action.id} className="contents">
                  <button type="button" title={action.description} className="w-full block btn justify-start *:border" onClick={createClickHandler(action)}>
                    <span className="font-medium font-mono text-primary mr-2">{action.label}</span>
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
          </>
        )}
      </section>}

      <div className="flex justify-end items-center gap-2">
        <label className="label cursor-pointer gap-2">
          <span className="label-text text-xs text-base-content/50">{gettext('Debug')}</span>
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
