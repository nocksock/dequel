defmodule DequelDemo.Repo.Migrations.AddSchemaEnhancements do
  use Ecto.Migration

  def change do
    # Add details map to authors
    alter table(:authors) do
      add :details, :map
    end

    # Add services array to bookstores
    alter table(:bookstores) do
      add :services, {:array, :string}
    end

    # Add bookstore_id to reviews
    alter table(:reviews) do
      add :bookstore_id, references(:bookstores, on_delete: :nilify_all)
    end

    create index(:reviews, [:bookstore_id])

    # Create tags table
    create table(:tags) do
      add :name, :string, null: false

      timestamps()
    end

    create unique_index(:tags, [:name])

    # Create books_tags join table
    create table(:books_tags, primary_key: false) do
      add :book_id, references(:books, on_delete: :delete_all), null: false
      add :tag_id, references(:tags, on_delete: :delete_all), null: false
    end

    create index(:books_tags, [:book_id])
    create index(:books_tags, [:tag_id])
    create unique_index(:books_tags, [:book_id, :tag_id])
  end
end
