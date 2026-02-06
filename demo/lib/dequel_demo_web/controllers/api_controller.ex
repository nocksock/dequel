defmodule DequelDemoWeb.ApiController do
  @moduledoc """
  JSON API controller for editor autocompletions.
  """

  use DequelDemoWeb, :controller

  alias DequelDemo.Bookstore

  def schema(conn, params) do
    collection = params["collection"] || "books"
    schema = Bookstore.get_schema(collection)

    if schema == [] and collection not in Bookstore.collections() do
      conn
      |> put_status(400)
      |> json(%{error: "Unknown collection: #{collection}"})
    else
      json(conn, schema)
    end
  end
end
