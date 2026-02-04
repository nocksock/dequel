defprotocol Dequel.Schema do
  @moduledoc """
  Protocol for providing schema information to the semantic analyzer.

  Implementations of this protocol allow the semantic analyzer to resolve
  relation types (has_many, has_one, belongs_to) and field types from
  domain-specific schemas.

  ## Example Implementation for Ecto

      defimpl Dequel.Schema, for: Atom do
        def relation(schema, field) do
          case schema.__schema__(:association, field) do
            %Ecto.Association.HasMany{related: related} -> {:has_many, related}
            %Ecto.Association.HasOne{related: related} -> {:has_one, related}
            %Ecto.Association.BelongsTo{related: related} -> {:belongs_to, related}
            _ -> nil
          end
        end

        def field_type(schema, field) do
          schema.__schema__(:type, field)
        end
      end
  """

  @doc """
  Returns relation info for a field, or nil if not a relation.

  Returns `{:has_many | :has_one | :belongs_to, related_schema}` or `nil`.
  """
  @spec relation(t, atom()) :: {:has_many | :has_one | :belongs_to, module()} | nil
  def relation(schema, field)

  @doc """
  Returns the field type, or nil if field doesn't exist.
  """
  @spec field_type(t, atom()) :: atom() | nil
  def field_type(schema, field)
end
