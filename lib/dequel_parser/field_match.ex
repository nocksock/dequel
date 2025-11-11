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

  # Bracket shorthand produces equality checks
  def postfix_bracket([field | values]) do
    values
    |> Enum.map(fn value -> {:==, [], [field, value]} end)
    |> wrap_or
  end

  # one_of expands to equality checks
  defp normalize_op(:one_of), do: :==
  defp normalize_op(op), do: op

  def postfix_inject([field, op, [value]]), do: {normalize_op(op), [], [field, value]}

  def postfix_inject([field, op | params]) do
    actual_op = normalize_op(op)

    Enum.map(params, fn
      [value] -> {actual_op, [], [field, value]}
      [value | options] -> {actual_op, [], [field, value, options]}
    end)
    |> wrap_or
  end

  def wrap_or([a, b]), do: {:or, [], [a, b]}
  def wrap_or([a]), do: a
  def wrap_or(a), do: a

  def wrap_not([a]), do: {:not, [], a}
end
