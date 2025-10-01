defmodule Dequel.Enum do
  @moduledoc """
  Adapter for filtering Enumerable collections (lists, streams) of maps or structs.

  This adapter provides in-memory filtering using Dequel query syntax, making it
  ideal for testing, small datasets, or when you need to filter data that isn't
  in a database.

  ## Examples

      # Filter a list of structs
      users = [
        %User{name: "Alice", age: 30},
        %User{name: "Bob", age: 25}
      ]

      Dequel.Enum.filter("age:>25", users)
      #=> [%User{name: "Alice", age: 30}]

      # Works with maps too
      posts = [
        %{title: "Hello", status: "published"},
        %{title: "Draft", status: "draft"}
      ]

      Dequel.Enum.filter("status:published", posts)
      #=> [%{title: "Hello", status: "published"}]
  """

  @doc """
  Filters a collection of records using a query string or AST.

  Accepts either a string query (which will be parsed) or a pre-parsed AST tuple.
  """
  def filter(input, records) when is_binary(input) do
    input
    |> Dequel.Parser.parse!()
    |> filter(records)
  end

  # Comparison operators
  def filter({:==, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      get_field_value(record, field) == value
    end)
  end

  def filter({:!=, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      get_field_value(record, field) != value
    end)
  end

  def filter({:>, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      case get_field_value(record, field) do
        nil -> false
        field_value -> field_value > value
      end
    end)
  end

  def filter({:>=, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      case get_field_value(record, field) do
        nil -> false
        field_value -> field_value >= value
      end
    end)
  end

  def filter({:<, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      case get_field_value(record, field) do
        nil -> false
        field_value -> field_value < value
      end
    end)
  end

  def filter({:<=, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      case get_field_value(record, field) do
        nil -> false
        field_value -> field_value <= value
      end
    end)
  end

  # Logical operators
  def filter({:and, [], [lhs, rhs]}, records) do
    lhs_results = filter(lhs, records)
    filter(rhs, lhs_results)
  end

  def filter({:or, [], [lhs, rhs]}, records) do
    lhs_results = filter(lhs, records)
    rhs_results = filter(rhs, records)
    Enum.uniq(lhs_results ++ rhs_results)
  end

  def filter({:not, [], expression}, records) when is_tuple(expression) do
    filtered_records = filter(expression, records)
    records -- filtered_records
  end

  # String predicates
  def filter({:starts_with, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      field_value = get_field_value(record, field)
      is_binary(field_value) and String.starts_with?(field_value, value)
    end)
  end

  def filter({:ends_with, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      field_value = get_field_value(record, field)
      is_binary(field_value) and String.ends_with?(field_value, value)
    end)
  end

  def filter({:contains, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      field_value = get_field_value(record, field)
      is_binary(field_value) and String.contains?(field_value, value)
    end)
  end

  # Fallback for unimplemented operators
  def filter({op, [], [field, value]}, _records) do
    raise ArgumentError,
          "Operator `#{op}` not implemented for Dequel.Enum adapter. " <>
            "Tried filtering field `#{field}` with value `#{inspect(value)}`"
  end

  @doc """
  Tests if a single record matches the given AST expression.

  Returns `true` if the record matches, `false` otherwise.

  ## Examples

      iex> record = %{name: "Alice", age: 30}
      iex> Dequel.Enum.match?({:==, [], [:name, "Alice"]}, record)
      true

      iex> Dequel.Enum.match?({:==, [], [:name, "Bob"]}, record)
      false
  """
  def match?(ast, record) do
    case filter(ast, [record]) do
      [_] -> true
      [] -> false
    end
  end

  @doc """
  Returns the first record matching the AST expression, or `nil` if none match.

  ## Examples

      iex> records = [%{name: "Alice"}, %{name: "Bob"}]
      iex> Dequel.Enum.find_one({:==, [], [:name, "Alice"]}, records)
      %{name: "Alice"}
  """
  def find_one(ast, records) do
    case filter(ast, records) do
      [record | _] -> record
      [] -> nil
    end
  end

  @doc """
  Returns all records matching the AST expression.

  This is an alias for `filter/2` for consistency with other adapters.
  """
  def find_all(ast, records) do
    filter(ast, records)
  end

  # Private helpers

  # Get field value from a record (map or struct)
  # Handles both atom and string field names
  defp get_field_value(record, field) when is_atom(field) do
    case record do
      %{__struct__: _} -> Map.get(record, field)
      %{} -> Map.get(record, field)
    end
  end

  defp get_field_value(record, field) when is_binary(field) do
    try do
      atom_field = String.to_existing_atom(field)
      Map.get(record, atom_field)
    rescue
      ArgumentError -> nil
    end
  end
end
