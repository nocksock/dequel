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

  # Schema definitions for each collection
  # Format: fields list with optional values for enum fields
  @schemas %{
    "books" => %{
      fields: [
        %{label: "title", type: "string", info: "Book title"},
        %{label: "isbn", type: "string", info: "ISBN identifier"},
        %{label: "price", type: "number", info: "Book price"},
        %{label: "published_at", type: "string", info: "Publication date"},
        %{label: "page_count", type: "number", info: "Number of pages"},
        %{label: "genre", type: "keyword", info: "Book genre"}
      ],
      values: %{
        "genre" => Book.genres()
      }
    },
    "authors" => %{
      fields: [
        %{label: "name", type: "string", info: "Author name"},
        %{label: "bio", type: "string", info: "Author biography"},
        %{label: "birth_date", type: "string", info: "Birth date"},
        %{label: "country", type: "string", info: "Country of origin"}
      ]
    },
    "bookstores" => %{
      fields: [
        %{label: "name", type: "string", info: "Store name"},
        %{label: "location", type: "string", info: "Store location"},
        %{label: "rating", type: "number", info: "Store rating"},
        %{label: "founded_at", type: "string", info: "Date founded"}
      ]
    },
    "reviews" => %{
      fields: [
        %{label: "content", type: "string", info: "Review content"},
        %{label: "rating", type: "number", info: "Star rating (1-5)"},
        %{label: "reviewer_name", type: "string", info: "Reviewer name"}
      ]
    }
  }

  @doc """
  Returns the list of available collections.
  """
  def collections, do: Map.keys(@collections)

  @doc """
  Returns the schema (field definitions) for a collection.
  Returns `{:error, message}` for unknown collections.
  """
  def get_schema(collection) do
    case Map.fetch(@schemas, collection) do
      {:ok, schema} -> schema
      :error -> {:error, "Unknown collection: #{collection}"}
    end
  end

  @doc """
  Returns suggestions configuration for a collection.
  Keys are field names matched to cursor context.
  "*" is the fallback when cursor is not in a recognized field.
  """
  def get_suggestions("books") do
    %{
      "*" => %{
        title: "Filter books",
        values: [
          %{label: "title:", action: %{type: "append", value: "title:"}, description: "Filter by title"},
          %{label: "genre:", action: %{type: "append", value: "genre:"}, description: "Filter by genre"},
          %{label: "isbn:", action: %{type: "append", value: "isbn:"}, description: "Filter by ISBN"}
        ]
      },
      "title" => %{
        title: "Filter by title",
        description: "Text matching on book titles",
        type: "text"
      },
      "genre" => %{
        title: "Filter by genre",
        type: "keyword",
        values:
          Enum.map(Book.genres(), fn genre ->
            %{label: genre, action: %{type: "setPredicate", value: "\"#{genre}\""}, description: "Books in #{genre}"}
          end)
      },
      "isbn" => %{
        title: "Filter by ISBN",
        type: "text"
      }
    }
  end

  def get_suggestions("authors") do
    %{
      "*" => %{
        title: "Filter authors",
        values: [
          %{label: "name:", action: %{type: "append", value: "name:"}, description: "Filter by name"},
          %{label: "country:", action: %{type: "append", value: "country:"}, description: "Filter by country"}
        ]
      },
      "name" => %{
        title: "Filter by name",
        type: "text"
      },
      "country" => %{
        title: "Filter by country",
        type: "text"
      }
    }
  end

  def get_suggestions("bookstores") do
    %{
      "*" => %{
        title: "Filter bookstores",
        values: [
          %{label: "name:", action: %{type: "append", value: "name:"}, description: "Filter by name"},
          %{label: "location:", action: %{type: "append", value: "location:"}, description: "Filter by location"}
        ]
      },
      "name" => %{
        title: "Filter by name",
        type: "text"
      },
      "location" => %{
        title: "Filter by location",
        type: "text"
      }
    }
  end

  def get_suggestions("reviews") do
    %{
      "*" => %{
        title: "Filter reviews",
        values: [
          %{label: "reviewer_name:", action: %{type: "append", value: "reviewer_name:"}, description: "Filter by reviewer"},
          %{label: "rating:", action: %{type: "append", value: "rating:"}, description: "Filter by rating"}
        ]
      },
      "reviewer_name" => %{
        title: "Filter by reviewer name",
        type: "text"
      },
      "rating" => %{
        title: "Filter by rating",
        type: "keyword",
        values:
          Enum.map(1..5, fn r ->
            %{label: "#{r}", action: %{type: "setPredicate", value: "#{r}"}, description: "#{r}-star reviews"}
          end)
      }
    }
  end

  def get_suggestions(_collection) do
    {:error, "Unknown collection"}
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
