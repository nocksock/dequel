defprotocol Dequel.Query.Filter do
  @spec where(t) :: Ecto.Query.dynamic_expr()
  def where(value)

  @spec match?(any, any) :: boolean()
  def match?(op, shape)
end
