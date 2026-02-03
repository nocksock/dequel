import { SuggestionAction } from './actions'

export type FieldType = 'text' | 'keyword' | 'uuid' | 'date'

type PredicateDefinition = {
  label: string
  value: string
  description: string
}

const textPredicates: PredicateDefinition[] = [
  { label: '"..."', value: '"|"', description: 'Exact match' },
  { label: 'contains()', value: 'contains("|")', description: 'Contains the given text' },
  { label: 'starts_with()', value: 'starts_with("|")', description: 'Starts with the given text' },
  { label: 'ends_with()', value: 'ends_with("|")', description: 'Ends with the given text' },
]

const keywordPredicates: PredicateDefinition[] = [
  { label: '"..."', value: '"|"', description: 'Exact match' },
]

const uuidPredicates: PredicateDefinition[] = [
  { label: 'one_of()', value: 'one_of("|")', description: 'Match one of these values' },
]

const datePredicates: PredicateDefinition[] = [
  { label: 'after()', value: 'after(|)', description: 'After this date' },
  { label: 'before()', value: 'before(|)', description: 'Before this date' },
  { label: 'between()', value: 'between(|,)', description: 'Between two dates' },
]

const predicatesByFieldType: Record<FieldType, PredicateDefinition[]> = {
  text: textPredicates,
  keyword: keywordPredicates,
  uuid: uuidPredicates,
  date: datePredicates,
}

/**
 * Get suggestion actions for predicates available for a field type.
 */
export function getPredicateActions(fieldType: FieldType): SuggestionAction[] {
  const predicates = predicatesByFieldType[fieldType] ?? []

  return predicates.map((p): SuggestionAction => ({
    type: 'setPredicate',
    id: `predicate-${fieldType}-${p.label}`,
    label: p.label,
    description: p.description,
    value: p.value,
  }))
}
