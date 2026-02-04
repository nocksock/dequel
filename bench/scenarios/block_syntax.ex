defmodule Bench.Scenarios.BlockSyntax do
  @moduledoc "Benchmarks for block syntax (EXISTS subqueries)"

  alias Bench.Repo
  alias Bench.Schemas.{Author, Bookstore}
  alias Dequel.Adapter.Ecto.Filter
  import Ecto.Query

  def scenarios do
    %{
      "block_author_with_book_title" => fn -> author_with_book_title() end,
      "block_author_with_book_genre" => fn -> author_with_book_genre() end,
      "block_bookstore_with_book_author" => fn -> bookstore_with_book_by_author() end,
      "block_author_multi_conditions" => fn -> author_with_book_multiple_conditions() end
    }
  end

  defp author_with_book_title do
    base = from(a in Author)
    query = Filter.query(~s(books { title:*Journey }), base, schema: Author)
    Repo.all(query)
  end

  defp author_with_book_genre do
    base = from(a in Author)
    query = Filter.query(~s(books { genre:fiction }), base, schema: Author)
    Repo.all(query)
  end

  defp bookstore_with_book_by_author do
    base = from(b in Bookstore)
    # Simplified: filter by book genre instead of nested author relation
    query = Filter.query(~s(books { genre:thriller }), base, schema: Bookstore)
    Repo.all(query)
  end

  defp author_with_book_multiple_conditions do
    base = from(a in Author)
    query = Filter.query(~s(books { title:*Journey genre:fiction }), base, schema: Author)
    Repo.all(query)
  end
end
