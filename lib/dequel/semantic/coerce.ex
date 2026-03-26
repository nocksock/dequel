defmodule Dequel.Semantic.Coerce do
  @moduledoc """
  Type coercion for query values.

  Converts string values from the parser into their proper typed equivalents
  based on field type information from the schema resolver.

  ## Supported Types

  | Type              | Input                      | Output                          |
  |-------------------|----------------------------|--------------------------------|
  | `:integer`        | `"25"`                     | `25`                           |
  | `:float`          | `"3.14"`                   | `3.14`                         |
  | `:boolean`        | `"true"/"yes"/"1"/"false"/"no"/"0"` | `true`/`false`          |
  | `:date`           | `"2024-01-15"`             | `~D[2024-01-15]`               |
  | `:naive_datetime` | `"2024-01-15T10:30:00"`    | `~N[2024-01-15 10:30:00]`      |
  | `:utc_datetime`   | `"2024-01-15T10:30:00Z"`   | `~U[2024-01-15 10:30:00Z]`     |
  | `:decimal`        | `"19.99"`                  | `Decimal.new("19.99")`         |
  | `:string`/unknown | `"foo"`                    | `"foo"` (unchanged)            |

  Invalid values are returned unchanged, letting the adapter or runtime handle errors.
  """

  @date_types [:date, :naive_datetime, :naive_datetime_usec, :utc_datetime, :utc_datetime_usec]

  @doc """
  Coerces a string value to the given type.

  Returns the original value if coercion fails or type is unknown.

  ## Examples

      iex> Dequel.Semantic.Coerce.coerce("42", :integer)
      42

      iex> Dequel.Semantic.Coerce.coerce("-123", :integer)
      -123

      iex> Dequel.Semantic.Coerce.coerce("invalid", :integer)
      "invalid"

      iex> Dequel.Semantic.Coerce.coerce("3.14", :float)
      3.14

      iex> Dequel.Semantic.Coerce.coerce("true", :boolean)
      true

      iex> Dequel.Semantic.Coerce.coerce("false", :boolean)
      false

      iex> Dequel.Semantic.Coerce.coerce("1", :boolean)
      true

      iex> Dequel.Semantic.Coerce.coerce("0", :boolean)
      false

      iex> Dequel.Semantic.Coerce.coerce("yes", :boolean)
      true

      iex> Dequel.Semantic.Coerce.coerce("no", :boolean)
      false

      iex> Dequel.Semantic.Coerce.coerce("2024-01-15", :date)
      ~D[2024-01-15]

      iex> Dequel.Semantic.Coerce.coerce("2024-01-15T10:30:00", :naive_datetime)
      ~N[2024-01-15 10:30:00]

      iex> Dequel.Semantic.Coerce.coerce("2024-01-15T10:30:00Z", :utc_datetime)
      ~U[2024-01-15 10:30:00Z]

      iex> Dequel.Semantic.Coerce.coerce("hello", :string)
      "hello"

      iex> Dequel.Semantic.Coerce.coerce("hello", :unknown_type)
      "hello"

  Non-string values pass through unchanged:

      iex> Dequel.Semantic.Coerce.coerce(42, :integer)
      42

      iex> Dequel.Semantic.Coerce.coerce(nil, :string)
      nil
  """
  @spec coerce(term(), atom()) :: term()

  def coerce(value, type)

  # Dynamic values — resolve via Dequel.Dynamic based on field type
  def coerce({:dynamic, name}, type) do
    case Dequel.Dynamic.resolve(type, name) do
      :error -> {:dynamic, name}
      result -> result
    end
  end

  # Already the right type - pass through
  def coerce(value, _) when not is_binary(value), do: value

  def coerce(value, :integer) do
    case Integer.parse(value) do
      {int, ""} -> int
      _ -> value
    end
  end

  def coerce(value, :id), do: coerce(value, :integer)

  def coerce(value, :float) do
    case Float.parse(value) do
      {float, ""} -> float
      _ -> value
    end
  end

  def coerce(value, :boolean) do
    case String.downcase(value) do
      "true" -> true
      "yes" -> true
      "1" -> true
      "false" -> false
      "no" -> false
      "0" -> false
      _ -> value
    end
  end

  # Date — YYYY-MM-DD
  def coerce(<<_, _, _, _, ?-, _, _, ?-, _, _>> = value, date_type)
      when date_type in @date_types do
    case Date.from_iso8601(value) do
      {:ok, date} -> to_date_type(date, date_type)
      {:error, _} -> value
    end
  end

  # Date — YYYY-MM (expand to first of month)
  def coerce(<<_, _, _, _, ?-, _, _>> = value, date_type)
      when date_type in @date_types do
    case Date.from_iso8601(value <> "-01") do
      {:ok, date} -> to_date_type(date, date_type)
      {:error, _} -> value
    end
  end

  # Date — YYYY (expand to January 1st)
  def coerce(<<y1, y2, y3, y4>> = value, date_type)
      when y1 in ?0..?9 and y2 in ?0..?9 and y3 in ?0..?9 and y4 in ?0..?9 and
             date_type in @date_types do
    case Date.from_iso8601(value <> "-01-01") do
      {:ok, date} -> to_date_type(date, date_type)
      {:error, _} -> value
    end
  end

  # NaiveDateTime — full ISO8601 datetime
  def coerce(value, :naive_datetime) do
    case NaiveDateTime.from_iso8601(value) do
      {:ok, datetime} -> datetime
      {:error, _} -> value
    end
  end

  def coerce(value, :naive_datetime_usec), do: coerce(value, :naive_datetime)

  # UTC DateTime — full ISO8601 datetime with timezone
  def coerce(value, :utc_datetime) do
    case DateTime.from_iso8601(value) do
      {:ok, datetime, _offset} -> datetime
      {:error, _} -> value
    end
  end

  def coerce(value, :utc_datetime_usec), do: coerce(value, :utc_datetime)

  def coerce(value, :decimal) do
    if Code.ensure_loaded?(Decimal) do
      try do
        Decimal.new(value)
      rescue
        Decimal.Error -> value
      end
    else
      value
    end
  end

  # String and unknown types - pass through unchanged
  def coerce(value, _), do: value

  @doc """
  Returns date range bounds for partial date strings.

  Used by the Analyzer to expand `:==` on partial dates to `:between` ranges.

  ## Examples

      iex> Dequel.Semantic.Coerce.date_range("2024-01", :date)
      {:range, ~D[2024-01-01], ~D[2024-01-31]}

      iex> Dequel.Semantic.Coerce.date_range("2024", :date)
      {:range, ~D[2024-01-01], ~D[2024-12-31]}

      iex> Dequel.Semantic.Coerce.date_range("2024-01-15", :date)
      {:exact, ~D[2024-01-15]}

      iex> Dequel.Semantic.Coerce.date_range("hello", :date)
      :error

      iex> Dequel.Semantic.Coerce.date_range("2024-01", :naive_datetime)
      {:range, ~N[2024-01-01 00:00:00], ~N[2024-01-31 23:59:59]}

      iex> Dequel.Semantic.Coerce.date_range("2024", :utc_datetime)
      {:range, ~U[2024-01-01 00:00:00Z], ~U[2024-12-31 23:59:59Z]}
  """
  @spec date_range(term(), atom()) :: {:range, term(), term()} | {:exact, term()} | :error

  # Dynamic values — resolve via Dequel.Dynamic
  def date_range({:dynamic, name}, type) do
    case Dequel.Dynamic.resolve(type, name) do
      :error -> :error
      {:range, start_val, end_val} -> {:range, start_val, end_val}
      val -> {:exact, val}
    end
  end

  # YYYY-MM — partial month range
  def date_range(<<_, _, _, _, ?-, _, _>> = value, date_type)
      when date_type in @date_types do
    case Date.from_iso8601(value <> "-01") do
      {:ok, start_date} ->
        end_date = Date.new!(start_date.year, start_date.month, Date.days_in_month(start_date))
        {:range, to_date_type(start_date, date_type), to_end_of_day(end_date, date_type)}

      {:error, _} ->
        :error
    end
  end

  # YYYY — partial year range
  def date_range(<<y1, y2, y3, y4>> = value, date_type)
      when y1 in ?0..?9 and y2 in ?0..?9 and y3 in ?0..?9 and y4 in ?0..?9 and
             date_type in @date_types do
    case Date.from_iso8601(value <> "-01-01") do
      {:ok, start_date} ->
        end_date = Date.new!(start_date.year, 12, 31)
        {:range, to_date_type(start_date, date_type), to_end_of_day(end_date, date_type)}

      {:error, _} ->
        :error
    end
  end

  # YYYY-MM-DD — exact date
  def date_range(<<_, _, _, _, ?-, _, _, ?-, _, _>> = value, date_type)
      when date_type in @date_types do
    case Date.from_iso8601(value) do
      {:ok, date} -> {:exact, to_date_type(date, date_type)}
      {:error, _} -> :error
    end
  end

  # Anything else
  def date_range(_value, _type), do: :error

  defp to_end_of_day(date, :date), do: date

  defp to_end_of_day(date, t) when t in [:naive_datetime, :naive_datetime_usec],
    do: NaiveDateTime.new!(date, ~T[23:59:59])

  defp to_end_of_day(date, t) when t in [:utc_datetime, :utc_datetime_usec],
    do: DateTime.new!(date, ~T[23:59:59], "Etc/UTC")

  defp to_date_type(date, :date), do: date

  defp to_date_type(date, t) when t in [:naive_datetime, :naive_datetime_usec],
    do: NaiveDateTime.new!(date, ~T[00:00:00])

  defp to_date_type(date, t) when t in [:utc_datetime, :utc_datetime_usec],
    do: DateTime.new!(date, ~T[00:00:00], "Etc/UTC")
end
