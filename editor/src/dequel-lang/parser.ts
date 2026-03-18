import { buildParser } from "@lezer/generator";
import { Tag, tags as t } from "@lezer/highlight";

export const parser = buildParser(`
@top QueryList { Query }
@skip { "\n" | Comment }

Query {
  anyCondition ((" " | "\t")+  anyCondition)*
}

anyCondition { Condition | ExcludeCondition }
Condition { Field ":" Predicate }
ExcludeCondition { "-" Field ":" Predicate }

Predicate { Value | Command  }
Command { Identifier "(" Argument ("," Argument)* ")" }
Argument { Identifier | Number | String }
Value { Identifier | Number | String }

@tokens {
  ":"
  Field { Identifier }
  Identifier { $[a-zA-Z_]+ ("." $[a-zA-Z_]+)* }
  Number { std.digit+ }
  String { '"' !["]* '"' }
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
};

export const ANY_CONDITION = [
  "ExcludeCondition",
  "Condition",
];
export const anyCondition = (name: string) => ANY_CONDITION.includes(name);
