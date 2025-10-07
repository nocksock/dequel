# defmodule Dequel.Ecto do
#   import Ecto.Query
#
#   def where(query, expr) when is_binary(expr) do
#     dql = Dequel.Adapter.Ecto.Filter.where(expr)
#     
#     query
#     |> Ecto.Query.where(^dql)
#   end
# end
