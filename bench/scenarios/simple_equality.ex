defmodule Bench.Scenarios.SimpleEquality do
  @moduledoc "Benchmarks for simple field equality queries"

  alias Bench.Repo
  alias Bench.Schemas.{Book, Author, Bookstore}
  alias Dequel.Adapter.Ecto.Filter
  import Ecto.Query

  def scenarios do
    %{
      "simple_book_title" => fn -> book_title_equality() end,
      "simple_book_genre" => fn -> book_genre_equality() end,
      "simple_author_country" => fn -> author_country_equality() end,
      "simple_bookstore_location" => fn -> bookstore_location_equality() end
    }
  end

  defp book_title_equality do
    base = from(b in Book)
    query = Filter.query(~s(title:"The Journey 1"), base)
    Repo.all(query)
  end

  defp book_genre_equality do
    base = from(b in Book)
    query = Filter.query(~s(genre:fiction), base)
    Repo.all(query)
  end

  defp author_country_equality do
    base = from(a in Author)
    query = Filter.query(~s(country:USA), base)
    Repo.all(query)
  end

  defp bookstore_location_equality do
    base = from(b in Bookstore)
    query = Filter.query(~s(location:Manhattan), base)
    Repo.all(query)
  end
end
