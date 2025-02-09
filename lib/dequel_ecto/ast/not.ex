defmodule Dequel.Query.AST.Not do
  defstruct [:expression]

  import Ecto.Query

  alias Dequel.Query.Filter

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
