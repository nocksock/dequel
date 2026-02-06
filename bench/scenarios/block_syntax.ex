defmodule Bench.Scenarios.BlockSyntax do
  @moduledoc "Benchmarks for block syntax (EXISTS subqueries)"

  alias Shared.Repo
  alias Shared.Schemas.{Author, Bookstore}
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
    query = Filter.query(base, ~s(books { title:*Journey }), schema: Author)
    Repo.all(query)
  end

  defp author_with_book_genre do
    base = from(a in Author)
    query = Filter.query(base, ~s(books { genre:fiction }), schema: Author)
    Repo.all(query)
  end

  defp bookstore_with_book_by_author do
    base = from(b in Bookstore)
    # Simplified: filter by book genre instead of nested author relation
    query = Filter.query(base, ~s(books { genre:thriller }), schema: Bookstore)
    Repo.all(query)
  end

  defp author_with_book_multiple_conditions do
    base = from(a in Author)
    query = Filter.query(base, ~s(books { title:*Journey genre:fiction }), schema: Author)
    Repo.all(query)
  end
end
