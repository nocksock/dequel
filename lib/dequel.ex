defmodule Dequel do
  @moduledoc """
  Dequel - A friendly query language
  """

  defdelegate where(input), to: Dequel.Adapter.Ecto.Filter
end
