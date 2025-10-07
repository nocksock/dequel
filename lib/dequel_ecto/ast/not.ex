defmodule Dequel.Ecto.AST.Not do
  @moduledoc """
  AST node representing negation (NOT) operator for the Ecto adapter.

  This struct represents logical negation of a sub-expression.
  It implements the `Dequel.Ecto.Filter` protocol to convert the negated
  expression into an Ecto dynamic query.

  ## Fields

  - `:expression` - The expression to negate (can be any AST node)

  ## Examples

      # Negated equality
      %Not{
        expression: {:==, [], [:status, "archived"]}
      }
      # Converts to: dynamic([q], not(field(q, :status) == "archived"))

      # Negated complex expression
      %Not{
        expression: {:and, [], [
          {:==, [], [:type, "post"]},
          {:>, [], [:age, 30]}
        ]}
      }
      # Converts to: dynamic([q], not(field(q, :type) == "post" and field(q, :age) > 30))
  """

  defstruct [:expression]

  import Ecto.Query

  alias Dequel.Ecto.Filter

  defimpl Filter do
    def where(not_filter) do
      where = Filter.where(not_filter.expression)

      dynamic(not (^where))
    end

    def match?(_op, _shape) do
      false
    end
  end
end
