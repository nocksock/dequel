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

  @doc """
  Build a complete Ecto.Query with joins applied for relationship filtering.
  Returns a query that can be passed to Repo.all/one/etc.
  """
  @spec query(String.t(), Ecto.Query.t(), keyword()) :: Ecto.Query.t()
  def query(input, base_query, opts \\ []) when is_binary(input) do
    ast = Dequel.Parser.parse!(input)
    {dynamic_expr, ctx} = filter(ast, Context.new())

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
    build_filter(ast, ctx)
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
  def where(input) when is_binary(input) do
    input
    |> Dequel.Parser.parse!()
    |> where()
  end

  def where([]), do: dynamic(true)

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
