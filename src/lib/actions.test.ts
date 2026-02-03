import { describe, test, expect } from 'vitest'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { parser } from '../dequel-lang/parser'
import { applyAction, ActionContext, SuggestionAction } from './actions'
import { closestCondition } from './syntax'
import { negate, disable } from './transforms'

/**
 * Helper to build an ActionContext from a cursor-marked input string.
 */
const buildContext = (inputWithCursor: string): { ctx: ActionContext; input: string } => {
  const cursorPos = inputWithCursor.indexOf('|')
  const input = inputWithCursor.replace('|', '')

  const tree = parser.parse(input)
  const node = tree.resolveInner(cursorPos, -1)

  const state = EditorState.create({ doc: input })
  const mockView = { state } as EditorView

  const condition = closestCondition(node)
  const fieldNode = condition?.getChild('Field')
  const field = fieldNode ? input.slice(fieldNode.from, fieldNode.to) : null

  return {
    ctx: {
      view: mockView,
      state,
      node,
      field,
      condition,
    },
    input,
  }
}

/**
 * Apply an action and return the resulting document text.
 */
const applyAndGetResult = (inputWithCursor: string, action: SuggestionAction): string => {
  const { ctx, input } = buildContext(inputWithCursor)
  const transaction = applyAction(ctx, action)

  if (!transaction.changes) return input

  const newState = ctx.state.update(transaction).state
  return newState.doc.toString()
}

describe('transform actions', () => {
  describe('negateCondition (via negate transform)', () => {
    const negateAction: SuggestionAction = {
      type: 'transform',
      id: 'negate',
      label: '-',
      transform: negate,
    }

    test('adds "-" prefix to regular Condition', () => {
      const result = applyAndGetResult('title:|foo', negateAction)
      expect(result).toBe('-title:foo')
    })

    test('removes "-" prefix from ExcludeCondition', () => {
      const result = applyAndGetResult('-title:|foo', negateAction)
      expect(result).toBe('title:foo')
    })

    test('replaces "!" with "-" on IgnoredCondition', () => {
      const result = applyAndGetResult('!title:|foo', negateAction)
      expect(result).toBe('-title:foo')
    })

    test('works when cursor is on field', () => {
      const result = applyAndGetResult('tit|le:foo', negateAction)
      expect(result).toBe('-title:foo')
    })

    test('works with multiple conditions - first condition', () => {
      const result = applyAndGetResult('ti|tle:foo region:bar', negateAction)
      expect(result).toBe('-title:foo region:bar')
    })

    test('works with multiple conditions - second condition', () => {
      const result = applyAndGetResult('title:foo reg|ion:bar', negateAction)
      expect(result).toBe('title:foo -region:bar')
    })

    test('works when cursor is right after prefix -|foo:bar', () => {
      const result = applyAndGetResult('-|foo:bar', negateAction)
      expect(result).toBe('foo:bar')
    })

    test('works when cursor is right after prefix !|foo:bar', () => {
      const result = applyAndGetResult('!|foo:bar', negateAction)
      expect(result).toBe('-foo:bar')
    })
  })

  describe('disableCondition (via disable transform)', () => {
    const disableAction: SuggestionAction = {
      type: 'transform',
      id: 'disable',
      label: '!',
      transform: disable,
    }

    test('adds "!" prefix to regular Condition', () => {
      const result = applyAndGetResult('title:|foo', disableAction)
      expect(result).toBe('!title:foo')
    })

    test('removes "!" prefix from IgnoredCondition', () => {
      const result = applyAndGetResult('!title:|foo', disableAction)
      expect(result).toBe('title:foo')
    })

    test('replaces "-" with "!" on ExcludeCondition', () => {
      const result = applyAndGetResult('-title:|foo', disableAction)
      expect(result).toBe('!title:foo')
    })

    test('works when cursor is on field', () => {
      const result = applyAndGetResult('tit|le:foo', disableAction)
      expect(result).toBe('!title:foo')
    })

    test('works with multiple conditions - first condition', () => {
      const result = applyAndGetResult('ti|tle:foo region:bar', disableAction)
      expect(result).toBe('!title:foo region:bar')
    })

    test('works with multiple conditions - second condition', () => {
      const result = applyAndGetResult('title:foo reg|ion:bar', disableAction)
      expect(result).toBe('title:foo !region:bar')
    })

    test('works when cursor is right after prefix !|foo:bar', () => {
      const result = applyAndGetResult('!|foo:bar', disableAction)
      expect(result).toBe('foo:bar')
    })

    test('works when cursor is right after prefix -|foo:bar', () => {
      const result = applyAndGetResult('-|foo:bar', disableAction)
      expect(result).toBe('!foo:bar')
    })
  })
})

describe('insert actions', () => {
  const makeInsertAction = (value: string): SuggestionAction => ({
    type: 'insert',
    id: 'test-insert',
    label: value,
    insert: () => value,
    position: 'cursor',
  })

  test('inserts at start of value node when cursor in value', () => {
    const result = applyAndGetResult('title:foo|', makeInsertAction('bar'))
    expect(result).toBe('title:barfoo')
  })

  test('inserts at empty document', () => {
    const result = applyAndGetResult('|', makeInsertAction('title:foo'))
    expect(result).toBe('title:foo')
  })

  test('inserts at Query start when cursor in whitespace', () => {
    const result = applyAndGetResult('title:foo |region:bar', makeInsertAction('status:active '))
    expect(result).toBe('status:active title:foo region:bar')
  })

  test('inserts at start of field node when cursor on field', () => {
    const result = applyAndGetResult('ti|tle:foo', makeInsertAction('X'))
    expect(result).toBe('Xtitle:foo')
  })

  test('inserts at field start when cursor before colon', () => {
    const result = applyAndGetResult('title|:foo', makeInsertAction('X'))
    expect(result).toBe('Xtitle:foo')
  })
})

describe('append actions', () => {
  const makeAppendAction = (value: string): SuggestionAction => ({
    type: 'append',
    id: 'test-append',
    label: value,
    value,
  })

  test('adds space prefix when char after node is not whitespace', () => {
    const result = applyAndGetResult('title:|foo', makeAppendAction('region:bar'))
    expect(result).toBe('title:foo region:bar')
  })

  test('no space prefix when at end of document', () => {
    const result = applyAndGetResult('title:foo|', makeAppendAction('region:bar'))
    expect(result).toBe('title:fooregion:bar')
  })

  test('no space prefix when space exists after node', () => {
    const result = applyAndGetResult('title:foo |', makeAppendAction('region:bar'))
    expect(result).toBe('title:foo region:bar')
  })

  test('appends to query end regardless of cursor position', () => {
    const result = applyAndGetResult('tit|le:foo', makeAppendAction('region:bar'))
    expect(result).toBe('title:foo region:bar')
  })

  test('appends after all conditions in query', () => {
    const result = applyAndGetResult('title:|foo status:active', makeAppendAction('region:bar'))
    expect(result).toBe('title:foo status:active region:bar')
  })
})

describe('insert at end (appendDoc replacement)', () => {
  const makeInsertEndAction = (value: string): SuggestionAction => ({
    type: 'insert',
    id: 'test-insert-end',
    label: value,
    insert: () => value,
    position: 'end',
  })

  test('appends to end of document', () => {
    const result = applyAndGetResult('title:|foo', makeInsertEndAction(' region:bar'))
    expect(result).toBe('title:foo region:bar')
  })

  test('appends to empty document', () => {
    const result = applyAndGetResult('|', makeInsertEndAction('title:foo'))
    expect(result).toBe('title:foo')
  })

  test('cursor position independent - appends at doc end', () => {
    const result = applyAndGetResult('ti|tle:foo', makeInsertEndAction(' region:bar'))
    expect(result).toBe('title:foo region:bar')
  })

  test('appends at document end regardless of cursor position', () => {
    const result = applyAndGetResult('title:foo |status:active', makeInsertEndAction(' region:bar'))
    expect(result).toBe('title:foo status:active region:bar')
  })
})

describe('setMatcher actions', () => {
  const makeSetMatcherAction = (value: string): SuggestionAction => ({
    type: 'setMatcher',
    id: 'test-set-matcher',
    label: value,
    value,
  })

  test('replaces entire matcher when cursor in value', () => {
    const result = applyAndGetResult('title:fo|o', makeSetMatcherAction('bar|'))
    expect(result).toBe('title:bar')
  })

  test('replaces entire matcher when cursor at end of value', () => {
    const result = applyAndGetResult('title:foo|', makeSetMatcherAction('bar|'))
    expect(result).toBe('title:bar')
  })

  test('replaces longer matcher with shorter value', () => {
    const result = applyAndGetResult('title:foobar|', makeSetMatcherAction('foo|'))
    expect(result).toBe('title:foo')
  })

  test('replaces colon when cursor on colon (no matcher found)', () => {
    const result = applyAndGetResult('title:|foo', makeSetMatcherAction('bar|'))
    expect(result).toBe('title:bar')
  })

  test('replaces colon at empty matcher position', () => {
    const result = applyAndGetResult('title:|', makeSetMatcherAction('foo|'))
    expect(result).toBe('title:foo')
  })

  test('replaces with command value', () => {
    const result = applyAndGetResult('created_at:v|alue', makeSetMatcherAction('after(|)'))
    expect(result).toBe('created_at:after()')
  })
})

describe('legacy behavior compatibility', () => {
  // These tests verify that replaceCondition behavior can be achieved
  // through the new transform system if needed

  test('condition can be fully replaced via transform', () => {
    const replaceWithAction: SuggestionAction = {
      type: 'transform',
      id: 'replace',
      label: 'Replace',
        transform: () => ({
        prefix: '',
        field: 'region',
        matcher: 'bar',
      }),
    }

    const result = applyAndGetResult('title:|foo', replaceWithAction)
    expect(result).toBe('region:bar')
  })
})
