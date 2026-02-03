import { LanguageSupport, syntaxHighlighting } from '@codemirror/language'
import { EdkQLHighlights } from './highlighting'
import { dequelParser } from './parser'
import { DequelAutocomplete } from '../editor/completion'

// @see ./dequel-lang/linter.ts
// import { linter } from '@codemirror/lint'
// import { lintExample } from './linter'

export function DequelLang() {
  return new LanguageSupport(dequelParser, [
    syntaxHighlighting(EdkQLHighlights),
    DequelAutocomplete,
    // linter(lintExample),
  ])
}
