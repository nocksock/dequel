import {
  indentNodeProp,
  foldNodeProp,
  foldInside,
  HighlightStyle,
  LRLanguage,
  LanguageSupport,
  syntaxHighlighting,
} from '@codemirror/language'
import { styleTags, tags as t } from '@lezer/highlight'
import { customTag, parser } from './parser'
import { DequelAutocomplete } from '../editor/completion.js'

// Syntax highlighting

const Highlights = HighlightStyle.define([
  { tag: customTag.Condition, class: 'cnd' },
  { tag: customTag.Operator, class: 'cnd-op' },
  { tag: customTag.Value, class: 'cnd-val' },
  { tag: customTag.Command, class: 'cnd-val cnd-cmd' },
  { tag: customTag.Field, class: 'cnd-fld' },
  { tag: t.string, class: 'string' },
  { tag: t.lineComment, class: 'comment' },
])

// Parser configuration

const parserWithMetadata = parser.configure({
  props: [
    styleTags({
      'Condition/:': customTag.Operator,
      'ExcludeCondition/:': customTag.Operator,
      'Condition/Field/...': customTag.Field,
      'Command!': customTag.Command,
      'Separator!': customTag.Operator,
      Comment: t.lineComment,
      Field: customTag.Field,
      'Value!': customTag.Value,
    }),
    indentNodeProp.add({
      Query: context => context.column(context.node.from) + context.unit,
    }),
    foldNodeProp.add({
      Query: foldInside,
    }),
  ],
})

export const dequelParser = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {},
})

export function DequelLang() {
  return new LanguageSupport(dequelParser, [
    syntaxHighlighting(Highlights),
    DequelAutocomplete,
  ])
}
