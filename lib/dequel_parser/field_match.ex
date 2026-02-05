defmodule Dequel.Parser.FieldMatch do
  @moduledoc """
  This modules handles the parsing of the main piece of DEQUEL: a field match.

  A field match is for example this part of a query: `name: "Frodo Baggins"`
  and everything in between the field, and value expression.
  """
  import NimbleParsec
  import Dequel.Parser.Helper
  import Dequel.Parser.Token
  import Dequel.Parser.Predicates

  # Bracket shorthand for one_of: field:[a, b, c]
  defcombinator(
    :bracket_list,
    ignore(ascii_char([?[]))
    |> optional(whitespace())
    |> concat(value())
    |> repeat(
      ignore(optional(whitespace()))
      |> ignore(ascii_char([?,]))
      |> optional(whitespace())
      |> concat(value())
    )
    |> ignore(optional(whitespace()))
    |> ignore(ascii_char([?]]))
  )

  defparsec(
    :field_match,
    choice([
      # inverted expression, prefixed by - (exclude/subtract from set)
      ignore(spaced(ascii_string([?-], 1)))
      |> parsec(:field_match)
      |> reduce(:wrap_not),

      # bracket shorthand: field:[a, b, c]
      field_expression()
      |> ignore(spaced(":"))
      |> parsec(:bracket_list)
      |> reduce(:postfix_bracket),

      # negated predicate function call: field:!contains(a, b)
      field_expression()
      |> ignore(spaced(":"))
      |> ignore(string("!"))
      |> parsec(:function_call)
      |> reduce(:postfix_inject_negated),

      # predicate function call: field:contains(a, b)
      field_expression()
      |> ignore(spaced(":"))
      |> parsec(:function_call)
      |> reduce(:postfix_inject),

      # negated range: field:!10..50
      field_expression()
      |> ignore(spaced(":"))
      |> ignore(string("!"))
      |> parsec(:range_literal)
      |> reduce(:postfix_range_negated),

      # range literal: field:10..50
      field_expression()
      |> ignore(spaced(":"))
      |> parsec(:range_literal)
      |> reduce(:postfix_range),

      # negated between: field:!between(10 50)
      field_expression()
      |> ignore(spaced(":"))
      |> ignore(string("!"))
      |> parsec(:between_call)
      |> reduce(:postfix_between_negated),

      # between predicate: field:between(10 50)
      field_expression()
      |> ignore(spaced(":"))
      |> parsec(:between_call)
      |> reduce(:postfix_between),

      # negated value expression: field:!value or field:!*value
      # Parses ! then recursively parses shorthand + value
      field_expression()
      |> ignore(spaced(":"))
      |> ignore(string("!"))
      |> parsec(:shorthand_op)
      |> concat(value())
      |> reduce(:postfix_negated),

      # negated comparison: field:!>value
      field_expression()
      |> ignore(spaced(":"))
      |> ignore(string("!"))
      |> parsec(:comparison_op)
      |> concat(numeric_literal())
      |> reduce(:postfix_negated),

      # comparison: field:>value, field:>=value, etc.
      field_expression()
      |> ignore(spaced(":"))
      |> parsec(:comparison_op)
      |> concat(numeric_literal())
      |> reduce(:postfix),

      # simple comparison: field:value or field:*value
      field_expression() |> parsec(:comparator) |> concat(value()) |> reduce(:postfix)
    ]),
    export_combinator: true
  )

  def postfix([field, op, value]), do: {op, [], [field, value]}

  # Bracket shorthand: single value → equality, multiple values → IN
  def postfix_bracket([field, value]), do: {:==, [], [field, value]}
  def postfix_bracket([field | values]), do: {:in, [], [field, values]}

  # one_of: single value → equality, multiple values → IN
  def postfix_inject([field, :one_of, [value]]), do: {:==, [], [field, value]}

  def postfix_inject([field, :one_of | params]) do
    values = Enum.map(params, fn [value | _opts] -> value end)
    {:in, [], [field, values]}
  end

  # Other predicates: single value → direct, multiple values → wrap in OR
  def postfix_inject([field, op, [value]]), do: {op, [], [field, value]}

  def postfix_inject([field, op | params]) do
    Enum.map(params, fn
      [value] -> {op, [], [field, value]}
      [value | options] -> {op, [], [field, value, options]}
    end)
    |> wrap_or
  end

  def wrap_or([a, b]), do: {:or, [], [a, b]}
  def wrap_or([a]), do: a
  def wrap_or([head | tail]), do: {:or, [], [head, wrap_or(tail)]}
  def wrap_or(a), do: a

  def wrap_and([a, b]), do: {:and, [], [a, b]}
  def wrap_and([a]), do: a
  def wrap_and([head | tail]), do: {:and, [], [head, wrap_and(tail)]}
  def wrap_and(a), do: a

  def wrap_not([a]), do: {:not, [], a}

  # Negated simple value: field:!value or field:!*value
  def postfix_negated([field, op, value]) do
    {:not, [], {op, [], [field, value]}}
  end

  # Negated predicate function calls: field:!contains(a, b) -> AND of negated conditions
  # Unlike regular predicates (which expand to OR), negated predicates expand to AND
  # because "not a AND not b" means "neither a nor b"
  def postfix_inject_negated([field, op, [value]]) do
    {:not, [], {op, [], [field, value]}}
  end

  def postfix_inject_negated([field, op | params]) do
    Enum.map(params, fn
      [value] -> {:not, [], {op, [], [field, value]}}
      [value | options] -> {:not, [], {op, [], [field, value, options]}}
    end)
    |> wrap_and
  end

  def postfix_range([field, {:between, [start_val, end_val]}]) do
    {:between, [], [field, start_val, end_val]}
  end

  def postfix_range_negated([field, {:between, [start_val, end_val]}]) do
    {:not, [], {:between, [], [field, start_val, end_val]}}
  end

  def postfix_between([field, :between, start_val, end_val]) do
    {:between, [], [field, start_val, end_val]}
  end

  def postfix_between_negated([field, :between, start_val, end_val]) do
    {:not, [], {:between, [], [field, start_val, end_val]}}
  end
end
