import { describe, test, expect } from 'vitest'
import { Text } from '@codemirror/state'
import { parser } from '../dequel-lang/parser'
import { parseCondition, ConditionParts } from './syntax'
import { negate, disable, setMatcher, setField, wrapInCommand } from './transforms'

const makeParts = (input: string): ConditionParts => {
  const tree = parser.parse(input)
  const node = tree.topNode.getChild('Query')?.firstChild
  if (!node) throw new Error('No condition found')
  const doc = Text.of([input])
  return parseCondition(node, doc)
}

describe('negate transform', () => {
  test('adds "-" prefix to regular condition', () => {
    const parts = makeParts('title:foo')
    const result = negate(parts)
    expect(result.prefix).toBe('-')
    expect(result.field).toBe('title')
    expect(result.matcher).toBe('foo')
  })

  test('removes "-" prefix from excluded condition', () => {
    const parts = makeParts('-title:foo')
    const result = negate(parts)
    expect(result.prefix).toBe('')
  })

  test('replaces "!" with "-" on ignored condition', () => {
    const parts = makeParts('!title:foo')
    const result = negate(parts)
    expect(result.prefix).toBe('-')
  })
})

describe('disable transform', () => {
  test('adds "!" prefix to regular condition', () => {
    const parts = makeParts('title:foo')
    const result = disable(parts)
    expect(result.prefix).toBe('!')
    expect(result.field).toBe('title')
    expect(result.matcher).toBe('foo')
  })

  test('removes "!" prefix from ignored condition', () => {
    const parts = makeParts('!title:foo')
    const result = disable(parts)
    expect(result.prefix).toBe('')
  })

  test('replaces "-" with "!" on excluded condition', () => {
    const parts = makeParts('-title:foo')
    const result = disable(parts)
    expect(result.prefix).toBe('!')
  })
})

describe('setMatcher transform', () => {
  test('replaces matcher value', () => {
    const parts = makeParts('title:foo')
    const result = setMatcher('bar')(parts)
    expect(result.prefix).toBe('')
    expect(result.field).toBe('title')
    expect(result.matcher).toBe('bar')
  })

  test('preserves prefix and field', () => {
    const parts = makeParts('-title:foo')
    const result = setMatcher('bar')(parts)
    expect(result.prefix).toBe('-')
    expect(result.field).toBe('title')
    expect(result.matcher).toBe('bar')
  })

  test('can set command value', () => {
    const parts = makeParts('date:foo')
    const result = setMatcher('after(2024,01)')(parts)
    expect(result.matcher).toBe('after(2024,01)')
  })
})

describe('setField transform', () => {
  test('replaces field name', () => {
    const parts = makeParts('title:foo')
    const result = setField('region')(parts)
    expect(result.prefix).toBe('')
    expect(result.field).toBe('region')
    expect(result.matcher).toBe('foo')
  })

  test('preserves prefix and matcher', () => {
    const parts = makeParts('-title:foo')
    const result = setField('region')(parts)
    expect(result.prefix).toBe('-')
    expect(result.field).toBe('region')
    expect(result.matcher).toBe('foo')
  })
})

describe('wrapInCommand transform', () => {
  test('wraps matcher in command call', () => {
    const parts = makeParts('date:2024')
    const result = wrapInCommand('after')(parts)
    expect(result.matcher).toBe('after(2024)')
  })

  test('preserves prefix and field', () => {
    const parts = makeParts('-date:2024')
    const result = wrapInCommand('before')(parts)
    expect(result.prefix).toBe('-')
    expect(result.field).toBe('date')
    expect(result.matcher).toBe('before(2024)')
  })
})

describe('transform composition', () => {
  test('transforms can be composed', () => {
    const parts = makeParts('title:foo')
    const negated = negate(parts)
    const withNewMatcher = setMatcher('bar')({ ...negated, node: parts.node })
    expect(withNewMatcher.prefix).toBe('-')
    expect(withNewMatcher.field).toBe('title')
    expect(withNewMatcher.matcher).toBe('bar')
  })
})
