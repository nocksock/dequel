defmodule Dequel.Parser do
  @moduledoc """
  Parser for the Dequel query language using NimbleParsec.

  Parses query strings into AST tuples like `{:==, [], [:field, "value"]}`.
  """

  import NimbleParsec
  import Dequel.Parser.Token
  import Dequel.Parser.Helper
  import Dequel.Parser.FieldMatch

  defparsec(
    :expression,
    spaced(
      choice([
        parsec(:term) |> concat(op_implicit_and()) |> parsec(:expression) |> reduce(:postfix),
        parsec(:term)
      ])
    )
  )

  defparsec(
    :term,
    choice([
      parsec(:factor) |> concat(op_explicit_and()) |> parsec(:expression) |> reduce(:postfix),
      parsec(:factor) |> concat(op_explicit_or()) |> parsec(:term) |> reduce(:postfix),
      parsec(:factor)
    ])
  )

  defparsec(
    :factor,
    choice([
      parsec(:field_match),
      ignore(ascii_char([?{]))
      |> spaced(parsec(:expression))
      |> ignore(ascii_char([?}]))
    ])
  )

  def parse!(input), do: unwrap(expression(input))
  def field_match!(input), do: unwrap(field_match(input))
end
