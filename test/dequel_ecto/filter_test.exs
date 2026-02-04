defmodule Dequel.Adapter.EctoTest do
  use Dequel.Adapter.Ecto.RepoCase
  alias Dequel.Adapter.Ecto.Filter
  alias Dequel.Adapter.Ecto.ItemSchema
  alias Dequel.Adapter.Ecto.Repo
  import Ecto.Query

  defp sigil_ONE(input, []) do
    where = input |> Filter.where()
    q = from(ItemSchema, where: ^where)
    Repo.one(q)
  end

  defp sigil_ALL(input, []) do
    where = input |> Filter.where()
    q = from(ItemSchema, where: ^where)
    Repo.all(q)
  end

  test "base" do
    item = item_fixture(%{"name" => "some name"})
    _ = item_fixture(%{"name" => "some other name"})

    assert ~ONE<name: "some name"> == item
  end

  test "binary and" do
    item = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    _ = item_fixture(%{"name" => "bilbo", "description" => "baggins"})

    assert ~ALL<

      name: frodo
      description: baggins

    > == [item]
  end

  test "binary or" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})

    assert ~ALL<

      name: frodo or name: bilbo

    > == [frodo, bilbo]
  end

  test "binary operations" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    samwise = item_fixture(%{"name" => "samwise", "description" => "gamgee"})
    _ = item_fixture(%{"name" => "frodo", "description" => "x"})

    assert ~ALL<

      name:contains(frodo, sam) (
        description:*g
      )

    > == [frodo, samwise]
  end

  test "not operator" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    samwise = item_fixture(%{"name" => "samwise", "description" => "gamgee"})

    assert ~ALL<!name:frodo> == [bilbo, samwise]
  end

  test "one_of predicate with multiple values" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    _samwise = item_fixture(%{"name" => "samwise", "description" => "gamgee"})

    assert ~ALL<name:one_of(frodo, bilbo)> == [frodo, bilbo]
  end

  test "bracket shorthand with multiple values" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    _samwise = item_fixture(%{"name" => "samwise", "description" => "gamgee"})

    assert ~ALL<name:[frodo, bilbo]> == [frodo, bilbo]
  end

  test "string predicates" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    _bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    _other = item_fixture(%{"name" => "bilfroxdox", "description" => "baggins"})

    assert ~ALL<name:*od> == [frodo]
    assert ~ALL<name:^fro> == [frodo]
    assert ~ALL<name:$do> == [frodo]
  end

  test "one_of with 3+ values uses IN" do
    frodo = item_fixture(%{"name" => "frodo", "description" => "baggins"})
    bilbo = item_fixture(%{"name" => "bilbo", "description" => "baggins"})
    samwise = item_fixture(%{"name" => "samwise", "description" => "gamgee"})
    _other = item_fixture(%{"name" => "gandalf", "description" => "wizard"})

    result = ~ALL<name:one_of(frodo, bilbo, samwise)>
    assert Enum.sort_by(result, & &1.name) == Enum.sort_by([frodo, bilbo, samwise], & &1.name)
  end

  describe "relationship filtering with query/3" do
    test "filters by single-level association field" do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      _dune = item_with_author(%{"name" => "Dune", "description" => "scifi"}, herbert)

      result = from(i in ItemSchema)
        |> Filter.query("author.name:Tolkien")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "filters by association field with contains predicate" do
      tolkien = author_fixture(%{name: "J.R.R. Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Frank Herbert", bio: "American author"})

      lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      _dune = item_with_author(%{"name" => "Dune", "description" => "scifi"}, herbert)

      result =
        from(i in ItemSchema)
        |> Filter.query("author.name:*Tolkien")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "combines association and local field filters" do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})

      lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy epic"}, tolkien)

      _hobbit =
        item_with_author(%{"name" => "Hobbit", "description" => "fantasy adventure"}, tolkien)

      result =
        from(i in ItemSchema)
        |> Filter.query("author.name:Tolkien name:LOTR")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "filters with OR on association fields" do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})
      asimov = author_fixture(%{name: "Asimov", bio: "Russian-American author"})

      lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      dune = item_with_author(%{"name" => "Dune", "description" => "scifi"}, herbert)
      _foundation = item_with_author(%{"name" => "Foundation", "description" => "scifi"}, asimov)

      result =
        from(i in ItemSchema)
        |> Filter.query("author.name:Tolkien or author.name:Herbert")
        |> Repo.all()
        |> Enum.sort_by(& &1.name)

      assert length(result) == 2
      assert Enum.map(result, & &1.id) |> Enum.sort() == Enum.sort([lotr.id, dune.id])
    end

    test "filters with negation on association field" do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      _lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      dune = item_with_author(%{"name" => "Dune", "description" => "scifi"}, herbert)

      result =
        from(i in ItemSchema)
        |> Filter.query("!author.name:Tolkien")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == dune.id
    end

    test "reuses joins for same association" do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      _dune = item_with_author(%{"name" => "Dune", "description" => "scifi"}, herbert)

      # Both conditions use author - should only create one join
      result =
        from(i in ItemSchema)
        |> Filter.query("author.name:Tolkien author.bio:*British")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end
  end

  describe "block syntax for has_many relations" do
    alias Dequel.Adapter.Ecto.AuthorSchema

    test "block syntax - finds authors with matching item" do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})
      _no_books = author_fixture(%{name: "NoBooks", bio: "No books yet"})

      _lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      _hobbit = item_with_author(%{"name" => "Hobbit", "description" => "fantasy"}, tolkien)
      _dune = item_with_author(%{"name" => "Dune", "description" => "scifi"}, herbert)

      result =
        from(a in AuthorSchema)
        |> Filter.query("items { name:LOTR }", schema: AuthorSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "block syntax with contains predicate" do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      _lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      _hobbit = item_with_author(%{"name" => "Hobbit", "description" => "fantasy"}, tolkien)
      _dune = item_with_author(%{"name" => "Dune", "description" => "scifi"}, herbert)

      result =
        from(a in AuthorSchema)
        |> Filter.query("items { name:*OTR }", schema: AuthorSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "block syntax with multiple conditions inside block" do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      _lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      _dune = item_with_author(%{"name" => "Dune", "description" => "scifi"}, herbert)

      result =
        from(a in AuthorSchema)
        |> Filter.query("items { name:LOTR description:*fantasy }", schema: AuthorSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "block syntax with negation inside block" do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      _lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      _dune = item_with_author(%{"name" => "Dune", "description" => "scifi"}, herbert)

      # Finds authors whose items do NOT have name "LOTR" (but still have some items)
      result =
        from(a in AuthorSchema)
        |> Filter.query("items { !name:LOTR }", schema: AuthorSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == herbert.id
    end

    test "block syntax combined with local field filter" do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      lewis = author_fixture(%{name: "Lewis", bio: "British author"})

      _lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      _narnia = item_with_author(%{"name" => "Narnia", "description" => "fantasy"}, lewis)

      result =
        from(a in AuthorSchema)
        |> Filter.query("bio:*British items { name:LOTR }", schema: AuthorSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end
  end

  describe "block syntax for belongs_to relations" do
    test "block syntax - filters items by author" do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      _dune = item_with_author(%{"name" => "Dune", "description" => "scifi"}, herbert)

      result =
        from(i in ItemSchema)
        |> Filter.query("author { name:Tolkien }", schema: ItemSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "block syntax with contains predicate on belongs_to" do
      tolkien = author_fixture(%{name: "J.R.R. Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Frank Herbert", bio: "American author"})

      lotr = item_with_author(%{"name" => "LOTR", "description" => "fantasy"}, tolkien)
      _dune = item_with_author(%{"name" => "Dune", "description" => "scifi"}, herbert)

      result =
        from(i in ItemSchema)
        |> Filter.query("author { name:*Tolkien }", schema: ItemSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end
  end
end
