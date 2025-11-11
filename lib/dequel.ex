defmodule Dequel do
  @moduledoc """
  Dequel - A friendly query language for user input built on Ecto.

  Provides a simple interface for filtering records using a human-readable query syntax.
  """

  defdelegate where(input), to: Dequel.Adapter.Ecto.Filter
end
