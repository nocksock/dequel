defmodule Dequel.Test.Schemas.Tag do
  @moduledoc """
  Tag schema for categorizing books with many-to-many relationships.
  """
  use Ecto.Schema
  import Ecto.Changeset

  schema "tags" do
    field(:name, :string)

    many_to_many(:books, Dequel.Test.Schemas.Book, join_through: "books_tags")

    timestamps()
  end

  def changeset(tag, attrs) do
    tag
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
