# TODO: move to Dequel.Adapter.Ecto
defmodule Dequel.Adapter.Ecto.Filter do
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
      dynamic([schema], fragment("? LIKE ?", field(schema, ^field), ^"%#{String.replace(value, "%", "\\%")}%"))
    end

    def where({:starts_with, [], [field, value]}) do
      dynamic([schema], fragment("? LIKE ?", field(schema, ^field), ^"%#{String.replace(value, "%", "\\%")}%"))
    end

    def where({:ends_with, [], [field, value]}) do
      dynamic([schema], fragment("? LIKE ?", field(schema, ^field), ^"%#{value}"))
    end


    def where({:contains, [], [field, value]}) do
      dynamic([schema], fragment("? LIKE ?", field(schema, ^field), ^"%#{value}%"))
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
