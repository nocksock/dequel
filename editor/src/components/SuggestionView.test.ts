import { describe, test, expect } from 'vitest'
import { getTypePredicates } from './SuggestionView'

describe('getTypePredicates', () => {
  test('returns string operators with cursor markers for string type', () => {
    const predicates = getTypePredicates('string')
    expect(predicates.map(p => p.label)).toEqual([
      'contains()',
      'starts_with()',
      'ends_with()',
      'one_of()',
    ])
    // Values should have | cursor markers inside parentheses
    expect(predicates.map(p => p.value)).toEqual([
      'contains(|)',
      'starts_with(|)',
      'ends_with(|)',
      'one_of(|)',
    ])
  })

  test('returns number operators for number type', () => {
    const predicates = getTypePredicates('number')
    expect(predicates.map(p => p.label)).toEqual([
      '>',
      '<',
      '>=',
      '<=',
      '..',
    ])
    // Range has cursor marker before ..
    expect(predicates.find(p => p.label === '..')?.value).toBe('|..')
  })

  test('returns date operators with cursor markers for date type', () => {
    const predicates = getTypePredicates('date')
    expect(predicates.map(p => p.label)).toEqual([
      'after()',
      'before()',
      '..',
    ])
    expect(predicates.find(p => p.label === 'after()')?.value).toBe('after(|)')
    expect(predicates.find(p => p.label === 'before()')?.value).toBe('before(|)')
  })

  test('returns boolean values without cursor markers', () => {
    const predicates = getTypePredicates('boolean')
    expect(predicates.map(p => p.label)).toEqual([
      'true',
      'false',
      'yes',
      'no',
    ])
    // Boolean values don't need cursor markers
    expect(predicates.every(p => !p.value.includes('|'))).toBe(true)
  })

  test('returns empty array for relationship type', () => {
    const predicates = getTypePredicates('relationship')
    expect(predicates).toEqual([])
  })

  test('returns empty array for keyword type (values come from schema)', () => {
    const predicates = getTypePredicates('keyword')
    expect(predicates).toEqual([])
  })

  test('returns empty array for unknown types', () => {
    const predicates = getTypePredicates('unknown')
    expect(predicates).toEqual([])
  })
})

describe('cursor marker parsing', () => {
  // Test the logic that insertPredicate uses
  const parseCursorMarker = (value: string) => {
    const cursorMarker = value.indexOf('|')
    if (cursorMarker >= 0) {
      return {
        text: value.replace('|', ''),
        cursorOffset: cursorMarker,
      }
    }
    return {
      text: value,
      cursorOffset: value.length,
    }
  }

  test('parses cursor marker in middle of value', () => {
    const result = parseCursorMarker('contains(|)')
    expect(result.text).toBe('contains()')
    expect(result.cursorOffset).toBe(9) // position inside parentheses
  })

  test('parses cursor marker at start of value', () => {
    const result = parseCursorMarker('|..')
    expect(result.text).toBe('..')
    expect(result.cursorOffset).toBe(0)
  })

  test('handles value without cursor marker', () => {
    const result = parseCursorMarker('true')
    expect(result.text).toBe('true')
    expect(result.cursorOffset).toBe(4) // end of string
  })
})

describe('relationship path parsing', () => {
  test('splits simple field name', () => {
    const fieldName = 'title'
    const parts = fieldName.split('.')
    expect(parts).toEqual(['title'])
    expect(parts.length).toBe(1)
  })

  test('splits relationship path into segments', () => {
    const fieldName = 'author.bio'
    const parts = fieldName.split('.')
    expect(parts).toEqual(['author', 'bio'])
    expect(parts.slice(0, -1)).toEqual(['author'])
    expect(parts[parts.length - 1]).toBe('bio')
  })

  test('splits nested relationship path', () => {
    const fieldName = 'author.publisher.name'
    const parts = fieldName.split('.')
    expect(parts).toEqual(['author', 'publisher', 'name'])
    expect(parts.slice(0, -1)).toEqual(['author', 'publisher'])
    expect(parts[parts.length - 1]).toBe('name')
  })
})

