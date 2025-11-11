defmodule Dequel.Parser.Helper do
  @moduledoc """
  Helper functions for building NimbleParsec combinators in the Dequel parser.
  """

  import NimbleParsec

  def whitespace, do: ignore(ascii_string([?\s, ?\t, ?\n, ?\r], min: 1))

  def spaced(comb \\ empty(), right \\ [])
  def spaced(str, right) when is_binary(str), do: spaced(string(str), right)

  def spaced(combinator, right)
      when is_list(combinator) do
    optional(whitespace())
    |> concat(combinator)
    |> optional(whitespace())
    |> concat(right)
    |> optional(whitespace())
  end

  # Debug helper for parser development - call with |> tap()
  # Only use during parser debugging, comment out in production
  def tap(comb),
    do:
      comb
      |> post_traverse(:tap)

  # credo:disable-for-next-line Credo.Check.Warning.IoInspect
  def tap(rest, buffer, context, _line, _offset) do
    # Uncomment the line below when debugging parser issues:
    # IO.inspect({rest, buffer, context, line, offset}, label: "Parser Debug")
    {rest, buffer, context}
  end

  def unwrap(result) do
    case result do
      {:ok, [root], _rest, _context, _line, _column} ->
        root

      {:ok, root, _rest, _context, _line, _column} ->
        root

      {:error, reason, rest, context, {line, offset_to_start_of_line}, byte_offset} ->
        column = byte_offset - offset_to_start_of_line
        {:error, %{message: reason, context: context, line: line, column: column, rest: rest}}
    end
  end
end
