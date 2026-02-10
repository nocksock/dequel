defmodule DequelDemoWeb.ApiController do
  @moduledoc """
  JSON API controller for editor autocompletions and suggestions.
  """

  use DequelDemoWeb, :controller

  alias DequelDemo.Bookstore

  def schema(conn, %{"collection" => collection}) do
    case Bookstore.get_schema(collection) do
      {:error, message} ->
        conn
        |> put_status(400)
        |> json(%{error: message})

      schema ->
        json(conn, schema)
    end
  end

  def suggestions(conn, %{"collection" => collection}) do
    case Bookstore.get_suggestions(collection) do
      {:error, message} ->
        conn
        |> put_status(400)
        |> json(%{error: message})

      suggestions ->
        json(conn, suggestions)
    end
  end
end
