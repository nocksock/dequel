import { SuggestionAction } from '../../lib/actions'

export type MatcherType = 'text' | 'keyword' | 'uuid' | 'date'

type MatcherDefinition = {
  label: string
  value: string
  description: string
}

const textMatchers: MatcherDefinition[] = [
  { label: '"..."', value: '"|"', description: 'Exact match' },
  { label: 'contains()', value: 'contains("|")', description: 'Contains the given text' },
  { label: 'starts_with()', value: 'starts_with("|")', description: 'Starts with the given text' },
  { label: 'ends_with()', value: 'ends_with("|")', description: 'Ends with the given text' },
]

const keywordMatchers: MatcherDefinition[] = [
  { label: '"..."', value: '"|"', description: 'Exact match' },
]

const uuidMatchers: MatcherDefinition[] = [
  { label: 'one_of()', value: 'one_of("|")', description: 'Match one of these values' },
]

const dateMatchers: MatcherDefinition[] = [
  { label: 'after()', value: 'after(|)', description: 'After this date' },
  { label: 'before()', value: 'before(|)', description: 'Before this date' },
  { label: 'between()', value: 'between(|,)', description: 'Between two dates' },
]

const matchersByType: Record<MatcherType, MatcherDefinition[]> = {
  text: textMatchers,
  keyword: keywordMatchers,
  uuid: uuidMatchers,
  date: dateMatchers,
}

/**
 * Get suggestion actions for a matcher type.
 */
export function getMatcherActions(matcherType: MatcherType): SuggestionAction[] {
  const matchers = matchersByType[matcherType] ?? []

  return matchers.map((m): SuggestionAction => ({
    type: 'setMatcher',
    id: `matcher-${matcherType}-${m.label}`,
    label: m.label,
    description: m.description,
    value: m.value,
  }))
}
