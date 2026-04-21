import { describe, test, expect } from 'vitest'
import { EditorState } from '@codemirror/state'
import { getSuggestions, getSuggestionsAsync, SuggestionsInput } from './suggestions'
import { Schema, SchemaCache } from '../editor/completion'
import { DequelLang } from '../dequel-lang/language'

// Test schemas
const booksSchema: Schema = {
  fields: {
    title: { type: 'string', info: 'Book title' },
    price: { type: 'number', info: 'Book price' },
    published_at: { type: 'date', info: 'Publication date' },
    page_count: { type: 'number', info: 'Page count' },
    genre: { type: 'keyword', values: ['sci-fi', 'fantasy', 'mystery'] },
    author: { type: 'relationship', schema: 'authors', info: 'Book author' },
  },
}

const authorsSchema: Schema = {
  fields: {
    name: { type: 'string', info: 'Author name' },
    bio: { type: 'string', info: 'Author biography' },
    country: { type: 'string', info: 'Country' },
  },
}

// Helper to create EditorState with cursor position from | marker
function createState(inputWithCursor: string): EditorState {
  const cursorPos = inputWithCursor.indexOf('|')
  const input = inputWithCursor.replace('|', '')

  return EditorState.create({
    doc: input,
    selection: { anchor: cursorPos >= 0 ? cursorPos : input.length },
    extensions: [DequelLang()],
  })
}

// Helper to create SuggestionsInput
function createInput(
  inputWithCursor: string,
  baseSchema: Schema | null = booksSchema,
  resolvedSchema: Schema | null = null,
  singleMatchRelationshipSchema: Schema | null = null
): SuggestionsInput {
  return {
    state: createState(inputWithCursor),
    baseSchema,
    resolvedSchema,
    singleMatchRelationshipSchema,
  }
}

describe('getSuggestions', () => {
  describe('empty query', () => {
    test('shows all fields when query is empty', () => {
      const result = getSuggestions(createInput('|'))

      expect(result.items).toHaveLength(6)
      expect(result.items.map((i) => i.type)).toEqual([
        'field', 'field', 'field', 'field', 'field', 'field',
      ])
    })
  })

  describe('partial field filtering', () => {
    test('filters fields by partial text "p"', () => {
      const result = getSuggestions(createInput('p|'))

      expect(result.debug.partialField).toBe('p')
      expect(result.items).toHaveLength(3) // price, published_at, page_count
      const names = result.items.map((i) => (i as any).name)
      expect(names).toContain('price')
      expect(names).toContain('published_at')
      expect(names).toContain('page_count')
    })

    test('filters fields by partial text "ti" - single match shows expanded view', () => {
      const result = getSuggestions(createInput('ti|'))

      expect(result.debug.partialField).toBe('ti')
      // Single match expands to: title:, -title:
      expect(result.items).toHaveLength(2)
      expect(result.items[0].type).toBe('field')
      expect(result.items[1].type).toBe('field-negated')
      expect((result.items[0] as any).name).toBe('title')
    })

    test('returns empty when no fields match', () => {
      const result = getSuggestions(createInput('xyz|'))

      expect(result.debug.partialField).toBe('xyz')
      expect(result.items).toHaveLength(0)
    })
  })

  describe('single match expanded view', () => {
    test('shows expanded view for single match "g"', () => {
      const result = getSuggestions(createInput('g|'))

      expect(result.debug.partialField).toBe('g')
      // Should show: genre:, -genre:, genre:"sci-fi", genre:"fantasy", genre:"mystery", and negated versions
      expect(result.items.length).toBeGreaterThan(1)

      const types = result.items.map((i) => i.type)
      expect(types).toContain('field')
      expect(types).toContain('field-negated')
      expect(types).toContain('field-value')
      expect(types).toContain('field-value-negated')
    })

    test('single match for relationship without resolved schema shows field but no negated', () => {
      const result = getSuggestions(createInput('au|'))

      expect(result.debug.partialField).toBe('au')
      expect(result.items).toHaveLength(1)
      expect(result.items[0].type).toBe('field')
      expect((result.items[0] as any).name).toBe('author')
      expect((result.items[0] as any).suffix).toBe('.')
      expect((result.items[0] as any).isRelationship).toBe(true)
    })

    test('single match relationship with resolved schema shows relationship fields', () => {
      const result = getSuggestions(createInput('au|', booksSchema, null, authorsSchema))

      expect(result.debug.partialField).toBe('au')
      expect(result.items).toHaveLength(3) // author.name, author.bio, author.country
      expect(result.items[0]).toMatchObject({
        type: 'field',
        name: 'author.name',
        fieldType: 'string',
        suffix: ':',
        isRelationship: false,
      })
      expect(result.items[1]).toMatchObject({
        type: 'field',
        name: 'author.bio',
        fieldType: 'string',
        suffix: ':',
      })
      expect(result.items[2]).toMatchObject({
        type: 'field',
        name: 'author.country',
        fieldType: 'string',
        suffix: ':',
      })
    })
  })

  describe('relationship paths', () => {
    test('shows resolved schema fields for "author.|" with full path prefix', () => {
      const result = getSuggestions(createInput('author.|', booksSchema, authorsSchema))

      expect(result.debug.currentPath).toBe('author.')
      expect(result.debug.partialField).toBe('')
      expect(result.items).toHaveLength(3) // author.name, author.bio, author.country
      const names = result.items.map((i) => (i as any).name)
      expect(names).toContain('author.name')
      expect(names).toContain('author.bio')
      expect(names).toContain('author.country')
    })

    test('filters resolved schema fields for "author.n|" with full path prefix', () => {
      const result = getSuggestions(createInput('author.n|', booksSchema, authorsSchema))

      expect(result.debug.currentPath).toBe('author.')
      expect(result.debug.partialField).toBe('n')
      // Single match expands to: author.name:, -author.name:
      expect(result.items).toHaveLength(2)
      expect(result.items[0].type).toBe('field')
      expect(result.items[1].type).toBe('field-negated')
      expect((result.items[0] as any).name).toBe('author.name')
      expect((result.items[1] as any).name).toBe('author.name')
    })

    test('shows base schema when resolved is null', () => {
      const result = getSuggestions(createInput('author.|', booksSchema, null))

      // Falls back to base schema
      expect(result.items).toHaveLength(6)
    })
  })

  describe('value position', () => {
    test('returns empty items when in value position', () => {
      const result = getSuggestions(createInput('title:|'))

      expect(result.debug.inValue).toBe(true)
      expect(result.debug.currentFieldName).toBe('title')
      expect(result.items).toHaveLength(0)
    })

    test('returns empty items when typing value', () => {
      const result = getSuggestions(createInput('title:foo|'))

      expect(result.debug.inValue).toBe(true)
      expect(result.items).toHaveLength(0)
    })
  })

  describe('after complete condition', () => {
    test('shows all fields after complete condition with space', () => {
      const result = getSuggestions(createInput('title:foo |'))

      expect(result.debug.partialField).toBe('')
      expect(result.debug.inValue).toBe(false)
      expect(result.items).toHaveLength(6)
    })
  })
})

describe('getSuggestionsAsync', () => {
  test('resolves relationship path schema with full path prefix', async () => {
    const cache = new SchemaCache('/api')
    cache.prime('books', booksSchema)
    cache.prime('authors', authorsSchema)

    const state = createState('author.|')
    const result = await getSuggestionsAsync(state, booksSchema, cache)

    expect(result.items).toHaveLength(3)
    const names = result.items.map((i) => (i as any).name)
    expect(names).toContain('author.name')
    expect(names).toContain('author.bio')
    expect(names).toContain('author.country')
  })

  test('single match relationship expands to show relationship fields', async () => {
    const cache = new SchemaCache('/api')
    cache.prime('books', booksSchema)
    cache.prime('authors', authorsSchema)

    const state = createState('au|')
    const result = await getSuggestionsAsync(state, booksSchema, cache)

    // Should show author.name, author.bio, author.country instead of just author.
    expect(result.items).toHaveLength(3)
    expect(result.items[0]).toMatchObject({
      type: 'field',
      name: 'author.name',
      fieldType: 'string',
      suffix: ':',
    })
    expect(result.items[1]).toMatchObject({
      type: 'field',
      name: 'author.bio',
      fieldType: 'string',
      suffix: ':',
    })
    expect(result.items[2]).toMatchObject({
      type: 'field',
      name: 'author.country',
      fieldType: 'string',
      suffix: ':',
    })
  })

  test('single match relationship without cache shows relationship itself', async () => {
    const state = createState('au|')
    const result = await getSuggestionsAsync(state, booksSchema, null)

    // Without cache, can't resolve relationship schema, so show the relationship field
    expect(result.items).toHaveLength(1)
    expect(result.items[0]).toMatchObject({
      type: 'field',
      name: 'author',
      suffix: '.',
      isRelationship: true,
    })
  })

  test('filters resolved fields with full path prefix', async () => {
    const cache = new SchemaCache('/api')
    cache.prime('books', booksSchema)
    cache.prime('authors', authorsSchema)

    const state = createState('author.n|')
    const result = await getSuggestionsAsync(state, booksSchema, cache)

    // Single match expands to: author.name:, -author.name:
    expect(result.items).toHaveLength(2)
    expect(result.items[0].type).toBe('field')
    expect(result.items[1].type).toBe('field-negated')
    expect((result.items[0] as any).name).toBe('author.name')
    expect((result.items[1] as any).name).toBe('author.name')
  })
})
