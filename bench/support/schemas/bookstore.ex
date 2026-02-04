defmodule Bench.Schemas.Bookstore do
  use Ecto.Schema
  import Ecto.Changeset

  schema "bench_bookstores" do
    field :name, :string
    field :location, :string
    field :services, {:array, :string}
    field :rating, :decimal
    field :founded_at, :date

    has_many :books, Bench.Schemas.Book
    has_many :reviews, Bench.Schemas.Review
  end

  def changeset(bookstore, attrs) do
    bookstore
    |> cast(attrs, [:name, :location, :services, :rating, :founded_at])
    |> validate_required([:name, :location])
  end
end
