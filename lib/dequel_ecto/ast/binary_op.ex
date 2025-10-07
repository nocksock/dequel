defmodule Dequel.Ecto.AST.BinaryOp do
  @moduledoc """
  AST node representing binary logical operators (AND/OR) for the Ecto adapter.

  This struct represents logical operations that combine two sub-expressions.
  It implements the `Dequel.Ecto.Filter` protocol to convert AST nodes into
  Ecto dynamic query expressions.

  ## Fields

  - `:lhs` - Left-hand side expression (can be any AST node)
  - `:rhs` - Right-hand side expression (can be any AST node)
  - `:operator` - The logical operator (`:and` or `:or`)

  ## Examples

      # AND operation
      %BinaryOp{
        operator: :and,
        lhs: {:==, [], [:name, "frodo"]},
        rhs: {:>, [], [:age, 30]}
      }
      # Converts to: dynamic([q], field(q, :name) == "frodo" and field(q, :age) > 30)

      # OR operation
      %BinaryOp{
        operator: :or,
        lhs: {:==, [], [:status, "active"]},
        rhs: {:==, [], [:status, "pending"]}
      }
      # Converts to: dynamic([q], field(q, :status) == "active" or field(q, :status) == "pending")
  """

  defstruct [:lhs, :rhs, :operator]

  import Ecto.Query

  alias Dequel.Ecto.Filter

  defimpl Filter do
    def where(binary_op) do
      lhs = Filter.where(binary_op.lhs)
      rhs = Filter.where(binary_op.rhs)

      case binary_op.operator do
        :and -> dynamic(^lhs and ^rhs)
        :or -> dynamic(^lhs or ^rhs)
      end
    end

    def match?(binary_op, shape) do
      case binary_op.operator do
        :and ->
          Filter.match?(binary_op.lhs, shape) and Filter.match?(binary_op.rhs, shape)

        :or ->
          Filter.match?(binary_op.lhs, shape) or Filter.match?(binary_op.rhs, shape)
      end
    end
  end
end
