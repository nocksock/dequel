defmodule Bench.Scenarios.LogicalOperators do
  @moduledoc "Benchmarks for logical operators (AND, OR, NOT)"

  alias Shared.Repo
  alias Shared.Schemas.Book
  alias Dequel.Adapter.Ecto.Filter
  import Ecto.Query

  def scenarios do
    %{
      "logic_implicit_and" => fn -> implicit_and() end,
      "logic_explicit_or" => fn -> explicit_or() end,
      "logic_negation" => fn -> negation() end,
      "logic_complex_boolean" => fn -> complex_boolean() end,
      "logic_one_of" => fn -> one_of_predicate() end
    }
  end

  defp implicit_and do
    base = from(b in Book)
    query = Filter.query(base, ~s(genre:fiction title:*Journey))
    Repo.all(query)
  end

  defp explicit_or do
    base = from(b in Book)
    query = Filter.query(base, ~s(genre:fiction or genre:mystery))
    Repo.all(query)
  end

  defp negation do
    base = from(b in Book)
    query = Filter.query(base, ~s(!genre:fiction))
    Repo.all(query)
  end

  defp complex_boolean do
    base = from(b in Book)
    query = Filter.query(base, ~s|(genre:fiction or genre:mystery) title:^"The"|)
    Repo.all(query)
  end

  defp one_of_predicate do
    base = from(b in Book)
    query = Filter.query(base, ~s|genre:[fiction, mystery, thriller]|)
    Repo.all(query)
  end
end
