defmodule DequelDemoWeb.QueryController do
  @moduledoc """
  Controller for the Dequel demo query interface.
  """

  use DequelDemoWeb, :controller

  alias DequelDemo.Bookstore

    
  def index(conn, %{"collection" => collection, "query" => query}) do
    result = Bookstore.execute(collection, query)

    {results, error} =
      case result do
        {:ok, results} -> {results, nil}
        {:error, message} -> {[], message}
      end

    render(conn, :index,
      collection: collection,
      collections: Bookstore.collections(),
      query: query,
      results: results,
      error: error
    )
  end

  def index(conn, _params) do
    render(conn, :index,
      collection: "books",
      collections: Bookstore.collections(),
      query: "",
      results: [],
      error: nil
    )
  end

  
end
