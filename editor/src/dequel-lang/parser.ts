import { buildParser } from "@lezer/generator";
import { Tag, tags as t } from "@lezer/highlight";

// The fundamental issue: after seeing `field:identifier`, we can't tell if it's
// a SimplePredicate or the start of a Command until we see if `(` follows.
//
// Solution: Make Command match `Identifier "(" ...` but use GLR mode to handle
// the ambiguity, letting the parser explore both paths until one fails.
//
// Alternative: Accept that we parse `identifier(args)` slightly differently -
// parse it as `SimplePredicate` containing an inline `Command` structure.
//
// For now, let's go with the simplest approach that preserves backward compat:
// Use the original grammar structure for Command (no intermediate Value wrapper).

export const parser = buildParser(`
@top QueryList { Query }
@skip { " " | "\t" | "\n" | Comment }
@detectDelim

Query {
  queryElement+
}

queryElement {
  logicalOp | Condition | ExcludeCondition | Group | ObjectBlock
}

logicalOp { And | Or }

And { "&&" | andWord }
Or { "||" | orWord }
andWord[@name=And] { @specialize<Identifier, "AND"> | @specialize<Identifier, "and"> }
orWord[@name=Or] { @specialize<Identifier, "OR"> | @specialize<Identifier, "or"> }

Group { "(" Query ")" }

ObjectBlock { Identifier "{" Query "}" }

Condition { field ":" Predicate }
ExcludeCondition { "-" field ":" Predicate }

field[@name=Field] { Identifier }

Predicate {
  NegatedPredicate |
  RangePredicate |
  ComparisonPredicate |
  BracketPredicate |
  ShorthandPredicate |
  Command |
  SimplePredicate
}

NegatedPredicate { Not (ComparisonPredicate | ShorthandPredicate | SimplePredicate) }
ComparisonPredicate { CompareOp Value }
RangePredicate { Value RangeSep Value }
BracketPredicate { "[" Value ("," Value)* "]" }
ShorthandPredicate { (Contains | StartsWith | EndsWith) Value }
SimplePredicate { Value }

Command { Identifier ~ambig "(" ArgList? ")" }
ArgList { Argument ("," Argument)* }
Argument { Identifier | Number | String | DateLiteral | DynamicValue }

Value { DynamicValue | DateLiteral | Number | String | Identifier ~ambig }

@tokens {
  CompareOp { ">=" | "<=" | ">" | "<" }
  RangeSep { ".." }

  Contains { "*" }
  StartsWith { "^" }
  EndsWith { "$" }
  Not { "!" }

  DynamicValue { "@" ("today" | "tomorrow" | "yesterday" | "this-year" | "this-month-start" | "this-month-end" | "this-month") }
  DateLiteral { std.digit std.digit std.digit std.digit "-" std.digit std.digit ("-" std.digit std.digit)? }

  Number { "-"? std.digit+ ("." std.digit+)? }
  String { '"' !["]* '"' }

  ":"

  @precedence { DynamicValue, DateLiteral, Number, Identifier }

  Identifier { $[a-zA-Z_]+ ("." $[a-zA-Z_]+)* }

  Comment { "#" (![\n])* }

  "(" ")" "{" "}" "[" "]" "," "-" "&&" "||"
}
`);

export const customTag = {
  Condition: Tag.define(t.keyword),
  Field: Tag.define(t.propertyName),
  Command: t.function(t.variableName),
  Predicate: Tag.define(t.variableName),
  Value: Tag.define(t.attributeValue),
  Operator: Tag.define(t.operator),
  DynamicValue: t.special(t.variableName),
};

export const ANY_CONDITION = [
  "ExcludeCondition",
  "Condition",
];
export const anyCondition = (name: string) => ANY_CONDITION.includes(name);
