defmodule Shared.Schemas.Book do
  use Ecto.Schema
  import Ecto.Changeset

  schema "bench_books" do
    field :title, :string
    field :isbn, :string
    field :price, :decimal
    field :published_at, :date
    field :page_count, :integer
    field :genre, :string

    belongs_to :bookstore, Shared.Schemas.Bookstore
    belongs_to :author, Shared.Schemas.Author
    has_many :reviews, Shared.Schemas.Review
  end

  def changeset(book, attrs) do
    book
    |> cast(attrs, [:title, :isbn, :price, :published_at, :page_count, :genre, :bookstore_id, :author_id])
    |> validate_required([:title, :isbn])
  end
end
