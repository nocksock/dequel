defmodule Dequel.Fixtures do
  @moduledoc """
  Test fixtures using test schemas.
  Works with any Ecto.Repo that has the bookstore tables.
  """

  alias Dequel.Test.Schemas.{Author, Book, Store, Review, Tag}

  @doc """
  Returns the configured test repo, defaulting to Dequel.Adapter.Ecto.Repo.
  """
  def repo, do: Application.get_env(:dequel, :test_repo, Dequel.Adapter.Ecto.Repo)

  @doc """
  Creates an author with default values.
  """
  def author_fixture(attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        name: "Test Author",
        bio: "Test bio",
        birth_date: ~D[1990-01-01],
        country: "Test Country"
      })

    %Author{}
    |> Author.changeset(attrs)
    |> repo().insert!()
  end

  @doc """
  Creates a bookstore with default values.
  """
  def bookstore_fixture(attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        name: "Test Bookstore",
        location: "Test Location",
        rating: Decimal.new("4.5"),
        founded_at: ~D[2000-01-01]
      })

    %Store{}
    |> Store.changeset(attrs)
    |> repo().insert!()
  end

  @doc """
  Creates a book with default values.
  Optionally pass :author and :bookstore maps to auto-create related entities.
  """
  def book_fixture(attrs \\ %{}) do
    attrs =
      attrs
      |> maybe_create_assoc(:author, :author_id, &author_fixture/1)
      |> maybe_create_assoc(:bookstore, :bookstore_id, &bookstore_fixture/1)
      |> Enum.into(%{
        title: "Test Book",
        isbn: "978-#{:rand.uniform(9_999_999_999)}",
        price: Decimal.new("19.99"),
        published_at: ~D[2020-01-01],
        page_count: 300,
        genre: "fiction"
      })

    %Book{} |> Book.changeset(attrs) |> repo().insert!()
  end

  @doc """
  Creates a review with default values.
  Optionally pass :book map to auto-create the related book.
  """
  def review_fixture(attrs \\ %{}) do
    attrs =
      attrs
      |> maybe_create_assoc(:book, :book_id, &book_fixture/1)
      |> Enum.into(%{
        content: "Great book!",
        rating: 5,
        reviewer_name: "Test Reviewer"
      })

    %Review{} |> Review.changeset(attrs) |> repo().insert!()
  end

  defp maybe_create_assoc(attrs, key, fk_key, create_fn) do
    case Map.pop(attrs, key) do
      {nil, attrs} -> attrs
      {assoc_attrs, attrs} -> Map.put(attrs, fk_key, create_fn.(assoc_attrs).id)
    end
  end

  @doc """
  Creates a tag with default values.
  """
  def tag_fixture(attrs \\ %{}) do
    attrs = Enum.into(attrs, %{name: "Test Tag"})

    %Tag{}
    |> Tag.changeset(attrs)
    |> repo().insert!()
  end

  @doc """
  Links a book to a tag via the join table.
  """
  def add_tag_to_book(book, tag) do
    repo().insert_all("books_tags", [%{book_id: book.id, tag_id: tag.id}])
    book
  end

  @doc """
  Seeds a small bookstore dataset for testing.
  Returns a map with all created entities organized by type.
  """
  def seed_bookstore do
    authors = seed_authors()
    stores = seed_stores()
    books = seed_books(authors, stores)
    seed_reviews(books)

    %{authors: authors, stores: stores, books: books}
  end

  defp seed_authors do
    %{
      tolkien:
        author_fixture(%{name: "J.R.R. Tolkien", country: "England", birth_date: ~D[1892-01-03]}),
      rowling:
        author_fixture(%{name: "J.K. Rowling", country: "England", birth_date: ~D[1965-07-31]}),
      asimov:
        author_fixture(%{name: "Isaac Asimov", country: "USA", birth_date: ~D[1920-01-02]}),
      christie:
        author_fixture(%{name: "Agatha Christie", country: "England", birth_date: ~D[1890-09-15]})
    }
  end

  defp seed_stores do
    %{
      shire_books:
        bookstore_fixture(%{name: "The Shire Books", rating: Decimal.new("4.8"), location: "Hobbiton"}),
      diagon_books:
        bookstore_fixture(%{name: "Diagon Alley Books", rating: Decimal.new("4.5"), location: "London"}),
      foundation_store:
        bookstore_fixture(%{name: "Foundation Books", rating: Decimal.new("4.2"), location: "New York"})
    }
  end

  defp seed_books(authors, stores) do
    %{
      lotr:
        book_fixture(%{
          title: "The Lord of the Rings", isbn: "978-0618640157",
          price: Decimal.new("29.99"), published_at: ~D[1954-07-29],
          page_count: 1178, genre: "fantasy",
          author_id: authors.tolkien.id, bookstore_id: stores.shire_books.id
        }),
      hobbit:
        book_fixture(%{
          title: "The Hobbit", isbn: "978-0547928227",
          price: Decimal.new("14.99"), published_at: ~D[1937-09-21],
          page_count: 310, genre: "fantasy",
          author_id: authors.tolkien.id, bookstore_id: stores.shire_books.id
        }),
      hp1:
        book_fixture(%{
          title: "Harry Potter and the Philosopher's Stone", isbn: "978-0747532699",
          price: Decimal.new("19.99"), published_at: ~D[1997-06-26],
          page_count: 223, genre: "fantasy",
          author_id: authors.rowling.id, bookstore_id: stores.diagon_books.id
        }),
      hp2:
        book_fixture(%{
          title: "Harry Potter and the Chamber of Secrets", isbn: "978-0747538493",
          price: Decimal.new("21.99"), published_at: ~D[1998-07-02],
          page_count: 251, genre: "fantasy",
          author_id: authors.rowling.id, bookstore_id: stores.diagon_books.id
        }),
      foundation:
        book_fixture(%{
          title: "Foundation", isbn: "978-0553293357",
          price: Decimal.new("16.99"), published_at: ~D[1951-06-01],
          page_count: 255, genre: "sci-fi",
          author_id: authors.asimov.id, bookstore_id: stores.foundation_store.id
        }),
      robots:
        book_fixture(%{
          title: "I, Robot", isbn: "978-0553382563",
          price: Decimal.new("15.99"), published_at: ~D[1950-12-02],
          page_count: 224, genre: "sci-fi",
          author_id: authors.asimov.id, bookstore_id: stores.foundation_store.id
        }),
      murder:
        book_fixture(%{
          title: "Murder on the Orient Express", isbn: "978-0062693662",
          price: Decimal.new("14.99"), published_at: ~D[1934-01-01],
          page_count: 256, genre: "mystery",
          author_id: authors.christie.id, bookstore_id: stores.diagon_books.id
        })
    }
  end

  defp seed_reviews(books) do
    review_fixture(%{book_id: books.lotr.id, rating: 5, reviewer_name: "Frodo Baggins", content: "Epic adventure!"})
    review_fixture(%{book_id: books.lotr.id, rating: 5, reviewer_name: "Gandalf", content: "A masterpiece"})
    review_fixture(%{book_id: books.hobbit.id, rating: 5, reviewer_name: "Bilbo", content: "My story!"})
    review_fixture(%{book_id: books.hp1.id, rating: 5, reviewer_name: "Hermione", content: "Magical!"})
    review_fixture(%{book_id: books.hp1.id, rating: 4, reviewer_name: "Ron", content: "Brilliant!"})
    review_fixture(%{book_id: books.foundation.id, rating: 5, reviewer_name: "Science Fan", content: "Visionary"})
    review_fixture(%{book_id: books.murder.id, rating: 5, reviewer_name: "Mystery Lover", content: "Classic whodunit"})
  end
end
