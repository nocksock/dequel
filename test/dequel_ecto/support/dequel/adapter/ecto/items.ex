defmodule Dequel.Adapter.Ecto.ItemSchema do
  @moduledoc false
  use Ecto.Schema
  import Ecto.Changeset

  schema "items" do
    field(:name, :string)
    field(:description, :string)
    field(:parent, :string)

    belongs_to(:author, Dequel.Adapter.Ecto.AuthorSchema)
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:name, :description, :author_id])
    |> validate_required([:name, :description])
  end
end
