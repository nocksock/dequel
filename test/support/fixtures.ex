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
    {author_attrs, attrs} = Map.pop(attrs, :author)
    {bookstore_attrs, attrs} = Map.pop(attrs, :bookstore)

    attrs =
      if author_attrs do
        author = author_fixture(author_attrs)
        Map.put(attrs, :author_id, author.id)
      else
        attrs
      end

    attrs =
      if bookstore_attrs do
        bookstore = bookstore_fixture(bookstore_attrs)
        Map.put(attrs, :bookstore_id, bookstore.id)
      else
        attrs
      end

    attrs =
      Enum.into(attrs, %{
        title: "Test Book",
        isbn: "978-#{:rand.uniform(9_999_999_999)}",
        price: Decimal.new("19.99"),
        published_at: ~D[2020-01-01],
        page_count: 300,
        genre: "fiction"
      })

    %Book{}
    |> Book.changeset(attrs)
    |> repo().insert!()
  end

  @doc """
  Creates a review with default values.
  Optionally pass :book map to auto-create the related book.
  """
  def review_fixture(attrs \\ %{}) do
    {book_attrs, attrs} = Map.pop(attrs, :book)

    attrs =
      if book_attrs do
        book = book_fixture(book_attrs)
        Map.put(attrs, :book_id, book.id)
      else
        attrs
      end

    attrs =
      Enum.into(attrs, %{
        content: "Great book!",
        rating: 5,
        reviewer_name: "Test Reviewer"
      })

    %Review{}
    |> Review.changeset(attrs)
    |> repo().insert!()
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
    # Create authors
    tolkien =
      author_fixture(%{name: "J.R.R. Tolkien", country: "England", birth_date: ~D[1892-01-03]})

    rowling =
      author_fixture(%{name: "J.K. Rowling", country: "England", birth_date: ~D[1965-07-31]})

    asimov = author_fixture(%{name: "Isaac Asimov", country: "USA", birth_date: ~D[1920-01-02]})

    christie =
      author_fixture(%{name: "Agatha Christie", country: "England", birth_date: ~D[1890-09-15]})

    # Create bookstores
    shire_books =
      bookstore_fixture(%{
        name: "The Shire Books",
        rating: Decimal.new("4.8"),
        location: "Hobbiton"
      })

    diagon_books =
      bookstore_fixture(%{
        name: "Diagon Alley Books",
        rating: Decimal.new("4.5"),
        location: "London"
      })

    foundation_store =
      bookstore_fixture(%{
        name: "Foundation Books",
        rating: Decimal.new("4.2"),
        location: "New York"
      })

    # Create books
    lotr =
      book_fixture(%{
        title: "The Lord of the Rings",
        isbn: "978-0618640157",
        price: Decimal.new("29.99"),
        published_at: ~D[1954-07-29],
        page_count: 1178,
        genre: "fantasy",
        author_id: tolkien.id,
        bookstore_id: shire_books.id
      })

    hobbit =
      book_fixture(%{
        title: "The Hobbit",
        isbn: "978-0547928227",
        price: Decimal.new("14.99"),
        published_at: ~D[1937-09-21],
        page_count: 310,
        genre: "fantasy",
        author_id: tolkien.id,
        bookstore_id: shire_books.id
      })

    hp1 =
      book_fixture(%{
        title: "Harry Potter and the Philosopher's Stone",
        isbn: "978-0747532699",
        price: Decimal.new("19.99"),
        published_at: ~D[1997-06-26],
        page_count: 223,
        genre: "fantasy",
        author_id: rowling.id,
        bookstore_id: diagon_books.id
      })

    hp2 =
      book_fixture(%{
        title: "Harry Potter and the Chamber of Secrets",
        isbn: "978-0747538493",
        price: Decimal.new("21.99"),
        published_at: ~D[1998-07-02],
        page_count: 251,
        genre: "fantasy",
        author_id: rowling.id,
        bookstore_id: diagon_books.id
      })

    foundation =
      book_fixture(%{
        title: "Foundation",
        isbn: "978-0553293357",
        price: Decimal.new("16.99"),
        published_at: ~D[1951-06-01],
        page_count: 255,
        genre: "sci-fi",
        author_id: asimov.id,
        bookstore_id: foundation_store.id
      })

    robots =
      book_fixture(%{
        title: "I, Robot",
        isbn: "978-0553382563",
        price: Decimal.new("15.99"),
        published_at: ~D[1950-12-02],
        page_count: 224,
        genre: "sci-fi",
        author_id: asimov.id,
        bookstore_id: foundation_store.id
      })

    murder =
      book_fixture(%{
        title: "Murder on the Orient Express",
        isbn: "978-0062693662",
        price: Decimal.new("14.99"),
        published_at: ~D[1934-01-01],
        page_count: 256,
        genre: "mystery",
        author_id: christie.id,
        bookstore_id: diagon_books.id
      })

    # Create reviews
    review_fixture(%{
      book_id: lotr.id,
      rating: 5,
      reviewer_name: "Frodo Baggins",
      content: "Epic adventure!"
    })

    review_fixture(%{
      book_id: lotr.id,
      rating: 5,
      reviewer_name: "Gandalf",
      content: "A masterpiece"
    })

    review_fixture(%{book_id: hobbit.id, rating: 5, reviewer_name: "Bilbo", content: "My story!"})
    review_fixture(%{book_id: hp1.id, rating: 5, reviewer_name: "Hermione", content: "Magical!"})
    review_fixture(%{book_id: hp1.id, rating: 4, reviewer_name: "Ron", content: "Brilliant!"})

    review_fixture(%{
      book_id: foundation.id,
      rating: 5,
      reviewer_name: "Science Fan",
      content: "Visionary"
    })

    review_fixture(%{
      book_id: murder.id,
      rating: 5,
      reviewer_name: "Mystery Lover",
      content: "Classic whodunit"
    })

    %{
      authors: %{tolkien: tolkien, rowling: rowling, asimov: asimov, christie: christie},
      stores: %{
        shire_books: shire_books,
        diagon_books: diagon_books,
        foundation_store: foundation_store
      },
      books: %{
        lotr: lotr,
        hobbit: hobbit,
        hp1: hp1,
        hp2: hp2,
        foundation: foundation,
        robots: robots,
        murder: murder
      }
    }
  end
end
