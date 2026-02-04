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

  describe "basic filtering" do
    setup do
      frodo = item_fixture(%{name: "frodo", description: "baggins"})
      bilbo = item_fixture(%{name: "bilbo", description: "baggins"})
      samwise = item_fixture(%{name: "samwise", description: "gamgee"})

      %{frodo: frodo, bilbo: bilbo, samwise: samwise}
    end

    test "equality", %{frodo: frodo} do
      assert ~ONE<name:frodo> == frodo
    end

    test "binary and", %{frodo: frodo} do
      assert ~ALL<name:frodo description:baggins> == [frodo]
    end

    test "binary or", %{frodo: frodo, bilbo: bilbo} do
      assert ~ALL<name:frodo or name:bilbo> == [frodo, bilbo]
    end

    test "binary operations", %{frodo: frodo, samwise: samwise} do
      _ = item_fixture(%{name: "frodo", description: "x"})

      assert ~ALL<name:contains(frodo, sam) (description:*g)> == [frodo, samwise]
    end

    test "not operator", %{bilbo: bilbo, samwise: samwise} do
      assert ~ALL<!name:frodo> == [bilbo, samwise]
    end

    test "one_of predicate with multiple values", %{frodo: frodo, bilbo: bilbo} do
      assert ~ALL<name:one_of(frodo, bilbo)> == [frodo, bilbo]
    end

    test "bracket shorthand with multiple values", %{frodo: frodo, bilbo: bilbo} do
      assert ~ALL<name:[frodo, bilbo]> == [frodo, bilbo]
    end

    test "string predicates", %{frodo: frodo} do
      _other = item_fixture(%{name: "bilfroxdox", description: "baggins"})

      assert ~ALL<name:*od> == [frodo]
      assert ~ALL<name:^fro> == [frodo]
      assert ~ALL<name:$do> == [frodo]
    end

    test "one_of with 3+ values uses IN", %{frodo: frodo, bilbo: bilbo, samwise: samwise} do
      _other = item_fixture(%{name: "gandalf", description: "wizard"})

      result = ~ALL<name:one_of(frodo, bilbo, samwise)>
      assert Enum.sort_by(result, & &1.name) == Enum.sort_by([frodo, bilbo, samwise], & &1.name)
    end
  end

  describe "relationship filtering with query/3" do
    setup do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      lotr = item_fixture(%{name: "LOTR", description: "fantasy", author_id: tolkien.id})
      dune = item_fixture(%{name: "Dune", description: "scifi", author_id: herbert.id})

      %{tolkien: tolkien, herbert: herbert, lotr: lotr, dune: dune}
    end

    test "filters by single-level association field", %{lotr: lotr} do
      result =
        from(i in ItemSchema)
        |> Filter.query("author.name:Tolkien")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "filters by association field with contains predicate", %{lotr: lotr} do
      result =
        from(i in ItemSchema)
        |> Filter.query("author.name:*Tolkien")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "combines association and local field filters", %{tolkien: tolkien, lotr: lotr} do
      _hobbit = item_fixture(%{name: "Hobbit", description: "fantasy adventure", author_id: tolkien.id})

      result =
        from(i in ItemSchema)
        |> Filter.query("author.name:Tolkien name:LOTR")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "filters with OR on association fields", %{lotr: lotr, dune: dune} do
      asimov = author_fixture(%{name: "Asimov", bio: "Russian-American author"})
      _foundation = item_fixture(%{name: "Foundation", description: "scifi", author_id: asimov.id})

      result =
        from(i in ItemSchema)
        |> Filter.query("author.name:Tolkien or author.name:Herbert")
        |> Repo.all()
        |> Enum.sort_by(& &1.name)

      assert length(result) == 2
      assert Enum.map(result, & &1.id) |> Enum.sort() == Enum.sort([lotr.id, dune.id])
    end

    test "filters with negation on association field", %{dune: dune} do
      result =
        from(i in ItemSchema)
        |> Filter.query("!author.name:Tolkien")
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == dune.id
    end

    test "reuses joins for same association", %{lotr: lotr} do
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

    setup do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      lotr = item_fixture(%{name: "LOTR", description: "fantasy", author_id: tolkien.id})
      dune = item_fixture(%{name: "Dune", description: "scifi", author_id: herbert.id})

      %{tolkien: tolkien, herbert: herbert, lotr: lotr, dune: dune}
    end

    test "block syntax - finds authors with matching item", %{tolkien: tolkien} do
      _no_books = author_fixture(%{name: "NoBooks", bio: "No books yet"})
      _hobbit = item_fixture(%{name: "Hobbit", description: "fantasy", author_id: tolkien.id})

      result =
        from(a in AuthorSchema)
        |> Filter.query("items { name:LOTR }", schema: AuthorSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "block syntax with contains predicate", %{tolkien: tolkien} do
      _hobbit = item_fixture(%{name: "Hobbit", description: "fantasy", author_id: tolkien.id})

      result =
        from(a in AuthorSchema)
        |> Filter.query("items { name:*OTR }", schema: AuthorSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "block syntax with multiple conditions inside block", %{tolkien: tolkien} do
      result =
        from(a in AuthorSchema)
        |> Filter.query("items { name:LOTR description:*fantasy }", schema: AuthorSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end

    test "block syntax with negation inside block", %{herbert: herbert} do
      # Finds authors whose items do NOT have name "LOTR" (but still have some items)
      result =
        from(a in AuthorSchema)
        |> Filter.query("items { !name:LOTR }", schema: AuthorSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == herbert.id
    end

    test "block syntax combined with local field filter", %{tolkien: tolkien} do
      lewis = author_fixture(%{name: "Lewis", bio: "British author"})
      _narnia = item_fixture(%{name: "Narnia", description: "fantasy", author_id: lewis.id})

      result =
        from(a in AuthorSchema)
        |> Filter.query("bio:*British items { name:LOTR }", schema: AuthorSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == tolkien.id
    end
  end

  describe "block syntax for belongs_to relations" do
    setup do
      tolkien = author_fixture(%{name: "Tolkien", bio: "British author"})
      herbert = author_fixture(%{name: "Herbert", bio: "American author"})

      lotr = item_fixture(%{name: "LOTR", description: "fantasy", author_id: tolkien.id})
      dune = item_fixture(%{name: "Dune", description: "scifi", author_id: herbert.id})

      %{tolkien: tolkien, herbert: herbert, lotr: lotr, dune: dune}
    end

    test "block syntax - filters items by author", %{lotr: lotr} do
      result =
        from(i in ItemSchema)
        |> Filter.query("author { name:Tolkien }", schema: ItemSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end

    test "block syntax with contains predicate on belongs_to", %{lotr: lotr} do
      result =
        from(i in ItemSchema)
        |> Filter.query("author { name:*Tolkien }", schema: ItemSchema)
        |> Repo.all()

      assert length(result) == 1
      assert hd(result).id == lotr.id
    end
  end
end
