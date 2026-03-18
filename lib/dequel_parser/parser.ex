defmodule Dequel.Parser do
  @moduledoc """
  Parser for the Dequel query language using NimbleParsec.

  Parses query strings into AST tuples like `{:==, [], ["field", "value"]}`.

  ## Field Names as Strings

  Field names and relation names are kept as strings in the parser output.
  This allows parsing queries without requiring schema atoms to be loaded first.

  The conversion to atoms is deferred to the semantic analysis or adapter layer,
  which has schema context available to safely convert strings to atoms using
  `String.to_existing_atom/1`.

  This design ensures:
  1. **Parsing works without schema** - Queries can be validated syntactically
     without loading Ecto schemas.
  2. **No atom table exhaustion** - Strings are only converted to atoms by
     adapters/analyzers that validate against known schemas.
  3. **Better error messages** - The semantic layer can provide context-aware
     errors for unknown fields.
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
    {:block, [], [relation, inner]}
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
