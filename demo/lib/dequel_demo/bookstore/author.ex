defmodule DequelDemo.Bookstore.Author do
  use Ecto.Schema
  import Ecto.Changeset

  schema "authors" do
    field :name, :string
    field :bio, :string
    field :birth_date, :date
    field :country, :string

    has_many :books, DequelDemo.Bookstore.Book

    timestamps()
  end

  def changeset(author, attrs) do
    author
    |> cast(attrs, [:name, :bio, :birth_date, :country])
    |> validate_required([:name])
  end
end
