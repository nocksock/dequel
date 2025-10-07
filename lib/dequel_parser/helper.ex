defmodule Dequel.Parser.Helper do
  @moduledoc """
  Parser combinator helpers and utilities for the Dequel parser.

  This module provides common parsing utilities used throughout the Dequel parser,
  including whitespace handling, debugging tools, and result unwrapping.

  ## Key Functions

  - `spaced/2` - Wraps a combinator with optional whitespace on both sides
  - `whitespace/0` - Matches and ignores whitespace characters
  - `unwrap/1` - Converts NimbleParsec results to simpler success/error tuples
  - `tap/1` - Debug helper to inspect parser state during development
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

  def tap(comb),
    do:
      comb
      |> post_traverse(:tap)

  def tap(rest, buffer, context, line, offset), do: dbg({rest, buffer, context, line, offset})

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
