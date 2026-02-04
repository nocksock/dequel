defmodule Bench.Repo.Migrations.CreateBookstoreTables do
  use Ecto.Migration

  def change do
    create table(:bench_authors) do
      add :name, :string, null: false
      add :bio, :text
      add :birth_date, :date
      add :country, :string
      add :details, :map
    end

    create index(:bench_authors, [:name])
    create index(:bench_authors, [:country])

    create table(:bench_bookstores) do
      add :name, :string, null: false
      add :location, :string, null: false
      add :services, {:array, :string}
      add :rating, :decimal
      add :founded_at, :date
    end

    create index(:bench_bookstores, [:name])
    create index(:bench_bookstores, [:location])

    create table(:bench_books) do
      add :title, :string, null: false
      add :isbn, :string, null: false
      add :price, :decimal
      add :published_at, :date
      add :page_count, :integer
      add :genre, :string
      add :bookstore_id, references(:bench_bookstores, on_delete: :nilify_all)
      add :author_id, references(:bench_authors, on_delete: :nilify_all)
    end

    create unique_index(:bench_books, [:isbn])
    create index(:bench_books, [:title])
    create index(:bench_books, [:bookstore_id])
    create index(:bench_books, [:author_id])
    create index(:bench_books, [:genre])

    create table(:bench_reviews) do
      add :content, :text, null: false
      add :rating, :integer, null: false
      add :reviewer_name, :string
      add :created_at, :naive_datetime
      add :book_id, references(:bench_books, on_delete: :delete_all)
      add :bookstore_id, references(:bench_bookstores, on_delete: :delete_all)
    end

    create index(:bench_reviews, [:book_id])
    create index(:bench_reviews, [:bookstore_id])
    create index(:bench_reviews, [:rating])
  end
end
