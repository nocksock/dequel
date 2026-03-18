defmodule Dequel.Match do
  @moduledoc """
  In-memory matching of Dequel queries against structs.

  Tests if a preloaded struct matches a Dequel query. Supports relation traversal
  via dot notation and block syntax.

  ## Usage

      book = Repo.get(Book, 1) |> Repo.preload([:author, :tags])

      # Simple field matching
      Dequel.matches?(book, "title:*Rings")
      # => true

      # Dot notation for relations
      Dequel.matches?(book, "author.country:UK")
      # => true

      # Block syntax (any semantics)
      Dequel.matches?(book, "tags{name:fantasy}")
      # => true if any tag has name "fantasy"

  ## Preload Requirements

  All associations referenced in the query must be preloaded. If a query
  references an unloaded association, `Dequel.PreloadRequiredError` is raised.

  Use `Dequel.preloads/1` to get the required preloads:

      preloads = Dequel.preloads(query)
      book = Repo.preload(book, preloads)
      Dequel.matches?(book, query)

  """

  alias Dequel.Comparators

  @doc """
  Tests if a struct matches a Dequel query.

  Accepts a struct and a query (string or parsed AST). Returns true if the
  struct matches all conditions in the query.

  Raises `Dequel.PreloadRequiredError` if the query references an association
  that isn't loaded.

  ## Examples

      iex> book = %{title: "The Lord of the Rings", genre: "fantasy", page_count: 1178}
      iex> Dequel.Match.matches?(book, "genre:fantasy")
      true

      iex> book = %{title: "The Lord of the Rings", genre: "fantasy", page_count: 1178}
      iex> Dequel.Match.matches?(book, "title:*Rings")
      true

      iex> book = %{title: "The Lord of the Rings", genre: "fantasy", page_count: 1178}
      iex> Dequel.Match.matches?(book, "page_count:>1000")
      true

      iex> book = %{title: "The Lord of the Rings", author: %{name: "Tolkien", country: "UK"}}
      iex> Dequel.Match.matches?(book, "author.country:UK")
      true

      iex> book = %{title: "The Lord of the Rings", tags: [%{name: "fantasy"}, %{name: "classic"}]}
      iex> Dequel.Match.matches?(book, "tags{name:fantasy}")
      true

      iex> Dequel.Match.matches?(%{name: "test"}, "")
      true

  """
  @spec matches?(struct() | map(), binary() | tuple()) :: boolean()
  def matches?(record, query) when is_binary(query) do
    if String.trim(query) == "" do
      true
    else
      ast = Dequel.Parser.parse!(query)
      matches?(record, ast)
    end
  end

  def matches?(record, ast) when is_tuple(ast) do
    evaluate(record, ast)
  end

  def matches?(_record, nil), do: true

  # Equality
  defp evaluate(record, {:==, _meta, [field, value]}) do
    field_value = get_value(record, field)
    values_equal?(field_value, value)
  end

  # Inequality (not equal)
  defp evaluate(record, {:!=, _meta, [field, value]}) do
    field_value = get_value(record, field)
    not values_equal?(field_value, value)
  end

  # String operations
  defp evaluate(record, {:contains, _meta, [field, value]}) do
    field_value = get_value(record, field)
    Comparators.string_match?(field_value, value, :contains)
  end

  defp evaluate(record, {:starts_with, _meta, [field, value]}) do
    field_value = get_value(record, field)
    Comparators.string_match?(field_value, value, :starts_with)
  end

  defp evaluate(record, {:ends_with, _meta, [field, value]}) do
    field_value = get_value(record, field)
    Comparators.string_match?(field_value, value, :ends_with)
  end

  # Comparison operations
  defp evaluate(record, {:>, _meta, [field, value]}) do
    field_value = get_value(record, field)
    Comparators.compare_values(field_value, value, &Kernel.>/2)
  end

  defp evaluate(record, {:<, _meta, [field, value]}) do
    field_value = get_value(record, field)
    Comparators.compare_values(field_value, value, &Kernel.</2)
  end

  defp evaluate(record, {:>=, _meta, [field, value]}) do
    field_value = get_value(record, field)
    Comparators.compare_values(field_value, value, &Kernel.>=/2)
  end

  defp evaluate(record, {:<=, _meta, [field, value]}) do
    field_value = get_value(record, field)
    Comparators.compare_values(field_value, value, &Kernel.<=/2)
  end

  # Range (between)
  defp evaluate(record, {:between, _meta, [field, start_val, end_val]}) do
    field_value = get_value(record, field)
    Comparators.in_range?(field_value, start_val, end_val)
  end

  # IN clause
  defp evaluate(record, {:in, _meta, [field, values]}) when is_list(values) do
    field_value = get_value(record, field)
    Enum.any?(values, fn v -> values_equal?(field_value, v) end)
  end

  # Logical AND
  defp evaluate(record, {:and, _meta, [left, right]}) do
    evaluate(record, left) and evaluate(record, right)
  end

  # Logical OR
  defp evaluate(record, {:or, _meta, [left, right]}) do
    evaluate(record, left) or evaluate(record, right)
  end

  # Negation
  defp evaluate(record, {:not, _meta, inner}) do
    not evaluate(record, inner)
  end

  # Block syntax - "any" semantics for has_many relations
  defp evaluate(record, {:block, _meta, [relation, inner]}) do
    relation_atom = to_atom(relation)
    related = get_association(record, relation_atom)
    evaluate_collection(related, inner)
  end

  # Semantic EXISTS node - "any" semantics
  defp evaluate(record, {:exists, _meta, [relation, inner]}) do
    relation_atom = to_atom(relation)
    related = get_association(record, relation_atom)
    evaluate_collection(related, inner)
  end

  # Semantic JOIN node - single relation
  defp evaluate(record, {:join, _meta, [relation, inner]}) do
    relation_atom = to_atom(relation)
    related = get_association(record, relation_atom)
    evaluate_single(related, inner)
  end

  # Semantic EMBEDDED node
  defp evaluate(record, {:embedded, [cardinality: :many], [field, inner]}) do
    field_atom = to_atom(field)
    embedded = Map.get(record, field_atom, [])
    evaluate_collection(embedded, inner)
  end

  defp evaluate(record, {:embedded, [cardinality: :one], [field, inner]}) do
    field_atom = to_atom(field)
    embedded = Map.get(record, field_atom)
    evaluate_single(embedded, inner)
  end

  # Catch-all for unhandled AST nodes
  defp evaluate(_record, ast) do
    raise ArgumentError, "Unsupported AST node in Dequel.matches?: #{inspect(ast)}"
  end

  # Evaluate "any" semantics - returns true if any item in collection matches
  defp evaluate_collection(collection, inner) when is_list(collection) do
    Enum.any?(collection, fn item -> evaluate(item, inner) end)
  end

  defp evaluate_collection(nil, _inner), do: false
  defp evaluate_collection(_, _inner), do: false

  # Evaluate single relation
  defp evaluate_single(nil, _inner), do: false

  defp evaluate_single(record, inner) do
    evaluate(record, inner)
  end

  # Get a field value, handling paths (dot notation)
  defp get_value(record, field) when is_atom(field) do
    Map.get(record, field)
  end

  defp get_value(record, field) when is_binary(field) do
    Map.get(record, to_atom(field))
  end

  defp get_value(record, path) when is_list(path) do
    traverse_path(record, path)
  end

  # Traverse a path through associations
  defp traverse_path(record, [field]) do
    get_value(record, field)
  end

  defp traverse_path(record, [field | rest]) do
    field_atom = to_atom(field)
    related = get_association(record, field_atom)

    case related do
      nil -> nil
      # Can't traverse into a collection with dot notation
      list when is_list(list) -> nil
      struct -> traverse_path(struct, rest)
    end
  end

  # Get an association value, checking for NotLoaded
  defp get_association(record, field) when is_atom(field) do
    value = Map.get(record, field)
    check_loaded!(field, value)
    value
  end

  # Check if an association is loaded, raise if not
  defp check_loaded!(field, %{__struct__: Ecto.Association.NotLoaded}) do
    raise Dequel.PreloadRequiredError, field: field
  end

  defp check_loaded!(_field, _value), do: :ok

  defp to_atom(value) when is_atom(value), do: value
  defp to_atom(value) when is_binary(value), do: String.to_atom(value)

  # Compare values with type coercion (number strings -> numbers)
  defp values_equal?(field_value, query_value)
       when is_number(field_value) and is_binary(query_value) do
    case Comparators.parse_number(query_value) do
      {:ok, num} -> field_value == num
      :error -> false
    end
  end

  defp values_equal?(field_value, query_value), do: field_value == query_value
end
