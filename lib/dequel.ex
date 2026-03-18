defmodule Dequel do
  @moduledoc """
  Dequel - A friendly query language

  ## Query Adapters

  Use `Dequel.where/1` to convert queries to Ecto dynamic expressions:

      Book
      |> where(^Dequel.where("author.country:DE tags{name:fiction}"))
      |> Repo.all()

  ## In-Memory Matching

  For auto-updating saved queries, use `matches?/2` to test preloaded structs:

      book = Repo.get(Book, 1) |> Repo.preload([:author, :tags])
      Dequel.matches?(book, "author.country:DE")
      # => true or false

  Use `preloads/1` to get the required preloads for a query:

      Dequel.preloads("author.country:DE tags{name:fiction}")
      # => [:author, :tags]

  """

  defdelegate where(input), to: Dequel.Adapter.Ecto.Filter

  @doc """
  Tests if a struct matches a Dequel query.

  Accepts a struct with preloaded associations and a query (string or AST).
  Returns true if the struct matches all conditions.

  ## Examples

      book = Repo.get(Book, 1) |> Repo.preload([:author])
      Dequel.matches?(book, "author.country:UK")
      # => true

      Dequel.matches?(book, "title:*Rings author.country:UK")
      # => true if title contains "Rings" AND author is from UK

  ## Preload Requirements

  All associations referenced in the query must be preloaded. Use `preloads/1`
  to get the required preloads:

      preloads = Dequel.preloads(query)
      book = Repo.preload(book, preloads)
      Dequel.matches?(book, query)

  Raises `Dequel.PreloadRequiredError` if an association isn't loaded.
  """
  @spec matches?(struct() | map(), binary() | tuple()) :: boolean()
  defdelegate matches?(record, query), to: Dequel.Match

  @doc """
  Extracts required preloads from a query.

  Returns an Ecto-compatible preload list that can be passed to `Repo.preload/2`.

  ## Examples

      Dequel.preloads("author.name:Tolkien")
      # => [:author]

      Dequel.preloads("author.publisher.name:Penguin")
      # => [author: :publisher]

      Dequel.preloads("tags{name:fiction}")
      # => [:tags]

      Dequel.preloads("author.country:UK tags{name:fiction}")
      # => [:author, :tags]

  """
  @spec preloads(binary() | tuple()) :: list()
  defdelegate preloads(query), to: Dequel.Preloads, as: :extract
end
