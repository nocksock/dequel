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
  { tag: customTag.DynamicValue, class: 'cnd-val cnd-dynamic' },
  { tag: t.string, class: 'string' },
  { tag: t.number, class: 'cnd-val' },
  { tag: t.lineComment, class: 'comment' },
])

// Parser configuration

const parserWithMetadata = parser.configure({
  props: [
    styleTags({
      // Condition structure
      'Condition/:': customTag.Operator,
      'ExcludeCondition/:': customTag.Operator,
      'Condition/Field/...': customTag.Field,
      Field: customTag.Field,

      // Command and values
      'Command!': customTag.Command,
      'Value!': customTag.Value,
      'Separator!': customTag.Operator,

      // Logical operators
      'And Or': customTag.Operator,

      // Comparison and range operators
      'CompareOp Contains StartsWith EndsWith Not RangeSep': customTag.Operator,

      // Special value types
      DynamicValue: customTag.DynamicValue,
      DateLiteral: t.number,

      // Object blocks
      'ObjectBlock/Identifier': customTag.Field,

      // Comments
      Comment: t.lineComment,
    }),
    indentNodeProp.add({
      Query: context => context.column(context.node.from) + context.unit,
      ObjectBlock: context => context.column(context.node.from) + context.unit,
    }),
    foldNodeProp.add({
      Query: foldInside,
      ObjectBlock: foldInside,
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
