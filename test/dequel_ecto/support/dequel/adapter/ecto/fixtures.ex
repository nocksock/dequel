defmodule Dequel.Adapter.Ecto.Fixtures do
  @moduledoc """
  Test fixtures for Ecto adapter tests.
  """

  alias Dequel.Adapter.Ecto.{Repo, ItemSchema, AuthorSchema}

  def author_fixture(attrs \\ %{}) do
    attrs = Enum.into(attrs, %{name: "Test Author", bio: "Test bio"})

    %AuthorSchema{}
    |> AuthorSchema.changeset(attrs)
    |> Repo.insert!()
  end

  def item_fixture(attrs \\ %{}) do
    {:ok, item} =
      attrs
      |> Enum.into(%{"description" => "some description", "name" => "some name"})
      |> create_item()

    item
  end

  def item_with_author(item_attrs, author) do
    item_attrs
    |> Map.put("author_id", author.id)
    |> item_fixture()
  end

  defp create_item(attrs) do
    %ItemSchema{}
    |> ItemSchema.changeset(attrs)
    |> Repo.insert()
  end
end
