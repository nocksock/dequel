defmodule Bench.Scenarios.ComplexQueries do
  @moduledoc "Benchmarks for complex combined queries"

  alias Shared.Repo
  alias Shared.Schemas.{Book, Author}
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
    query = Filter.query(base, ~s(title:*journey or title:*adventure or title:*mystery))
    Repo.all(query)
  end

  defp multi_relation_filter do
    base = from(b in Book)
    query = Filter.query(base, ~s(author.country:USA bookstore.location:Manhattan), schema: Book)
    Repo.all(query)
  end

  defp block_with_local_filter do
    base = from(a in Author)
    query = Filter.query(base, ~s(country:USA books { genre:fiction }), schema: Author)
    Repo.all(query)
  end

  defp deeply_nested do
    base = from(a in Author)
    # Simplified: use book field + local author filter instead of nested relation in block
    query = Filter.query(base, ~s(country:USA books { title:*Journey }), schema: Author)
    Repo.all(query)
  end
end
