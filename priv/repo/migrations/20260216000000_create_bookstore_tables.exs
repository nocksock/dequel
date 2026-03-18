defmodule Dequel.Adapter.Ecto.Repo.Migrations.CreateBookstoreTables do
  use Ecto.Migration

  def change do
    create table(:authors) do
      add :name, :string, null: false
      add :bio, :text
      add :birth_date, :date
      add :country, :string
      add :details, :map

      timestamps()
    end

    create table(:bookstores) do
      add :name, :string, null: false
      add :location, :string
      add :services, {:array, :string}
      add :rating, :decimal
      add :founded_at, :date

      timestamps()
    end

    create table(:books) do
      add :title, :string, null: false
      add :isbn, :string, null: false
      add :price, :decimal
      add :published_at, :date
      add :page_count, :integer
      add :genre, :string
      add :author_id, references(:authors, on_delete: :delete_all)
      add :bookstore_id, references(:bookstores, on_delete: :delete_all)

      timestamps()
    end

    create index(:books, [:author_id])
    create index(:books, [:bookstore_id])
    create index(:books, [:genre])

    create table(:reviews) do
      add :content, :text
      add :rating, :integer, null: false
      add :reviewer_name, :string, null: false
      add :book_id, references(:books, on_delete: :delete_all)
      add :bookstore_id, references(:bookstores, on_delete: :nilify_all)

      timestamps()
    end

    create index(:reviews, [:book_id])
    create index(:reviews, [:bookstore_id])

    create table(:tags) do
      add :name, :string, null: false

      timestamps()
    end

    create unique_index(:tags, [:name])

    create table(:books_tags, primary_key: false) do
      add :book_id, references(:books, on_delete: :delete_all), null: false
      add :tag_id, references(:tags, on_delete: :delete_all), null: false
    end

    create index(:books_tags, [:book_id])
    create index(:books_tags, [:tag_id])
    create unique_index(:books_tags, [:book_id, :tag_id])
  end
end
