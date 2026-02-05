defmodule Bench.Seeder do
  @moduledoc """
  Bulk data generation for benchmarks.

  Generates realistic-looking bookstore data with configurable sizes:
  - :small  - 100 books, 20 authors, 5 bookstores
  - :medium - 1000 books, 200 authors, 50 bookstores
  - :large  - 10000 books, 2000 authors, 500 bookstores

  Uses Faker for realistic data generation. Pass a seed for reproducibility.
  """

  alias Bench.Repo
  alias Bench.Schemas.{Author, Book, Bookstore, Review}

  @sizes %{
    small: %{books: 100, authors: 20, bookstores: 5, reviews_per_book: 2},
    medium: %{books: 1000, authors: 200, bookstores: 50, reviews_per_book: 3},
    large: %{books: 10_000, authors: 2000, bookstores: 500, reviews_per_book: 5}
  }

  @genres ~w(fiction non-fiction mystery thriller romance sci-fi fantasy biography history children)
  @services ["cafe", "events", "rare books", "children's corner", "reading room"]
  @default_seed 42

  def seed(size \\ :small, seed \\ nil) do
    actual_seed = seed || @default_seed
    :rand.seed(:exsss, {actual_seed, actual_seed, actual_seed})

    config = Map.fetch!(@sizes, size)

    IO.puts("Seeding #{size} dataset (seed: #{actual_seed})...")

    clear_data()

    authors = seed_authors(config.authors)
    IO.puts("  Created #{length(authors)} authors")

    bookstores = seed_bookstores(config.bookstores)
    IO.puts("  Created #{length(bookstores)} bookstores")

    books = seed_books(config.books, authors, bookstores)
    IO.puts("  Created #{length(books)} books")

    review_count = seed_reviews(books, config.reviews_per_book)
    IO.puts("  Created #{review_count} reviews")

    IO.puts("Seeding complete!")

    %{
      seed: actual_seed,
      authors: length(authors),
      bookstores: length(bookstores),
      books: length(books),
      reviews: review_count
    }
  end

  defp clear_data do
    Repo.delete_all(Review)
    Repo.delete_all(Book)
    Repo.delete_all(Author)
    Repo.delete_all(Bookstore)
  end

  defp seed_authors(count) do
    1..count
    |> Enum.map(fn _ ->
      first = Faker.Person.first_name()
      last = Faker.Person.last_name()

      %Author{}
      |> Author.changeset(%{
        name: "#{first} #{last}",
        bio: Faker.Lorem.paragraph(),
        birth_date: random_date(1940, 1995),
        country: Faker.Address.country(),
        details: %{
          "website" => Faker.Internet.url(),
          "agent_name" => "#{Faker.Person.first_name()} Literary Agency",
          "awards_count" => :rand.uniform(10)
        }
      })
      |> Repo.insert!()
    end)
  end

  defp seed_bookstores(count) do
    1..count
    |> Enum.map(fn i ->
      city = Faker.Address.city()

      %Bookstore{}
      |> Bookstore.changeset(%{
        name: "#{city} Books #{i}",
        location: city,
        services: Enum.take_random(@services, :rand.uniform(3)),
        rating: Decimal.new("#{3 + :rand.uniform(20) / 10}"),
        founded_at: random_date(1980, 2020)
      })
      |> Repo.insert!()
    end)
  end

  defp seed_books(count, authors, bookstores) do
    1..count
    |> Enum.map(fn i ->
      title = "#{Faker.Lorem.sentence(2..4)} #{rem(i, 100)}"

      %Book{}
      |> Book.changeset(%{
        title: title,
        isbn: "978-#{:rand.uniform(9_999_999_999) |> to_string() |> String.pad_leading(10, "0")}",
        price: Decimal.new("#{9 + :rand.uniform(40)}.#{:rand.uniform(99) |> to_string() |> String.pad_leading(2, "0")}"),
        published_at: random_date(2000, 2025),
        page_count: 100 + :rand.uniform(500),
        genre: Enum.random(@genres),
        author_id: Enum.random(authors).id,
        bookstore_id: Enum.random(bookstores).id
      })
      |> Repo.insert!()
    end)
  end

  defp seed_reviews(books, reviews_per_book) do
    reviews =
      books
      |> Enum.flat_map(fn book ->
        1..reviews_per_book
        |> Enum.map(fn _ ->
          %{
            content: Faker.Lorem.sentence(),
            rating: :rand.uniform(5),
            reviewer_name: "#{Faker.Person.first_name()} #{String.first(Faker.Person.last_name())}.",
            created_at: NaiveDateTime.utc_now() |> NaiveDateTime.add(-:rand.uniform(365 * 24 * 60 * 60), :second) |> NaiveDateTime.truncate(:second),
            book_id: book.id,
            bookstore_id: book.bookstore_id
          }
        end)
      end)

    reviews
    |> Enum.chunk_every(500)
    |> Enum.each(&Repo.insert_all(Review, &1))

    length(reviews)
  end

  defp random_date(year_start, year_end) do
    year = year_start + :rand.uniform(year_end - year_start)
    month = :rand.uniform(12)
    day = :rand.uniform(28)
    Date.new!(year, month, day)
  end
end
