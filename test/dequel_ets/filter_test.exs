defmodule Dequel.Adapter.EtsTest do
  use Dequel.Adapter.Ets.RepoCase

  defmodule Author do
    defstruct [:name, :country]
  end

  defmodule Book do
    defstruct [:title, :author]
  end

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
    ItemStore.all()
    |> Dequel.filter(input)
    |> Enum.sort_by(&Map.get(&1, :name))
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

    test "empty query returns all", %{frodo: frodo, bilbo: bilbo, samwise: samwise} do
      assert ~ALL<> == [bilbo, frodo, samwise]
    end

    test "binary and", %{frodo: frodo} do
      assert ~ALL<name:frodo description:baggins> == [frodo]
    end

    test "binary or", %{frodo: frodo, bilbo: bilbo} do
      assert ~ALL<name:frodo or name:bilbo> == [bilbo, frodo]
    end

    test "binary operations", %{frodo: frodo, samwise: samwise} do
      _ = item_fixture(%{name: "frodo", description: "x"})
      assert [^frodo, ^samwise] = ~ALL<name:contains(frodo, sam) (description:*g)> 
    end

    test "not operator with prefix", %{bilbo: bilbo, samwise: samwise} do
      assert ~ALL<-name:frodo> == [bilbo, samwise]
    end

    test "value-level negation with !", %{bilbo: bilbo, samwise: samwise} do
      assert ~ALL<name:!frodo> == [bilbo, samwise]
    end

    test "negated predicates", %{bilbo: bilbo, samwise: samwise} do
      assert ~ALL<name:!^fro> == [bilbo,samwise]
      assert ~ALL<name:!$do> == [bilbo,samwise]
    end

    test "string predicates", %{frodo: frodo} do
      _other = item_fixture(%{name: "bilfroxdox", description: "baggins"})

      assert ~ALL<name:*od> == [frodo]
      assert ~ALL<name:^fro> == [frodo]
      assert ~ALL<name:$do> == [frodo]
    end
  end


  describe "comparison operators" do
    setup do
      records = [
        %{id: 1, name: "low", quantity: 5},
        %{id: 2, name: "mid", quantity: 15},
        %{id: 3, name: "high", quantity: 25}
      ]

      %{records: records}
    end

    test "greater than", %{records: records} do
      result = records
      |> Dequel.filter("quantity:>10")

      assert length(result) == 2
      assert Enum.all?(result, fn r -> r.quantity > 10 end)
    end

    test "less than", %{records: records} do
      result = records
      |> Dequel.filter("quantity:<10")

      assert length(result) == 1
      assert hd(result).quantity == 5
    end

    test "greater than or equal", %{records: records} do
      result = records
      |> Dequel.filter("quantity:>=15")
      assert length(result) == 2
    end

    test "less than or equal", %{records: records} do
      result = records
      |> Dequel.filter("quantity:<=15")

      assert length(result) == 2
    end
  end

  describe "date comparison" do
    setup do
      records = [
        %{id: 1, name: "old", published_at: ~D[2020-01-15]},
        %{id: 2, name: "mid", published_at: ~D[2023-06-01]},
        %{id: 3, name: "new", published_at: ~D[2025-03-20]}
      ]

      %{records: records}
    end

    test "date greater than", %{records: records} do
      result = records
      |> Dequel.filter("published_at:>2023-01-01")
      assert length(result) == 2
      assert Enum.all?(result, fn r -> Date.compare(r.published_at, ~D[2023-01-01]) == :gt end)
    end

    test "date less than", %{records: records} do
      result = records |>
        Dequel.filter("published_at:<2023-01-01")
      assert length(result) == 1
      assert hd(result).name == "old"
    end

    test "date greater than or equal", %{records: records} do
      result = records |>
        Dequel.filter("published_at:>=2023-06-01")

      assert length(result) == 2
    end

    test "date range", %{records: records} do
      result =
        records
        |> Dequel.filter("published_at:2020-01-01..2023-12-31")

      assert length(result) == 2
      assert Enum.all?(result, fn r -> r.name in ["old", "mid"] end)
    end

    test "date YYYY-MM in comparison", %{records: records} do
      result = Dequel.filter(records, "published_at:>=2023-06")
      assert length(result) == 2
    end

    test "negated date comparison", %{records: records} do
      result = Dequel.filter(records, "published_at:!>2023-01-01")
      assert length(result) == 1
      assert hd(result).name == "old"
    end
  end

  describe "range queries" do
    setup do
      records = [
        %{id: 1, name: "low", quantity: 5},
        %{id: 2, name: "mid", quantity: 15},
        %{id: 3, name: "high", quantity: 25}
      ]

      %{records: records}
    end

    test "between range", %{records: records} do
      result = Dequel.filter(records, "quantity:5..20")
      assert length(result) == 2
      assert Enum.all?(result, fn r -> r.quantity >= 5 and r.quantity <= 20 end)
    end

    test "between predicate", %{records: records} do
      result = Dequel.filter(records, "quantity:between(5 20)")
      assert length(result) == 2
    end

    test "negated range", %{records: records} do
      result = Dequel.filter(records, "quantity:!5..20")
      assert length(result) == 1
      assert hd(result).quantity == 25
    end
  end

  describe "path syntax (nested fields)" do
    setup do
      alice = %{id: 1, name: "alice", author: %{name: "Alice", country: "UK", stats: %{"books" => 5}}}
      bob = %{id: 2, name: "bob", author: %{name: "Bob", country: "US", stats: %{"books" => 12}}}
      nobody = %{id: 3, name: "nobody", author: nil}

      %{alice: alice, bob: bob, nobody: nobody, all: [alice, bob, nobody]}
    end

    test "path syntax", %{alice: alice, bob: bob, nobody: nobody, all: all} do
      assert Dequel.filter(all, "author.name:Alice") == [alice]
      assert Dequel.filter(all, "author.name:^Ali") == [alice]
      assert Dequel.filter(all, "author.name:$ob") == [bob]
      assert Dequel.filter(all, "author.name:*lic") == [alice]
      assert Dequel.filter(all, "author.foobar:foo") == []
      assert Dequel.filter(all, "author.name:Alice or author.name:Bob") == [alice, bob]
      assert Dequel.filter(all, "-author.name:Alice") == [bob, nobody]
    end

    test "lists in nested" do
      posts = [
        %{id: 1, title: "Post 1", tags: ["a", "b"]},
        %{id: 2, title: "Post 2", tags: ["b", "c"]},
        %{id: 3, title: "Post 3", tags: []}
      ]

      a = [Enum.at(posts, 0)]
      b = [Enum.at(posts, 0), Enum.at(posts, 1)]
      c = [Enum.at(posts, 1)]

      assert Dequel.filter(posts, "tags:a") == a
      assert Dequel.filter(posts, "tags:b") == b
      assert Dequel.filter(posts, """
        tags:a or tags:c
      """) == a ++ c
      assert Dequel.filter(posts, """
        tags:[a, c]
      """) == a ++ c
    end

    test "list traversal" do
      tolkien = %{id: 1, name: "tolkien", books: [%{title: "The Hobbit"}, %{title: "Lord of the Rings"}]}
      martin = %{id: 2, name: "martin", books: [%{title: "A Game of Thrones"}]}
      nobody = %{id: 3, name: "nobody", books: []}
      books = [tolkien, martin, nobody]

      assert Dequel.filter(books, "books.title:*Hobbit") == [tolkien]
    end

    test "nested structs", _ctx do
      hobbit = %Book{title: "The Hobbit", author: %Author{name: "Tolkien", country: "UK"}}
      dune = %Book{title: "Dune", author: %Author{name: "Herbert", country: "US"}}
      foundation = %Book{title: "Foundation", author: %Author{name: "Asimov", country: "US"}}
      books = [hobbit, dune, foundation]

      assert Dequel.filter(books, "author.name:Tolkien") == [hobbit]
      assert Dequel.filter(books, "author.country:US") |> length() == 2
      assert Dequel.filter(books, "title:^The") == [hobbit]
    end
  end
end
