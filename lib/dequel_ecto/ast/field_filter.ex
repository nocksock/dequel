defmodule Dequel.Adapter.Ecto.Filter do
  @moduledoc """
  Ecto adapter for Dequel queries. Converts parsed AST to Ecto dynamic queries.

  ## Relational Query Handling

  Relational queries like `author.name:Tolkien` are handled in three steps:

  ### 1. Path Detection & Join Tracking

  When `build_filter` receives an AST node with a path (list of atoms like
  `[:author, :name]`), it calls `Context.ensure_joins/2` to register the needed
  joins. The path is split: `[:author]` becomes the join path, `:name` is the
  field to filter on. The context returns a binding name like `:join_author`.

  ### 2. Dynamic Expression with Named Binding

  The `build_dynamic` functions create Ecto dynamic expressions that reference
  the joined table via named binding:

      dynamic([{^binding, x}], field(x, ^field) == ^value)

  The `[{^binding, x}]` syntax binds `x` to the table with that alias.

  ### 3. Query Assembly

  The `query/3` function assembles everything:

  1. Wraps base query with `:q` alias via `ensure_base_alias/1`
  2. Applies LEFT JOINs in dependency order via `apply_joins/2`
  3. Adds the WHERE clause with the dynamic expression
  4. Optionally adds preloads

  ## Example Flow

  For query `"author.name:Tolkien"`:

  1. Parser produces: `{:==, [], [[:author, :name], "Tolkien"]}`
  2. `Context.ensure_joins/2` registers join for `[:author]` → returns `:join_author`
  3. `build_dynamic/4` creates: `dynamic([{:join_author, x}], field(x, :name) == "Tolkien")`
  4. `apply_joins/2` adds: `join(:left, [{:q, p}], a in assoc(p, :author), as: :join_author)`
  5. Final query filters on the joined author's name field
  """

  import Ecto.Query

  alias Dequel.Query.Context
  alias Dequel.Semantic.Analyzer

  @doc """
  Build a complete Ecto.Query with joins applied for relationship filtering.
  Returns a query that can be passed to Repo.all/one/etc.

  ## Options

    * `:schema` - Schema module for semantic analysis (enables block syntax like `items { name:foo }`)
    * `:preload` - Preloads to apply to the query

  """
  @spec query(Ecto.Query.t(), String.t(), keyword()) :: Ecto.Query.t()
  def query(base_query, input, opts \\ []) when is_binary(input) do
    ast = Dequel.Parser.parse!(input)
    schema = Keyword.get(opts, :schema)
    {dynamic_expr, ctx} = filter(ast, Context.new(schema))

    # Ensure the base query has the :q alias for join references
    base_query
    |> ensure_base_alias()
    |> apply_joins(Context.ordered_joins(ctx))
    |> where(^dynamic_expr)
    |> maybe_preload(ctx, opts)
  end

  # Adds the :q alias to the base query if not already present
  defp ensure_base_alias(query) do
    from(q in query, as: :q)
  end

  @doc """
  Build filter with join tracking. Returns {dynamic, context}.
  """
  @spec filter(term()) :: {Ecto.Query.dynamic_expr(), Context.t()}
  def filter(input) when is_binary(input) do
    input |> Dequel.Parser.parse!() |> filter(Context.new())
  end

  def filter(ast), do: filter(ast, Context.new())

  @spec filter(term(), Context.t()) :: {Ecto.Query.dynamic_expr(), Context.t()}
  def filter(ast, ctx) do
    # Run semantic analysis if schema is available
    analyzed_ast =
      if ctx.schema do
        resolver = Analyzer.ecto_resolver(ctx.schema)
        Analyzer.analyze(ast, resolver)
      else
        ast
      end

    build_filter(analyzed_ast, ctx)
  end

  # IN clause - simple field
  defp build_filter({:in, [], [field, values]}, ctx) when is_atom(field) do
    {dynamic([schema], field(schema, ^field) in ^values), ctx}
  end

  # IN clause - relationship path
  defp build_filter({:in, [], [path, values]}, ctx) when is_list(path) do
    {binding, ctx} = Context.ensure_joins(ctx, path)
    field_name = List.last(path)
    {dynamic([{^binding, x}], field(x, ^field_name) in ^values), ctx}
  end

  # Simple field - use base binding
  defp build_filter({op, [], [field, value]}, ctx) when is_atom(field) do
    {where({op, [], [field, value]}), ctx}
  end

  # Simple field with options (e.g., case-insensitive flag)
  defp build_filter({op, [], [field, value, opts]}, ctx) when is_atom(field) do
    {where({op, [], [field, value, opts]}), ctx}
  end

  # Relationship path - track joins, build dynamic with named binding
  defp build_filter({op, [], [path, value]}, ctx) when is_list(path) do
    {binding, ctx} = Context.ensure_joins(ctx, path)
    field_name = List.last(path)
    dynamic_expr = build_dynamic(op, binding, field_name, value)
    {dynamic_expr, ctx}
  end

  # Relationship path with options
  defp build_filter({op, [], [path, value, _opts]}, ctx) when is_list(path) do
    {binding, ctx} = Context.ensure_joins(ctx, path)
    field_name = List.last(path)
    dynamic_expr = build_dynamic(op, binding, field_name, value)
    {dynamic_expr, ctx}
  end

  # Logical AND
  defp build_filter({:and, [], [lhs, rhs]}, ctx) do
    {l, ctx} = build_filter(lhs, ctx)
    {r, ctx} = build_filter(rhs, ctx)
    {dynamic(^l and ^r), ctx}
  end

  # Logical OR
  defp build_filter({:or, [], [lhs, rhs]}, ctx) do
    {l, ctx} = build_filter(lhs, ctx)
    {r, ctx} = build_filter(rhs, ctx)
    {dynamic(^l or ^r), ctx}
  end

  # Negation
  defp build_filter({:not, [], expr}, ctx) do
    {d, ctx} = build_filter(expr, ctx)
    {dynamic(not (^d)), ctx}
  end

  # EXISTS - has_many relations (block syntax)
  # Generates: EXISTS (SELECT 1 FROM related WHERE fk = parent.id AND inner_conditions)
  defp build_filter({:exists, _meta, [relation, inner]}, ctx) when is_atom(relation) do
    # Get association info from schema
    schema = ctx.schema

    if schema do
      assoc = schema.__schema__(:association, relation)
      related_schema = assoc.related
      owner_key = assoc.owner_key
      related_key = assoc.related_key

      # Build inner filter with fresh context for the subquery
      inner_ctx = Context.new(related_schema)
      {inner_dynamic, _inner_ctx} = build_filter(inner, inner_ctx)

      # Build EXISTS subquery using parent_as to reference the outer query
      # The subquery correlates via the foreign key relationship
      subquery_dynamic =
        build_exists_dynamic(related_schema, related_key, owner_key, inner_dynamic)

      {subquery_dynamic, ctx}
    else
      raise ArgumentError,
            "Cannot process :exists node without schema context. " <>
              "Provide schema via Context.new(schema) or use block syntax with schema option."
    end
  end

  # JOIN - belongs_to/has_one relations (block syntax)
  # Uses LEFT JOIN semantics similar to existing relationship path handling
  defp build_filter({:join, _meta, [relation, inner]}, ctx) when is_atom(relation) do
    # Register join for this relation
    {binding, ctx} = Context.ensure_joins(ctx, [relation, :_placeholder])

    # Replace binding to point to the actual relation, not a field within it
    # We need to process inner filters with this binding
    inner_ctx = %{ctx | schema: get_related_schema(ctx.schema, relation)}

    # Build inner filter - it will use the join binding
    {inner_dynamic, inner_ctx} = build_filter_with_binding(inner, inner_ctx, binding)

    # Merge any new joins from inner
    {inner_dynamic, %{ctx | joins: inner_ctx.joins}}
  end

  # EMBEDDED - embeds_one/embeds_many
  # Uses JSON field access for embedded schemas
  defp build_filter({:embedded, meta, [field, inner]}, ctx) when is_atom(field) do
    cardinality = Keyword.get(meta, :cardinality, :one)
    {build_embedded_dynamic(field, inner, cardinality), ctx}
  end

  # Helper to build EXISTS dynamic - works around macro expansion issues
  defp build_exists_dynamic(related_schema, related_key, owner_key, inner_dynamic) do
    # Build the subquery that references the parent via parent_as(:q)
    subq =
      related_schema
      |> where([r], field(r, ^related_key) == field(parent_as(:q), ^owner_key))
      |> where([r], ^inner_dynamic)

    dynamic([q], exists(subq))
  end

  # Build dynamic with named binding for relationship fields
  defp build_dynamic(:==, binding, field, value) do
    dynamic([{^binding, x}], field(x, ^field) == ^value)
  end

  defp build_dynamic(:contains, binding, field, value) do
    dynamic([{^binding, x}], fragment("? LIKE ?", field(x, ^field), ^"%#{value}%"))
  end

  defp build_dynamic(:starts_with, binding, field, value) do
    escaped = String.replace(value, "%", "\\%")
    dynamic([{^binding, x}], fragment("? LIKE ?", field(x, ^field), ^"#{escaped}%"))
  end

  defp build_dynamic(:ends_with, binding, field, value) do
    dynamic([{^binding, x}], fragment("? LIKE ?", field(x, ^field), ^"%#{value}"))
  end

  # Build filter with explicit binding for join relations
  defp build_filter_with_binding({op, [], [field, value]}, ctx, binding) when is_atom(field) do
    dynamic_expr = build_dynamic(op, binding, field, value)
    {dynamic_expr, ctx}
  end

  defp build_filter_with_binding({:and, [], [lhs, rhs]}, ctx, binding) do
    {l, ctx} = build_filter_with_binding(lhs, ctx, binding)
    {r, ctx} = build_filter_with_binding(rhs, ctx, binding)
    {dynamic(^l and ^r), ctx}
  end

  defp build_filter_with_binding({:or, [], [lhs, rhs]}, ctx, binding) do
    {l, ctx} = build_filter_with_binding(lhs, ctx, binding)
    {r, ctx} = build_filter_with_binding(rhs, ctx, binding)
    {dynamic(^l or ^r), ctx}
  end

  defp build_filter_with_binding({:not, [], expr}, ctx, binding) do
    {d, ctx} = build_filter_with_binding(expr, ctx, binding)
    {dynamic(not (^d)), ctx}
  end

  defp get_related_schema(nil, _relation), do: nil

  defp get_related_schema(schema, relation) do
    case schema.__schema__(:association, relation) do
      nil -> nil
      assoc -> assoc.related
    end
  end

  # Build dynamic for embedded schema fields (JSON access)
  defp build_embedded_dynamic(embed_field, {:==, [], [field, value]}, _cardinality) do
    # For PostgreSQL: field->'nested_field' = 'value'
    # Using jsonb operators
    field_str = to_string(field)
    dynamic([q], fragment("?->? = ?", field(q, ^embed_field), ^field_str, ^value))
  end

  defp build_embedded_dynamic(embed_field, {:contains, [], [field, value]}, _cardinality) do
    field_str = to_string(field)

    dynamic(
      [q],
      fragment("?->>? LIKE ?", field(q, ^embed_field), ^field_str, ^"%#{value}%")
    )
  end

  defp build_embedded_dynamic(embed_field, {:starts_with, [], [field, value]}, _cardinality) do
    field_str = to_string(field)
    escaped = String.replace(value, "%", "\\%")

    dynamic(
      [q],
      fragment("?->>? LIKE ?", field(q, ^embed_field), ^field_str, ^"#{escaped}%")
    )
  end

  defp build_embedded_dynamic(embed_field, {:ends_with, [], [field, value]}, _cardinality) do
    field_str = to_string(field)

    dynamic(
      [q],
      fragment("?->>? LIKE ?", field(q, ^embed_field), ^field_str, ^"%#{value}")
    )
  end

  defp build_embedded_dynamic(embed_field, {:and, [], [lhs, rhs]}, cardinality) do
    l = build_embedded_dynamic(embed_field, lhs, cardinality)
    r = build_embedded_dynamic(embed_field, rhs, cardinality)
    dynamic(^l and ^r)
  end

  defp build_embedded_dynamic(embed_field, {:or, [], [lhs, rhs]}, cardinality) do
    l = build_embedded_dynamic(embed_field, lhs, cardinality)
    r = build_embedded_dynamic(embed_field, rhs, cardinality)
    dynamic(^l or ^r)
  end

  defp build_embedded_dynamic(embed_field, {:not, [], expr}, cardinality) do
    d = build_embedded_dynamic(embed_field, expr, cardinality)
    dynamic(not (^d))
  end

  # Apply joins in order
  defp apply_joins(query, []), do: query

  defp apply_joins(query, [join | rest]) do
    query
    |> join(:left, [{^join.parent, p}], a in assoc(p, ^join.assoc), as: ^join.binding)
    |> apply_joins(rest)
  end

  # Optional preloading
  defp maybe_preload(query, _ctx, opts) do
    case Keyword.get(opts, :preload) do
      nil -> query
      preloads -> preload(query, ^preloads)
    end
  end

  # Legacy where/1 API for backward compatibility
  def where(""), do: dynamic(true)

  def where(input) when is_binary(input) do
    input
    |> Dequel.Parser.parse!()
    |> where()
  end

  def where([]), do: dynamic(true)

  def where({:in, [], [field, values]}) do
    dynamic([schema], field(schema, ^field) in ^values)
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
    dynamic(
      [schema],
      fragment("? LIKE ?", field(schema, ^field), ^"#{String.replace(value, "%", "\\%")}%")
    )
  end

  def where({:ends_with, [], [field, value]}) do
    dynamic([schema], fragment("? LIKE ?", field(schema, ^field), ^"%#{value}"))
  end

  def where({:contains, [], [field, value]}) do
    dynamic([schema], fragment("? LIKE ?", field(schema, ^field), ^"%#{value}%"))
  end

  def where({:not, [], expression}) do
    dynamic(not (^where(expression)))
  end

  def where({op, [], [field, value]}) do
    raise "Operator `#{op}` not yet implemented. Tried calling `#{field}:#{op}(#{value})`"
  end
end
