defmodule Bench.Scenarios.StringMatching do
  @moduledoc "Benchmarks for string matching predicates (contains, starts_with, ends_with)"

  alias Bench.Repo
  alias Bench.Schemas.{Book, Author}
  alias Dequel.Adapter.Ecto.Filter
  import Ecto.Query

  def scenarios do
    %{
      "string_title_contains" => fn -> book_title_contains() end,
      "string_title_starts_with" => fn -> book_title_starts_with() end,
      "string_title_ends_with" => fn -> book_title_ends_with() end,
      "string_author_bio_contains" => fn -> author_bio_contains() end,
      "string_combined_predicates" => fn -> combined_string_predicates() end
    }
  end

  defp book_title_contains do
    base = from(b in Book)
    query = Filter.query(~s(title:*Journey), base)
    Repo.all(query)
  end

  defp book_title_starts_with do
    base = from(b in Book)
    query = Filter.query(~s(title:^"The"), base)
    Repo.all(query)
  end

  defp book_title_ends_with do
    base = from(b in Book)
    query = Filter.query(~s(title:$"1"), base)
    Repo.all(query)
  end

  defp author_bio_contains do
    base = from(a in Author)
    query = Filter.query(~s(bio:*fiction), base)
    Repo.all(query)
  end

  defp combined_string_predicates do
    base = from(b in Book)
    query = Filter.query(~s(title:^"The" title:*Journey), base)
    Repo.all(query)
  end
end
