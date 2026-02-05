defmodule Dequel.Parser.Predicates do
  @moduledoc """
  Parses predicates (operators) in field expressions.

  ## Syntax

  Predicates appear after the colon in field expressions:

      title:foobar           # equality (implicit)
      title:*foobar          # contains (shorthand)
      title:contains(foobar) # contains (explicit)

  ## Available Predicates

  | Predicate     | Shorthand | Example                    |
  |---------------|-----------|----------------------------|
  | `==`          | `:`       | `title:value`              |
  | `contains`    | `*`       | `title:*value`             |
  | `starts_with` | `^`       | `title:^value`             |
  | `ends_with`   | `$`       | `title:$value`             |
  | `one_of`      | `[...]`   | `title:[a, b, c]`          |

  ## Multi-Value Expansion

  Comma-separated values in parentheses expand to OR conditions:

      name:contains(foo, bar)
      # expands to: name:contains(foo) OR name:contains(bar)

  Think of it like the distributive property: `p(a, b) = p(a) OR p(b)`.

  ## Predicate Options

  Options follow the value, separated by whitespace:

      name:contains(frodo i)
      #                   ^ case-insensitive flag

  The parser accepts any options; validation is handled by the linter.
  """
  import NimbleParsec
  import Dequel.Parser.Helper
  import Dequel.Parser.Token

  @predicates %{
    contains: "*",
    starts_with: "^",
    ends_with: "$"
  }

  # one_of expands to equality checks - shorthand is bracket syntax handled in FieldMatch
  @equality_predicates [:one_of]

  any_predicate =
    ((@predicates
      |> Map.keys()
      |> Enum.map(fn op -> string(to_string(op)) |> replace(op) end)) ++
       (@equality_predicates
        |> Enum.map(fn op -> string(to_string(op)) |> replace(op) end)))
    |> choice()

  # Shorthand symbols without colon (for use after :!)
  shorthand_only =
    @predicates
    |> Enum.map(fn {op, sym} ->
      string(sym) |> replace(op)
    end)
    |> choice()

  # Comparison operators - must try >= and <= before > and <
  comparison_operator =
    choice([
      string(">=") |> replace(:>=),
      string("<=") |> replace(:<=),
      string(">") |> replace(:>),
      string("<") |> replace(:<)
    ])

  defcombinator(
    :comparison_op,
    comparison_operator
  )

  # Shorthand with colon prefix
  any_shorthand =
    @predicates
    |> Enum.map(fn {op, sym} ->
      colon()
      |> concat(string(sym))
      |> replace(op)
    end)

  defcombinator(
    :comparator,
    any_shorthand
    |> Enum.concat([colon() |> replace(:==)])
    |> choice()
  )

  # Parses shorthand operator without colon: *, ^, $
  # Returns the operator atom or nil for plain equality
  defcombinator(
    :shorthand_op,
    choice([shorthand_only, empty() |> replace(:==)])
  )

  def to_options([value | options]) when is_list(options) do
    [value] ++ options
  end

  def to_options([value]), do: value

  defcombinator(
    :parameter,
    value()
    |> repeat(spaced(identifier()))
    |> reduce(:to_options)
  )

  defparsec(
    :function_call,
    any_predicate
    |> ignore(ascii_char([?(]))
    |> spaced(
      choice([
        parsec(:parameter)
        |> repeat(
          ignore(spaced(string(",")))
          |> concat(parsec(:parameter))
        ),
        optional(whitespace())
      ])
    )
    |> ignore(ascii_char([?)]))
    |> label("predicate"),
    export_combinator: true
  )
end
