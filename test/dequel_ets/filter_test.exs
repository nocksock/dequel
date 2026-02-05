defmodule Dequel.Adapter.EtsTest do
  use Dequel.Adapter.Ets.RepoCase

  def create_item(attrs \\ %{}) do
    item = Item.new(attrs)
    ItemStore.insert(item)
  end

  def item_fixture(attrs \\ %{}) do
    %{description: "some description", name: "some name"}
    |> Map.merge(attrs)
    |> create_item()
  end

  defp sigil_ONE(input, []) do
    records = ItemStore.all()

    case Dequel.Adapter.Ets.FilterImpl.find_one(input, records) do
      nil -> nil
      record -> record
    end
  end

  defp sigil_ALL(input, []) do
    records = ItemStore.all()
    Dequel.Adapter.Ets.FilterImpl.find_all(input, records)
  end

  describe "ETS setup" do
    test "ets table is properly set up" do
      assert ItemStore.table_exists?()
    end

    test "can insert and retrieve items from ETS" do
      item = item_fixture(%{name: "test name"})
      assert item.name == "test name"
      assert item.description == "some description"

      all_items = ItemStore.all()
      assert length(all_items) == 1
      assert List.first(all_items).name == "test name"
    end
  end

  describe "basic filtering" do
    setup do
      frodo = item_fixture(%{name: "frodo", description: "baggins"})
      bilbo = item_fixture(%{name: "bilbo", description: "baggins"})
      samwise = item_fixture(%{name: "samwise", description: "gamgee"})

      %{frodo: frodo, bilbo: bilbo, samwise: samwise}
    end

    test "equality", %{frodo: frodo} do
      assert ~ONE<name:frodo> == frodo
    end

    test "binary and", %{frodo: frodo} do
      assert ~ALL<name:frodo description:baggins> == [frodo]
    end

    test "binary or", %{frodo: frodo, bilbo: bilbo} do
      result = ~ALL<name:frodo or name:bilbo>
      assert Enum.sort_by(result, & &1.name) == Enum.sort_by([frodo, bilbo], & &1.name)
    end

    test "binary operations", %{frodo: frodo, samwise: samwise} do
      _ = item_fixture(%{name: "frodo", description: "x"})

      result = ~ALL<name:contains(frodo, sam) (description:*g)>
      assert Enum.sort_by(result, & &1.name) == Enum.sort_by([frodo, samwise], & &1.name)
    end

    test "not operator with prefix", %{bilbo: bilbo, samwise: samwise} do
      result = ~ALL<-name:frodo>
      assert Enum.sort_by(result, & &1.name) == Enum.sort_by([bilbo, samwise], & &1.name)
    end

    test "value-level negation with !", %{bilbo: bilbo, samwise: samwise} do
      result = ~ALL<name:!frodo>
      assert Enum.sort_by(result, & &1.name) == Enum.sort_by([bilbo, samwise], & &1.name)
    end

    test "negated contains with !*", %{bilbo: bilbo, samwise: samwise} do
      result = ~ALL<name:!*od>
      assert Enum.sort_by(result, & &1.name) == Enum.sort_by([bilbo, samwise], & &1.name)
    end

    test "negated starts_with with !^", %{bilbo: bilbo, samwise: samwise} do
      result = ~ALL<name:!^fro>
      assert Enum.sort_by(result, & &1.name) == Enum.sort_by([bilbo, samwise], & &1.name)
    end

    test "negated ends_with with !$", %{bilbo: bilbo, samwise: samwise} do
      result = ~ALL<name:!$do>
      assert Enum.sort_by(result, & &1.name) == Enum.sort_by([bilbo, samwise], & &1.name)
    end

    test "negated predicate function with !contains", %{bilbo: bilbo, samwise: samwise} do
      result = ~ALL<name:!contains(od)>
      assert Enum.sort_by(result, & &1.name) == Enum.sort_by([bilbo, samwise], & &1.name)
    end

    test "string predicates", %{frodo: frodo} do
      _other = item_fixture(%{name: "bilfroxdox", description: "baggins"})

      assert ~ALL<name:*od> == [frodo]
      assert ~ALL<name:^fro> == [frodo]
      assert ~ALL<name:$do> == [frodo]
    end
  end

  describe "nested field paths (relationship filtering)" do
    # These tests use raw maps with nested structure instead of the Item struct
    # to test the ETS adapter's ability to handle nested data

    test "filters by single-level nested field" do
      records = [
        %{id: 1, name: "LOTR", author: %{name: "Tolkien"}},
        %{id: 2, name: "Dune", author: %{name: "Herbert"}}
      ]

      ast = Dequel.Parser.parse!("author.name:Tolkien")
      result = Dequel.Adapter.Ets.FilterImpl.filter(ast, records)

      assert length(result) == 1
      assert hd(result).name == "LOTR"
    end

    test "filters by deeply nested field" do
      records = [
        %{id: 1, name: "LOTR", author: %{name: "Tolkien", address: %{city: "Oxford"}}},
        %{id: 2, name: "Dune", author: %{name: "Herbert", address: %{city: "Seattle"}}}
      ]

      ast = Dequel.Parser.parse!("author.address.city:Oxford")
      result = Dequel.Adapter.Ets.FilterImpl.filter(ast, records)

      assert length(result) == 1
      assert hd(result).name == "LOTR"
    end

    test "filters nested field with contains predicate" do
      records = [
        %{id: 1, name: "LOTR", author: %{name: "J.R.R. Tolkien"}},
        %{id: 2, name: "Dune", author: %{name: "Frank Herbert"}}
      ]

      ast = Dequel.Parser.parse!("author.name:*Tolkien")
      result = Dequel.Adapter.Ets.FilterImpl.filter(ast, records)

      assert length(result) == 1
      assert hd(result).name == "LOTR"
    end

    test "handles missing nested path gracefully" do
      records = [
        %{id: 1, name: "LOTR", author: %{name: "Tolkien"}},
        # No author
        %{id: 2, name: "Dune"}
      ]

      ast = Dequel.Parser.parse!("author.name:Tolkien")
      result = Dequel.Adapter.Ets.FilterImpl.filter(ast, records)

      assert length(result) == 1
      assert hd(result).name == "LOTR"
    end

    test "combines nested and simple fields" do
      records = [
        %{id: 1, name: "LOTR", genre: "fantasy", author: %{name: "Tolkien"}},
        %{id: 2, name: "Dune", genre: "scifi", author: %{name: "Herbert"}},
        %{id: 3, name: "Hobbit", genre: "fantasy", author: %{name: "Tolkien"}}
      ]

      ast = Dequel.Parser.parse!("author.name:Tolkien genre:fantasy")
      result = Dequel.Adapter.Ets.FilterImpl.filter(ast, records)

      assert length(result) == 2
      names = Enum.map(result, & &1.name) |> Enum.sort()
      assert names == ["Hobbit", "LOTR"]
    end

    test "nested field with negation" do
      records = [
        %{id: 1, name: "LOTR", author: %{name: "Tolkien"}},
        %{id: 2, name: "Dune", author: %{name: "Herbert"}}
      ]

      ast = Dequel.Parser.parse!("-author.name:Tolkien")
      result = Dequel.Adapter.Ets.FilterImpl.filter(ast, records)

      assert length(result) == 1
      assert hd(result).name == "Dune"
    end
  end
end
