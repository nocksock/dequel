defmodule Dequel.EnumTest do
  use ExUnit.Case

  alias Dequel.Enum.Item

  defp item(attrs \\ %{}) do
    default = %{
      name: "default name",
      description: "default description"
    }

    Map.merge(default, attrs)
    |> Item.new()
  end

  describe "filter/2 with string queries" do
    test "filters by exact field match" do
      items = [
        item(%{name: "frodo"}),
        item(%{name: "bilbo"}),
        item(%{name: "samwise"})
      ]

      result = Dequel.Enum.filter("name:frodo", items)

      assert length(result) == 1
      assert hd(result).name == "frodo"
    end

    test "filters with implicit AND" do
      items = [
        item(%{name: "frodo", description: "baggins"}),
        item(%{name: "bilbo", description: "baggins"}),
        item(%{name: "frodo", description: "gamgee"})
      ]

      result = Dequel.Enum.filter("name:frodo description:baggins", items)

      assert length(result) == 1
      assert hd(result).name == "frodo"
      assert hd(result).description == "baggins"
    end

    test "filters with explicit OR" do
      items = [
        item(%{name: "frodo", description: "baggins"}),
        item(%{name: "bilbo", description: "baggins"}),
        item(%{name: "samwise", description: "gamgee"})
      ]

      result = Dequel.Enum.filter("name:frodo || name:bilbo", items)

      assert length(result) == 2
      assert Enum.any?(result, &(&1.name == "frodo"))
      assert Enum.any?(result, &(&1.name == "bilbo"))
    end

    test "filters with NOT operator" do
      items = [
        item(%{name: "frodo"}),
        item(%{name: "bilbo"}),
        item(%{name: "samwise"})
      ]

      result = Dequel.Enum.filter("!name:frodo", items)

      assert length(result) == 2
      assert Enum.all?(result, &(&1.name != "frodo"))
    end
  end

  describe "string predicates" do
    test "contains predicate" do
      items = [
        item(%{name: "frodo"}),
        item(%{name: "bilbo"}),
        item(%{name: "samwise"})
      ]

      result = Dequel.Enum.filter("name:*od", items)

      assert length(result) == 1
      assert hd(result).name == "frodo"
    end

    test "starts_with predicate" do
      items = [
        item(%{name: "frodo"}),
        item(%{name: "bilbo"}),
        item(%{name: "samwise"})
      ]

      result = Dequel.Enum.filter("name:^fro", items)

      assert length(result) == 1
      assert hd(result).name == "frodo"
    end

    test "ends_with predicate" do
      items = [
        item(%{name: "frodo"}),
        item(%{name: "bilbo"}),
        item(%{name: "samwise"})
      ]

      result = Dequel.Enum.filter("name:$do", items)

      assert length(result) == 1
      assert hd(result).name == "frodo"
    end

    test "contains with multiple values" do
      items = [
        item(%{name: "frodo", description: "ring bearer"}),
        item(%{name: "bilbo", description: "burglar"}),
        item(%{name: "samwise", description: "gardener"})
      ]

      result = Dequel.Enum.filter("name:contains(frodo, sam)", items)

      assert length(result) == 2
      assert Enum.any?(result, &(&1.name == "frodo"))
      assert Enum.any?(result, &(&1.name == "samwise"))
    end
  end

  describe "complex queries" do
    test "combines AND and OR with grouping" do
      items = [
        item(%{name: "frodo", description: "baggins"}),
        item(%{name: "bilbo", description: "baggins"}),
        item(%{name: "samwise", description: "gamgee"}),
        item(%{name: "frodo", description: "gamgee"})
      ]

      result = Dequel.Enum.filter("{name:frodo || name:samwise} description:gamgee", items)

      assert length(result) == 2
      assert Enum.all?(result, &(&1.description == "gamgee"))
      assert Enum.any?(result, &(&1.name == "frodo"))
      assert Enum.any?(result, &(&1.name == "samwise"))
    end
  end

  describe "helper functions" do
    test "match?/2 returns true for matching record" do
      items = [item(%{name: "frodo"})]
      ast = {:==, [], [:name, "frodo"]}

      assert Dequel.Enum.match?(ast, hd(items)) == true
    end

    test "match?/2 returns false for non-matching record" do
      items = [item(%{name: "frodo"})]
      ast = {:==, [], [:name, "bilbo"]}

      assert Dequel.Enum.match?(ast, hd(items)) == false
    end

    test "find_one/2 returns first matching record" do
      items = [
        item(%{name: "frodo"}),
        item(%{name: "bilbo"}),
        item(%{name: "frodo"})
      ]
      ast = {:==, [], [:name, "frodo"]}

      result = Dequel.Enum.find_one(ast, items)

      assert result.name == "frodo"
    end

    test "find_one/2 returns nil when no match" do
      items = [item(%{name: "frodo"})]
      ast = {:==, [], [:name, "bilbo"]}

      assert Dequel.Enum.find_one(ast, items) == nil
    end

    test "find_all/2 returns all matching records" do
      items = [
        item(%{name: "frodo"}),
        item(%{name: "bilbo"}),
        item(%{name: "frodo"})
      ]
      ast = {:==, [], [:name, "frodo"]}

      result = Dequel.Enum.find_all(ast, items)

      assert length(result) == 2
      assert Enum.all?(result, &(&1.name == "frodo"))
    end
  end

  describe "edge cases" do
    test "handles empty list" do
      result = Dequel.Enum.filter("name:frodo", [])
      assert result == []
    end

    test "handles non-matching filters gracefully" do
      items = [item(%{name: "frodo"})]
      result = Dequel.Enum.filter("name:gandalf", items)
      assert result == []
    end

    test "works with both string and atom field access" do
      items = [item(%{name: "frodo"})]

      # Both should work due to get_field_value implementation
      result_atom = Dequel.Enum.filter({:==, [], [:name, "frodo"]}, items)
      result_string = Dequel.Enum.filter({:==, [], ["name", "frodo"]}, items)

      assert result_atom == result_string
      assert length(result_atom) == 1
    end
  end
end
