defmodule Dequel do
  defdelegate where(input), to: Dequel.Adapter.Ecto.Filter
end
