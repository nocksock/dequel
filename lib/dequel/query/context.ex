defmodule Dequel.Query.Context do
  @moduledoc """
  Tracks joins and bindings during query building for relationship filtering.

  When building queries with nested field paths like `author.address.city`,
  this module tracks which joins are needed and ensures joins are only
  created once per unique path.
  """

  defstruct [:schema, joins: %{}, preloads: []]

  @type join_info :: %{
          assoc: atom(),
          parent: atom(),
          binding: atom(),
          path: [atom()]
        }

  @type t :: %__MODULE__{
          schema: module() | nil,
          joins: %{[atom()] => join_info()},
          preloads: [[atom()]]
        }

  @doc "Creates a new empty context with optional schema for semantic analysis"
  @spec new(module() | nil) :: t()
  def new(schema \\ nil), do: %__MODULE__{schema: schema}

  @doc """
  Ensures joins exist for a field path, returns {binding, updated_context}.

  For simple fields (atoms) or single-segment paths, returns the base binding :q.
  For multi-segment paths, registers necessary joins and returns the binding
  for the deepest association.
  """
  @spec ensure_joins(t(), atom() | [atom()]) :: {atom(), t()}
  def ensure_joins(ctx, field) when is_atom(field), do: {:q, ctx}
  def ensure_joins(ctx, [_single]), do: {:q, ctx}

  def ensure_joins(ctx, path) when is_list(path) do
    join_path = Enum.drop(path, -1)
    do_ensure_joins(ctx, join_path, [], :q)
  end

  defp do_ensure_joins(ctx, [], _accumulated, parent_binding) do
    {parent_binding, ctx}
  end

  defp do_ensure_joins(ctx, [assoc | rest], accumulated, parent_binding) do
    current_path = accumulated ++ [assoc]

    case Map.get(ctx.joins, current_path) do
      nil ->
        binding = :"join_#{Enum.join(current_path, "_")}"

        join_info = %{
          assoc: assoc,
          parent: parent_binding,
          binding: binding,
          path: current_path
        }

        new_ctx = %{ctx | joins: Map.put(ctx.joins, current_path, join_info)}

        do_ensure_joins(new_ctx, rest, current_path, binding)

      existing ->
        do_ensure_joins(ctx, rest, current_path, existing.binding)
    end
  end

  @doc "Returns joins in dependency order (parent joins first)"
  @spec ordered_joins(t()) :: [join_info()]
  def ordered_joins(%__MODULE__{joins: joins}) do
    joins
    |> Map.values()
    |> Enum.sort_by(&length(&1.path))
  end

  @doc "Adds a preload path to the context"
  @spec add_preload(t(), [atom()]) :: t()
  def add_preload(%__MODULE__{preloads: preloads} = ctx, path) do
    %{ctx | preloads: [path | preloads]}
  end
end
