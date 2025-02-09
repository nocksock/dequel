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

  defparsec(
    :field_match,
    choice([
      field_expression()
      |> ignore(spaced(":"))
      |> parsec(:function_call)
      |> reduce(:postfix_inject),
      field_expression() |> parsec(:comparator) |> concat(value()) |> reduce(:postfix)
    ]),
    export_combinator: true
  )

  def postfix([rhs, op, lhs]), do: {op, [], [rhs, lhs]}

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
  def wrap_or(a), do: a
end
