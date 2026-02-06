defmodule DequelDemo.Bookstore.Book do
  use Ecto.Schema
  import Ecto.Changeset

  @genres ~w(fiction non-fiction mystery thriller romance sci-fi fantasy biography history children)

  schema "books" do
    field :title, :string
    field :isbn, :string
    field :price, :decimal
    field :published_at, :date
    field :page_count, :integer
    field :genre, :string

    belongs_to :author, DequelDemo.Bookstore.Author
    belongs_to :bookstore, DequelDemo.Bookstore.Store

    has_many :reviews, DequelDemo.Bookstore.Review

    timestamps()
  end

  def changeset(book, attrs) do
    book
    |> cast(attrs, [:title, :isbn, :price, :published_at, :page_count, :genre, :author_id, :bookstore_id])
    |> validate_required([:title, :isbn])
    |> validate_inclusion(:genre, @genres)
  end

  def genres, do: @genres
end
