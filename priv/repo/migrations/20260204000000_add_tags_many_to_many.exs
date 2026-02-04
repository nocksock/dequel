defmodule Dequel.Adapter.Ecto.Repo.Migrations.AddTagsManyToMany do
  use Ecto.Migration

  def change do
    create table(:tags) do
      add :name, :string
    end

    create table(:items_tags, primary_key: false) do
      add :item_id, references(:items, on_delete: :delete_all), null: false
      add :tag_id, references(:tags, on_delete: :delete_all), null: false
    end

    create index(:items_tags, [:item_id])
    create index(:items_tags, [:tag_id])
    create unique_index(:items_tags, [:item_id, :tag_id])
  end
end
