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
      # inverted expression, prefixed by ! or -
      ignore(spaced(ascii_string([?!, ?-], 1)))
      |> parsec(:field_match)
      |> reduce(:wrap_not),

      # bracket shorthand: field:[a, b, c]
      field_expression()
      |> ignore(spaced(":"))
      |> parsec(:bracket_list)
      |> reduce(:postfix_bracket),

      # predicate function call: field:contains(a, b)
      field_expression()
      |> ignore(spaced(":"))
      |> parsec(:function_call)
      |> reduce(:postfix_inject),

      # simple comparison: field:value or field:*value
      field_expression() |> parsec(:comparator) |> concat(value()) |> reduce(:postfix)
    ]),
    export_combinator: true
  )

  def postfix([rhs, op, lhs]), do: {op, [], [rhs, lhs]}

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

  def wrap_not([a]), do: {:not, [], a}
end
