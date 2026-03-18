defmodule DequelDemo.Seeder do
  @moduledoc """
  Bulk data generation for benchmarks and demo.

  Generates realistic-looking bookstore data with configurable sizes:
  - :small  - 100 books, 20 authors, 5 bookstores
  - :medium - 1000 books, 200 authors, 50 bookstores
  - :large  - 10000 books, 2000 authors, 500 bookstores

  Uses Faker for realistic data generation. Pass a seed for reproducibility.
  """

  alias DequelDemo.Repo
  alias DequelDemo.Bookstore.{Author, Book, Store, Review, Tag}

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

    tags = seed_tags()
    IO.puts("  Created #{length(tags)} tags")

    books = seed_books(config.books, authors, bookstores, tags)
    IO.puts("  Created #{length(books)} books")

    review_count = seed_reviews(books, config.reviews_per_book)
    IO.puts("  Created #{review_count} reviews")

    IO.puts("Seeding complete!")

    %{
      seed: actual_seed,
      authors: length(authors),
      bookstores: length(bookstores),
      tags: length(tags),
      books: length(books),
      reviews: review_count
    }
  end

  defp clear_data do
    Repo.delete_all(Review)
    Repo.delete_all("books_tags")
    Repo.delete_all(Book)
    Repo.delete_all(Tag)
    Repo.delete_all(Author)
    Repo.delete_all(Store)
  end

  defp seed_authors(count) do
    now = NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)

    authors =
      1..count
      |> Enum.map(fn _ ->
        first = Faker.Person.first_name()
        last = Faker.Person.last_name()

        %{
          name: "#{first} #{last}",
          bio: Faker.Lorem.paragraph(),
          birth_date: random_date(1940, 1995),
          country: Faker.Address.country(),
          details: %{
            "website" => Faker.Internet.url(),
            "agent_name" => "#{Faker.Person.first_name()} Literary Agency",
            "awards_count" => :rand.uniform(10)
          },
          inserted_at: now,
          updated_at: now
        }
      end)

    {_, inserted} = Repo.insert_all(Author, authors, returning: true)
    inserted
  end

  defp seed_bookstores(count) do
    now = NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)

    bookstores =
      1..count
      |> Enum.map(fn i ->
        city = Faker.Address.city()

        %{
          name: "#{city} Books #{i}",
          location: city,
          services: Enum.take_random(@services, :rand.uniform(3)),
          rating: Decimal.new("#{3 + :rand.uniform(20) / 10}"),
          founded_at: random_date(1980, 2020),
          inserted_at: now,
          updated_at: now
        }
      end)

    {_, inserted} = Repo.insert_all(Store, bookstores, returning: true)
    inserted
  end

  defp seed_tags do
    now = NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)

    tag_names = ["bestseller", "classic", "new-release", "award-winner", "staff-pick", "signed-copy"]

    tags =
      tag_names
      |> Enum.map(fn name ->
        %{name: name, inserted_at: now, updated_at: now}
      end)

    {_, inserted} = Repo.insert_all(Tag, tags, returning: true)
    inserted
  end

  defp seed_books(count, authors, bookstores, tags) do
    now = NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)

    books =
      1..count
      |> Enum.map(fn i ->
        title = "#{Faker.Lorem.sentence(2..4)} #{rem(i, 100)}"

        %{
          title: title,
          isbn: "978-#{:rand.uniform(9_999_999_999) |> to_string() |> String.pad_leading(10, "0")}",
          price: Decimal.new("#{9 + :rand.uniform(40)}.#{:rand.uniform(99) |> to_string() |> String.pad_leading(2, "0")}"),
          published_at: random_date(2000, 2025),
          page_count: 100 + :rand.uniform(500),
          genre: Enum.random(@genres),
          author_id: Enum.random(authors).id,
          bookstore_id: Enum.random(bookstores).id,
          inserted_at: now,
          updated_at: now
        }
      end)

    {_, inserted_books} = Repo.insert_all(Book, books, returning: true)

    # Add random tags to books
    book_tags =
      inserted_books
      |> Enum.flat_map(fn book ->
        # Each book gets 0-3 random tags
        num_tags = :rand.uniform(4) - 1
        selected_tags = Enum.take_random(tags, num_tags)

        Enum.map(selected_tags, fn tag ->
          %{book_id: book.id, tag_id: tag.id}
        end)
      end)

    if length(book_tags) > 0 do
      Repo.insert_all("books_tags", book_tags)
    end

    inserted_books
  end

  defp seed_reviews(books, reviews_per_book) do
    now = NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)

    reviews =
      books
      |> Enum.flat_map(fn book ->
        1..reviews_per_book
        |> Enum.map(fn _ ->
          %{
            content: Faker.Lorem.sentence(),
            rating: :rand.uniform(5),
            reviewer_name: "#{Faker.Person.first_name()} #{String.first(Faker.Person.last_name())}.",
            book_id: book.id,
            bookstore_id: book.bookstore_id,
            inserted_at: now,
            updated_at: now
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
