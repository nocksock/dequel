defmodule Dequel.Adapter.Ets.ItemStore do
  @moduledoc """
  ETS-based item store for testing ETS adapter functionality.
  """

  @table_name __MODULE__

  defstruct [:id, :name, :description, :parent]

  def start_link(_opts \\ []) do
    case :ets.whereis(@table_name) do
      :undefined -> :ets.new(@table_name, [:set, :public, :named_table])
      _ -> @table_name
    end

    {:ok, :no_pid}
  end

  def insert(item) do
    id = :erlang.unique_integer([:positive])

    item_with_id = %__MODULE__{
      id: id,
      name: item.name,
      description: item.description,
      parent: item.parent
    }

    :ets.insert(@table_name, {id, item_with_id})
    item_with_id
  end

  def all do
    :ets.tab2list(@table_name)
    |> Enum.map(fn {_id, item} -> item end)
  end

  def find(id) do
    case :ets.lookup(@table_name, id) do
      [{^id, item}] -> item
      [] -> nil
    end
  end

  def clear do
    if table_exists?() do
      :ets.delete_all_objects(@table_name)
    end
  end

  def table_exists? do
    :ets.info(@table_name) != :undefined
  end
end
