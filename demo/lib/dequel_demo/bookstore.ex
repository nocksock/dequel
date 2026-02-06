defmodule DequelDemo.Bookstore do
  @moduledoc """
  Context for bookstore queries using Dequel.
  """

  import Ecto.Query

  alias DequelDemo.Repo
  alias DequelDemo.Bookstore.{Author, Book, Store, Review}

  @collections %{
    "books" => Book,
    "authors" => Author,
    "bookstores" => Store,
    "reviews" => Review
  }

  @schemas %{
    "books" => [
      %{name: "title", type: "string", description: "Book title"},
      %{name: "isbn", type: "string", description: "ISBN identifier"},
      %{name: "price", type: "decimal", description: "Book price"},
      %{name: "published_at", type: "date", description: "Publication date"},
      %{name: "page_count", type: "integer", description: "Number of pages"},
      %{
        name: "genre",
        type: "string",
        description: "Book genre",
        values: Book.genres()
      }
    ],
    "authors" => [
      %{name: "name", type: "string", description: "Author name"},
      %{name: "bio", type: "string", description: "Author biography"},
      %{name: "birth_date", type: "date", description: "Birth date"},
      %{name: "country", type: "string", description: "Country of origin"}
    ],
    "bookstores" => [
      %{name: "name", type: "string", description: "Store name"},
      %{name: "location", type: "string", description: "Store location"},
      %{name: "rating", type: "decimal", description: "Store rating"},
      %{name: "founded_at", type: "date", description: "Date founded"}
    ],
    "reviews" => [
      %{name: "content", type: "string", description: "Review content"},
      %{name: "rating", type: "integer", description: "Star rating (1-5)"},
      %{name: "reviewer_name", type: "string", description: "Reviewer name"}
    ]
  }

  @doc """
  Returns the list of available collections.
  """
  def collections, do: Map.keys(@collections)

  @doc """
  Returns the schema (field definitions) for a collection.
  """
  def get_schema(collection) do
    Map.get(@schemas, collection, [])
  end

  @doc """
  Executes a Dequel query against a collection.
  Returns `{:ok, results}` or `{:error, message}`.
  """
  def execute(collection, query_string) do
    case Map.fetch(@collections, collection) do
      {:ok, schema} ->
        execute_query(schema, query_string)

      :error ->
        {:error, "Unknown collection: #{collection}"}
    end
  end

  defp execute_query(schema, "") do
    results =
      schema
      |> limit(50)
      |> Repo.all()
      |> Enum.map(&format_result/1)

    {:ok, results}
  end

  defp execute_query(schema, query_string) do
    try do
      dynamic = Dequel.Adapter.Ecto.Filter.where(query_string)

      results =
        schema
        |> where(^dynamic)
        |> limit(50)
        |> Repo.all()
        |> Enum.map(&format_result/1)

      {:ok, results}
    rescue
      e in ArgumentError ->
        {:error, "Query error: #{Exception.message(e)}"}

      e ->
        {:error, "Query error: #{Exception.message(e)}"}
    end
  end

  defp format_result(%Book{} = book) do
    %{
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      price: book.price && Decimal.to_string(book.price),
      genre: book.genre,
      page_count: book.page_count
    }
  end

  defp format_result(%Author{} = author) do
    %{
      id: author.id,
      title: author.name,
      name: author.name,
      country: author.country,
      birth_date: author.birth_date && Date.to_string(author.birth_date)
    }
  end

  defp format_result(%Store{} = store) do
    %{
      id: store.id,
      title: store.name,
      name: store.name,
      location: store.location,
      rating: store.rating && Decimal.to_string(store.rating)
    }
  end

  defp format_result(%Review{} = review) do
    %{
      id: review.id,
      title: review.reviewer_name,
      content: review.content,
      rating: review.rating,
      reviewer_name: review.reviewer_name
    }
  end
end
