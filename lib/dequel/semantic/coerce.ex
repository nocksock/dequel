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
  | `:boolean`        | `"true"/"false"/"1"/"0"`   | `true`/`false`                 |
  | `:date`           | `"2024-01-15"`             | `~D[2024-01-15]`               |
  | `:naive_datetime` | `"2024-01-15T10:30:00"`    | `~N[2024-01-15 10:30:00]`      |
  | `:utc_datetime`   | `"2024-01-15T10:30:00Z"`   | `~U[2024-01-15 10:30:00Z]`     |
  | `:decimal`        | `"19.99"`                  | `Decimal.new("19.99")`         |
  | `:string`/unknown | `"foo"`                    | `"foo"` (unchanged)            |

  Invalid values are returned unchanged, letting the adapter or runtime handle errors.
  """

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

  # Already the right type - pass through
  def coerce(value, _type) when not is_binary(value), do: value

  # Integer
  def coerce(value, :integer) do
    case Integer.parse(value) do
      {int, ""} -> int
      _ -> value
    end
  end

  def coerce(value, :id), do: coerce(value, :integer)

  # Float
  def coerce(value, :float) do
    case Float.parse(value) do
      {float, ""} -> float
      _ -> value
    end
  end

  # Boolean
  def coerce(value, :boolean) do
    case String.downcase(value) do
      "true" -> true
      "1" -> true
      "false" -> false
      "0" -> false
      _ -> value
    end
  end

  # Date
  def coerce(value, :date) do
    case Date.from_iso8601(value) do
      {:ok, date} -> date
      {:error, _} -> value
    end
  end

  # Naive DateTime
  def coerce(value, :naive_datetime) do
    # Try ISO8601 format first, then with T separator replaced
    case NaiveDateTime.from_iso8601(value) do
      {:ok, datetime} -> datetime
      {:error, _} -> value
    end
  end

  def coerce(value, :naive_datetime_usec), do: coerce(value, :naive_datetime)

  # UTC DateTime
  def coerce(value, :utc_datetime) do
    case DateTime.from_iso8601(value) do
      {:ok, datetime, _offset} -> datetime
      {:error, _} -> value
    end
  end

  def coerce(value, :utc_datetime_usec), do: coerce(value, :utc_datetime)

  # Decimal
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
  def coerce(value, :string), do: value
  def coerce(value, :binary), do: value
  def coerce(value, nil), do: value
  def coerce(value, _unknown_type), do: value
end
