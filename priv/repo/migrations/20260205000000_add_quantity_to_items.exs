defmodule Dequel.Adapter.Ecto.Repo.Migrations.AddQuantityToItems do
  use Ecto.Migration

  def change do
    alter table(:items) do
      add :quantity, :integer
      add :price, :decimal, precision: 10, scale: 2
    end
  end
end
