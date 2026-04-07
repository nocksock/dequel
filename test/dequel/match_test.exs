defmodule Dequel.MatchTest do
  use ExUnit.Case, async: true

  doctest Dequel.Match

  alias Dequel.PreloadRequiredError

  # Sample structs for testing (no database needed)
  defmodule Author do
    defstruct [:id, :name, :country, :birth_date]
  end

  defmodule Tag do
    defstruct [:id, :name]
  end

  defmodule Review do
    defstruct [:id, :rating, :content, :reviewer_name]
  end

  defmodule Book do
    defstruct [:id, :title, :isbn, :price, :page_count, :genre, :author, :tags, :reviews]
  end

  setup do
    # Authors
    tolkien = %Author{
      id: 1,
      name: "J.R.R. Tolkien",
      country: "England",
      birth_date: ~D[1892-01-03]
    }

    asimov = %Author{id: 2, name: "Isaac Asimov", country: "USA", birth_date: ~D[1920-01-02]}

    # Tags
    fantasy_tag = %Tag{id: 1, name: "fantasy"}
    classic_tag = %Tag{id: 2, name: "classic"}
    scifi_tag = %Tag{id: 3, name: "sci-fi"}

    # Reviews
    good_review = %Review{id: 1, rating: 5, content: "Amazing!", reviewer_name: "Fan"}
    bad_review = %Review{id: 2, rating: 2, content: "Boring", reviewer_name: "Critic"}

    # Books
    lotr = %Book{
      id: 1,
      title: "The Lord of the Rings",
      isbn: "978-0618640157",
      price: Decimal.new("29.99"),
      page_count: 1178,
      genre: "fantasy",
      author: tolkien,
      tags: [fantasy_tag, classic_tag],
      reviews: [good_review]
    }

    foundation = %Book{
      id: 2,
      title: "Foundation",
      isbn: "978-0553293357",
      price: Decimal.new("16.99"),
      page_count: 255,
      genre: "sci-fi",
      author: asimov,
      tags: [scifi_tag, classic_tag],
      reviews: [good_review, bad_review]
    }

    %{
      tolkien: tolkien,
      asimov: asimov,
      fantasy_tag: fantasy_tag,
      classic_tag: classic_tag,
      scifi_tag: scifi_tag,
      good_review: good_review,
      bad_review: bad_review,
      lotr: lotr,
      foundation: foundation
    }
  end

  describe "matches?/2 with simple fields" do
    test "empty query matches everything", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "")
      assert Dequel.matches?(lotr, "   ")
    end

    test "equality", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "genre:fantasy")
      refute Dequel.matches?(lotr, ~s(genre:"sci-fi"))
    end

    test "contains", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "title:*Rings")
      assert Dequel.matches?(lotr, "title:*\"Lord\"")
      refute Dequel.matches?(lotr, "title:*Potter")
    end

    test "starts_with", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "title:^The")
      refute Dequel.matches?(lotr, "title:^Lord")
    end

    test "ends_with", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "title:$Rings")
      refute Dequel.matches?(lotr, "title:$Lord")
    end

    test "greater than", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "page_count:>1000")
      refute Dequel.matches?(lotr, "page_count:>2000")
    end

    test "less than", %{foundation: foundation, lotr: lotr} do
      assert Dequel.matches?(foundation, "page_count:<300")
      refute Dequel.matches?(lotr, "page_count:<300")
    end

    test "greater than or equal", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "page_count:>=1178")
      assert Dequel.matches?(lotr, "page_count:>=1000")
      refute Dequel.matches?(lotr, "page_count:>=2000")
    end

    test "less than or equal", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "page_count:<=1178")
      assert Dequel.matches?(lotr, "page_count:<=2000")
      refute Dequel.matches?(lotr, "page_count:<=1000")
    end

    test "between range", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "page_count:1000..1200")
      refute Dequel.matches?(lotr, "page_count:1..100")
    end

    test "in list", %{lotr: lotr} do
      assert Dequel.matches?(lotr, ~s(genre:[fantasy, "sci-fi"]))
      refute Dequel.matches?(lotr, "genre:[mystery, thriller]")
    end
  end

  describe "matches?/2 with logical operators" do
    test "AND (implicit)", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "genre:fantasy page_count:>1000")
      refute Dequel.matches?(lotr, "genre:fantasy page_count:>2000")
    end

    test "OR", %{lotr: lotr, foundation: foundation} do
      assert Dequel.matches?(lotr, ~s(genre:fantasy or genre:"sci-fi"))
      assert Dequel.matches?(foundation, ~s(genre:fantasy or genre:"sci-fi"))
      refute Dequel.matches?(lotr, "genre:mystery or genre:thriller")
    end

    test "NOT with prefix", %{lotr: lotr} do
      assert Dequel.matches?(lotr, ~s(-genre:"sci-fi"))
      refute Dequel.matches?(lotr, "-genre:fantasy")
    end

    test "complex expression", %{lotr: lotr} do
      query = "(genre:fantasy or genre:\"sci-fi\") page_count:>500"
      assert Dequel.matches?(lotr, query)
      refute Dequel.matches?(lotr, "(genre:mystery or genre:thriller) page_count:>500")
    end
  end

  describe "matches?/2 with dot notation (relations)" do
    test "single-level relation", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "author.country:England")
      refute Dequel.matches?(lotr, "author.country:USA")
    end

    test "relation field contains", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "author.name:*Tolkien")
      refute Dequel.matches?(lotr, "author.name:*Asimov")
    end

    test "combined field and relation", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "genre:fantasy author.country:England")
      refute Dequel.matches?(lotr, "genre:fantasy author.country:USA")
    end
  end

  describe "matches?/2 with block syntax (has_many)" do
    test "any tag matches", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "tags{name:fantasy}")
      assert Dequel.matches?(lotr, "tags{name:classic}")
      refute Dequel.matches?(lotr, "tags{name:mystery}")
    end

    test "any review matches rating", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "reviews{rating:>4}")
      refute Dequel.matches?(lotr, "reviews{rating:<3}")
    end

    test "any semantics - at least one must match", %{foundation: foundation, lotr: lotr} do
      # Foundation has both good and bad reviews
      assert Dequel.matches?(foundation, "reviews{rating:5}")
      assert Dequel.matches?(foundation, "reviews{rating:2}")
      # But lotr only has good reviews
      assert Dequel.matches?(lotr, "reviews{rating:5}")
      refute Dequel.matches?(lotr, "reviews{rating:2}")
    end

    test "combined block and dot notation", %{lotr: lotr} do
      assert Dequel.matches?(lotr, "author.country:England tags{name:fantasy}")
      refute Dequel.matches?(lotr, "author.country:USA tags{name:fantasy}")
    end

    test "empty collection returns false", %{lotr: lotr} do
      book_no_tags = %{lotr | tags: []}
      refute Dequel.matches?(book_no_tags, "tags{name:fantasy}")
    end
  end

  describe "matches?/2 with semantic AST nodes" do
    test "EXISTS node (has_many)", %{lotr: lotr, foundation: foundation} do
      ast = {:exists, [cardinality: :many], [:tags, {:==, [], [:name, "fantasy"]}]}
      assert Dequel.matches?(lotr, ast)
      refute Dequel.matches?(foundation, ast)
    end

    test "JOIN node (belongs_to)", %{lotr: lotr, foundation: foundation} do
      ast = {:join, [cardinality: :one], [:author, {:==, [], [:country, "England"]}]}
      assert Dequel.matches?(lotr, ast)
      refute Dequel.matches?(foundation, ast)
    end

    test "EMBEDDED node with :many cardinality", %{lotr: lotr} do
      # Simulating embedded list
      book_with_metadata = Map.put(lotr, :metadata, [%{key: "edition", value: "first"}])
      ast = {:embedded, [cardinality: :many], [:metadata, {:==, [], [:key, "edition"]}]}
      assert Dequel.matches?(book_with_metadata, ast)
    end

    test "EMBEDDED node with :one cardinality", %{lotr: lotr} do
      # Simulating embedded map
      book_with_metadata = Map.put(lotr, :metadata, %{key: "edition", value: "first"})
      ast = {:embedded, [cardinality: :one], [:metadata, {:==, [], [:key, "edition"]}]}
      assert Dequel.matches?(book_with_metadata, ast)
    end
  end

  describe "PreloadRequiredError" do
    test "raises when association is not loaded", %{lotr: lotr} do
      # Simulate an Ecto struct with unloaded association
      unloaded = %Ecto.Association.NotLoaded{
        __field__: :author,
        __owner__: Book,
        __cardinality__: :one
      }

      book_unloaded = %{lotr | author: unloaded}

      assert_raise PreloadRequiredError, ~r/author.*not loaded/i, fn ->
        Dequel.matches?(book_unloaded, "author.country:England")
      end
    end

    test "raises with helpful message", %{lotr: lotr} do
      unloaded = %Ecto.Association.NotLoaded{
        __field__: :tags,
        __owner__: Book,
        __cardinality__: :many
      }

      book_unloaded = %{lotr | tags: unloaded}

      error =
        assert_raise PreloadRequiredError, fn ->
          Dequel.matches?(book_unloaded, "tags{name:fantasy}")
        end

      assert error.field == :tags
      assert error.message =~ "preloads"
    end

    test "does not raise for nil associations", %{lotr: lotr} do
      book_no_author = %{lotr | author: nil}
      # Should return false, not raise
      refute Dequel.matches?(book_no_author, "author.country:England")
    end
  end
end
