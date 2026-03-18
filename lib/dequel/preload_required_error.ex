defmodule Dequel.PreloadRequiredError do
  @moduledoc """
  Exception raised when a query requires an association that hasn't been preloaded.

  This error is raised by `Dequel.matches?/2` when it encounters an
  `%Ecto.Association.NotLoaded{}` struct while traversing associations.

  ## Example

      book = Repo.get(Book, 1)  # author not preloaded
      Dequel.matches?(book, "author.country:DE")
      # => raises Dequel.PreloadRequiredError

  To fix this, preload the required associations:

      preloads = Dequel.preloads("author.country:DE")  # => [:author]
      book = Repo.get(Book, 1) |> Repo.preload(preloads)
      Dequel.matches?(book, "author.country:DE")
      # => true or false

  """

  defexception [:field, :message]

  @impl true
  def exception(opts) do
    field = Keyword.fetch!(opts, :field)

    message = """
    Association #{inspect(field)} is not loaded.

    Dequel.matches?/2 requires all associations referenced in the query to be preloaded.
    Use Dequel.preloads/1 to get the list of required preloads:

        preloads = Dequel.preloads(query)
        record = Repo.preload(record, preloads)
        Dequel.matches?(record, query)
    """

    %__MODULE__{field: field, message: message}
  end
end
