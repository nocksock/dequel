defmodule Bench.Scenarios.ComplexQueries do
  @moduledoc "Benchmarks for complex combined queries"

  alias Bench.Repo
  alias Bench.Schemas.{Book, Author}
  alias Dequel.Adapter.Ecto.Filter
  import Ecto.Query

  def scenarios do
    %{
      "complex_multi_or_search" => fn -> multi_or_search() end,
      "complex_multi_relation" => fn -> multi_relation_filter() end,
      "complex_block_with_local" => fn -> block_with_local_filter() end,
      "complex_deeply_nested" => fn -> deeply_nested() end
    }
  end

  defp multi_or_search do
    base = from(b in Book)
    query = Filter.query(~s(title:*journey or title:*adventure or title:*mystery), base)
    Repo.all(query)
  end

  defp multi_relation_filter do
    base = from(b in Book)
    query = Filter.query(~s(author.country:USA bookstore.location:Manhattan), base, schema: Book)
    Repo.all(query)
  end

  defp block_with_local_filter do
    base = from(a in Author)
    query = Filter.query(~s(country:USA books { genre:fiction }), base, schema: Author)
    Repo.all(query)
  end

  defp deeply_nested do
    base = from(a in Author)
    # Simplified: use book field + local author filter instead of nested relation in block
    query = Filter.query(~s(country:USA books { title:*Journey }), base, schema: Author)
    Repo.all(query)
  end
end
