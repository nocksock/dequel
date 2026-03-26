defmodule Dequel.Adapter.EctoTest do
  use Dequel.Adapter.Ecto.RepoCase
  alias Dequel.Adapter.Ecto.Filter
  alias Dequel.Adapter.Ecto.Repo

  defp sigil_ONE(input, []) do
    where = input |> Filter.where()
    q = from(Book, where: ^where)
    Repo.one(q)
  end

  defp sigil_ALL(query, []) do
    from(b in Book)
    |> Filter.query(query)
    |> Repo.all()
  end

  describe "basic filtering" do
    setup do
      frodo = book_fixture(%{title: "frodo", genre: "fiction"})
      bilbo = book_fixture(%{title: "bilbo", genre: "fiction"})
      samwise = book_fixture(%{title: "samwise", genre: "biography"})

      %{frodo: frodo, bilbo: bilbo, samwise: samwise}
    end

    test "equality", %{frodo: frodo} do
      assert ~ONE<title:frodo> == frodo
    end

    test "empty query returns all", %{frodo: frodo, bilbo: bilbo, samwise: samwise} do
      assert ~ALL<> == [frodo, bilbo, samwise]
    end

    test "binary and", %{frodo: frodo} do
      assert ~ALL<title:frodo genre:fiction> == [frodo]
    end

    test "binary or", %{frodo: frodo, bilbo: bilbo} do
      result = ~ALL<title:frodo or title:bilbo>
      assert Enum.sort_by(result, & &1.title) == Enum.sort_by([frodo, bilbo], & &1.title)
    end

    test "binary operations", %{samwise: samwise} do
      _ = book_fixture(%{title: "frodo", genre: "thriller"})

      assert ~ALL<title:contains(frodo, sam) (genre:*g)> == [samwise]
    end

    test "not operator with prefix", %{bilbo: bilbo, samwise: samwise} do
      assert ~ALL<-title:frodo> == [bilbo, samwise]
    end

    test "value-level negation with !", %{bilbo: bilbo, samwise: samwise} do
      assert ~ALL<title:!frodo> == [bilbo, samwise]
    end

    test "negated contains with !*", %{bilbo: bilbo, samwise: samwise} do
      # frodo contains "od", bilbo and samwise don't
      assert ~ALL<title:!*od> == [bilbo, samwise]
    end

    test "negated starts_with with !^", %{bilbo: bilbo, samwise: samwise} do
      # frodo starts with "fro", bilbo and samwise don't
      assert ~ALL<title:!^fro> == [bilbo, samwise]
    end

    test "negated ends_with with !$", %{bilbo: bilbo, samwise: samwise} do
      # frodo ends with "do", bilbo and samwise don't
      assert ~ALL<title:!$do> == [bilbo, samwise]
    end

    test "negated predicate function with !contains", %{bilbo: bilbo, samwise: samwise} do
      assert ~ALL<title:!contains(od)> == [bilbo, samwise]
    end

    test "one_of predicate with multiple values", %{frodo: frodo, bilbo: bilbo} do
      result = ~ALL<title:one_of(frodo, bilbo)>
      assert Enum.sort_by(result, & &1.title) == Enum.sort_by([frodo, bilbo], & &1.title)
    end

    test "bracket shorthand with multiple values", %{frodo: frodo, bilbo: bilbo} do
      result = ~ALL<title:[frodo, bilbo]>
      assert Enum.sort_by(result, & &1.title) == Enum.sort_by([frodo, bilbo], & &1.title)
    end

    test "string predicates", %{frodo: frodo} do
      _other = book_fixture(%{title: "bilfroxdox", genre: "fiction"})

      assert ~ALL<title:*od> == [frodo]
      assert ~ALL<title:^fro> == [frodo]
      assert ~ALL<title:$do> == [frodo]
    end

    test "one_of with 3+ values uses IN", %{frodo: frodo, bilbo: bilbo, samwise: samwise} do
      _other = book_fixture(%{title: "gandalf", genre: "fantasy"})

      result = ~ALL<title:one_of(frodo, bilbo, samwise)>
      assert Enum.sort_by(result, & &1.title) == Enum.sort_by([frodo, bilbo, samwise], & &1.title)
    end
  end

  describe "relationship filtering with query/3" do
    setup do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      lotr = book_fixture(%{title: "LOTR", genre: "fantasy", author_id: tolkien.id})
      dune = book_fixture(%{title: "Dune", genre: "sci-fi", author_id: herbert.id})

      %{tolkien: tolkien, herbert: herbert, lotr: lotr, dune: dune}
    end

    test "filters by single-level association field", %{lotr: lotr} do
      result =
        from(b in Book)
        |> Filter.query("author.name:Tolkien")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "filters by association field with contains predicate", %{lotr: lotr} do
      result =
        from(b in Book)
        |> Filter.query("author.name:*Tolkien")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "combines association and local field filters", %{tolkien: tolkien, lotr: lotr} do
      _hobbit =
        book_fixture(%{title: "Hobbit", genre: "fantasy", author_id: tolkien.id})

      result =
        from(b in Book)
        |> Filter.query("author.name:Tolkien title:LOTR")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "filters with OR on association fields", %{lotr: lotr, dune: dune} do
      asimov = author_fixture(%{name: "Asimov", bio: "Russian-American author"})

      _foundation =
        book_fixture(%{title: "Foundation", genre: "sci-fi", author_id: asimov.id})

      result =
        from(b in Book)
        |> Filter.query("author.name:Tolkien or author.name:Herbert")
        |> Repo.all()
        |> Enum.sort_by(& &1.title)

      assert length(result) == 2
      assert Enum.map(result, & &1.id) |> Enum.sort() == Enum.sort([lotr.id, dune.id])
    end

    test "filters with negation on association field", %{dune: dune} do
      result =
        from(b in Book)
        |> Filter.query("-author.name:Tolkien")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == dune.id
    end

    test "reuses joins for same association", %{lotr: lotr} do
      # Both conditions use author - should only create one join
      result =
        from(b in Book)
        |> Filter.query("author.name:Tolkien author.bio:*British")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end
  end

  describe "block syntax for has_many relations" do
    setup do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      lotr = book_fixture(%{title: "LOTR", genre: "fantasy", author_id: tolkien.id})
      dune = book_fixture(%{title: "Dune", genre: "sci-fi", author_id: herbert.id})

      %{tolkien: tolkien, herbert: herbert, lotr: lotr, dune: dune}
    end

    test "block syntax - finds authors with matching book", %{tolkien: tolkien} do
      _no_books = author_fixture(%{name: "NoBooks", bio: "No books yet"})
      _hobbit = book_fixture(%{title: "Hobbit", genre: "fantasy", author_id: tolkien.id})

      result =
        from(a in Author)
        |> Filter.query("books { title:LOTR }", schema: Author)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "block syntax with contains predicate", %{tolkien: tolkien} do
      _hobbit = book_fixture(%{title: "Hobbit", genre: "fantasy", author_id: tolkien.id})

      result =
        from(a in Author)
        |> Filter.query("books { title:*OTR }", schema: Author)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "block syntax with multiple conditions inside block", %{tolkien: tolkien} do
      result =
        from(a in Author)
        |> Filter.query("books { title:LOTR genre:*fantasy }", schema: Author)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "block syntax with negation inside block", %{herbert: herbert} do
      # Finds authors whose books do NOT have title "LOTR" (but still have some books)
      result =
        from(a in Author)
        |> Filter.query("books { -title:LOTR }", schema: Author)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == herbert.id
    end

    test "block syntax combined with local field filter", %{tolkien: tolkien} do
      lewis = author_fixture(%{name: "Lewis", bio: "British author"})
      _narnia = book_fixture(%{title: "Narnia", genre: "fantasy", author_id: lewis.id})

      result =
        from(a in Author)
        |> Filter.query("bio:*British books { title:LOTR }", schema: Author)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "block syntax with one_of predicate", %{tolkien: tolkien, herbert: herbert} do
      _no_books = author_fixture(%{name: "NoBooks", bio: "No books yet"})

      result =
        from(a in Author)
        |> Filter.query("books { title:one_of(\"LOTR\", \"Dune\") }", schema: Author)
        |> Repo.all()
        |> Enum.sort_by(& &1.name)

      assert length(result) == 2
      assert Enum.map(result, & &1.id) |> Enum.sort() == Enum.sort([tolkien.id, herbert.id])
    end
  end

  describe "block syntax for belongs_to relations" do
    setup do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      lotr = book_fixture(%{title: "LOTR", genre: "fantasy", author_id: tolkien.id})
      dune = book_fixture(%{title: "Dune", genre: "sci-fi", author_id: herbert.id})

      %{tolkien: tolkien, herbert: herbert, lotr: lotr, dune: dune}
    end

    test "block syntax - filters books by author", %{lotr: lotr} do
      result =
        from(b in Book)
        |> Filter.query("author { name:Tolkien }", schema: Book)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "block syntax with contains predicate on belongs_to", %{lotr: lotr} do
      result =
        from(b in Book)
        |> Filter.query("author { name:*Tolkien }", schema: Book)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end
  end

  describe "block syntax for many_to_many relations" do
    setup do
      fantasy = tag_fixture(%{name: "fantasy"})
      scifi = tag_fixture(%{name: "scifi"})
      classic = tag_fixture(%{name: "classic"})

      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      lotr = book_fixture(%{title: "LOTR", genre: "fantasy", author_id: tolkien.id})
      dune = book_fixture(%{title: "Dune", genre: "sci-fi"})

      add_tag_to_book(lotr, fantasy)
      add_tag_to_book(lotr, classic)
      add_tag_to_book(dune, scifi)
      add_tag_to_book(dune, classic)

      %{lotr: lotr, dune: dune, fantasy: fantasy, scifi: scifi, classic: classic}
    end

    test "block syntax - filters books by tag name (many_to_many)", %{lotr: lotr} do
      result =
        from(b in Book)
        |> Filter.query("tags { name:fantasy }", schema: Book)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "block syntax - OR on many_to_many tag conditions", %{lotr: lotr, dune: dune} do
      result =
        from(b in Book)
        |> Filter.query("tags { name:fantasy } or tags { name:scifi }", schema: Book)
        |> Repo.all()
        |> Enum.sort_by(& &1.title)

      assert length(result) == 2
      assert Enum.map(result, & &1.id) |> Enum.sort() == Enum.sort([lotr.id, dune.id])
    end

    test "block syntax - contains predicate on many_to_many", %{lotr: lotr, dune: dune} do
      result =
        from(b in Book)
        |> Filter.query("tags { name:*classic }", schema: Book)
        |> Repo.all()
        |> Enum.sort_by(& &1.title)

      assert length(result) == 2
      assert Enum.map(result, & &1.id) |> Enum.sort() == Enum.sort([lotr.id, dune.id])
    end

    test "many_to_many propagates query prefix to join table subquery" do
      # Build query with a prefix - don't execute since SQLite doesn't support schemas
      # Note: `from(..., prefix: ...)` sets the prefix on from.prefix, not query.prefix
      base = from(b in Book, prefix: "test_schema")

      # Verify the base query has the prefix (stored in from.prefix when using from option)
      assert base.from.prefix == "test_schema"

      query = Filter.query(base, "tags { name:fantasy }", schema: Book)

      # Extract the subquery from the WHERE clause
      # Structure: wheres: [%{subqueries: [%Ecto.SubQuery{query: ...}]}]
      [%{subqueries: [%Ecto.SubQuery{query: subquery}]}] = query.wheres

      # The subquery should have the prefix set (via put_query_prefix, so on query.prefix)
      assert subquery.prefix == "test_schema"
    end
  end

  describe "date comparison operators" do
    setup do
      old = book_fixture(%{title: "old", genre: "fiction", published_at: ~D[2020-01-15]})
      mid = book_fixture(%{title: "mid", genre: "fiction", published_at: ~D[2023-06-01]})
      recent = book_fixture(%{title: "recent", genre: "fiction", published_at: ~D[2025-03-20]})
      %{old: old, mid: mid, recent: recent}
    end

    test "date greater than", %{mid: mid, recent: recent} do
      result =
        from(b in Book)
        |> Filter.query("published_at:>2023-01-01", schema: Book)
        |> Repo.all()

      assert result == [mid, recent]
    end

    test "date month", %{old: old} do
      result =
        from(b in Book)
        |> Filter.query("published_at: 2020-01", schema: Book)
        |> Repo.all()

      assert result == [old]
    end
    test "date less than", %{old: old} do
      result =
        from(b in Book)
        |> Filter.query("published_at:<2023-01-01", schema: Book)
        |> Repo.all()

      assert result == [old]
    end

    test "date greater than or equal", %{mid: mid, recent: recent} do
      result =
        from(b in Book)
        |> Filter.query("published_at:>=2023-06-01", schema: Book)
        |> Repo.all()

      assert result == [mid, recent]
    end

    test "date range", %{old: old, mid: mid} do
      result =
        from(b in Book)
        |> Filter.query("published_at:2020-01-01..2023-12-31", schema: Book)
        |> Repo.all()

      assert result == [old, mid]
    end

    test "date YYYY-MM in comparison", %{mid: mid, recent: recent} do
      result =
        from(b in Book)
        |> Filter.query("published_at:>=2023-06", schema: Book)
        |> Repo.all()

      assert result == [mid, recent]
    end

    test "negated date comparison", %{old: old} do
      result =
        from(b in Book)
        |> Filter.query("published_at:!>2023-01-01", schema: Book)
        |> Repo.all()

      assert result == [old]
    end
  end

  describe "partial date equality expansion" do
    setup do
      jan = book_fixture(%{title: "jan", genre: "fiction", published_at: ~D[2024-01-15]})
      feb = book_fixture(%{title: "feb", genre: "fiction", published_at: ~D[2024-02-10]})
      other_year = book_fixture(%{title: "other", genre: "fiction", published_at: ~D[2023-06-01]})
      %{jan: jan, feb: feb, other_year: other_year}
    end

    test "YYYY-MM equality matches all days in month", %{jan: jan} do
      result =
        from(b in Book)
        |> Filter.query(~S|published_at:"2024-01"|, schema: Book)
        |> Repo.all()

      assert result == [jan]
    end

    test "YYYY equality matches all days in year", %{jan: jan, feb: feb} do
      result =
        from(b in Book)
        |> Filter.query("published_at:2024", schema: Book)
        |> Repo.all()

      assert result == [jan, feb]
    end

    test "full date equality still matches exactly", %{jan: jan} do
      result =
        from(b in Book)
        |> Filter.query(~S|published_at:"2024-01-15"|, schema: Book)
        |> Repo.all()

      assert result == [jan]
    end

    test "comparison operators keep first-of-period behavior", %{jan: jan, feb: feb} do
      result =
        from(b in Book)
        |> Filter.query("published_at:>=2024-01", schema: Book)
        |> Repo.all()

      assert result == [jan, feb]
    end
  end

  describe "comparison operators" do
    setup do
      low = book_fixture(%{title: "low", genre: "fiction", page_count: 5})
      mid = book_fixture(%{title: "mid", genre: "fiction", page_count: 15})
      high = book_fixture(%{title: "high", genre: "fiction", page_count: 25})
      %{low: low, mid: mid, high: high}
    end

    test "greater than", %{mid: mid, high: high} do
      assert ~ALL(page_count:>10) == [mid, high]
    end

    test "less than", %{low: low} do
      assert ~ALL(page_count:<10) == [low]
    end

    test "greater than or equal", %{mid: mid, high: high} do
      assert ~ALL(page_count:>=15) == [mid, high]
    end

    test "less than or equal", %{low: low, mid: mid} do
      assert ~ALL(page_count:<=15) == [low, mid]
    end

    test "negated greater than", %{low: low} do
      assert ~ALL(page_count:!>10) == [low]
    end
  end

  describe "range queries" do
    setup do
      low = book_fixture(%{title: "low", genre: "fiction", page_count: 5})
      mid = book_fixture(%{title: "mid", genre: "fiction", page_count: 15})
      high = book_fixture(%{title: "high", genre: "fiction", page_count: 25})
      %{low: low, mid: mid, high: high}
    end

    test "between range", %{low: low, mid: mid} do
      assert ~ALL(page_count:5..20) == [low, mid]
    end

    test "between predicate", %{low: low, mid: mid} do
      assert ~ALL[page_count:between(5 20)] == [low, mid]
    end

    test "negated range", %{high: high} do
      assert ~ALL(page_count:!5..20) == [high]
    end
  end

  describe "dot notation with has_many relations" do
    setup do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})
      no_books = author_fixture(%{name: "NoBooks", bio: "No books yet"})

      lotr = book_fixture(%{title: "LOTR", genre: "fantasy", author_id: tolkien.id})
      hobbit = book_fixture(%{title: "Hobbit", genre: "fantasy", author_id: tolkien.id})
      dune = book_fixture(%{title: "Dune", genre: "sci-fi", author_id: herbert.id})

      %{
        tolkien: tolkien,
        herbert: herbert,
        no_books: no_books,
        lotr: lotr,
        hobbit: hobbit,
        dune: dune
      }
    end

    test "dot notation - finds authors with matching book (uses EXISTS, no duplicates)", %{
      tolkien: tolkien
    } do
      # Tolkien has 2 fantasy books but should appear only once (EXISTS not JOIN)
      result =
        from(a in Author)
        |> Filter.query("books.genre:fantasy", schema: Author)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "dot notation with array syntax - finds authors with any matching book", %{
      tolkien: tolkien,
      herbert: herbert
    } do
      result =
        from(a in Author)
        |> Filter.query("books.title:[LOTR, Dune]", schema: Author)
        |> Repo.all()
        |> Enum.sort_by(& &1.name)

      assert length(result) == 2
      assert Enum.map(result, & &1.id) |> Enum.sort() == Enum.sort([tolkien.id, herbert.id])
    end

    test "dot notation with contains predicate", %{tolkien: tolkien} do
      result =
        from(a in Author)
        |> Filter.query("books.title:*OTR", schema: Author)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "dot notation excludes authors with no matching books", %{no_books: no_books} do
      result =
        from(a in Author)
        |> Filter.query("books.title:anything", schema: Author)
        |> Repo.all()

      refute Enum.any?(result, &(&1.id == no_books.id))
    end

    test "dot notation with negation - finds authors without any matching book", %{
      herbert: herbert,
      tolkien: tolkien,
      no_books: no_books
    } do
      # -books.title:LOTR means NOT EXISTS (book with title LOTR)
      # Tolkien has LOTR, Herbert and NoBooks don't
      result =
        from(a in Author)
        |> Filter.query("-books.title:LOTR", schema: Author)
        |> Repo.all()

      # Herbert has Dune but not LOTR, so should match
      assert Enum.any?(result, &(&1.id == herbert.id))
      # NoBooks has no books at all, so should match
      assert Enum.any?(result, &(&1.id == no_books.id))
      # Tolkien has LOTR, so should NOT match
      refute Enum.any?(result, &(&1.id == tolkien.id))
    end
  end
end
