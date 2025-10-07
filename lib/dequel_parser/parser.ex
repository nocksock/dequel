defmodule Dequel.Parser do
  @moduledoc """
  Main parser module for converting Dequel query strings into AST.

  This module uses NimbleParsec to parse query strings following the Dequel grammar.
  The parser supports logical operators (AND/OR), grouping with braces, negation,
  and various field matching predicates.

  ## Grammar Structure

  The parser implements a precedence-based grammar:

  1. **Expression** - Top level, handles implicit AND (whitespace-separated terms)
  2. **Term** - Handles explicit AND/OR operators
  3. **Factor** - Field matches or grouped expressions

  ## AST Output

  All AST nodes are 3-tuples: `{:operator, metadata, [left, right]}`

  ### Examples

      # Simple equality
      parse!("name:frodo")
      #=> {:==, [], [:name, "frodo"]}

      # Logical operators
      parse!("name:frodo age:>30")
      #=> {:and, [], [{:==, [], [:name, "frodo"]}, {:>, [], [:age, "30"]}]}

      # Grouping
      parse!("{name:frodo || name:sam} age:>30")
      #=> {:and, [], [
           {:or, [], [{:==, [], [:name, "frodo"]}, {:==, [], [:name, "sam"]}]},
           {:>, [], [:age, "30"]}
         ]}

      # Negation
      parse!("!status:archived")
      #=> {:not, [], {:==, [], [:status, "archived"]}}

  ## Public Functions

  - `parse!/1` - Parses a complete query expression (raises on error)
  - `field_match!/1` - Parses a single field match expression (raises on error)
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
