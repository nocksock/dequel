import {
  indentNodeProp,
  foldNodeProp,
  foldInside,
  LRLanguage,
} from "@codemirror/language";
import { buildParser } from "@lezer/generator";
import { Tag, styleTags, tags as t } from "@lezer/highlight";

export const parser = buildParser(`
@top QueryList { Query }
@skip { "\n" | Comment }

Query {
  anyCondition ((" " | "\t")+  anyCondition)*
}

anyCondition { Condition | ExcludeCondition | IgnoredCondition }
Condition { Field ":" Predicate }
ExcludeCondition { "-" Field ":" Predicate }
IgnoredCondition { "!" Field ":" Predicate }

Predicate { Regex | Value | Command  }
Command { Identifier "(" Argument ("," Argument)* ")" }
Argument { Identifier | Number | String }
Value { Identifier | Number | String }

@tokens {
  ":"
  Field { Identifier }
  Function { Identifier }
  Identifier { $[a-zA-Z_]+ ("." $[a-zA-Z_]+)* }
  Number { std.digit+ }
  String { '"' !["]* '"' }
  Regex { RegexContent (RegexFlag)* }
  RegexFlag { std.asciiLetter+ }
  RegexContent { "/" (![/] | "\\/")*  "/" }
  Comment { "#" (![\n])* }
}
`);

export const customTag = {
  Condition: Tag.define(t.keyword),
  Field: Tag.define(t.propertyName),
  Command: t.function(t.variableName),
  Predicate: Tag.define(t.variableName),
  Value: Tag.define(t.attributeValue),
  Operator: Tag.define(t.operator),
  Regex: Tag.define(t.regexp),
  RegexContent: Tag.define(t.regexp),
};

export const ANY_CONDITION = [
  "IgnoredCondition",
  "ExcludeCondition",
  "Condition",
];
export const anyCondition = (name: string) => ANY_CONDITION.includes(name);

export const parserWithMetadata = parser.configure({
  props: [
    styleTags({
      "Condition/:": customTag.Operator,
      "ExcludeCondition/:": customTag.Operator,
      "Condition/Field/...": customTag.Field,
      "Condition/Predicate/RegexContent!": customTag.RegexContent,
      "Command!": customTag.Command,
      "Separator!": customTag.Operator,
      Regex: customTag.Regex,
      // "Condition/Predicate/...": condition.Predicate,
      Comment: t.lineComment,
      Field: customTag.Field,
      "Value!": customTag.Value,
    }),
    indentNodeProp.add({
      Query: (context) => context.column(context.node.from) + context.unit,
    }),
    foldNodeProp.add({
      Query: foldInside,
    }),
  ],
});

export const dequelParser = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    // commentTokens: { line: "" },
  },
});
