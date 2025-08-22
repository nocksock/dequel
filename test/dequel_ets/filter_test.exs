defmodule Dequel.Adapter.EtsTest do
  use Dequel.Adapter.Ets.RepoCase

  def create_item(attrs \\ %{}) do
    item = Item.new(attrs)
    ItemStore.insert(item)
  end

  def item_fixture(attrs \\ %{}) do
    attrs
    |> Enum.into(%{
      "description" => "some description",
      "name" => "some name"
    })
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

  test "ets table is properly set up" do
    assert ItemStore.table_exists?()
  end

  test "can insert and retrieve items from ETS" do
    item = item_fixture(%{"name" => "test name"})
    assert item.name == "test name"
    assert item.description == "some description"

    all_items = ItemStore.all()
    assert length(all_items) == 1
    assert List.first(all_items).name == "test name"
  end

  test "base" do
    item = item_fixture(%{"name" => "some name"})
    _ = item_fixture(%{"name" => "some other name"})

    assert ~ONE<name: "some name"> == item
  end

  test "binary and" do
    item = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    _ = item_fixture(%{"name" => "bilbo", "description" => "baggins"})

    assert ~ALL<
      name: frodo
      description: baggins
    > == [item]
  end

  test "binary or" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})

    result = ~ALL<
      name: frodo or name: bilbo
    >
    assert Enum.sort_by(result, & &1.name) == Enum.sort_by([frodo, bilbo], & &1.name)
  end

  test "binary operations" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    _bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    samwise = item_fixture(%{"name" => "samwise", "description" => "gamgee"})
    _ = item_fixture(%{"name" => "frodo", "description" => "x"})

    result = ~ALL<
      name:contains(frodo, sam) {
        description:*g
      }
    >
    assert Enum.sort_by(result, & &1.name) == Enum.sort_by([frodo, samwise], & &1.name)
  end

  test "not operator" do
    _frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    samwise = item_fixture(%{"name" => "samwise", "description" => "gamgee"})

    result = ~ALL<!name:frodo>
    assert Enum.sort_by(result, & &1.name) == Enum.sort_by([bilbo, samwise], & &1.name)
  end

  test "string predicates" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    _bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    _other = item_fixture(%{"name" => "bilfroxdox", "description" => "baggins"})

    assert ~ALL<name:*od> == [frodo]
    assert ~ALL<name:^fro> == [frodo]
    assert ~ALL<name:$do> == [frodo]
  end
end
