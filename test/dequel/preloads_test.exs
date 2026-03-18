defmodule Dequel.PreloadsTest do
  use ExUnit.Case, async: true

  doctest Dequel.Preloads

  describe "extract/1 with string queries" do
    test "returns empty list for empty query" do
      assert Dequel.preloads("") == []
      assert Dequel.preloads("   ") == []
    end

    test "returns empty list for simple field query" do
      assert Dequel.preloads("title:Rings") == []
      assert Dequel.preloads("page_count:>100") == []
    end

    test "extracts single-level dot notation" do
      assert Dequel.preloads("author.name:Tolkien") == [:author]
    end

    test "extracts nested dot notation" do
      # author.publisher.name needs [author: :publisher]
      preloads = Dequel.preloads("author.publisher.name:Penguin")
      assert preloads == [author: :publisher]
    end

    test "extracts block syntax relations" do
      assert Dequel.preloads("tags{name:fiction}") == [:tags]
    end

    test "extracts nested block syntax" do
      # reviews{book{title:x}} should give [reviews: :book] or [reviews: [:book]]
      preloads = Dequel.preloads("reviews{book{title:Rings}}")
      # Either format is valid for Ecto.Repo.preload
      assert preloads == [reviews: :book] or preloads == [reviews: [:book]]
    end

    test "combines dot notation and block syntax" do
      preloads = Dequel.preloads("author.country:UK tags{name:fiction}")
      assert Enum.sort(preloads) == Enum.sort([:author, :tags])
    end

    test "deduplicates preloads" do
      preloads = Dequel.preloads("author.name:Tolkien author.country:UK")
      assert preloads == [:author]
    end

    test "merges nested preloads" do
      # Multiple paths through same relation should merge
      preloads = Dequel.preloads("author.name:Tolkien author.publisher.name:Penguin")
      assert preloads == [author: :publisher]
    end

    test "handles OR queries" do
      preloads = Dequel.preloads("author.name:Tolkien or tags{name:fantasy}")
      assert Enum.sort(preloads) == Enum.sort([:author, :tags])
    end

    test "handles negation" do
      preloads = Dequel.preloads("-author.country:USA")
      assert preloads == [:author]
    end
  end

  describe "extract/1 with parsed AST" do
    test "extracts from equality AST" do
      ast = {:==, [], [[:author, :name], "Tolkien"]}
      assert Dequel.preloads(ast) == [:author]
    end

    test "extracts from semantic EXISTS node" do
      ast = {:exists, [cardinality: :many], [:tags, {:==, [], [:name, "fiction"]}]}
      assert Dequel.preloads(ast) == [:tags]
    end

    test "extracts from semantic JOIN node" do
      ast = {:join, [cardinality: :one], [:author, {:==, [], [:name, "Tolkien"]}]}
      assert Dequel.preloads(ast) == [:author]
    end

    test "extracts from semantic EMBEDDED node" do
      ast = {:embedded, [cardinality: :many], [:metadata, {:==, [], [:key, "value"]}]}
      assert Dequel.preloads(ast) == [:metadata]
    end

    test "extracts from AND node" do
      ast =
        {:and, [],
         [
           {:==, [], [[:author, :name], "Tolkien"]},
           {:exists, [cardinality: :many], [:tags, {:==, [], [:name, "fiction"]}]}
         ]}

      preloads = Dequel.preloads(ast)
      assert Enum.sort(preloads) == Enum.sort([:author, :tags])
    end

    test "extracts from NOT node" do
      ast = {:not, [], {:==, [], [[:author, :country], "USA"]}}
      assert Dequel.preloads(ast) == [:author]
    end
  end
end
