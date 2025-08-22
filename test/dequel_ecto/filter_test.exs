defmodule Dequel.Adapter.EctoTest do
  use Dequel.Adapter.Ecto.RepoCase
  alias Dequel.Adapter.Ecto.Filter
  alias Dequel.Parser
  alias Dequel.Adapter.Ecto
  alias Dequel.Adapter.Ecto.ItemSchema
  alias Dequel.Adapter.Ecto.Repo
  import Ecto.Query

  def create_item(attrs \\ %{}) do
    %ItemSchema{}
    |> ItemSchema.changeset(attrs)
    |> Repo.insert()
  end

  def item_fixture(attrs \\ %{}) do
    {:ok, item} =
      attrs
      |> Enum.into(%{
        "description" => "some description",
        "name" => "some name"
      })
      |> create_item()

    item
  end

  defp sigil_ONE(input, []) do
    where = input |> Filter.where()
    q = from(ItemSchema, where: ^where)
    Repo.one(q)
  end

  defp sigil_ALL(input, []) do
    where = input |> Filter.where()
    q = from(ItemSchema, where: ^where)
    Repo.all(q)
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

    assert ~ALL<

      name: frodo or name: bilbo

    > == [frodo, bilbo]
  end

  test "binary operations" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    samwise = item_fixture(%{"name" => "samwise", "description" => "gamgee"})
    _ = item_fixture(%{"name" => "frodo", "description" => "x"})

    assert ~ALL<

      name:contains(frodo, sam) {
        description:*g
      }

    > == [frodo, samwise]
  end

  test "not operator" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    samwise = item_fixture(%{"name" => "samwise", "description" => "gamgee"})

    assert ~ALL<!name:frodo> == [bilbo, samwise]
  end

  test "string predicates" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    item_fixture(%{"name" => "bilfroxdox", "description" => "baggins"})

    assert ~ALL<name:*od> == [frodo]
    assert ~ALL<name:^fro> == [frodo]
    assert ~ALL<name:$do> == [frodo]
  end
end
