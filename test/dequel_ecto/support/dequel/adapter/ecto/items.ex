defmodule Dequel.Adapter.Ecto.ItemSchema do
  @moduledoc false
  use Ecto.Schema
  import Ecto.Changeset

  schema "items" do
    field(:name, :string)
    field(:description, :string)
    field(:parent, :string)
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
