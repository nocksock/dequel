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
    {author_attrs, attrs} = Map.pop(attrs, :author)

    attrs =
      if author_attrs do
        author = author_fixture(author_attrs)
        Map.put(attrs, :author_id, author.id)
      else
        attrs
      end

    {:ok, item} =
      %{description: "some description", name: "some name"}
      |> Map.merge(attrs)
      |> create_item()

    item
  end

  defp create_item(attrs) do
    %ItemSchema{}
    |> ItemSchema.changeset(attrs)
    |> Repo.insert()
  end
end
