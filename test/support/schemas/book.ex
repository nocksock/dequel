defmodule Dequel.Test.Schemas.Book do
  @moduledoc false
  use Ecto.Schema
  import Ecto.Changeset

  @genres ~w(fiction non-fiction mystery thriller romance sci-fi fantasy biography history children)

  schema "books" do
    field(:title, :string)
    field(:isbn, :string)
    field(:price, :decimal)
    field(:published_at, :date)
    field(:page_count, :integer)
    field(:genre, :string)

    belongs_to(:author, Dequel.Test.Schemas.Author)
    belongs_to(:bookstore, Dequel.Test.Schemas.Store)

    has_many(:reviews, Dequel.Test.Schemas.Review)
    many_to_many(:tags, Dequel.Test.Schemas.Tag, join_through: "books_tags")

    timestamps()
  end

  def changeset(book, attrs) do
    book
    |> cast(attrs, [
      :title,
      :isbn,
      :price,
      :published_at,
      :page_count,
      :genre,
      :author_id,
      :bookstore_id
    ])
    |> validate_required([:title, :isbn])
    |> validate_inclusion(:genre, @genres)
  end

  def genres, do: @genres
end
