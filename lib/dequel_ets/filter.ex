defmodule Dequel.Adapter.Ets.FilterImpl do
  @moduledoc """
  ETS adapter for Dequel queries. Converts parsed AST to ETS filtering functions.
  """

  alias Dequel.Comparators

  def filter(input, records) when is_binary(input) and is_list(records) do
    input
    |> Dequel.Parser.parse!()
    |> filter(records)
  end

  def filter({:empty, _, _}, records), do: records

  def filter({:==, [], [field, expected_value]}, records) do
    Enum.filter(records, fn record ->
      case Comparators.get_field_value(record, field) do
        list when is_list(list)  -> 
          expected_value in list
        value -> 
          Comparators.get_field_value(record, field) == expected_value
        end
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
      field_value = Comparators.get_field_value(record, field)
      Comparators.string_match?(field_value, value, :starts_with)
    end)
  end

  def filter({:ends_with, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      field_value = Comparators.get_field_value(record, field)
      Comparators.string_match?(field_value, value, :ends_with)
    end)
  end

  def filter({:contains, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      field_value = Comparators.get_field_value(record, field)
      Comparators.string_match?(field_value, value, :contains)
    end)
  end

  def filter({:>, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      field_value = Comparators.get_field_value(record, field)
      Comparators.compare_values(field_value, value, &Kernel.>/2)
    end)
  end

  def filter({:<, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      field_value = Comparators.get_field_value(record, field)
      Comparators.compare_values(field_value, value, &Kernel.</2)
    end)
  end

  def filter({:>=, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      field_value = Comparators.get_field_value(record, field)
      Comparators.compare_values(field_value, value, &Kernel.>=/2)
    end)
  end

  def filter({:<=, [], [field, value]}, records) do
    Enum.filter(records, fn record ->
      field_value = Comparators.get_field_value(record, field)
      Comparators.compare_values(field_value, value, &Kernel.<=/2)
    end)
  end

  def filter({:between, [], [field, start_val, end_val]}, records) do
    Enum.filter(records, fn record ->
      field_value = Comparators.get_field_value(record, field)
      Comparators.in_range?(field_value, start_val, end_val)
    end)
  end

  def filter({:not, [], expression}, records) do
    filtered_records = filter(expression, records)
    records -- filtered_records
  end

  def filter({:in, [], [field, values]}, records) do
    Enum.filter(records, fn record ->
      case Comparators.get_field_value(record, field) do
        list when is_list(list) -> Enum.any?(values, &(&1 in list))
        value -> value in values
      end
    end)
  end

  def filter({op, [], [field, value]}, _records) do
    raise "Operator `#{op}` not yet implemented. Tried calling `#{field}:#{op}(#{value})`"
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
