defmodule Dequel.Dynamic do
  @moduledoc """
  Runtime resolution of dynamic values (`@today`, `@this-month`, etc.) based on field type.

  The parser emits `{:dynamic, :name}` tokens. The semantic analyzer calls into this module
  via `apply(Dequel.Dynamic, type, [name])` where `type` is the field's schema type
  (`:date`, `:naive_datetime`, `:utc_datetime`, etc.).

  Functions return either:
  - A concrete value (for point-in-time dynamics like `@today`)
  - `{:range, start, end}` (for range dynamics like `@this-month`, `@this-year`)
  """

  # -- :date --

  def date(:today), do: Date.utc_today()
  def date(:tomorrow), do: Date.utc_today() |> Date.add(1)
  def date(:yesterday), do: Date.utc_today() |> Date.add(-1)
  def date(:"this-month-start"), do: Date.utc_today() |> Date.beginning_of_month()
  def date(:"this-month-end"), do: Date.utc_today() |> Date.end_of_month()

  def date(:"this-month") do
    today = Date.utc_today()
    {:range, Date.beginning_of_month(today), Date.end_of_month(today)}
  end

  def date(:"this-year") do
    year = Date.utc_today().year
    {:range, Date.new!(year, 1, 1), Date.new!(year, 12, 31)}
  end

  # -- :naive_datetime --

  def naive_datetime(name) do
    case date(name) do
      {:range, s, e} -> {:range, NaiveDateTime.new!(s, ~T[00:00:00]), NaiveDateTime.new!(e, ~T[23:59:59])}
      d -> NaiveDateTime.new!(d, ~T[00:00:00])
    end
  end

  def naive_datetime_usec(name), do: naive_datetime(name)

  # -- :utc_datetime --

  def utc_datetime(name) do
    case date(name) do
      {:range, s, e} ->
        {:range, DateTime.new!(s, ~T[00:00:00], "Etc/UTC"), DateTime.new!(e, ~T[23:59:59], "Etc/UTC")}

      d ->
        DateTime.new!(d, ~T[00:00:00], "Etc/UTC")
    end
  end

  def utc_datetime_usec(name), do: utc_datetime(name)
end
