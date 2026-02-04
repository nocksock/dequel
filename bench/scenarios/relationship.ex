defmodule Bench.Scenarios.Relationship do
  @moduledoc "Benchmarks for relationship path traversal (dot notation)"

  alias Bench.Repo
  alias Bench.Schemas.{Book, Review}
  alias Dequel.Adapter.Ecto.Filter
  import Ecto.Query

  def scenarios do
    %{
      "rel_book_by_author_name" => fn -> book_by_author_name() end,
      "rel_book_by_author_country" => fn -> book_by_author_country() end,
      "rel_book_by_bookstore_location" => fn -> book_by_bookstore_location() end,
      "rel_review_by_book_title" => fn -> review_by_book_title() end,
      "rel_review_by_book_author" => fn -> review_by_book_author_name() end
    }
  end

  defp book_by_author_name do
    base = from(b in Book)
    query = Filter.query(~s(author.name:*Smith), base, schema: Book)
    Repo.all(query)
  end

  defp book_by_author_country do
    base = from(b in Book)
    query = Filter.query(~s(author.country:USA), base, schema: Book)
    Repo.all(query)
  end

  defp book_by_bookstore_location do
    base = from(b in Book)
    query = Filter.query(~s(bookstore.location:Manhattan), base, schema: Book)
    Repo.all(query)
  end

  defp review_by_book_title do
    base = from(r in Review)
    query = Filter.query(~s(book.title:*Journey), base, schema: Review)
    Repo.all(query)
  end

  defp review_by_book_author_name do
    base = from(r in Review)
    query = Filter.query(~s(book.author.name:*Smith), base, schema: Review)
    Repo.all(query)
  end
end
