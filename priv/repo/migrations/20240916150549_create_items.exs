defmodule Dequel.Adapter.Ecto.Repo.Migrations.CreateItems do
  use Ecto.Migration

  def change do
    create table(:items) do
      add :name, :string
      add :description, :string
      add :parent, :string
    end
  end
end
