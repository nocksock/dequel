# Script for populating the database.
#
# Run with: mix run priv/repo/seeds.exs
# Or via mix ecto.setup / mix setup

alias DequelDemo.Repo
alias DequelDemo.Bookstore.{Author, Book, Store, Review}

# Get size from command line args or default to :small
size =
  case System.argv() do
    ["--size", size | _] -> String.to_atom(size)
    _ -> :small
  end

counts = %{
  small: %{authors: 10, bookstores: 5, books: 50, reviews: 100},
  medium: %{authors: 50, bookstores: 20, books: 500, reviews: 2000},
  large: %{authors: 200, bookstores: 100, books: 5000, reviews: 20000}
}

config = Map.get(counts, size, counts.small)

IO.puts("Seeding database with #{size} dataset...")

# Create authors
authors =
  for _ <- 1..config.authors do
    Repo.insert!(%Author{
      name: Faker.Person.name(),
      bio: Faker.Lorem.paragraph(),
      birth_date: Faker.Date.date_of_birth(30..80),
      country: Faker.Address.country()
    })
  end

IO.puts("  Created #{length(authors)} authors")

# Create bookstores
bookstores =
  for _ <- 1..config.bookstores do
    Repo.insert!(%Store{
      name: "#{Faker.Company.name()} Books",
      location: "#{Faker.Address.city()}, #{Faker.Address.country_code()}",
      rating: Decimal.new(Enum.random(30..50)) |> Decimal.div(10),
      founded_at: Faker.Date.backward(365 * 50)
    })
  end

IO.puts("  Created #{length(bookstores)} bookstores")

# Create books
genres = DequelDemo.Bookstore.Book.genres()

books =
  for _ <- 1..config.books do
    Repo.insert!(%Book{
      title: Faker.Lorem.sentence(2..6) |> String.trim_trailing("."),
      isbn: "978-#{:rand.uniform(9_999_999_999) |> Integer.to_string() |> String.pad_leading(10, "0")}",
      price: Decimal.new(Enum.random(499..4999)) |> Decimal.div(100),
      published_at: Faker.Date.backward(365 * 20),
      page_count: Enum.random(100..800),
      genre: Enum.random(genres),
      author_id: Enum.random(authors).id,
      bookstore_id: Enum.random(bookstores).id
    })
  end

IO.puts("  Created #{length(books)} books")

# Create reviews
for _ <- 1..config.reviews do
  Repo.insert!(%Review{
    content: Faker.Lorem.paragraph(),
    rating: Enum.random(1..5),
    reviewer_name: Faker.Person.name(),
    book_id: Enum.random(books).id
  })
end

IO.puts("  Created #{config.reviews} reviews")
IO.puts("Done!")
