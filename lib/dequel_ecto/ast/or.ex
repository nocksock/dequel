defmodule Dequel.Ecto.AST.Or do
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
