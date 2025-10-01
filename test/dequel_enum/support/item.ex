defmodule Dequel.Enum.Item do
  @moduledoc """
  Simple item struct for Enum adapter testing.
  """

  defstruct [:name, :description, :parent]

  @doc """
  Creates a new Item from a map of attributes.
  Accepts both string and atom keys.
  """
  def new(attrs \\ %{}) do
    %__MODULE__{
      name: attrs["name"] || attrs[:name],
      description: attrs["description"] || attrs[:description],
      parent: attrs["parent"] || attrs[:parent]
    }
  end
end
