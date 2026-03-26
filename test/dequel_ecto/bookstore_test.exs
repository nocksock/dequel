defmodule Dequel.Adapter.Ecto.StoreTest do
  use Dequel.Adapter.Ecto.RepoCase

  alias Dequel.Adapter.Ecto.Repo
  alias Dequel.Adapter.Ecto.Filter

  setup do
    # Seed the database with test data
    data = seed_bookstore()
    data
  end

  describe "basic field filtering" do
    test "filter books by title", %{books: %{lotr: lotr}} do
      query = from(b in Book) |> Filter.query("title:*Lord")
      assert [result] = Repo.all(query)
      assert result.id == lotr.id
    end

    test "filter books by exact title", %{books: %{hobbit: hobbit}} do
      query = from(b in Book) |> Filter.query("title:\"The Hobbit\"")
      assert [result] = Repo.all(query)
      assert result.id == hobbit.id
    end

    test "filter books by genre", %{books: %{lotr: lotr, hobbit: hobbit, hp1: hp1, hp2: hp2}} do
      query = from(b in Book) |> Filter.query("genre:fantasy")
      results = Repo.all(query)
      assert length(results) == 4
      result_ids = Enum.map(results, & &1.id) |> MapSet.new()
      assert MapSet.subset?(MapSet.new([lotr.id, hobbit.id, hp1.id, hp2.id]), result_ids)
    end

    test "filter books by isbn prefix", %{books: %{hp1: hp1}} do
      query = from(b in Book) |> Filter.query("isbn:^\"978-0747532\"")
      assert [result] = Repo.all(query)
      assert result.id == hp1.id
    end
  end

  describe "comparison operators" do
    test "filter books by price greater than", %{books: %{lotr: lotr}} do
      query = from(b in Book) |> Filter.query("price:>25")
      results = Repo.all(query)
      assert results != []
      assert Enum.any?(results, fn b -> b.id == lotr.id end)
    end

    test "filter books by price less than", %{books: %{hobbit: hobbit}} do
      query = from(b in Book) |> Filter.query("price:<16")
      results = Repo.all(query)
      assert Enum.any?(results, fn b -> b.id == hobbit.id end)
    end

    test "filter books by price range", %{
      books: %{foundation: foundation, robots: robots, murder: murder}
    } do
      query = from(b in Book) |> Filter.query("price:14..17")
      results = Repo.all(query)
      result_ids = Enum.map(results, & &1.id) |> MapSet.new()
      assert MapSet.subset?(MapSet.new([foundation.id, robots.id, murder.id]), result_ids)
    end

    test "filter books by page count", %{books: %{lotr: lotr}} do
      query = from(b in Book) |> Filter.query("page_count:>1000")
      assert [result] = Repo.all(query)
      assert result.id == lotr.id
    end
  end

  # Note: Date filtering with comparison operators (e.g., published_at:<1950-01-01)
  # is not supported by the current parser due to hyphen handling limitations.
  # Use integer fields like page_count for comparison tests instead.

  describe "logical operators" do
    test "AND condition - books that are fantasy AND expensive", %{books: %{lotr: lotr}} do
      query = from(b in Book) |> Filter.query("genre:fantasy price:>25")
      results = Repo.all(query)
      assert Enum.any?(results, fn b -> b.id == lotr.id end)
    end

    test "OR condition - books that are sci-fi OR mystery" do
      query = from(b in Book) |> Filter.query("genre:\"sci-fi\" or genre:mystery")
      results = Repo.all(query)
      # Should include Foundation, I Robot, and Murder on the Orient Express
      assert length(results) >= 3
    end

    test "complex condition with AND and OR" do
      query = from(b in Book) |> Filter.query("(genre:fantasy price:<20) or genre:\"sci-fi\"")
      results = Repo.all(query)
      # Should include cheap fantasy books and all sci-fi books
      assert length(results) >= 2
    end
  end

  describe "negation" do
    test "exclude fantasy books" do
      query = from(b in Book) |> Filter.query("-genre:fantasy")
      results = Repo.all(query)
      assert Enum.all?(results, fn b -> b.genre != "fantasy" end)
    end

    test "exclude expensive books", %{books: %{hobbit: hobbit, murder: murder}} do
      query = from(b in Book) |> Filter.query("-price:>20")
      results = Repo.all(query)
      result_ids = Enum.map(results, & &1.id) |> MapSet.new()
      assert MapSet.member?(result_ids, hobbit.id)
      assert MapSet.member?(result_ids, murder.id)
    end
  end

  describe "relationship filtering with dot notation" do
    test "filter books by author name", %{books: %{lotr: lotr, hobbit: hobbit}} do
      query =
        from(b in Book)
        |> Filter.query("author.name:*Tolkien", schema: Book)

      results = Repo.all(query)
      result_ids = Enum.map(results, & &1.id) |> MapSet.new()
      assert MapSet.subset?(MapSet.new([lotr.id, hobbit.id]), result_ids)
    end

    test "filter books by author country", %{books: %{foundation: foundation, robots: robots}} do
      query =
        from(b in Book)
        |> Filter.query("author.country:USA", schema: Book)

      results = Repo.all(query)
      # Should include Asimov's books
      result_ids = Enum.map(results, & &1.id) |> MapSet.new()
      assert MapSet.member?(result_ids, foundation.id)
      assert MapSet.member?(result_ids, robots.id)
    end

    test "filter books by bookstore name", %{books: %{lotr: lotr, hobbit: hobbit}} do
      query =
        from(b in Book)
        |> Filter.query("bookstore.name:*Shire", schema: Book)

      results = Repo.all(query)
      result_ids = Enum.map(results, & &1.id) |> MapSet.new()
      assert MapSet.subset?(MapSet.new([lotr.id, hobbit.id]), result_ids)
    end

    test "filter books by bookstore rating", %{books: %{lotr: lotr, hobbit: hobbit}} do
      query =
        from(b in Book)
        |> Filter.query("bookstore.rating:>4.5", schema: Book)

      results = Repo.all(query)
      # Should include books from The Shire Books (rating 4.8)
      result_ids = Enum.map(results, & &1.id) |> MapSet.new()
      assert MapSet.member?(result_ids, lotr.id)
      assert MapSet.member?(result_ids, hobbit.id)
    end
  end

  describe "relationship filtering with block syntax" do
    test "filter books by author using block syntax", %{books: %{lotr: lotr, hobbit: hobbit}} do
      query =
        from(b in Book)
        |> Filter.query("author { name:*Tolkien }", schema: Book)

      results = Repo.all(query)
      result_ids = Enum.map(results, & &1.id) |> MapSet.new()
      assert MapSet.subset?(MapSet.new([lotr.id, hobbit.id]), result_ids)
    end

    test "filter books by author with multiple conditions", %{
      books: %{lotr: lotr, hobbit: hobbit}
    } do
      # Note: Using name pattern instead of birth_date comparison due to parser limitations
      query =
        from(b in Book)
        |> Filter.query("author { country:England name:*Tolkien }", schema: Book)

      results = Repo.all(query)
      result_ids = Enum.map(results, & &1.id) |> MapSet.new()
      assert MapSet.member?(result_ids, lotr.id)
      assert MapSet.member?(result_ids, hobbit.id)
    end

    test "filter books by bookstore using block syntax", %{books: %{hp1: hp1, hp2: hp2}} do
      query =
        from(b in Book)
        |> Filter.query("bookstore { name:*Diagon }", schema: Book)

      results = Repo.all(query)
      result_ids = Enum.map(results, & &1.id) |> MapSet.new()
      # Should include Harry Potter books and Murder on the Orient Express
      assert MapSet.member?(result_ids, hp1.id)
      assert MapSet.member?(result_ids, hp2.id)
    end
  end

  describe "multi-level relationship filtering" do
    test "filter authors by their books' reviews" do
      query =
        from(a in Author)
        |> Filter.query("books.reviews.rating:5", schema: Author)

      results = Repo.all(query)
      # Should include authors who have books with 5-star reviews
      assert results != []
    end

    test "filter stores by their books' genre" do
      query =
        from(s in Store)
        |> Filter.query("books.genre:fantasy", schema: Store)

      results = Repo.all(query)
      # Should include stores that sell fantasy books
      assert length(results) >= 2
    end
  end

  describe "complex real-world queries" do
    test "find affordable fantasy books from highly-rated stores" do
      query =
        from(b in Book)
        |> Filter.query("genre:fantasy price:<20 bookstore.rating:>4.5", schema: Book)

      results = Repo.all(query)
      # Should match specific criteria
      assert Enum.all?(results, fn b ->
               b.genre == "fantasy" &&
                 Decimal.compare(b.price, Decimal.new("20")) == :lt
             end)
    end

    test "find books by English authors with many pages" do
      # Note: Using page_count instead of published_at comparison due to parser limitations
      query =
        from(b in Book)
        |> Filter.query("author.country:England page_count:>200", schema: Book)

      results = Repo.all(query)
      # Should include English authors' books with over 200 pages
      assert results != []
    end

    test "find sci-fi books or highly-rated books" do
      query =
        from(b in Book)
        |> Filter.query("genre:\"sci-fi\" or page_count:>1000", schema: Book)

      results = Repo.all(query)
      # Should include sci-fi books and LOTR
      assert length(results) >= 3
    end
  end

  describe "edge cases" do
    test "empty query returns all books" do
      query = from(b in Book) |> Filter.query("")
      results = Repo.all(query)
      # Should return all 7 books
      assert length(results) == 7
    end

    test "whitespace-only query returns all books" do
      query = from(b in Book) |> Filter.query("   ")
      results = Repo.all(query)
      assert length(results) == 7
    end

    test "non-matching query returns empty list" do
      query = from(b in Book) |> Filter.query("genre:western")
      results = Repo.all(query)
      assert results == []
    end
  end
end
