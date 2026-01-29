defmodule Dequel.Adapter.Ecto.Repo.Migrations.AddAuthors do
  use Ecto.Migration

  def change do
    create table(:authors) do
      add :name, :string
      add :bio, :string
    end

    alter table(:items) do
      add :author_id, references(:authors, on_delete: :nilify_all)
    end

    create index(:items, [:author_id])
  end
end
