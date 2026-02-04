defmodule Dequel.Semantic.AnalyzerTest do
  use ExUnit.Case

  alias Dequel.Semantic.Analyzer

  doctest Dequel.Semantic.Analyzer

  defp mock_resolver do
    fn field ->
      case field do
        :items -> %{kind: :has_many, resolver: nil}
        :author -> %{kind: :belongs_to, resolver: nil}
        :profile -> %{kind: :has_one, resolver: nil}
        :address -> %{kind: :embeds_one, resolver: nil}
        :tags -> %{kind: :embeds_many, resolver: nil}
        :age -> %{kind: :field, type: :integer}
        :active -> %{kind: :field, type: :boolean}
        :price -> %{kind: :field, type: :decimal}
        :created_at -> %{kind: :field, type: :date}
        :name -> %{kind: :field, type: :string}
        _ -> nil
      end
    end
  end

  # Legacy tuple resolver for backward compatibility tests
  defp legacy_resolver do
    fn field ->
      case field do
        :items -> {:has_many, nil}
        :author -> {:belongs_to, nil}
        :profile -> {:has_one, nil}
        _ -> nil
      end
    end
  end

  describe "analyze/2 without resolver" do
    test "passes through block nodes unchanged when no resolver provided" do
      ast = {:block, [], [:items, {:==, [], [:name, "foo"]}]}

      assert Analyzer.analyze(ast, nil) == ast
      assert Analyzer.analyze(ast) == ast
    end

    test "passes through comparison operators unchanged" do
      ast = {:==, [], [:name, "foo"]}
      assert Analyzer.analyze(ast) == ast
    end

    test "recursively analyzes AND expressions" do
      ast =
        {:and, [],
         [
           {:==, [], [:title, "LOTR"]},
           {:block, [], [:items, {:==, [], [:name, "ring"]}]}
         ]}

      result = Analyzer.analyze(ast, nil)

      assert result ==
               {:and, [],
                [
                  {:==, [], [:title, "LOTR"]},
                  {:block, [], [:items, {:==, [], [:name, "ring"]}]}
                ]}
    end

    test "recursively analyzes OR expressions" do
      ast =
        {:or, [],
         [
           {:==, [], [:name, "foo"]},
           {:==, [], [:name, "bar"]}
         ]}

      assert Analyzer.analyze(ast) == ast
    end

    test "recursively analyzes NOT expressions" do
      ast = {:not, [], {:==, [], [:name, "foo"]}}
      assert Analyzer.analyze(ast) == ast
    end
  end

  describe "analyze/2 with resolver" do
    test "transforms has_many block to exists with cardinality: :many" do
      ast = {:block, [], [:items, {:==, [], [:name, "foo"]}]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:exists, [cardinality: :many], [:items, {:==, [], [:name, "foo"]}]}
    end

    test "transforms belongs_to block to join with cardinality: :one" do
      ast = {:block, [], [:author, {:==, [], [:name, "Tolkien"]}]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:join, [cardinality: :one], [:author, {:==, [], [:name, "Tolkien"]}]}
    end

    test "transforms has_one block to join with cardinality: :one" do
      ast = {:block, [], [:profile, {:==, [], [:bio, "writer"]}]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:join, [cardinality: :one], [:profile, {:==, [], [:bio, "writer"]}]}
    end

    test "transforms embeds_one block to embedded with cardinality: :one" do
      ast = {:block, [], [:address, {:==, [], [:city, "NYC"]}]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:embedded, [cardinality: :one], [:address, {:==, [], [:city, "NYC"]}]}
    end

    test "transforms embeds_many block to embedded with cardinality: :many" do
      ast = {:block, [], [:tags, {:==, [], [:name, "urgent"]}]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:embedded, [cardinality: :many], [:tags, {:==, [], [:name, "urgent"]}]}
    end

    test "keeps unknown relation as block" do
      ast = {:block, [], [:unknown_relation, {:==, [], [:name, "foo"]}]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:block, [], [:unknown_relation, {:==, [], [:name, "foo"]}]}
    end

    test "recursively analyzes nested blocks with nested resolver" do
      # Nested resolver that knows about both levels (new map format)
      nested_resolver = fn field ->
        case field do
          :author ->
            %{
              kind: :belongs_to,
              resolver: fn
                :books -> %{kind: :has_many, resolver: nil}
                _ -> nil
              end
            }

          _ ->
            nil
        end
      end

      # author { books { title: Ring } }
      ast =
        {:block, [],
         [
           :author,
           {:block, [], [:books, {:contains, [], [:title, "Ring"]}]}
         ]}

      result = Analyzer.analyze(ast, nested_resolver)

      # author is belongs_to -> join with cardinality: :one
      # books is has_many (from nested resolver) -> exists with cardinality: :many
      assert result ==
               {:join, [cardinality: :one],
                [
                  :author,
                  {:exists, [cardinality: :many], [:books, {:contains, [], [:title, "Ring"]}]}
                ]}
    end

    test "analyzes blocks within AND expressions" do
      ast =
        {:and, [],
         [
           {:==, [], [:name, "LOTR"]},
           {:block, [], [:items, {:==, [], [:name, "ring"]}]}
         ]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result ==
               {:and, [],
                [
                  {:==, [], [:name, "LOTR"]},
                  {:exists, [cardinality: :many], [:items, {:==, [], [:name, "ring"]}]}
                ]}
    end

    test "analyzes blocks within OR expressions" do
      ast =
        {:or, [],
         [
           {:block, [], [:items, {:==, [], [:name, "ring"]}]},
           {:block, [], [:author, {:==, [], [:name, "Tolkien"]}]}
         ]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result ==
               {:or, [],
                [
                  {:exists, [cardinality: :many], [:items, {:==, [], [:name, "ring"]}]},
                  {:join, [cardinality: :one], [:author, {:==, [], [:name, "Tolkien"]}]}
                ]}
    end

    test "analyzes blocks within NOT expressions" do
      ast = {:not, [], {:block, [], [:items, {:==, [], [:name, "ring"]}]}}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result ==
               {:not, [], {:exists, [cardinality: :many], [:items, {:==, [], [:name, "ring"]}]}}
    end

    test "preserves and merges metadata in transformed nodes" do
      ast = {:block, [line: 1, column: 5], [:items, {:==, [], [:name, "foo"]}]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result ==
               {:exists, [line: 1, column: 5, cardinality: :many],
                [:items, {:==, [], [:name, "foo"]}]}
    end
  end

  describe "backward compatibility with legacy tuple resolver" do
    test "transforms has_many block to exists with legacy resolver" do
      ast = {:block, [], [:items, {:==, [], [:name, "foo"]}]}

      result = Analyzer.analyze(ast, legacy_resolver())

      assert result == {:exists, [cardinality: :many], [:items, {:==, [], [:name, "foo"]}]}
    end

    test "transforms belongs_to block to join with legacy resolver" do
      ast = {:block, [], [:author, {:==, [], [:name, "Tolkien"]}]}

      result = Analyzer.analyze(ast, legacy_resolver())

      assert result == {:join, [cardinality: :one], [:author, {:==, [], [:name, "Tolkien"]}]}
    end

    test "transforms has_one block to join with legacy resolver" do
      ast = {:block, [], [:profile, {:==, [], [:bio, "writer"]}]}

      result = Analyzer.analyze(ast, legacy_resolver())

      assert result == {:join, [cardinality: :one], [:profile, {:==, [], [:bio, "writer"]}]}
    end
  end

  describe "type coercion" do
    test "coerces integer field values" do
      ast = {:==, [], [:age, "25"]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:==, [], [:age, 25]}
    end

    test "coerces boolean field values" do
      ast = {:==, [], [:active, "true"]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:==, [], [:active, true]}
    end

    test "coerces decimal field values" do
      ast = {:==, [], [:price, "19.99"]}

      result = Analyzer.analyze(ast, mock_resolver())

      {_, _, [:price, value]} = result
      assert Decimal.equal?(value, Decimal.new("19.99"))
    end

    test "coerces date field values" do
      ast = {:==, [], [:created_at, "2024-01-15"]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:==, [], [:created_at, ~D[2024-01-15]]}
    end

    test "leaves string fields unchanged" do
      ast = {:==, [], [:name, "foo"]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:==, [], [:name, "foo"]}
    end

    test "leaves unknown field values unchanged" do
      ast = {:==, [], [:unknown_field, "value"]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:==, [], [:unknown_field, "value"]}
    end

    test "coerces values in :in operator with list" do
      ast = {:in, [], [:age, ["20", "30", "40"]]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:in, [], [:age, [20, 30, 40]]}
    end

    test "coerces values in :contains operator" do
      ast = {:contains, [], [:name, "foo"]}

      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:contains, [], [:name, "foo"]}
    end

    test "coerces values in nested block expressions" do
      # Resolver that provides type info in nested context
      nested_resolver = fn field ->
        case field do
          :author ->
            %{
              kind: :belongs_to,
              resolver: fn
                :age -> %{kind: :field, type: :integer}
                :verified -> %{kind: :field, type: :boolean}
                _ -> nil
              end
            }

          _ ->
            nil
        end
      end

      ast =
        {:block, [],
         [
           :author,
           {:and, [],
            [
              {:==, [], [:verified, "true"]},
              {:==, [], [:age, "42"]}
            ]}
         ]}

      result = Analyzer.analyze(ast, nested_resolver)

      assert result ==
               {:join, [cardinality: :one],
                [
                  :author,
                  {:and, [],
                   [
                     {:==, [], [:verified, true]},
                     {:==, [], [:age, 42]}
                   ]}
                ]}
    end

    test "no coercion when resolver is nil" do
      ast = {:==, [], [:age, "25"]}

      result = Analyzer.analyze(ast, nil)

      assert result == {:==, [], [:age, "25"]}
    end
  end

  describe "integration with parser" do
    test "end-to-end: parse and analyze" do
      # Parse: items { name: foo }
      ast = Dequel.Parser.parse!("items { name:foo }")

      assert ast == {:block, [], [:items, {:==, [], [:name, "foo"]}]}

      # Analyze with resolver
      result = Analyzer.analyze(ast, mock_resolver())

      assert result == {:exists, [cardinality: :many], [:items, {:==, [], [:name, "foo"]}]}
    end

    test "end-to-end: complex query with mixed blocks" do
      # Parse: name:LOTR items { name:ring }
      ast = Dequel.Parser.parse!("name:LOTR items { name:ring }")

      assert ast ==
               {:and, [],
                [
                  {:==, [], [:name, "LOTR"]},
                  {:block, [], [:items, {:==, [], [:name, "ring"]}]}
                ]}

      # Analyze
      result = Analyzer.analyze(ast, mock_resolver())

      assert result ==
               {:and, [],
                [
                  {:==, [], [:name, "LOTR"]},
                  {:exists, [cardinality: :many], [:items, {:==, [], [:name, "ring"]}]}
                ]}
    end

    test "end-to-end: query with type coercion" do
      # Parse: age:25 active:true
      ast = Dequel.Parser.parse!("age:25 active:true")

      assert ast ==
               {:and, [],
                [
                  {:==, [], [:age, "25"]},
                  {:==, [], [:active, "true"]}
                ]}

      # Analyze with type coercion
      result = Analyzer.analyze(ast, mock_resolver())

      assert result ==
               {:and, [],
                [
                  {:==, [], [:age, 25]},
                  {:==, [], [:active, true]}
                ]}
    end
  end
end
