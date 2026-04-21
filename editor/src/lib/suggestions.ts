import { EditorState } from '@codemirror/state'
import { syntaxTree } from '@codemirror/language'
import { Schema, SchemaCache, FieldDefinition, resolvePathSchema } from '../editor/completion'
import { closestCondition } from './syntax'

// Types

export type SuggestionItem =
  | { type: 'field'; name: string; fieldType: string; suffix: ':' | '.'; isRelationship: boolean }
  | { type: 'field-negated'; name: string; fieldType: string }
  | { type: 'field-value'; name: string; value: string }
  | { type: 'field-value-negated'; name: string; value: string }

export interface SuggestionsResult {
  items: SuggestionItem[]
  // Debug info
  debug: {
    partialField: string
    currentPath: string
    inValue: boolean
    currentFieldName: string | null
    schemaFieldCount: number
    filteredFieldCount: number
  }
}

export interface SuggestionsInput {
  state: EditorState
  baseSchema: Schema | null
  resolvedSchema: Schema | null
  singleMatchRelationshipSchema: Schema | null  // Resolved schema for single-match relationship expansion
}

// Helper functions

export function getCurrentRelationshipPath(state: EditorState): string {
  const cursorPos = state.selection.main.anchor
  const content = state.doc.sliceString(0, cursorPos)

  // Match relationship path: "author." or "author.publisher." or "author.n" (partial)
  // We want to extract the complete path segments (everything up to and including the last dot)
  const match = content.match(/(\w+\.)+\w*$/)
  if (!match) return ''

  // Extract just the path portion (everything up to and including the last dot)
  const fullMatch = match[0]
  const lastDotIndex = fullMatch.lastIndexOf('.')
  return lastDotIndex >= 0 ? fullMatch.slice(0, lastDotIndex + 1) : ''
}

export function getValuePosition(state: EditorState): { inValue: boolean; fieldName: string | null } {
  const tree = syntaxTree(state)
  const cursorPos = state.selection.main.anchor
  const node = tree.resolveInner(cursorPos, -1)
  const condition = closestCondition(node)

  if (!condition) {
    return { inValue: false, fieldName: null }
  }

  const colonNode = condition.getChild(':')
  const fieldNode = condition.getChild('Field')

  if (colonNode && cursorPos >= colonNode.to) {
    const fieldName = fieldNode ? state.doc.sliceString(fieldNode.from, fieldNode.to) : null
    return { inValue: true, fieldName }
  }

  return { inValue: false, fieldName: null }
}

export function getPartialFieldText(state: EditorState): string {
  const cursorPos = state.selection.main.anchor
  const content = state.doc.sliceString(0, cursorPos)

  // Check if we're in value position (content before cursor contains field:)
  // Match: word chars (with optional dots) followed by colon
  if (/[\w.]+:[^:]*$/.test(content)) {
    return '' // In value position
  }

  // Match partial field being typed (word chars after last space or start)
  // This captures: "author.na" → "na", "pri" → "pri", "author." → ""
  const match = content.match(/(?:^|[\s(])(\w+(?:\.\w*)?)$/)
  if (!match) return ''

  const fieldPath = match[1]
  const lastDotIndex = fieldPath.lastIndexOf('.')

  // Return text after the last dot, or the whole thing if no dot
  return lastDotIndex >= 0 ? fieldPath.slice(lastDotIndex + 1) : fieldPath
}

/**
 * Pure function to compute suggestions based on editor state and schemas
 */
export function getSuggestions(input: SuggestionsInput): SuggestionsResult {
  const { state, baseSchema, resolvedSchema, singleMatchRelationshipSchema } = input

  const currentPath = getCurrentRelationshipPath(state)
  const { inValue, fieldName: currentFieldName } = getValuePosition(state)
  const partialField = getPartialFieldText(state)

  // Use resolved schema if available, otherwise base schema
  const displaySchema = resolvedSchema || baseSchema
  const schemaFields = displaySchema
    ? Object.entries(displaySchema.fields)
    : []

  // Filter fields based on partial text
  const filteredFields = partialField
    ? schemaFields.filter(([name]) =>
        name.toLowerCase().startsWith(partialField.toLowerCase())
      )
    : schemaFields

  const items: SuggestionItem[] = []

  // In value position - no field suggestions (handled elsewhere)
  if (inValue) {
    return {
      items: [],
      debug: {
        partialField,
        currentPath,
        inValue,
        currentFieldName,
        schemaFieldCount: schemaFields.length,
        filteredFieldCount: filteredFields.length,
      },
    }
  }

  // Single match - show expanded view
  if (partialField && filteredFields.length === 1) {
    const [fieldName, field] = filteredFields[0]
    const isRelationship = field.type === 'relationship'
    const fullName = `${currentPath}${fieldName}`

    // If it's a relationship with a resolved schema, show the relationship's fields
    if (isRelationship && singleMatchRelationshipSchema) {
      for (const [nestedFieldName, fieldDef] of Object.entries(singleMatchRelationshipSchema.fields)) {
        const isNestedRelationship = fieldDef.type === 'relationship'
        items.push({
          type: 'field',
          name: `${fullName}.${nestedFieldName}`,
          fieldType: fieldDef.type,
          suffix: isNestedRelationship ? '.' : ':',
          isRelationship: isNestedRelationship,
        })
      }
    } else {
      // Primary field
      items.push({
        type: 'field',
        name: fullName,
        fieldType: field.type,
        suffix: isRelationship ? '.' : ':',
        isRelationship,
      })

      // Negated field (not for relationships)
      if (!isRelationship) {
        items.push({
          type: 'field-negated',
          name: fullName,
          fieldType: field.type,
        })
      }

      // Values for keyword fields
      if (field.values?.length) {
        for (const value of field.values) {
          items.push({ type: 'field-value', name: fullName, value })
          items.push({ type: 'field-value-negated', name: fullName, value })
        }
      }
    }
  } else {
    // Multiple matches or no partial - show all filtered fields
    for (const [fieldName, field] of filteredFields) {
      const isRelationship = field.type === 'relationship'
      const fullName = `${currentPath}${fieldName}`
      items.push({
        type: 'field',
        name: fullName,
        fieldType: field.type,
        suffix: isRelationship ? '.' : ':',
        isRelationship,
      })
    }
  }

  return {
    items,
    debug: {
      partialField,
      currentPath,
      inValue,
      currentFieldName,
      schemaFieldCount: schemaFields.length,
      filteredFieldCount: filteredFields.length,
    },
  }
}

/**
 * Async version that resolves relationship paths
 */
export async function getSuggestionsAsync(
  state: EditorState,
  baseSchema: Schema | null,
  schemaCache: SchemaCache | null
): Promise<SuggestionsResult> {
  const currentPath = getCurrentRelationshipPath(state)
  const pathSegments = currentPath ? currentPath.slice(0, -1).split('.') : []

  let resolvedSchema: Schema | null = null

  if (pathSegments.length > 0 && baseSchema && schemaCache) {
    try {
      resolvedSchema = await resolvePathSchema(pathSegments, baseSchema, schemaCache)
    } catch {
      resolvedSchema = null
    }
  }

  // Check if we'll have a single relationship match that needs expansion
  let singleMatchRelationshipSchema: Schema | null = null

  const partialField = getPartialFieldText(state)
  if (partialField && baseSchema && schemaCache) {
    const displaySchema = resolvedSchema || baseSchema
    const filtered = Object.entries(displaySchema.fields).filter(([name]) =>
      name.toLowerCase().startsWith(partialField.toLowerCase())
    )

    if (filtered.length === 1) {
      const [, field] = filtered[0]
      if (field.type === 'relationship' && field.schema) {
        try {
          singleMatchRelationshipSchema = await schemaCache.get(field.schema)
        } catch {
          singleMatchRelationshipSchema = null
        }
      }
    }
  }

  return getSuggestions({ state, baseSchema, resolvedSchema, singleMatchRelationshipSchema })
}
