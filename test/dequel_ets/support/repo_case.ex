defmodule Dequel.Adapter.Ets.RepoCase do
  use ExUnit.CaseTemplate

  alias Dequel.Adapter.Ets.ItemStore

  using do
    quote do
      alias Dequel.Adapter.Ets.Item
      alias Dequel.Adapter.Ets.ItemStore
      import Dequel.Adapter.Ets.RepoCase
    end
  end

  setup _tags do
    ItemStore.start_link()
    on_exit(fn -> ItemStore.clear() end)
    :ok
  end
end
