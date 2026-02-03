import { describe, test, expect } from 'vitest'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { parser } from '../../dequel-lang/parser'
import { createTransaction } from './createTransaction'
import { SuggestionAction } from './suggestions'

const applyAction = (inputWithCursor: string, action: SuggestionAction): string => {
  const cursorPos = inputWithCursor.indexOf('|')
  const input = inputWithCursor.replace('|', '')

  const tree = parser.parse(input)
  const node = tree.resolveInner(cursorPos, -1)

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
    test('inserts at start of value node when cursor in value', () => {
      const result = applyAction('title:foo|', { type: 'insert', value: 'bar' })
      expect(result).toBe('title:barfoo')
    })

    test('inserts at empty document', () => {
      const result = applyAction('|', { type: 'insert', value: 'title:foo' })
      expect(result).toBe('title:foo')
    })

    test('inserts at Query start when cursor in whitespace', () => {
      const result = applyAction('title:foo |region:bar', { type: 'insert', value: 'status:active ' })
      expect(result).toBe('status:active title:foo region:bar')
    })

    test('inserts at start of field node when cursor on field', () => {
      const result = applyAction('ti|tle:foo', { type: 'insert', value: 'X' })
      expect(result).toBe('Xtitle:foo')
    })

    test('inserts at field start when cursor before colon', () => {
      const result = applyAction('title|:foo', { type: 'insert', value: 'X' })
      expect(result).toBe('Xtitle:foo')
    })
  })

  describe('append', () => {
    test('adds space prefix when char after node is not whitespace', () => {
      const result = applyAction('title:|foo', { type: 'append', value: 'region:bar' })
      expect(result).toBe('title:foo region:bar')
    })

    test('no space prefix when at end of document', () => {
      const result = applyAction('title:foo|', { type: 'append', value: 'region:bar' })
      expect(result).toBe('title:fooregion:bar')
    })

    test('no space prefix when space exists after node', () => {
      const result = applyAction('title:foo |', { type: 'append', value: 'region:bar' })
      expect(result).toBe('title:foo region:bar')
    })

    test('appends to query end regardless of cursor position', () => {
      const result = applyAction('tit|le:foo', { type: 'append', value: 'region:bar' })
      expect(result).toBe('title:foo region:bar')
    })

    test('appends after all conditions in query', () => {
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

    test('cursor position independent - appends at doc end', () => {
      const result = applyAction('ti|tle:foo', { type: 'appendDoc', value: ' region:bar' })
      expect(result).toBe('title:foo region:bar')
    })

    test('appends at document end regardless of cursor position', () => {
      const result = applyAction('title:foo |status:active', { type: 'appendDoc', value: ' region:bar' })
      expect(result).toBe('title:foo status:active region:bar')
    })
  })

  describe('setMatcher', () => {
    test('replaces entire matcher when cursor in value', () => {
      const result = applyAction('title:fo|o', { type: 'setMatcher', value: 'bar|' })
      expect(result).toBe('title:bar')
    })

    test('replaces entire matcher when cursor at end of value', () => {
      const result = applyAction('title:foo|', { type: 'setMatcher', value: 'bar|' })
      expect(result).toBe('title:bar')
    })

    test('replaces longer matcher with shorter value', () => {
      const result = applyAction('title:foobar|', { type: 'setMatcher', value: 'foo|' })
      expect(result).toBe('title:foo')
    })

    test('replaces colon when cursor on colon (no matcher found)', () => {
      const result = applyAction('title:|foo', { type: 'setMatcher', value: 'bar|' })
      expect(result).toBe('title:bar')
    })

    test('replaces colon at empty matcher position', () => {
      const result = applyAction('title:|', { type: 'setMatcher', value: 'foo|' })
      expect(result).toBe('title:foo')
    })

    test('replaces with command value', () => {
      const result = applyAction('created_at:v|alue', { type: 'setMatcher', value: 'after(|)' })
      expect(result).toBe('created_at:after()')
    })
  })

  describe('replaceCondition', () => {
    test('replaces entire condition', () => {
      const result = applyAction('title:|foo', { type: 'replaceCondition', value: 'region:bar' })
      expect(result).toBe('region:bar')
    })

    test('replaces first condition in multi-condition query', () => {
      const result = applyAction('title:|foo status:active', { type: 'replaceCondition', value: 'region:bar' })
      expect(result).toBe('region:bar status:active')
    })

    test('replaces second condition in multi-condition query', () => {
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

    test('throws when used on ExcludeCondition', () => {
      expect(() => applyAction('-title:|foo', { type: 'replaceCondition', value: 'region:bar' }))
        .toThrow('no condition found')
    })

    test('throws when used on IgnoredCondition', () => {
      expect(() => applyAction('!title:|foo', { type: 'replaceCondition', value: 'region:bar' }))
        .toThrow('no condition found')
    })
  })
})
