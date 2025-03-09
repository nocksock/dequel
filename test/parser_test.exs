defmodule DequelParserTest do
  alias Dequel.Parser.ValueExpression
  use ExUnit.Case
  doctest Dequel.Parser

  def sigil_Q(str, []) do
    Dequel.Parser.parse!(str)
  end

  test "base experssion", do:
    assert ~Q<field:"value"> ==
      {:==, [], [:field, "value"]}

  test "implicit string value", do:
    assert ~Q<field:value> ==
      {:==, [], [:field, "value"]}

  test "implicit string value with predicate alias", do:
    assert ~Q<field:*value> ==
      {:contains, [], [:field, "value"]}

  test "explicit string value with predicate alias", do:
    assert ~Q<field:*"value"> ==
      {:contains, [], [:field, "value"]}

  test "string value with spaces", do:
    assert ~Q<field:"value with spaces"> ==
      {:==, [], [:field, "value with spaces"]}

  test "string with quotes", do:
    assert ~Q<field:"value with spaces"> ==
      {:==, [], [:field, "value with spaces"]}

  test "whitespace after comparator", do:
    assert ~Q<field: "value with spaces"> ==
      {:==, [], [:field, "value with spaces"]}

  test "whitespace after comparator with value prefix", do:
    assert ~Q<field:  *"value with spaces"> ==
      {:contains, [], [:field, "value with spaces"]}

  test "invert expression with ! prefix", do:
    assert ~Q<!field:value> ==
      {:not, [], {:==, [], [:field, "value"]}}

  describe "implicit and literal binary operation:" do
    test "implicit and", do:
      assert ~Q<a:a b:b> == # {{{
        {:and, [], [
          {:==, [], [:a, "a"]},
          {:==, [], [:b, "b"]},
        ]}# }}}
    test "  A && B (explicit literal)", do:
      assert ~Q<a:a { b:b }> == # {{{
        {:and, [], [
          {:==, [], [:a, "a"]},
          {:==, [], [:b, "b"]},
        ]}# }}}
    test "  A || B", do:
      assert ~Q<a:a || b:b> == # {{{
        {:or, [], [
          {:==, [], [:a, "a"]},
          {:==, [], [:b, "b"]},
        ]}# }}}
    test "  A && ( B && C )", do:
      assert ~Q<a:a b:b c:c> == # {{{
        {:and, [], [
          {:==, [], [:a, "a"]},
          {:and, [], [
            {:==, [], [:b, "b"]},
            {:==, [], [:c, "c"]},
          ]}
        ]}# }}}
    test "  A && ( B && C ) (explicit)", do:
      assert ~Q<a:a { b:b { c:c } }> == # {{{
        {:and, [], [
          {:==, [], [:a, "a"]},
          {:and, [], [
            {:==, [], [:b, "b"]},
            {:==, [], [:c, "c"]},
          ]}
        ]}# }}}
    test "  A && ( B || C )", do:
      assert ~Q<a:a b:b || c:c> == # {{{
        {:and, [], [
          {:==, [], [:a, "a"]},
          {:or, [], [
            {:==, [], [:b, "b"]},
            {:==, [], [:c, "c"]},
          ]},
        ]} # }}}
    test "  A || ( B || C )", do:
      assert ~Q<a:a || b:b || c:c> == # {{{
        {:or, [], [
          {:==, [], [:a, "a"]},
          {:or, [], [
            {:==, [], [:b, "b"]},
            {:==, [], [:c, "c"]},
          ]},
        ]}# }}}
    test "  A || ( B && C )", do:
      assert ~Q<a:a || b:b && c:c> == # {{{
        {:or, [], [
          {:==, [], [:a, "a"]},
          {:and, [], [
            {:==, [], [:b, "b"]},
            {:==, [], [:c, "c"]},
          ]},
        ]}# }}}
    test " A || B C  ==  ( A || B ) && C", do:
      assert ~Q<a:a || b:b c:c> == # {{{
        {:and, [], [
          {:or, [], [
            {:==, [], [:a, "a"]},
            {:==, [], [:b, "b"]},
          ]},
          {:==, [], [:c, "c"]},
        ]}# }}}
    test "( A && B ) || C", do:
      assert ~Q<{ a:a b:b } or c:c> == #{{{
        {:or, [], [
          {:and, [], [
            {:==, [], [:a, "a"]},
            {:==, [], [:b, "b"]},
          ]},
          {:==, [], [:c, "c"]},
        ]} # }}}
  end

  describe "predicate" do
    test "with single argument ", do:
      assert ~Q<a:contains(b)> ==
        {:contains, [], [:a, "b"]}

    test "with explicit string argument", do:
      assert ~Q<a:ends_with("foo")> ==
        {:ends_with, [], [:a, "foo"]}

    test "with multiple and implicit string arguments", do:
      assert ~Q<a:starts_with(b, c)> ==
        {:or, [], [
          {:starts_with, [], [:a, "b"]},
          {:starts_with, [], [:a, "c"]}
        ]}

    test "with single argument and single flag ", do:
      assert ~Q<a:ends_with("foo" i)> ==
        {:ends_with, [], [:a, "foo", ["i"]]}

    test "with single argument and multiple flags", do:
      assert ~Q<a:ends_with("foo" a b c)> ==
        {:ends_with, [], [:a, "foo", ["a", "b", "c"]]}

    test "with single argument and flag", do:
      assert ~Q<a:ends_with("foo" i)> ==
        {:ends_with, [], [:a, "foo", ["i"]]}

    test "with single argument and option ", do:
      assert ~Q"""
        a:ends_with("foo" xyz)
      """ ==
        {:ends_with, [], [:a, "foo", ["xyz"]]}

    test "with multiple arguments and option ", do:
      assert ~Q<a:ends_with("a" i, b x y)> ==
        {:or, [], [
          {:ends_with, [], [:a, "a", ["i"]]},
          {:ends_with, [], [:a, "b", ["x", "y"]]},
        ]}

  end

  describe "string predicate shorthands" do
    test "*", do: assert ~Q<a: *b> == {:contains, [], [:a, "b"]}
    test "^", do: assert ~Q<a:  ^"b"> == {:starts_with, [], [:a, "b"]}
    test "$", do: assert ~Q<a :$"foo bar"> == {:ends_with, [], [:a, "foo bar"]}

    # Continue:
    # test "a: $(b, c)" #, do: assert ~Q<a: $(b, c)> == {:ends_with, [], [:a, "foo bar"]}
  end

  # describe "numeric comparators" do
  # # these don't need the foo > (10, 20) as it doesn't makes sense.
  #   test "title > 10"  # , do: assert ~Q[a > 10] === {:>, [], [:a, 10]}
  #   test "a < 10"  # , do: assert ~Q[a < 10] === {:<, [], [:a, 10]}
  #   test "a <= 10" # , do: assert ~Q[a < 10] === {:<=, [], [:a, 10]}
  #   test "a >= 10" # , do: assert ~Q[a < 10] === {:>=, [], [:a, 10]}
  # 
  # # but these can have that again
  #   test "a <> (10 20)" # in between 10 and 20, inclusive
  #   test "a <> (10 20, 40 60)" # in between
  #   test "a >< (10 20)" # outside of
  #   test "a >< (10 20, 30)" # outside of, basicalle alternate way to describe in betweens
  # end

  # describe "date comparators" do
  #   test "a > 2024-08-12"  # , do: assert ~Q[a > 10] === {:>, [], [:a, 10]}
  #   test "a < 2024-08-12"  # , do: assert ~Q[a < 10] === {:<, [], [:a, 10]}
  #   test "a <= 2024-08-12" # , do: assert ~Q[a < 10] === {:<=, [], [:a, 10]}
  #   test "a >= 2024-08-12" # , do: assert ~Q[a < 10] === {:>=, [], [:a, 10]}
  #   test "a <> (2024-08-12 2024-08-23)" # in between
  #   test "a >< (2024-08-12 2024-08-23)" # outside of
  # end

  # describe "field functions" do
  #   test "sum(a b) > 10"
  #   test "sum(a b, c d) > 10"
  # end
end
