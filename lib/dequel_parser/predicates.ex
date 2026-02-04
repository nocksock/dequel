defmodule Dequel.Parser.Predicates do
  @moduledoc """
  This module handles the parsing of predicates/comparators/operators.

  ```
  title: foobar
       ^^^^^^^^- this part

  title:contains(foobar)
       ^^^^^^^^^^^^^^^^- this part

  ```

  Note that the `:` is also part of this. 
  Conceptually it works similar to Lua's `:`.
  Meaning, that the part before the colon will be inserted as first arg into the predicate.
  So the predicate is actually called like `contains(field_name, value[, options])`.
  `options` is an optional array of additional args.

  One crucial deviation from conventional methods is that in the DQL form, the parenthesis may contain a list, which is not a list of parameters.
  Instead it's combined into an `OR` condition:

  ```
  field_name:contains(foo, bar) => contains(field_name, "foo") OR contains(field_name, "bar")
  ```

  A good way to think about this is that it's somewhat similar to maths: `x(a + b) = xa + xb`

  But predicates actually *can* have parameters; they're just separated by white
  space: `field_name:contains(frodo i)`. `i` in this case is a flag that denotes "case insensitive". 

  The type of flags or options that a predicate accepts, is the responsibility of that predicate.
  The parser allows any number of value-expressions. 
  So `field_name:contains(frodo a b c d "123" foo bar)` is nonsense, but valid syntax.
  It will be the linter's job to detect this type of issue.

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

  # Shorthand prefix inside has(): *value, ^value, $value
  has_shorthand =
    @predicates
    |> Enum.map(fn {op, sym} ->
      string(sym) |> replace(op)
    end)
    |> choice()

  # Parameter for has() - can have optional shorthand prefix
  defcombinator(
    :has_parameter,
    optional(has_shorthand)
    |> concat(value())
    |> reduce(:wrap_has_param)
  )

  def wrap_has_param([value]), do: value
  def wrap_has_param([op, value]), do: {op, value}

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

  # has() function call - collection predicate with special parameter handling
  defparsec(
    :has_call,
    string("has")
    |> replace(:has)
    |> ignore(ascii_char([?(]))
    |> spaced(
      choice([
        parsec(:has_parameter)
        |> repeat(
          ignore(spaced(string(",")))
          |> concat(parsec(:has_parameter))
        ),
        optional(whitespace())
      ])
    )
    |> ignore(ascii_char([?)]))
    |> label("has predicate"),
    export_combinator: true
  )
end
