defmodule Dequel.Adapter.Ecto.TagSchema do
  @moduledoc false
  use Ecto.Schema
  import Ecto.Changeset

  schema "tags" do
    field(:name, :string)

    many_to_many(:items, Dequel.Adapter.Ecto.ItemSchema, join_through: "items_tags")
  end

  @doc false
  def changeset(tag, attrs) do
    tag
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
