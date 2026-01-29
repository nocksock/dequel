defmodule Dequel.Adapter.Ets.FilterImpl do
  @moduledoc """
  ETS adapter for Dequel queries. Converts parsed AST to ETS filtering functions.
  """

  def filter(input, records) when is_binary(input) do
    input
    |> Dequel.Parser.parse!()
    |> filter(records)
  end

  def filter({:==, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      get_field_value(record, field) == value
    end)
  end

  def filter({:and, [], [lhs, rhs]}, records) do
    lhs_results = filter(lhs, records)
    filter(rhs, lhs_results)
  end

  def filter({:or, [], [lhs, rhs]}, records) do
    lhs_results = filter(lhs, records)
    rhs_results = filter(rhs, records)
    Enum.uniq(lhs_results ++ rhs_results)
  end

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

  def filter({:not, [], expression}, records) do
    filtered_records = filter(expression, records)
    records -- filtered_records
  end

  def filter({op, [], [field, value]}, _records) do
    raise "Operator `#{op}` not yet implemented. Tried calling `#{field}:#{op}(#{value})`"
  end

  # Helper function to get field value from record
  defp get_field_value(record, field) when is_atom(field) do
    Map.get(record, field)
  end

  defp get_field_value(record, path) when is_list(path) do
    Enum.reduce_while(path, record, fn
      _field, nil -> {:halt, nil}
      field, current when is_map(current) -> {:cont, Map.get(current, field)}
      _field, _ -> {:halt, nil}
    end)
  end

  defp get_field_value(record, field) when is_binary(field) do
    # Note: String.to_existing_atom/1 raises ArgumentError if atom doesn't exist.
    # This is expected for dynamic field names and indicates the field isn't in the schema.
    # We treat this as "field not present" for filtering purposes.
    atom_field = String.to_existing_atom(field)
    Map.get(record, atom_field)
  rescue
    ArgumentError ->
      # Field name not recognized - treat as nil (no match)
      nil
  end

  # Public function to filter a single record (for testing)
  def match?(ast, record) do
    case filter(ast, [record]) do
      [_] -> true
      [] -> false
    end
  end

  # Get first matching record
  def find_one(ast, records) do
    case filter(ast, records) do
      [record | _] -> record
      [] -> nil
    end
  end

  # Get all matching records
  def find_all(ast, records) do
    filter(ast, records)
  end
end
