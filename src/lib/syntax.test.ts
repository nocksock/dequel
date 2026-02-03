import { describe, test, expect } from 'vitest'
import { Text } from '@codemirror/state'
import { parser } from '../dequel-lang/parser'
import { closestCondition, parseCondition, serializeCondition, getFieldContextWithTree } from './syntax'

describe('closestCondition', () => {
  const getNodeAt = (input: string, cursorPos: number) => {
    const tree = parser.parse(input)
    return tree.resolveInner(cursorPos, -1)
  }

  test('returns condition when node is a Condition', () => {
    const node = getNodeAt('title:foo', 3) // on 'le' in title
    const condition = closestCondition(node)
    expect(condition?.name).toBe('Condition')
  })

  test('returns condition when node is an ExcludeCondition', () => {
    const node = getNodeAt('-title:foo', 4) // on 'le' in title
    const condition = closestCondition(node)
    expect(condition?.name).toBe('ExcludeCondition')
  })

  test('returns condition when node is an IgnoredCondition', () => {
    const node = getNodeAt('!title:foo', 4) // on 'le' in title
    const condition = closestCondition(node)
    expect(condition?.name).toBe('IgnoredCondition')
  })

  test('returns condition when inside matcher', () => {
    const node = getNodeAt('title:foo', 7) // on 'o' in foo
    const condition = closestCondition(node)
    expect(condition?.name).toBe('Condition')
  })

  test('returns null when not in a condition', () => {
    const node = getNodeAt('', 0)
    const condition = closestCondition(node)
    expect(condition).toBeNull()
  })

  test('finds correct condition in multi-condition query', () => {
    const node = getNodeAt('title:foo region:bar', 15) // on 'a' in bar
    const condition = closestCondition(node)
    expect(condition?.name).toBe('Condition')
    // Verify it's the second condition by checking the field
    const field = condition?.getChild('Field')
    const input = 'title:foo region:bar'
    expect(input.slice(field!.from, field!.to)).toBe('region')
  })
})

describe('parseCondition', () => {
  const parse = (input: string) => {
    const tree = parser.parse(input)
    const node = tree.topNode.getChild('Query')?.firstChild
    if (!node) throw new Error('No condition found')
    const doc = Text.of([input])
    return parseCondition(node, doc)
  }

  test('parses regular condition', () => {
    const parts = parse('title:foo')
    expect(parts.prefix).toBe('')
    expect(parts.field).toBe('title')
    expect(parts.predicate).toBe('foo')
  })

  test('parses excluded condition', () => {
    const parts = parse('-title:foo')
    expect(parts.prefix).toBe('-')
    expect(parts.field).toBe('title')
    expect(parts.predicate).toBe('foo')
  })

  test('parses ignored condition', () => {
    const parts = parse('!title:foo')
    expect(parts.prefix).toBe('!')
    expect(parts.field).toBe('title')
    expect(parts.predicate).toBe('foo')
  })

  test('parses condition with command matcher', () => {
    const parts = parse('date:after(2024,01)')
    expect(parts.prefix).toBe('')
    expect(parts.field).toBe('date')
    expect(parts.predicate).toBe('after(2024,01)')
  })

  test('parses condition with regex matcher', () => {
    const parts = parse('name:/^test.*/i')
    expect(parts.prefix).toBe('')
    expect(parts.field).toBe('name')
    expect(parts.predicate).toBe('/^test.*/i')
  })
})

describe('serializeCondition', () => {
  test('serializes regular condition', () => {
    const result = serializeCondition({ prefix: '', field: 'title', predicate: 'foo' })
    expect(result).toBe('title:foo')
  })

  test('serializes excluded condition', () => {
    const result = serializeCondition({ prefix: '-', field: 'title', predicate: 'foo' })
    expect(result).toBe('-title:foo')
  })

  test('serializes ignored condition', () => {
    const result = serializeCondition({ prefix: '!', field: 'title', predicate: 'foo' })
    expect(result).toBe('!title:foo')
  })
})

describe('round-trip parse/serialize', () => {
  const roundTrip = (input: string) => {
    const tree = parser.parse(input)
    const node = tree.topNode.getChild('Query')?.firstChild
    if (!node) throw new Error('No condition found')
    const doc = Text.of([input])
    const parts = parseCondition(node, doc)
    return serializeCondition(parts)
  }

  test('round-trips regular condition', () => {
    expect(roundTrip('title:foo')).toBe('title:foo')
  })

  test('round-trips excluded condition', () => {
    expect(roundTrip('-title:foo')).toBe('-title:foo')
  })

  test('round-trips ignored condition', () => {
    expect(roundTrip('!title:foo')).toBe('!title:foo')
  })

  test('round-trips condition with command', () => {
    expect(roundTrip('date:after(2024,01)')).toBe('date:after(2024,01)')
  })

  test('round-trips condition with regex', () => {
    expect(roundTrip('name:/^test.*/i')).toBe('name:/^test.*/i')
  })
})

describe('getFieldContext', () => {
  // Use | to denote cursor position
  const getFieldName = (inputWithCursor: string) => {
    const pos = inputWithCursor.indexOf('|')
    const input = inputWithCursor.replace('|', '')

    const tree = parser.parse(input)
    const node = tree.resolveInner(pos, -1)
    const field = getFieldContextWithTree(tree, pos, node)
    return field ? input.slice(field.from, field.to) : null
  }

  test('returns field when cursor on Field', () => {
    expect(getFieldName('ti|tle:foo')).toBe('title')
  })

  test('returns field when cursor after colon', () => {
    expect(getFieldName('title:|')).toBe('title')
  })

  test('returns field when cursor on value', () => {
    expect(getFieldName('title:fo|o')).toBe('title')
  })

  test('returns field when whitespace after colon', () => {
    expect(getFieldName('title: |')).toBe('title')
  })

  test('returns null when cursor outside condition', () => {
    expect(getFieldName('title:foo |')).toBe(null)
  })

  test('works with ExcludeCondition', () => {
    expect(getFieldName('-title:fo|o')).toBe('title')
  })

  test('works with IgnoredCondition', () => {
    expect(getFieldName('!title:fo|o')).toBe('title')
  })

  test('returns field with multiple conditions - first condition', () => {
    expect(getFieldName('title:fo|o region:bar')).toBe('title')
  })

  test('returns field with multiple conditions - second condition', () => {
    expect(getFieldName('title:foo region:ba|r')).toBe('region')
  })
})
