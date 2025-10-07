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

  defcombinator(
    :comparator,
    [
      colon() |> concat(string("*")) |> replace(:contains),
      colon() |> concat(string("^")) |> replace(:starts_with),
      colon() |> concat(string("$")) |> replace(:ends_with),
      spaced(string("<=")) |> replace(:<=),
      spaced(string(">=")) |> replace(:>=),
      spaced(string("<>")) |> replace(:in_between),
      spaced(string("><")) |> replace(:outside_of),
      spaced(string("<")) |> replace(:<),
      spaced(string(">")) |> replace(:>),
      colon() |> replace(:==)
    ]
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
    choice([
      string("contains") |> replace(:contains),
      string("starts_with") |> replace(:starts_with),
      string("ends_with") |> replace(:ends_with),
      string("in_between") |> replace(:in_between),
      string("outside_of") |> replace(:outside_of),
      string("lt") |> replace(:<),
      string("lte") |> replace(:<=),
      string("gt") |> replace(:>),
      string("gte") |> replace(:>=)
    ])
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
