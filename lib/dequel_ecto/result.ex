defmodule Dequel.Ecto.Result do
  @moduledoc """
  Represents the result of a Dequel query executed through the Ecto adapter.

  Contains the query results along with metadata about the schema and query used.
  """

  alias Dequel.Ecto.Result
  @derive Jason.Encoder
  defstruct [:entries, :schema, :query]

  @doc """
  Extracts the entries from a Result struct.
  """
  def entries(%Result{entries: entries}) do
    entries
  end

  @doc """
  Generates a random DOM ID for use in UI components.
  """
  def random_dom_id(length \\ 32) do
    :crypto.strong_rand_bytes(length) |> Base.encode64() |> binary_part(0, length)
  end
end
