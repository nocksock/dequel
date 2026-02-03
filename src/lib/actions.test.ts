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
const buildContext = (inputWithCursor: string): { ctx: ActionContext; input: string; cursorPos: number } => {
  const cursorPos = inputWithCursor.indexOf('|')
  const input = inputWithCursor.replace('|', '')

  const tree = parser.parse(input)
  const node = tree.resolveInner(cursorPos, -1)

  const state = EditorState.create({
    doc: input,
    selection: { anchor: cursorPos },
  })
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
    cursorPos,
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

/**
 * Apply an action and return result with cursor position marked.
 */
const applyAndGetResultWithCursor = (inputWithCursor: string, action: SuggestionAction): string => {
  const { ctx } = buildContext(inputWithCursor)
  const transaction = applyAction(ctx, action)

  if (!transaction.changes) return inputWithCursor

  const newState = ctx.state.update(transaction).state
  const newDoc = newState.doc.toString()
  const newCursor = newState.selection.main.anchor

  // Insert cursor marker at position
  return newDoc.slice(0, newCursor) + '|' + newDoc.slice(newCursor)
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

    describe('cursor position preservation', () => {
      test('maintains cursor in value when adding prefix', () => {
        const result = applyAndGetResultWithCursor('foo:"ba|r"', negateAction)
        expect(result).toBe('-foo:"ba|r"')
      })

      test('maintains cursor in value when removing prefix', () => {
        const result = applyAndGetResultWithCursor('-foo:"ba|r"', negateAction)
        expect(result).toBe('foo:"ba|r"')
      })

      test('maintains cursor on field when adding prefix', () => {
        const result = applyAndGetResultWithCursor('tit|le:foo', negateAction)
        expect(result).toBe('-tit|le:foo')
      })

      test('maintains cursor on field when removing prefix', () => {
        const result = applyAndGetResultWithCursor('-tit|le:foo', negateAction)
        expect(result).toBe('tit|le:foo')
      })
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

describe('setPredicate actions', () => {
  const makeSetPredicateAction = (value: string): SuggestionAction => ({
    type: 'setPredicate',
    id: 'test-set-predicate',
    label: value,
    value,
  })

  test('replaces entire predicate when cursor in value', () => {
    const result = applyAndGetResult('title:fo|o', makeSetPredicateAction('bar|'))
    expect(result).toBe('title:bar')
  })

  test('replaces entire predicate when cursor at end of value', () => {
    const result = applyAndGetResult('title:foo|', makeSetPredicateAction('bar|'))
    expect(result).toBe('title:bar')
  })

  test('replaces longer predicate with shorter value', () => {
    const result = applyAndGetResult('title:foobar|', makeSetPredicateAction('foo|'))
    expect(result).toBe('title:foo')
  })

  test('replaces colon when cursor on colon (no predicate found)', () => {
    const result = applyAndGetResult('title:|foo', makeSetPredicateAction('bar|'))
    expect(result).toBe('title:bar')
  })

  test('replaces colon at empty predicate position', () => {
    const result = applyAndGetResult('title:|', makeSetPredicateAction('foo|'))
    expect(result).toBe('title:foo')
  })

  test('replaces value with command, preserving value as arg', () => {
    const result = applyAndGetResult('created_at:v|alue', makeSetPredicateAction('after(|)'))
    expect(result).toBe('created_at:after(value)')
  })

  describe('preserves arguments when switching commands', () => {
    test('preserves string value when switching to command', () => {
      const result = applyAndGetResult('title:"fo|oo"', makeSetPredicateAction('ends_with("|")'))
      expect(result).toBe('title:ends_with("fooo")')
    })
    test('preserves string arg when switching from starts_with to ends_with', () => {
      const result = applyAndGetResult('title:starts_with("fo|oo")', makeSetPredicateAction('ends_with("|")'))
      expect(result).toBe('title:ends_with("fooo")')
    })

    test('preserves string arg when switching from contains to starts_with', () => {
      const result = applyAndGetResult('title:contains("hel|lo")', makeSetPredicateAction('starts_with("|")'))
      expect(result).toBe('title:starts_with("hello")')
    })

    test('preserves multiple args when switching commands', () => {
      const result = applyAndGetResult('date:between(2024|,2025)', makeSetPredicateAction('range(|,)'))
      expect(result).toBe('date:range(2024,2025)')
    })

    test('preserves identifier arg when switching commands', () => {
      const result = applyAndGetResult('status:one_of(acti|ve)', makeSetPredicateAction('any_of(|)'))
      expect(result).toBe('status:any_of(active)')
    })

    test('preserves identifier value when switching to command', () => {
      const result = applyAndGetResult('title:fo|o', makeSetPredicateAction('contains("|")'))
      expect(result).toBe('title:contains(foo)')
    })

    test('cursor positioned after preserved args', () => {
      // The | in the template should position cursor after the preserved args
      const result = applyAndGetResult('title:starts_with("test|")', makeSetPredicateAction('ends_with("|")'))
      expect(result).toBe('title:ends_with("test")')
    })
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
        predicate: 'bar',
      }),
    }

    const result = applyAndGetResult('title:|foo', replaceWithAction)
    expect(result).toBe('region:bar')
  })
})
