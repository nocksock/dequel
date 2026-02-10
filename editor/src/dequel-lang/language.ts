import {
  indentNodeProp,
  foldNodeProp,
  foldInside,
  HighlightStyle,
  LRLanguage,
  LanguageSupport,
  syntaxHighlighting,
  syntaxTree,
} from '@codemirror/language'
import { styleTags, tags as t } from '@lezer/highlight'
import { Range } from '@codemirror/state'
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from '@codemirror/view'
import { anyCondition, customTag, parser } from './parser'
import { DequelAutocomplete } from '../editor/completion.js'

// @see ./dequel-lang/linter.ts
// import { linter } from '@codemirror/lint'
// import { lintExample } from './linter'

// Syntax highlighting

export const EdkQLHighlights = HighlightStyle.define([
  { tag: customTag.Condition, class: 'cnd' },
  { tag: customTag.Operator, class: 'cnd-op' },
  { tag: customTag.Value, class: 'cnd-val' },
  { tag: customTag.Command, class: 'cnd-val cnd-cmd' },
  { tag: customTag.Field, class: 'cnd-fld' },
  { tag: customTag.Regex, class: 'cnd-val cnd-rgx cnd-rgx-f' },
  { tag: t.string, class: 'string' },
  { tag: t.lineComment, class: 'comment' },
])

// Condition decorations

const condition = (name: string) => {
  let mark
  if (name === 'ExcludeCondition') {
    mark = Decoration.mark({ class: 'condition condition--exclude' })
  }

  if (name === 'IgnoredCondition') {
    mark = Decoration.mark({ class: 'condition condition--ignored' })
  }

  mark =
    mark ||
    Decoration.mark({
      class: 'condition',
    })

  return mark
}

const query = () => {
  return Decoration.mark({
    class: 'query',
  })
}

const marks = (view: EditorView) => {
  const marks: Range<Decoration>[] = []

  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: node => {
        if (node.name === 'Query') {
          marks.push(query().range(node.from, node.to))
        }

        if (anyCondition(node.name)) {
          marks.push(condition(node.name).range(node.from, node.to))
        }
      },
    })
  }

  return Decoration.set(marks)
}

export const DequelConditionDecoration = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet
    constructor(view: EditorView) {
      this.decorations = marks(view)
    }
    update(update: ViewUpdate) {
      if (
        update.docChanged ||
        update.viewportChanged ||
        syntaxTree(update.startState) != syntaxTree(update.state)
      ) {
        this.decorations = marks(update.view)
      }
    }
  },
  {
    decorations: v => v.decorations,
  }
)

// Parser configuration

export const parserWithMetadata = parser.configure({
  props: [
    styleTags({
      'Condition/:': customTag.Operator,
      'ExcludeCondition/:': customTag.Operator,
      'Condition/Field/...': customTag.Field,
      'Condition/Predicate/RegexContent!': customTag.RegexContent,
      'Command!': customTag.Command,
      'Separator!': customTag.Operator,
      Regex: customTag.Regex,
      // "Condition/Predicate/...": condition.Predicate,
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
  languageData: {
    // commentTokens: { line: "" },
  },
})

export function DequelLang() {
  return new LanguageSupport(dequelParser, [
    syntaxHighlighting(EdkQLHighlights),
    DequelAutocomplete,
    // linter(lintExample),
  ])
}
