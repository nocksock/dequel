defmodule Dequel.Adapter.Ets.Item do
  @moduledoc """
  Simple item struct for ETS testing.
  """

  defstruct [:name, :description, :parent]

  def new(attrs \\ %{}) do
    %__MODULE__{
      name: attrs["name"] || attrs[:name],
      description: attrs["description"] || attrs[:description],
      parent: attrs["parent"] || attrs[:parent]
    }
  end
end