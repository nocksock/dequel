defmodule Dequel.Comparators do
  @moduledoc """
  Shared comparison utilities for Dequel adapters and matchers.

  Provides type coercion and comparison functions used by both the ETS adapter
  and the in-memory `Dequel.matches?/2` function.
  """

  @doc """
  Gets a field value from a map or struct.

  Handles atoms, strings (converted to existing atoms), and paths (list of atoms or strings).

  ## Examples

      iex> Dequel.Comparators.get_field_value(%{name: "Alice"}, :name)
      "Alice"

      iex> Dequel.Comparators.get_field_value(%{author: %{name: "Bob"}}, [:author, :name])
      "Bob"

      iex> Dequel.Comparators.get_field_value(%{author: %{name: "Bob"}}, ["author", "name"])
      "Bob"

      iex> Dequel.Comparators.get_field_value(%{author: nil}, ["author", "name"])
      nil

  """
  @spec get_field_value(map(), atom() | [atom() | binary()] | binary()) :: any()
  def get_field_value(record, field) when is_atom(field) do
    Map.get(record, field)
  end

  def get_field_value(record, path) when is_list(path) do
    traverse_path(record, path)
  end

  def get_field_value(record, field) when is_binary(field) do
    atom_field = :erlang.binary_to_existing_atom(field, :utf8)
    Map.get(record, atom_field)
  catch
    :error, :badarg ->
      # Atom doesn't exist - field name not recognized, treat as nil
      nil
  end


  defp traverse_path(nil, _path), do: nil
  defp traverse_path(value, []), do: value

  defp traverse_path(current, [field | rest]) when is_map(current) do
    traverse_path(get_map_value(current, field), rest)
  end

  defp traverse_path(current, path) when is_list(current) do
    # Traverse into each list element and collect results
    results =
      current
      |> Enum.map(&traverse_path(&1, path))
      |> Enum.reject(&is_nil/1)

    case results do
      [] -> nil
      _ -> {:any, results}
    end
  end

  defp traverse_path(_current, _path), do: nil

  @doc """
  Compares two values using the given comparison operator function.

  Handles type coercion when comparing numbers against strings.

  ## Examples

      iex> Dequel.Comparators.compare_values(10, "5", &Kernel.>/2)
      true

      iex> Dequel.Comparators.compare_values(nil, "5", &Kernel.>/2)
      false

  """
  @spec compare_values(any(), any(), (any(), any() -> boolean())) :: boolean()
  def compare_values(nil, _value, _op), do: false

  def compare_values(field_value, value, op) when is_number(field_value) and is_binary(value) do
    case parse_number(value) do
      {:ok, num} -> op.(field_value, num)
      :error -> false
    end
  end

  def compare_values(%struct{} = field_value, %struct2{} = value, op)
      when struct in [Date, NaiveDateTime, DateTime] and
             struct2 in [Date, NaiveDateTime, DateTime] do
    result = struct.compare(field_value, value)
    compare_order(result, op)
  end

  def compare_values(%struct{} = field_value, value, op)
      when struct in [Date, NaiveDateTime, DateTime] and is_binary(value) do
    case parse_date(value, struct) do
      {:ok, parsed} ->
        result = struct.compare(field_value, parsed)
        compare_order(result, op)

      :error ->
        false
    end
  end

  def compare_values(field_value, value, op), do: op.(field_value, value)

  @doc """
  Parses a string into a number (integer or float).

  ## Examples

      iex> Dequel.Comparators.parse_number("42")
      {:ok, 42}

      iex> Dequel.Comparators.parse_number("3.14")
      {:ok, 3.14}

      iex> Dequel.Comparators.parse_number("not a number")
      :error

  """
  @spec parse_number(binary()) :: {:ok, number()} | :error
  def parse_number(str) when is_binary(str) do
    if String.contains?(str, ".") do
      case Float.parse(str) do
        {num, ""} -> {:ok, num}
        _ -> :error
      end
    else
      case Integer.parse(str) do
        {num, ""} -> {:ok, num}
        _ -> :error
      end
    end
  end

  def parse_number(num) when is_number(num), do: {:ok, num}
  def parse_number(_), do: :error

  @doc """
  Checks if a value is within a range (inclusive).

  ## Examples

      iex> Dequel.Comparators.in_range?(15, "10", "20")
      true

      iex> Dequel.Comparators.in_range?(nil, "10", "20")
      false

  """
  @spec in_range?(any(), any(), any()) :: boolean()
  def in_range?(nil, _start, _end), do: false

  def in_range?(%struct{} = field_value, %s1{} = start_val, %s2{} = end_val)
      when struct in [Date, NaiveDateTime, DateTime] and
             s1 in [Date, NaiveDateTime, DateTime] and
             s2 in [Date, NaiveDateTime, DateTime] do
    struct.compare(field_value, start_val) in [:gt, :eq] and
      struct.compare(field_value, end_val) in [:lt, :eq]
  end

  def in_range?(%struct{} = field_value, start_val, end_val)
      when struct in [Date, NaiveDateTime, DateTime] and
             is_binary(start_val) and is_binary(end_val) do
    with {:ok, parsed_start} <- parse_date(start_val, struct),
         {:ok, parsed_end} <- parse_date(end_val, struct) do
      struct.compare(field_value, parsed_start) in [:gt, :eq] and
        struct.compare(field_value, parsed_end) in [:lt, :eq]
    else
      _ -> false
    end
  end

  def in_range?(field_value, start_val, end_val) when is_number(field_value) do
    with {:ok, start_num} <- parse_number(start_val),
         {:ok, end_num} <- parse_number(end_val) do
      field_value >= start_num and field_value <= end_num
    else
      _ -> false
    end
  end

  def in_range?(field_value, start_val, end_val) do
    field_value >= start_val and field_value <= end_val
  end

  @doc """
  Checks if a string matches using the given string operation.

  Returns false for nil values or non-string field values.

  ## Examples

      iex> Dequel.Comparators.string_match?("hello world", "world", :contains)
      true

      iex> Dequel.Comparators.string_match?("hello", "he", :starts_with)
      true

  """
  @spec string_match?(any(), binary(), :contains | :starts_with | :ends_with) :: boolean()
  def string_match?(nil, _value, _operation), do: false

  def string_match?({:any, values}, value, operation) do
    Enum.any?(values, &string_match?(&1, value, operation))
  end

  def string_match?(field_value, value, operation) when is_binary(field_value) do
    case operation do
      :contains -> String.contains?(field_value, value)
      :starts_with -> String.starts_with?(field_value, value)
      :ends_with -> String.ends_with?(field_value, value)
    end
  end

  def string_match?(_field_value, _value, _operation), do: false

  defp compare_order(:lt, op), do: op.(-1, 0)
  defp compare_order(:eq, op), do: op.(0, 0)
  defp compare_order(:gt, op), do: op.(1, 0)

  defp parse_date(str, Date) do
    case Dequel.Semantic.Coerce.coerce(str, :date) do
      %Date{} = date -> {:ok, date}
      _ -> :error
    end
  end

  defp parse_date(str, NaiveDateTime) do
    case Dequel.Semantic.Coerce.coerce(str, :naive_datetime) do
      %NaiveDateTime{} = dt -> {:ok, dt}
      _ -> :error
    end
  end

  defp parse_date(str, DateTime) do
    case Dequel.Semantic.Coerce.coerce(str, :utc_datetime) do
      %DateTime{} = dt -> {:ok, dt}
      _ -> :error
    end
  end

  # Tries atom key first (most common for Elixir maps), falls back to string key
  defp get_map_value(map, key) when is_binary(key) do
    atom_key = String.to_existing_atom(key)
    Map.get(map, atom_key)
  rescue
    ArgumentError -> Map.get(map, key)
  end

  defp get_map_value(map, key) when is_atom(key) do
    Map.get(map, key)
  end
end
