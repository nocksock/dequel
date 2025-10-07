defmodule Dequel.Adapter.Ecto.Filter do
  @moduledoc """
  Main Ecto adapter implementation for converting Dequel AST to Ecto dynamic queries.

  This module provides the core functionality for translating parsed Dequel queries
  into `Ecto.Query.dynamic()` expressions that can be composed with Ecto queries.

  ## Usage

      # From a query string
      dynamic = Dequel.Adapter.Ecto.Filter.where("status:active age:>30")

      # Compose with Ecto queries
      from(User, where: ^Dequel.Adapter.Ecto.Filter.where("name:^John"))
      |> where([u], u.verified == true)
      |> Repo.all()

  ## Supported Operators

  - **Equality**: `:==` - Exact match
  - **String matching**:
    - `:contains` - LIKE %value%
    - `:starts_with` - LIKE value%
    - `:ends_with` - LIKE %value
  - **Logical**:
    - `:and` - Combine conditions (all must be true)
    - `:or` - Alternative conditions (any can be true)
    - `:not` - Negate a condition

  ## AST to SQL Translation

  The module recursively processes AST tuples and converts them to SQL:

      {:==, [], [:status, "active"]}
      #=> dynamic([q], field(q, :status) == "active")

      {:and, [], [lhs, rhs]}
      #=> dynamic([q], ^where(lhs) and ^where(rhs))

      {:contains, [], [:title, "elixir"]}
      #=> dynamic([q], fragment("? LIKE ?", field(q, :title), "%elixir%"))
  """

  import Ecto.Query

  def where(input) when is_binary(input) do
    input
    |> Dequel.Parser.parse!()
    |> where()
  end

  def where({:==, [], [field, value]}) do
    dynamic([schema], field(schema, ^field) == ^value)
  end

  def where({:and, [], [lhs, rhs]}) do
    lhs = where(lhs)
    rhs = where(rhs)
    dynamic(^lhs and ^rhs)
  end

  def where({:or, [], [lhs, rhs]}) do
    lhs = where(lhs)
    rhs = where(rhs)
    dynamic(^lhs or ^rhs)
  end

  def where({:starts_with, [], [field, value]}) do
    dynamic(
      [schema],
      fragment("? LIKE ?", field(schema, ^field), ^"#{String.replace(value, "%", "\\%")}%")
    )
  end

  def where({:ends_with, [], [field, value]}) do
    dynamic([schema], fragment("? LIKE ?", field(schema, ^field), ^"%#{value}"))
  end

  def where({:contains, [], [field, value]}) do
    dynamic([schema], fragment("? LIKE ?", field(schema, ^field), ^"%#{value}%"))
  end

  def where({:not, [], expression}) do
    dynamic(not (^where(expression)))
  end

  #
  # def where(%FieldFilter{args: [], field: field, op: :isEmpty}) do
  #   dynamic([schema], is_nil(field(schema, ^field)) or field(schema, ^field) == "")
  # end
  #
  def where({op, [], [field, value]}) do
    raise "Operator `#{op}` not yet implemented. Tried calling `#{field}:#{op}(#{value})`"
  end

  def predicates,
    do: [
      :startsWith,
      :contains,
      :endsWith,
      :exact,
      :isEmpty,
      :oneOf
    ]
end
