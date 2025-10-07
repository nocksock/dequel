defmodule Dequel.Ecto.AST.Or do
  @moduledoc """
  AST node representing OR logical operator for the Ecto adapter.

  This struct represents OR operations that combine two sub-expressions.
  It implements the `Dequel.Ecto.Filter` protocol to convert AST nodes into
  Ecto dynamic query expressions.

  **Note**: This module may be consolidated with `Dequel.Ecto.AST.BinaryOp` in future versions,
  as `BinaryOp` already handles both AND and OR operations.

  ## Fields

  - `:lhs` - Left-hand side expression (can be any AST node)
  - `:rhs` - Right-hand side expression (can be any AST node)

  ## Examples

      # OR operation
      %Or{
        lhs: {:==, [], [:status, "active"]},
        rhs: {:==, [], [:status, "pending"]}
      }
      # Converts to: dynamic([q], field(q, :status) == "active" or field(q, :status) == "pending")
  """

  defstruct [:lhs, :rhs]

  import Ecto.Query

  alias Dequel.Ecto.Filter

  defimpl Filter do
    def where(op) do
      lhs = Filter.where(op.lhs)
      rhs = Filter.where(op.rhs)

      dynamic(^lhs or ^rhs)
    end

    def match?(op, shape) do
      Filter.match?(op.lhs, shape) or Filter.match?(op.rhs, shape)
    end
  end
end
