defmodule Dequel.Query.Result do
  alias Dequel.Query.Result
  @derive Jason.Encoder
  defstruct [:entries, :schema, :query]

  def entries(%Result{entries: entries}) do
    entries
  end

  def random_dom_id(length \\ 32) do
    :crypto.strong_rand_bytes(length) |> Base.encode64() |> binary_part(0, length)
  end
end
