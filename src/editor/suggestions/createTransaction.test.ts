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

  describe('insert', () => {
    test('inserts value at cursor position', () => {
      const result = applyAction('title:|', { type: 'insert', value: 'foo' })
      expect(result).toBe('title:foo')
    })

    test('inserts at beginning of document', () => {
      const result = applyAction('|', { type: 'insert', value: 'title:foo' })
      expect(result).toBe('title:foo')
    })

    test('inserts in middle of query', () => {
      const result = applyAction('title:foo |region:bar', { type: 'insert', value: 'status:active ' })
      expect(result).toBe('title:foo status:active region:bar')
    })

    test('inserts at node boundary', () => {
      const result = applyAction('title:foo| region:bar', { type: 'insert', value: ' status:active' })
      expect(result).toBe('title:foo status:active region:bar')
    })
  })

  describe('append', () => {
    test('appends to end of query', () => {
      const result = applyAction('title:|foo', { type: 'append', value: 'region:bar' })
      expect(result).toBe('title:foo region:bar')
    })

    test('adds space prefix when needed', () => {
      const result = applyAction('title:foo|', { type: 'append', value: 'region:bar' })
      expect(result).toBe('title:foo region:bar')
    })

    test('no double space when space already exists', () => {
      const result = applyAction('title:foo |', { type: 'append', value: 'region:bar' })
      expect(result).toBe('title:foo region:bar')
    })

    test('appends when cursor is on field', () => {
      const result = applyAction('tit|le:foo', { type: 'append', value: 'region:bar' })
      expect(result).toBe('title:foo region:bar')
    })

    test('appends with multiple conditions', () => {
      const result = applyAction('title:|foo status:active', { type: 'append', value: 'region:bar' })
      expect(result).toBe('title:foo status:active region:bar')
    })
  })

  describe('appendDoc', () => {
    test('appends to end of document', () => {
      const result = applyAction('title:|foo', { type: 'appendDoc', value: ' region:bar' })
      expect(result).toBe('title:foo region:bar')
    })

    test('appends to empty document', () => {
      const result = applyAction('|', { type: 'appendDoc', value: 'title:foo' })
      expect(result).toBe('title:foo')
    })

    test('cursor position independent', () => {
      // Should append to end regardless of cursor position
      const result = applyAction('ti|tle:foo', { type: 'appendDoc', value: ' region:bar' })
      expect(result).toBe('title:foo region:bar')
    })

    test('appends at document end regardless of cursor', () => {
      const result = applyAction('title:foo |status:active', { type: 'appendDoc', value: ' region:bar' })
      expect(result).toBe('title:foo status:active region:bar')
    })
  })

  describe('setMatcher', () => {
    test('replaces matcher value', () => {
      const result = applyAction('title:|foo', { type: 'setMatcher', value: 'bar|' })
      expect(result).toBe('title:bar')
    })

    test('replaces with command', () => {
      const result = applyAction('created_at:|value', { type: 'setMatcher', value: 'after(|)' })
      expect(result).toBe('created_at:after()')
    })

    test('replaces when cursor in middle of value', () => {
      const result = applyAction('title:fo|o', { type: 'setMatcher', value: 'bar|' })
      expect(result).toBe('title:bar')
    })

    test('replaces empty matcher', () => {
      const result = applyAction('title:|', { type: 'setMatcher', value: 'foo|' })
      expect(result).toBe('title:foo')
    })

    test('replaces with complex command', () => {
      const result = applyAction('date:|old', { type: 'setMatcher', value: 'between(2024,|,2025)' })
      expect(result).toBe('date:between(2024,,2025)')
    })
  })

  describe('replaceCondition', () => {
    test('replaces entire condition', () => {
      const result = applyAction('title:|foo', { type: 'replaceCondition', value: 'region:bar' })
      expect(result).toBe('region:bar')
    })

    test('replaces in multi-condition query - first condition', () => {
      const result = applyAction('title:|foo status:active', { type: 'replaceCondition', value: 'region:bar' })
      expect(result).toBe('region:bar status:active')
    })

    test('replaces in multi-condition query - second condition', () => {
      const result = applyAction('title:foo status:|active', { type: 'replaceCondition', value: 'region:bar' })
      expect(result).toBe('title:foo region:bar')
    })

    test('replaces when cursor on field', () => {
      const result = applyAction('tit|le:foo', { type: 'replaceCondition', value: 'region:bar' })
      expect(result).toBe('region:bar')
    })

    test('replaces with longer condition', () => {
      const result = applyAction('a:|b', { type: 'replaceCondition', value: 'longer_field:longer_value' })
      expect(result).toBe('longer_field:longer_value')
    })

    test('replaces with shorter condition', () => {
      const result = applyAction('longer_field:|longer_value', { type: 'replaceCondition', value: 'a:b' })
      expect(result).toBe('a:b')
    })
  })
})
