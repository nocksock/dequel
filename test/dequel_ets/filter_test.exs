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

    test "empty query returns all", %{frodo: frodo, bilbo: bilbo, samwise: samwise} do
      result = ~ALL<>
      assert Enum.sort_by(result, & &1.name) == Enum.sort_by([frodo, bilbo, samwise], & &1.name)
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

  # Note: ETS adapter does not support relationship filtering (nested field paths).
  # Use the Ecto adapter for relationship queries.

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
      result = Dequel.Adapter.Ets.FilterImpl.filter("quantity:>10", records)
      assert length(result) == 2
      assert Enum.all?(result, fn r -> r.quantity > 10 end)
    end

    test "less than", %{records: records} do
      result = Dequel.Adapter.Ets.FilterImpl.filter("quantity:<10", records)
      assert length(result) == 1
      assert hd(result).quantity == 5
    end

    test "greater than or equal", %{records: records} do
      result = Dequel.Adapter.Ets.FilterImpl.filter("quantity:>=15", records)
      assert length(result) == 2
    end

    test "less than or equal", %{records: records} do
      result = Dequel.Adapter.Ets.FilterImpl.filter("quantity:<=15", records)
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
      result = Dequel.Adapter.Ets.FilterImpl.filter("published_at:>2023-01-01", records)
      assert length(result) == 2
      assert Enum.all?(result, fn r -> Date.compare(r.published_at, ~D[2023-01-01]) == :gt end)
    end

    test "date less than", %{records: records} do
      result = Dequel.Adapter.Ets.FilterImpl.filter("published_at:<2023-01-01", records)
      assert length(result) == 1
      assert hd(result).name == "old"
    end

    test "date greater than or equal", %{records: records} do
      result = Dequel.Adapter.Ets.FilterImpl.filter("published_at:>=2023-06-01", records)
      assert length(result) == 2
    end

    test "date range", %{records: records} do
      result =
        Dequel.Adapter.Ets.FilterImpl.filter("published_at:2020-01-01..2023-12-31", records)

      assert length(result) == 2
      assert Enum.all?(result, fn r -> r.name in ["old", "mid"] end)
    end

    test "date YYYY-MM in comparison", %{records: records} do
      result = Dequel.Adapter.Ets.FilterImpl.filter("published_at:>=2023-06", records)
      assert length(result) == 2
    end

    test "negated date comparison", %{records: records} do
      result = Dequel.Adapter.Ets.FilterImpl.filter("published_at:!>2023-01-01", records)
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
      result = Dequel.Adapter.Ets.FilterImpl.filter("quantity:5..20", records)
      assert length(result) == 2
      assert Enum.all?(result, fn r -> r.quantity >= 5 and r.quantity <= 20 end)
    end

    test "between predicate", %{records: records} do
      result = Dequel.Adapter.Ets.FilterImpl.filter("quantity:between(5 20)", records)
      assert length(result) == 2
    end

    test "negated range", %{records: records} do
      result = Dequel.Adapter.Ets.FilterImpl.filter("quantity:!5..20", records)
      assert length(result) == 1
      assert hd(result).quantity == 25
    end
  end
end
