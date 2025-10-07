defmodule Dequel.Parser.Token do
  @moduledoc """
  Token definitions and combinators for the Dequel parser.

  This module defines all the basic tokens used in the Dequel query language,
  including field names, values, operators, and keywords.

  ## Token Types

  - **Identifiers**: Field names and unquoted string values (`a-z`, `A-Z`, `_`)
  - **Numbers**: Integer values (converted to strings for consistency)
  - **Strings**: Quoted string literals with escape support
  - **Operators**: Logical (AND/OR), comparison (<, >, <=, >=)
  - **Symbols**: Colon (`:`) for field assignment

  ## Examples

      # Field identifier
      identifier() # matches: "name", "status", "user_id"

      # Values
      value() # matches: "alice", "123", "\"quoted string\""

      # Operators
      op_explicit_and() # matches: "&&", "AND", "and"
      op_explicit_or() # matches: "||", "OR", "or"
  """

  import NimbleParsec
  import Dequel.Parser.Helper

  def field_assignment, do: ignore(string(":"))
  def identifier, do: ascii_string([?a..?z, ?A..?Z, ?_], min: 1)
  def flag, do: ascii_char([?a..?z, ?A..?Z, ?_])
  def number_int, do: integer(min: 1) |> post_traverse(:num_to_string)

  def num_to_string(rest, args, context, _, _) do
    {rest, args |> Enum.map(&to_string/1), context}
  end

  def number do
    choice([
      identifier(),
      number_int()
    ])
  end

  def value do
    choice([
      string_with_quotes(),
      identifier(),
      number()
    ])
  end

  def colon, do: spaced(string(":"))

  def op_implicit_and, do: string(" ") |> replace(:and)

  def op_explicit_and,
    do:
      ["&&", "AND", "and"]
      |> Enum.map(&spaced/1)
      |> choice()
      |> replace(:and)

  def op_explicit_or,
    do:
      ["||", "OR", "or"]
      |> Enum.map(&spaced/1)
      |> choice()
      |> replace(:or)

  def field_expression do
    identifier() |> reduce(:to_existing_atom)
  end

  def to_existing_atom([field]), do: String.to_existing_atom(field)

  def string_with_quotes do
    ignore(ascii_char([?"]))
    |> repeat_while(
      choice([
        ~S(\") |> string() |> replace(?"),
        utf8_char([])
      ]),
      {:not_quote, []}
    )
    |> ignore(ascii_char([?"]))
    |> reduce({List, :to_string, []})
  end

  def not_quote(<<?", _::binary>>, context, _, _), do: {:halt, context}
  def not_quote(_, context, _, _), do: {:cont, context}
end
