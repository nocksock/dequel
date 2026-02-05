defmodule Dequel.Semantic.Analyzer do
  @moduledoc """
  Semantic analyzer that transforms parser AST into typed AST.

  The parser produces syntax-only AST with `:block` nodes for relation filtering.
  This analyzer walks the AST and resolves `:block` nodes to their semantic
  equivalents based on schema information:

  - `has_many` relations → `:exists` with `[cardinality: :many]`
  - `belongs_to` / `has_one` relations → `:join` with `[cardinality: :one]`
  - `embeds_many` → `:embedded` with `[cardinality: :many]`
  - `embeds_one` → `:embedded` with `[cardinality: :one]`

  Additionally, field values are coerced to their proper types based on schema info.

  ## Example

      # Parser output (untyped AST)
      {:block, [], [:items, {:==, [], [:name, "foo"]}]}

      # After semantic analysis with has_many relation
      {:exists, [cardinality: :many], [:items, {:==, [], [:name, "foo"]}]}

      # After semantic analysis with belongs_to relation
      {:join, [cardinality: :one], [:author, {:==, [], [:name, "foo"]}]}

      # Type coercion
      {:==, [], [:age, "25"]}  →  {:==, [], [:age, 25]}

  The semantic layer also enables LSP support by providing type information
  that can be used for validation, completion, and hover information.

  ## Schema Resolver

  The analyzer accepts a schema resolver function that returns field/relation info:

      resolver = fn field ->
        case field do
          :items -> %{kind: :has_many, resolver: nested_resolver}
          :author -> %{kind: :belongs_to, resolver: nested_resolver}
          :address -> %{kind: :embeds_one, resolver: nested_resolver}
          :age -> %{kind: :field, type: :integer}
          _ -> nil
        end
      end

      Analyzer.analyze(ast, resolver)

  For Ecto schemas, use `Analyzer.ecto_resolver/1` to create a resolver.
  """

  alias Dequel.Semantic.Coerce

  @type ast :: tuple() | atom()
  @type relation_kind :: :has_many | :has_one | :belongs_to | :embeds_one | :embeds_many
  @type field_info :: %{kind: :field, type: atom()}
  @type relation_info :: %{kind: relation_kind(), resolver: resolver()}
  @type resolver :: (atom() -> field_info() | relation_info() | nil) | nil

  @doc """
  Analyzes the AST and resolves block nodes to their typed equivalents.

  Takes an optional resolver function that maps field names to field/relation info.
  The resolver should return one of:
  - `%{kind: :has_many | :has_one | :belongs_to | :embeds_one | :embeds_many, resolver: fn}` for relations
  - `%{kind: :field, type: atom}` for typed fields
  - `nil` for unknown fields

  If no resolver is provided, block nodes are left unchanged and no type coercion occurs.

  ## Examples

  Block nodes are transformed based on relation type:

      iex> ast = {:block, [], [:items, {:==, [], [:name, "foo"]}]}
      iex> resolver = fn :items -> %{kind: :has_many, resolver: nil}; _ -> nil end
      iex> Dequel.Semantic.Analyzer.analyze(ast, resolver)
      {:exists, [cardinality: :many], [:items, {:==, [], [:name, "foo"]}]}

      iex> ast = {:block, [], [:author, {:==, [], [:name, "Tolkien"]}]}
      iex> resolver = fn :author -> %{kind: :belongs_to, resolver: nil}; _ -> nil end
      iex> Dequel.Semantic.Analyzer.analyze(ast, resolver)
      {:join, [cardinality: :one], [:author, {:==, [], [:name, "Tolkien"]}]}

      iex> ast = {:block, [], [:address, {:==, [], [:city, "NYC"]}]}
      iex> resolver = fn :address -> %{kind: :embeds_one, resolver: nil}; _ -> nil end
      iex> Dequel.Semantic.Analyzer.analyze(ast, resolver)
      {:embedded, [cardinality: :one], [:address, {:==, [], [:city, "NYC"]}]}

  Field values are coerced based on type:

      iex> ast = {:==, [], [:age, "25"]}
      iex> resolver = fn :age -> %{kind: :field, type: :integer}; _ -> nil end
      iex> Dequel.Semantic.Analyzer.analyze(ast, resolver)
      {:==, [], [:age, 25]}

      iex> ast = {:==, [], [:active, "true"]}
      iex> resolver = fn :active -> %{kind: :field, type: :boolean}; _ -> nil end
      iex> Dequel.Semantic.Analyzer.analyze(ast, resolver)
      {:==, [], [:active, true]}

  Comparison operators are coerced based on field type:

      iex> ast = {:>, [], [:age, "18"]}
      iex> resolver = fn :age -> %{kind: :field, type: :integer}; _ -> nil end
      iex> Dequel.Semantic.Analyzer.analyze(ast, resolver)
      {:>, [], [:age, 18]}

      iex> ast = {:between, [], [:price, "10", "50"]}
      iex> resolver = fn :price -> %{kind: :field, type: :integer}; _ -> nil end
      iex> Dequel.Semantic.Analyzer.analyze(ast, resolver)
      {:between, [], [:price, 10, 50]}

  Without a resolver, AST passes through unchanged:

      iex> Dequel.Semantic.Analyzer.analyze({:==, [], [:name, "foo"]}, nil)
      {:==, [], [:name, "foo"]}

      iex> Dequel.Semantic.Analyzer.analyze({:block, [], [:items, {:==, [], [:name, "foo"]}]}, nil)
      {:block, [], [:items, {:==, [], [:name, "foo"]}]}

  """
  @spec analyze(ast, resolver) :: ast
  def analyze(ast, resolver \\ nil)

  # Block nodes need schema lookup to determine type
  def analyze({:block, meta, [relation, inner]}, resolver) when is_atom(relation) do
    case resolve_field(resolver, relation) do
      %{kind: kind, resolver: nested_resolver}
      when kind in [:has_many, :has_one, :belongs_to, :embeds_one, :embeds_many] ->
        analyzed_inner = analyze(inner, nested_resolver)
        {node_type, cardinality} = relation_to_node(kind)
        {node_type, Keyword.merge(meta, cardinality: cardinality), [relation, analyzed_inner]}

      nil ->
        # Unknown relation, keep as block for adapter to handle
        analyzed_inner = analyze(inner, nil)
        {:block, meta, [relation, analyzed_inner]}
    end
  end

  # Binary operators - recursively analyze both sides
  def analyze({op, meta, [left, right]}, resolver) when op in [:and, :or] do
    {op, meta, [analyze(left, resolver), analyze(right, resolver)]}
  end

  # Unary operators - recursively analyze inner
  def analyze({:not, meta, inner}, resolver) do
    {:not, meta, analyze(inner, resolver)}
  end

  # Comparison operators - coerce values based on field type
  def analyze({op, meta, [field, value]}, resolver)
      when op in [:==, :!=, :contains, :starts_with, :ends_with, :>, :<, :>=, :<=] and
             is_atom(field) do
    coerced_value = coerce_value(resolver, field, value)
    {op, meta, [field, coerced_value]}
  end

  # :in operator with list values
  def analyze({:in, meta, [field, values]}, resolver)
      when is_atom(field) and is_list(values) do
    coerced_values = Enum.map(values, &coerce_value(resolver, field, &1))
    {:in, meta, [field, coerced_values]}
  end

  # :in operator with single value
  def analyze({:in, meta, [field, value]}, resolver)
      when is_atom(field) do
    coerced_value = coerce_value(resolver, field, value)
    {:in, meta, [field, coerced_value]}
  end

  # :between operator with two values
  def analyze({:between, meta, [field, start_val, end_val]}, resolver)
      when is_atom(field) do
    coerced_start = coerce_value(resolver, field, start_val)
    coerced_end = coerce_value(resolver, field, end_val)
    {:between, meta, [field, coerced_start, coerced_end]}
  end

  # Path-based comparison operators (e.g., items.name:foo where items is has_many)
  # Transforms to EXISTS node if first segment is a has_many relation
  def analyze({op, meta, [path, value]}, resolver)
      when op in [:==, :!=, :contains, :starts_with, :ends_with] and is_list(path) do
    analyze_path(op, meta, path, value, resolver)
  end

  # Path-based :in operator with list values (e.g., items.name:[a, b])
  def analyze({:in, meta, [path, values]}, resolver)
      when is_list(path) and is_list(values) do
    analyze_path(:in, meta, path, values, resolver)
  end

  # Pass through unknown nodes unchanged
  def analyze(other, _resolver), do: other

  @doc """
  Creates a resolver function for an Ecto schema module.

  The schema must have `__schema__/2` support for associations, embeds, and types.

  ## Example

      resolver = Analyzer.ecto_resolver(MyApp.ItemSchema)
      Analyzer.analyze(ast, resolver)

  """
  @spec ecto_resolver(module()) :: resolver
  def ecto_resolver(schema) when is_atom(schema) do
    fn field ->
      cond do
        # Check for associations first
        assoc = schema.__schema__(:association, field) ->
          kind = assoc_kind(assoc)
          %{kind: kind, resolver: ecto_resolver(assoc.related)}

        # Check for embeds
        embed = schema.__schema__(:embed, field) ->
          kind = embed_kind(embed)
          %{kind: kind, resolver: ecto_resolver(embed.related)}

        # Check for typed fields
        type = schema.__schema__(:type, field) ->
          %{kind: :field, type: normalize_type(type)}

        # Unknown field
        true ->
          nil
      end
    end
  end

  # Analyzes a path-based expression, transforming to EXISTS if first segment is has_many
  defp analyze_path(op, meta, [first_segment | rest], value, resolver) do
    case resolve_field(resolver, first_segment) do
      %{kind: :has_many, resolver: nested_resolver} ->
        # Transform to EXISTS node with inner expression using remaining path
        inner = build_inner_expr(op, rest, value)
        analyzed_inner = analyze(inner, nested_resolver)
        {:exists, [cardinality: :many], [first_segment, analyzed_inner]}

      %{kind: kind, resolver: _nested_resolver}
      when kind in [:has_one, :belongs_to] ->
        # Keep as path - JOINs are correct for :one cardinality
        # Note: value coercion for nested paths deferred to adapter
        {op, meta, [[first_segment | rest], value]}

      %{kind: kind, resolver: _nested_resolver}
      when kind in [:embeds_many, :embeds_one] ->
        # Transform to EMBEDDED node
        inner = build_inner_expr(op, rest, value)
        cardinality = if kind == :embeds_many, do: :many, else: :one
        {:embedded, [cardinality: cardinality], [first_segment, inner]}

      nil ->
        # Unknown relation - leave as-is for adapter to handle
        {op, meta, [[first_segment | rest], value]}
    end
  end

  # Build inner expression from remaining path segments
  defp build_inner_expr(op, [field], value) when is_atom(field) do
    # Single remaining segment - simple field expression
    {op, [], [field, value]}
  end

  defp build_inner_expr(op, path, value) when is_list(path) do
    # Multiple remaining segments - nested path (will be handled recursively)
    {op, [], [path, value]}
  end

  # Determine association kind from Ecto association struct
  defp assoc_kind(%{cardinality: :many}), do: :has_many
  defp assoc_kind(%{cardinality: :one, owner_key: key}) when key != nil, do: :belongs_to
  defp assoc_kind(%{cardinality: :one}), do: :has_one

  # Determine embed kind from Ecto embed struct
  defp embed_kind(%{cardinality: :many}), do: :embeds_many
  defp embed_kind(%{cardinality: :one}), do: :embeds_one

  # Normalize Ecto types to simple atoms
  defp normalize_type({:parameterized, {Ecto.Enum, _}}), do: :string
  defp normalize_type({:parameterized, _}), do: :string
  defp normalize_type({:array, _}), do: :array
  defp normalize_type({:map, _}), do: :map
  defp normalize_type(type) when is_atom(type), do: type
  defp normalize_type(_), do: nil

  # Maps relation kind to node type and cardinality
  defp relation_to_node(:has_many), do: {:exists, :many}
  defp relation_to_node(:has_one), do: {:join, :one}
  defp relation_to_node(:belongs_to), do: {:join, :one}
  defp relation_to_node(:embeds_many), do: {:embedded, :many}
  defp relation_to_node(:embeds_one), do: {:embedded, :one}

  # Resolves field info from resolver function
  defp resolve_field(nil, _field), do: nil

  defp resolve_field(resolver, field) when is_function(resolver, 1) do
    case resolver.(field) do
      %{kind: kind} = info
      when kind in [:has_many, :has_one, :belongs_to, :embeds_one, :embeds_many] ->
        info

      %{kind: :field, type: _type} = info ->
        info

      _ ->
        nil
    end
  end

  # Coerces a value based on field type from resolver
  defp coerce_value(nil, _field, value), do: value

  defp coerce_value(resolver, field, value) when is_function(resolver, 1) do
    case resolver.(field) do
      %{kind: :field, type: type} ->
        Coerce.coerce(value, type)

      # Relations or unknown - no coercion
      _ ->
        value
    end
  end
end
