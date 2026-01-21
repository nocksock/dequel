import { syntaxTree } from "@codemirror/language";
import { CompletionContext } from "@codemirror/autocomplete";
import { dequelParser } from "../dequel-lang/parser";
import { getSuggestionContext } from "./suggestions/getSuggestionContext";

export const DequelAutocomplete = dequelParser.data.of({
  autocomplete: (context: CompletionContext) => {
    const tree = syntaxTree(context.state);
    const nodeBefore = tree.resolveInner(context.pos, -1);
    const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos);
    const tagBefore = /[\w.]*$/.exec(textBefore);
    if (!tagBefore && !context.explicit) return null;

    const field = getSuggestionContext(nodeBefore);
    const fieldValue = field
      ? context.state.doc.sliceString(field.from, field.to)
      : "*";

    const from = tagBefore ? nodeBefore.from + tagBefore.index : context.pos;
    const cursor = tree.cursor();
    cursor.prevSibling();

    if (field?.name === "Field" && fieldValue === "type") {
      return {
        from,
        options: [
          { label: "market", apply: "market " },
          { label: "recipe", apply: "recipe " },
          { label: "offer", apply: "offer " },
          { label: "product", apply: "product " },
        ],
      };
    }

    if (nodeBefore.name === "Field") {
      return {
        from,
        options: [
          { label: "id:", type: "keyword" },
          { label: "type:", type: "keyword" },
          { label: "title:", type: "keyword" },
          { label: "contact.city:", type: "keyword" },
          {
            label: "contact.zipcode:",
            type: "keyword",
          },
        ],
        // validFor: /^(\w*)?$/,
      };
    }

    return null;
  },
});
