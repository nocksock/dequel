defmodule Bench.Schemas.Review do
  use Ecto.Schema
  import Ecto.Changeset

  schema "bench_reviews" do
    field :content, :string
    field :rating, :integer
    field :reviewer_name, :string
    field :created_at, :naive_datetime

    belongs_to :book, Bench.Schemas.Book
    belongs_to :bookstore, Bench.Schemas.Bookstore
  end

  def changeset(review, attrs) do
    review
    |> cast(attrs, [:content, :rating, :reviewer_name, :created_at, :book_id, :bookstore_id])
    |> validate_required([:content, :rating])
  end
end
