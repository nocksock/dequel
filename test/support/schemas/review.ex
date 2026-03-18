defmodule Dequel.Test.Schemas.Review do
  use Ecto.Schema
  import Ecto.Changeset

  schema "reviews" do
    field(:content, :string)
    field(:rating, :integer)
    field(:reviewer_name, :string)

    belongs_to(:book, Dequel.Test.Schemas.Book)
    belongs_to(:bookstore, Dequel.Test.Schemas.Store)

    timestamps()
  end

  def changeset(review, attrs) do
    review
    |> cast(attrs, [:content, :rating, :reviewer_name, :book_id, :bookstore_id])
    |> validate_required([:rating, :reviewer_name])
    |> validate_inclusion(:rating, 1..5)
  end
end
