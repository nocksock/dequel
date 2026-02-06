defmodule DequelDemo.Bookstore.Store do
  use Ecto.Schema
  import Ecto.Changeset

  schema "bookstores" do
    field :name, :string
    field :location, :string
    field :rating, :decimal
    field :founded_at, :date

    has_many :books, DequelDemo.Bookstore.Book, foreign_key: :bookstore_id

    timestamps()
  end

  def changeset(store, attrs) do
    store
    |> cast(attrs, [:name, :location, :rating, :founded_at])
    |> validate_required([:name])
  end
end
