import { describe, test, expect } from 'vitest'
import { parser } from '../../dequel-lang/parser'
import { getSuggestionContextWithTree } from './getSuggestionContext'

describe('getSuggestionContext', () => {
  // Use | to denote cursor position, or pass explicit cursorPos as second arg
  const getFieldName = (inputWithCursor: string, cursorPos?: number) => {
    let input: string
    let pos: number

    if (cursorPos !== undefined) {
      input = inputWithCursor
      pos = cursorPos
    } else {
      pos = inputWithCursor.indexOf('|')
      input = inputWithCursor.replace('|', '')
    }

    const tree = parser.parse(input)
    const node = tree.resolveInner(pos, -1)
    const field = getSuggestionContextWithTree(tree, pos, node)
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
    // THIS IS THE FAILING CASE
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
