import { SyntaxNode } from '@lezer/common'
import { EditorState, TransactionSpec } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { negate, disable } from './transforms'
import {
  parseCondition,
  serializeCondition,
  closestCondition,
  closest,
  isWhitespace,
  ConditionParts,
  Transform,
} from './syntax'
import { SuggestionSchemaField } from '../editor/suggestions/suggestions'
import { getPredicateActions, FieldType } from './predicates'

// Types

export interface ActionContext {
  view: EditorView
  state: EditorState
  node: SyntaxNode | null
  field: string | null
  condition: SyntaxNode | null
}

export interface TransformAction {
  type: 'transform'
  id: string
  label: string
  description?: string
  transform: Transform
  isApplicable?: (parts: ConditionParts, ctx: ActionContext) => boolean
}

export interface InsertAction {
  type: 'insert'
  id: string
  label: string
  description?: string
  insert: (ctx: ActionContext) => string
  position: 'cursor' | 'end'
  isApplicable?: (ctx: ActionContext) => boolean
}

export interface AppendAction {
  type: 'append'
  id: string
  label: string
  description?: string
  value: string
  isApplicable?: (ctx: ActionContext) => boolean
}

export interface SetPredicateAction {
  type: 'setPredicate'
  id: string
  label: string
  description?: string
  value: string
  isApplicable?: (ctx: ActionContext) => boolean
}

export type SuggestionAction = TransformAction | InsertAction | AppendAction | SetPredicateAction

// Apply functions

/**
 * Apply a transform to the current condition.
 * Returns a transaction that replaces the condition with the transformed version.
 */
export function applyTransform(ctx: ActionContext, transform: Transform): TransactionSpec {
  if (!ctx.condition) return {}

  const parts = parseCondition(ctx.condition, ctx.state.doc)
  const newParts = transform(parts)
  const newText = serializeCondition(newParts)

  return {
    changes: {
      from: ctx.condition.from,
      to: ctx.condition.to,
      insert: newText,
    },
  }
}

/**
 * Apply an insert action.
 */
export function applyInsert(ctx: ActionContext, text: string, position: 'cursor' | 'end'): TransactionSpec {
  const pos = position === 'cursor' ? ctx.node?.from ?? 0 : ctx.state.doc.length
  return {
    selection: { anchor: pos + text.length },
    changes: { from: pos, insert: text },
  }
}

/**
 * Apply an append action.
 * Appends to the end of the current query with appropriate spacing.
 */
export function applyAppend(ctx: ActionContext, value: string): TransactionSpec {
  if (!ctx.node) return {}

  const query = closest('Query', ctx.node) || ctx.node
  const charAt = ctx.state.sliceDoc(ctx.node.to, ctx.node.to + 1)
  const prefix = isWhitespace(charAt) ? '' : ' '
  const insertValue = prefix + value

  return {
    selection: { anchor: query.to + insertValue.length },
    changes: ctx.state.changes({
      from: query.to,
      insert: insertValue,
    }),
  }
}

/**
 * Apply an appendDoc action.
 * Appends to the end of the document.
 */
export function applyAppendDoc(ctx: ActionContext, value: string): TransactionSpec {
  return {
    selection: { anchor: ctx.state.doc.length + value.length },
    changes: ctx.state.changes({
      from: ctx.state.doc.length,
      insert: value,
    }),
  }
}

/**
 * Apply a setPredicate action.
 * The value can contain '|' to indicate cursor position.
 */
export function applySetPredicate(ctx: ActionContext, value: string): TransactionSpec {
  if (!ctx.node) return {}

  // Find the Predicate node - either as an ancestor, or as a sibling via parent Condition
  const predicate = closest('Predicate', ctx.node) || closestCondition(ctx.node)?.getChild('Predicate')

  const cleanValue = value.replace('|', '')
  const cursorOffset = value.indexOf('|')

  // If no Predicate found (empty value after colon), insert at end of condition
  if (!predicate) {
    const condition = closestCondition(ctx.node)
    const insertPos = condition?.to ?? ctx.node.to
    return {
      selection: { anchor: insertPos + (cursorOffset >= 0 ? cursorOffset : cleanValue.length) },
      changes: ctx.state.changes({
        from: insertPos,
        insert: cleanValue,
      }),
    }
  }

  return {
    selection: {
      anchor: predicate.from + (cursorOffset >= 0 ? cursorOffset : cleanValue.length),
    },
    changes: ctx.state.changes({
      from: predicate.from,
      to: predicate.to,
      insert: cleanValue,
    }),
  }
}

/**
 * Apply any suggestion action.
 * This is the main entry point for applying actions.
 */
export function applyAction(ctx: ActionContext, action: SuggestionAction): TransactionSpec {
  switch (action.type) {
    case 'transform':
      return applyTransform(ctx, action.transform)

    case 'insert':
      return applyInsert(ctx, action.insert(ctx), action.position)

    case 'append':
      return applyAppend(ctx, action.value)

    case 'setPredicate':
      return applySetPredicate(ctx, action.value)

    default: {
      // Exhaustive check - if this errors, we're missing a case
      ;((_: never) => {})(action)
      return {}
    }
  }
}

// Action providers

function getConditionModifiers(ctx: ActionContext): SuggestionAction[] {
  if (!ctx.condition) return []

  const isExcluded = ctx.condition.name === 'ExcludeCondition'
  const isIgnored = ctx.condition.name === 'IgnoredCondition'

  return [
    {
      type: 'transform',
      id: 'negate',
      label: '-',
      description: isExcluded ? 'Remove negation' : 'Exclude from results',
      transform: negate,
    },
    {
      type: 'transform',
      id: 'disable',
      label: '!',
      description: isIgnored ? 'Enable condition' : 'Disable condition',
      transform: disable,
    },
  ]
}

function getFieldValues(ctx: ActionContext): SuggestionAction[] {
  const schema = ctx.state.field(SuggestionSchemaField)
  if (!schema) return []

  const fieldKey = ctx.field ?? '*'
  const fieldConfig = schema[fieldKey] ?? schema['*']
  if (!fieldConfig) return []

  const actions: SuggestionAction[] = []

  if (fieldConfig.type) {
    actions.push(...getPredicateActions(fieldConfig.type as FieldType))
  }

  if (fieldConfig.values) {
    for (const v of fieldConfig.values) {
      switch (v.action.type) {
        case 'setPredicate':
          actions.push({
            type: 'setPredicate',
            id: `field-value-${v.label}`,
            label: v.label,
            description: v.description,
            value: v.action.value,
          })
          break

        case 'append':
          actions.push({
            type: 'append',
            id: `field-value-${v.label}`,
            label: v.label,
            description: v.description,
            value: v.action.value,
          })
          break

        case 'insert':
          actions.push({
            type: 'insert',
            id: `field-value-${v.label}`,
            label: v.label,
            description: v.description,
            insert: () => v.action.value,
            position: v.action.position ?? 'cursor',
          })
          break
      }
    }
  }

  return actions
}

/**
 * Get all applicable suggestion actions for the current context.
 */
export function getActions(ctx: ActionContext): SuggestionAction[] {
  const allActions = [...getFieldValues(ctx), ...getConditionModifiers(ctx)]

  return allActions.filter((action) => {
    if (action.type === 'transform') {
      if (!ctx.condition) return false
      const parts = parseCondition(ctx.condition, ctx.state.doc)
      return action.isApplicable?.(parts, ctx) ?? true
    } else {
      return action.isApplicable?.(ctx) ?? true
    }
  })
}
