import {
  EditorView,
  Decoration,
  DecorationSet,
  WidgetType,
  ViewPlugin,
  ViewUpdate,
  hoverTooltip,
} from "@codemirror/view";
import { syntaxTree } from "@codemirror/language";
import { Range } from "@codemirror/state";
import { render } from "preact";
import { anyCondition } from "../../dequel-lang/parser";
import { raise } from "../../lib/error";
import { build } from "../../lib/dom";

function ConditionToggle({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="relative text-xs font-sans inline-block "
      aria-hidden="true"
    >
      <div className="flex gap-2 items-center justify-center bg-slate-100 overflow-hidden accent-slate-400 rounded-lg p-2">
        <input
          onClick={() => onToggle?.()}
          type="checkbox"
          checked={checked}
          id="ignore-condition"
        />
        <label htmlFor="ignore-condition">ignore this condition</label>
      </div>
    </div>
  );
}

class ConditionWidget extends WidgetType {
  constructor(readonly checked: boolean) {
    super();
  }

  eq(other: ConditionWidget) {
    return other.checked == this.checked;
  }

  toDOM() {
    return build(
      <ConditionToggle
        onToggle={() => {
          toggleCondition;
        }}
        checked={this.checked}
      />
    );
  }

  ignoreEvent() {
    return false;
  }
}

// TODO: make hover menu work again
export const hoverMenu = hoverTooltip((view, pos) => {
  const node = getConditionAt(view, pos)!;
  return {
    pos: node.from,
    end: node.to,
    above: true,
    create(view) {
      const dom = document.createElement("div");
      const isIgnored = view.state.doc
        .sliceString(node.from, node.to)
        .startsWith("!");
      // dom.addEventListener("toggle", () => toggleCondition(view, pos));
      console.log(dom);
      render(
        <ConditionToggle
          checked={isIgnored}
          onToggle={() => toggleCondition(view, pos)}
        />,
        dom
      );
      return { dom };
    },
  };
});

function conditions(view: EditorView) {
  const widgets: Range<Decoration>[] = [];

  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (node) => {
        if (anyCondition(node.name)) {
          const isIgnored = view.state.doc
            .sliceString(node.from, node.to)
            .startsWith("!");
          const deco = Decoration.widget({
            widget: new ConditionWidget(!isIgnored),
            side: 1,
          });
          widgets.push(deco.range(node.to));
        }
      },
    });
  }

  return Decoration.set(widgets);
}

export const conditionPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = conditions(view);
    }

    update(update: ViewUpdate) {
      if (
        update.docChanged ||
        update.viewportChanged ||
        syntaxTree(update.startState) != syntaxTree(update.state)
      )
        this.decorations = conditions(update.view);
    }
  },
  {
    decorations: (v) => v.decorations,

    eventHandlers: {
      mousedown: (e, view) => {
        const target = e.target as HTMLElement;
        if (target.nodeName == "INPUT" && !!target.closest("condition-toggle"))
          return toggleCondition(view, view.posAtDOM(target));
      },
    },
  }
);

const getConditionNode = (
  { node, next }: ReturnType<ReturnType<typeof syntaxTree>["resolveStack"]>,
  depth = 0
): typeof node | null => {
  if (depth > 20) raise("syntaxtree too deep?");
  if (anyCondition(node.name)) return node;
  return !next ? null : getConditionNode(next, depth + 1);
};

function getConditionAt(view: EditorView, pos: number) {
  return getConditionNode(syntaxTree(view.state).resolveStack(pos - 1, 0));
}

type SyntaxNode = ReturnType<typeof getConditionNode>;

function toggleConditionNode(view: EditorView, node: SyntaxNode) {
  if (!node) return false;

  if (node.name === "IgnoredCondition") {
    view.dispatch({
      changes: {
        from: node.from,
        to: node.from + 1,
        insert: "",
      },
    });
  }

  if (node.name === "Condition") {
    view.dispatch({
      changes: {
        from: node.from,
        insert: "!",
      },
    });
  }
}

function toggleCondition(view: EditorView, pos: number) {
  return toggleConditionNode(view, getConditionAt(view, pos));
}
