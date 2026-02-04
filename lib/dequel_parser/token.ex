defmodule Dequel.Parser.Token do
  @moduledoc """
  Token parsers for the Dequel query language (identifiers, strings, operators, etc.).

  ## Atom Conversion

  Field paths are converted to atoms via `to_field_path/1` using
  `String.to_existing_atom/1`. This requires that field name atoms already
  exist (typically from compiled Ecto schemas). See `Dequel.Parser` moduledoc
  for details on atom safety.
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
    identifier()
    |> repeat(ignore(string(".")) |> concat(identifier()))
    |> reduce(:to_field_path)
  end

  def to_field_path([single]), do: String.to_existing_atom(single)
  def to_field_path(segments), do: Enum.map(segments, &String.to_existing_atom/1)

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
