defmodule Dequel.Dynamic do
  @moduledoc """
  Runtime resolution of dynamic values (`@today`, `@this-month`, etc.) based on field type.

  The parser emits `{:dynamic, :name}` tokens. The semantic analyzer calls
  `Dequel.Dynamic.resolve(type, name)` where `type` is the field's schema type.

  Returns either:
  - A concrete value (for point-in-time dynamics like `@today`)
  - `{:range, start, end}` (for range dynamics like `@this-month`, `@this-year`)
  """

  @date_types [:date, :naive_datetime, :naive_datetime_usec, :utc_datetime, :utc_datetime_usec]

  @doc """
  Resolves a dynamic value name for the given field type.

  Returns `:error` for unsupported types.
  """
  def resolve(type, name) when type in @date_types do
    date = resolve_date(name)

    case type do
      :date -> date
      t when t in [:naive_datetime, :naive_datetime_usec] -> to_naive(date)
      t when t in [:utc_datetime, :utc_datetime_usec] -> to_utc(date)
    end
  end

  def resolve(_type, _name), do: :error

  # -- date resolution --

  defp resolve_date(:today), do: Date.utc_today()
  defp resolve_date(:tomorrow), do: Date.utc_today() |> Date.add(1)
  defp resolve_date(:yesterday), do: Date.utc_today() |> Date.add(-1)
  defp resolve_date(:"this-month-start"), do: Date.utc_today() |> Date.beginning_of_month()
  defp resolve_date(:"this-month-end"), do: Date.utc_today() |> Date.end_of_month()

  defp resolve_date(:"this-month") do
    today = Date.utc_today()
    {:range, Date.beginning_of_month(today), Date.end_of_month(today)}
  end

  defp resolve_date(:"this-year") do
    year = Date.utc_today().year
    {:range, Date.new!(year, 1, 1), Date.new!(year, 12, 31)}
  end

  # -- type wrappers --

  defp to_naive({:range, s, e}),
    do: {:range, NaiveDateTime.new!(s, ~T[00:00:00]), NaiveDateTime.new!(e, ~T[23:59:59])}

  defp to_naive(d), do: NaiveDateTime.new!(d, ~T[00:00:00])

  defp to_utc({:range, s, e}),
    do:
      {:range, DateTime.new!(s, ~T[00:00:00], "Etc/UTC"),
       DateTime.new!(e, ~T[23:59:59], "Etc/UTC")}

  defp to_utc(d), do: DateTime.new!(d, ~T[00:00:00], "Etc/UTC")
end
