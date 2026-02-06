defmodule Shared.Schemas.Author do
  use Ecto.Schema
  import Ecto.Changeset

  schema "bench_authors" do
    field :name, :string
    field :bio, :string
    field :birth_date, :date
    field :country, :string
    field :details, :map

    has_many :books, Shared.Schemas.Book
  end

  def changeset(author, attrs) do
    author
    |> cast(attrs, [:name, :bio, :birth_date, :country, :details])
    |> validate_required([:name])
  end
end
