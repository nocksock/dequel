defmodule Dequel.Adapter.Ecto.AuthorSchema do
  @moduledoc false
  use Ecto.Schema
  import Ecto.Changeset

  schema "authors" do
    field(:name, :string)
    field(:bio, :string)

    has_many(:items, Dequel.Adapter.Ecto.ItemSchema, foreign_key: :author_id)
  end

  @doc false
  def changeset(author, attrs) do
    author
    |> cast(attrs, [:name, :bio])
    |> validate_required([:name])
  end
end
