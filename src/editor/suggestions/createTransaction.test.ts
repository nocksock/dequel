import { describe, test, expect } from 'vitest'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { parser } from '../../dequel-lang/parser'
import { createTransaction } from './createTransaction'
import { SuggestionAction } from './suggestions'

// Helper to apply an action and return the resulting text
const applyAction = (inputWithCursor: string, action: SuggestionAction): string => {
  const cursorPos = inputWithCursor.indexOf('|')
  const input = inputWithCursor.replace('|', '')

  const tree = parser.parse(input)
  const node = tree.resolveInner(cursorPos, -1)

  // Create a minimal mock view with just the state
  const state = EditorState.create({ doc: input })
  const mockView = { state } as EditorView

  const transaction = createTransaction({
    view: mockView,
    node,
    field: null,
    action,
  })

  if (!transaction.changes) return input

  const newState = state.update(transaction).state
  return newState.doc.toString()
}

describe('createTransaction', () => {
  describe('negateCondition', () => {
    test('adds "-" prefix to regular Condition', () => {
      const result = applyAction('title:|foo', { type: 'negateCondition', value: '' })
      expect(result).toBe('-title:foo')
    })

    test('removes "-" prefix from ExcludeCondition', () => {
      const result = applyAction('-title:|foo', { type: 'negateCondition', value: '' })
      expect(result).toBe('title:foo')
    })

    test('replaces "!" with "-" on IgnoredCondition', () => {
      const result = applyAction('!title:|foo', { type: 'negateCondition', value: '' })
      expect(result).toBe('-title:foo')
    })

    test('works when cursor is on field', () => {
      const result = applyAction('tit|le:foo', { type: 'negateCondition', value: '' })
      expect(result).toBe('-title:foo')
    })

    test('works with multiple conditions - first condition', () => {
      const result = applyAction('ti|tle:foo region:bar', { type: 'negateCondition', value: '' })
      expect(result).toBe('-title:foo region:bar')
    })

    test('works with multiple conditions - second condition', () => {
      const result = applyAction('title:foo reg|ion:bar', { type: 'negateCondition', value: '' })
      expect(result).toBe('title:foo -region:bar')
    })

    test('works when cursor is right after prefix -|foo:bar', () => {
      const result = applyAction('-|foo:bar', { type: 'negateCondition', value: '' })
      expect(result).toBe('foo:bar')
    })

    test('works when cursor is right after prefix !|foo:bar', () => {
      const result = applyAction('!|foo:bar', { type: 'negateCondition', value: '' })
      expect(result).toBe('-foo:bar')
    })
  })

  describe('disableCondition', () => {
    test('adds "!" prefix to regular Condition', () => {
      const result = applyAction('title:|foo', { type: 'disableCondition', value: '' })
      expect(result).toBe('!title:foo')
    })

    test('removes "!" prefix from IgnoredCondition', () => {
      const result = applyAction('!title:|foo', { type: 'disableCondition', value: '' })
      expect(result).toBe('title:foo')
    })

    test('replaces "-" with "!" on ExcludeCondition', () => {
      const result = applyAction('-title:|foo', { type: 'disableCondition', value: '' })
      expect(result).toBe('!title:foo')
    })

    test('works when cursor is on field', () => {
      const result = applyAction('tit|le:foo', { type: 'disableCondition', value: '' })
      expect(result).toBe('!title:foo')
    })

    test('works with multiple conditions - first condition', () => {
      const result = applyAction('ti|tle:foo region:bar', { type: 'disableCondition', value: '' })
      expect(result).toBe('!title:foo region:bar')
    })

    test('works with multiple conditions - second condition', () => {
      const result = applyAction('title:foo reg|ion:bar', { type: 'disableCondition', value: '' })
      expect(result).toBe('title:foo !region:bar')
    })

    test('works when cursor is right after prefix !|foo:bar', () => {
      const result = applyAction('!|foo:bar', { type: 'disableCondition', value: '' })
      expect(result).toBe('foo:bar')
    })

    test('works when cursor is right after prefix -|foo:bar', () => {
      const result = applyAction('-|foo:bar', { type: 'disableCondition', value: '' })
      expect(result).toBe('!foo:bar')
    })
  })
})
