defmodule Dequel.Parser do
  @moduledoc """
  Parser for the Dequel query language using NimbleParsec.

  Parses query strings into AST tuples like `{:==, [], [:field, "value"]}`.

  ## Atom Safety

  Field names and relation names in queries are converted to atoms using
  `String.to_existing_atom/1`. This means:

  1. **Schemas must be loaded before parsing** - The atoms for field names must
     already exist in the atom table. When using Ecto schemas, this happens
     automatically when the schema module is compiled/loaded.

  2. **Unknown fields will raise** - If a query references a field that doesn't
     exist as an atom, an `ArgumentError` will be raised. This is intentional
     to catch typos early rather than silently returning no results.

  3. **No atom table exhaustion** - Since we only convert to existing atoms,
     malicious queries cannot exhaust the atom table.

  For runtime field validation with better error messages, use the semantic
  analyzer with a schema resolver which can provide context-aware errors.
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

  # Object block for relation filtering: relation { conditions }
  defparsec(
    :object_block,
    identifier()
    |> ignore(spaced(ascii_char([?{])))
    |> spaced(parsec(:expression))
    |> ignore(ascii_char([?}]))
    |> reduce(:wrap_block)
  )

  def wrap_block([relation, inner]) do
    {:block, [], [String.to_existing_atom(relation), inner]}
  end

  defparsec(
    :factor,
    choice([
      parsec(:field_match),
      parsec(:object_block),
      ignore(ascii_char([?(]))
      |> spaced(parsec(:expression))
      |> ignore(ascii_char([?)]))
    ])
  )

  def parse!(input), do: unwrap(expression(input))
  def field_match!(input), do: unwrap(field_match(input))
end
