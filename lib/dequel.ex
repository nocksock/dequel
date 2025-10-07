defmodule Dequel do
  @moduledoc """
  Main entry point for the Dequel query language library.

  Dequel (DQL, Data Query Language) is a human-friendly query language that provides
  search filters similar to GitHub, Discord, or Gmail.

  ## Basic Usage

      # Parse a query string into an AST
      {:ok, ast} = Dequel.Parser.parse("status:active priority:>2")

      # Use with Ecto - returns Ecto.Query.dynamic() expression
      dynamic_query = Dequel.where("tags:*elixir created:>(2024-01-01)")

      # Compose with existing Ecto queries
      from(Post, where: ^Dequel.where("title:contains(elixir)"))
      |> where([p], p.status == "published")
      |> Repo.all()

  ## Query Syntax

  - **Field filtering**: `field:value`
  - **String matching**: `field:*value` (contains), `field:^value` (starts with), `field:$value` (ends with)
  - **Comparisons**: `field:>10`, `field:<=2024-01-01`
  - **Predicates**: `field:contains(value)`, `field:starts_with(value)`, `field:ends_with(value)`
  - **Logical operators**: Implicit AND (`field1:value1 field2:value2`), OR (`field1:value1 || field2:value2`)
  - **Grouping**: `{field1:value1 || field2:value2} field3:value3`
  - **Negation**: `!field:value`

  ## Adapters

  Dequel supports multiple execution adapters:

  - `Dequel.Ecto` - Converts queries to SQL via Ecto (for database operations)
  - `Dequel.Enum` - Filters Elixir collections in-memory (for lists, streams, etc.)

  Both adapters consume the same AST structure from `Dequel.Parser`.
  """

  defdelegate where(input), to: Dequel.Adapter.Ecto.Filter
end
