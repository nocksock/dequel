import { HighlightStyle, syntaxTree } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'
import { anyCondition, customTag } from './parser'
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from '@codemirror/view'
import { Range } from '@codemirror/state'

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
