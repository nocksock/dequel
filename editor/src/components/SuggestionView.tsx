import { useState, useEffect } from 'preact/hooks'
import { EditorView } from '@codemirror/view'
import { syntaxTree } from '@codemirror/language'
import { CurrentNodeField } from '../editor/current-node'
import { getFieldContextWithTree } from '../lib/syntax'
import { SuggestionSchemaField } from '../editor/suggestions/suggestions'
import { SchemaField, Schema, FieldDefinition, resolvePathSchema } from '../editor/completion'
import { DequelEditorOptions } from '../editor/options'
import { getActions, applyAction, ActionContext, SuggestionAction } from '../lib/actions'
import { closestCondition } from '../lib/syntax'
import { renderState } from '../lib/debug'
import { gettext } from '../lib/i18n'

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

function appendFieldToQuery(view: EditorView, fieldName: string, isRelationship: boolean, currentPath: string) {
  const { state } = view
  const doc = state.doc
  const content = doc.toString()

  // If we have a current path (e.g., "author."), append to it
  // Otherwise start fresh
  const suffix = isRelationship ? '.' : ':'

  if (currentPath) {
    // We're continuing a relationship path - just append the field name
    const pos = doc.length
    const insertion = fieldName + suffix
    view.dispatch({
      changes: { from: pos, insert: insertion },
      selection: { anchor: pos + insertion.length },
    })
  } else {
    // Starting fresh
    const needsSpace = content.length > 0 && !content.endsWith(' ') && !content.endsWith('.')
    const insertion = (needsSpace ? ' ' : '') + fieldName + suffix
    const pos = doc.length
    view.dispatch({
      changes: { from: pos, insert: insertion },
      selection: { anchor: pos + insertion.length },
    })
  }
  view.focus()
}

function setFieldPredicate(view: EditorView, fieldName: string, value: string, currentPath: string) {
  const { state } = view
  const doc = state.doc
  const content = doc.toString()

  const fullField = currentPath ? currentPath + fieldName : fieldName

  if (currentPath) {
    // Continuing a path - just append field:value
    const pos = doc.length
    const insertion = fieldName + ':' + value
    view.dispatch({
      changes: { from: pos, insert: insertion },
      selection: { anchor: pos + insertion.length },
    })
  } else {
    const needsSpace = content.length > 0 && !content.endsWith(' ')
    const insertion = (needsSpace ? ' ' : '') + fullField + ':' + value
    const pos = doc.length
    view.dispatch({
      changes: { from: pos, insert: insertion },
      selection: { anchor: pos + insertion.length },
    })
  }
  view.focus()
}

// Extract relationship path from current query position
function getCurrentRelationshipPath(state: EditorView['state']): string {
  const content = state.doc.toString()
  // Match a trailing relationship path like "author." or "author.publisher."
  const match = content.match(/(\w+\.)+$/)
  return match ? match[0] : ''
}

export function SuggestionView({ view, view: { state } }: SuggestionViewProps) {
  const [showDebug, setShowDebug] = useState(false)
  const [expandedField, setExpandedField] = useState<string | null>(null)
  const [resolvedSchema, setResolvedSchema] = useState<Schema | null>(null)
  const current = state.field(CurrentNodeField)
  const suggestionSchema = state.field(SuggestionSchemaField)
  const schema = state.field(SchemaField, false)

  // Get schema cache from options
  const options = state.facet(DequelEditorOptions)
  const schemaCache = options[0]?.schemaCache

  // Detect current relationship path (e.g., "author." or "author.publisher.")
  const currentPath = getCurrentRelationshipPath(state)
  const pathSegments = currentPath ? currentPath.slice(0, -1).split('.') : []

  // Resolve relationship path to get target schema
  useEffect(() => {
    if (pathSegments.length > 0 && schema && schemaCache) {
      resolvePathSchema(pathSegments, schema, schemaCache)
        .then((resolved) => setResolvedSchema(resolved))
        .catch(() => setResolvedSchema(null))
    } else {
      setResolvedSchema(null)
    }
  }, [currentPath, schema, schemaCache])

  if (!current) {
    return null
  }

  if (!suggestionSchema) {
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

  // Use resolved schema if we're in a relationship path, otherwise use base schema
  const displaySchema = resolvedSchema || schema
  const schemaFields = displaySchema ? Object.entries(displaySchema.fields) : []
  const fieldsTitle = currentPath ? currentPath.slice(0, -1) : gettext('Fields')

  return (
    <div className="card space-y-3">
      {/* Schema-based field suggestions */}
      {schemaFields.length > 0 && (
        <section>
          <h3 className="divider text-sm font-semibold text-base-content/70">
            {fieldsTitle}
          </h3>
          <ul className="space-y-1">
            {schemaFields.map(([name, field]) => {
              const isRelationship = field.type === 'relationship'
              const hasValues = field.values?.length
              return (
                <li key={name}>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      className="w-full btn btn-sm btn-ghost justify-start gap-2"
                      onClick={() => {
                        if (hasValues) {
                          setExpandedField(expandedField === name ? null : name)
                        } else {
                          appendFieldToQuery(view, name, isRelationship, currentPath)
                        }
                      }}
                    >
                      <span className="font-mono text-primary">{name}</span>
                      <span className="text-xs text-base-content/50">{field.type}</span>
                      {isRelationship && (
                        <span className="text-xs text-base-content/40">→</span>
                      )}
                      {hasValues && (
                        <span className="text-xs text-base-content/40 ml-auto">
                          {expandedField === name ? '▼' : '▶'}
                        </span>
                      )}
                    </button>
                    {expandedField === name && field.values && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {field.values.map((v) => (
                          <li key={v}>
                            <button
                              type="button"
                              className="w-full btn btn-xs btn-ghost justify-start"
                              onClick={() => setFieldPredicate(view, name, `"${v}"`, currentPath)}
                            >
                              <span className="font-mono text-secondary">{v}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* Curated suggestions */}
      <section>
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
      </section>

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
