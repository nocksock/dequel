defprotocol Dequel.Ecto.Filter do
  @moduledoc """
  Protocol for converting Dequel AST nodes to Ecto dynamic queries.

  This protocol is implemented by all AST nodes in the Ecto adapter,
  allowing them to be converted to `Ecto.Query.dynamic()` expressions
  that can be composed with other Ecto queries.
  """

  @doc """
  Converts an AST node to an Ecto dynamic query expression.
  """
  @spec where(t) :: Ecto.Query.dynamic_expr()
  def where(value)

  @doc """
  Checks if an AST node matches a given shape (for optimization/analysis).
  """
  @spec match?(any, any) :: boolean()
  def match?(op, shape)
end
