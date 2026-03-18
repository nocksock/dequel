defmodule Dequel.Preloads do
  @moduledoc """
  Extracts required preloads from a Dequel query.

  Walks the AST and collects all relation references (dot notation and block syntax),
  returning an Ecto-compatible preload list.

  ## Examples

  Dot notation:

      iex> Dequel.preloads("author.name:Tolkien")
      [:author]

  Nested dot notation:

      iex> Dequel.preloads("author.publisher.name:Penguin")
      [author: :publisher]

  Block syntax:

      iex> Dequel.preloads("tags{name:fiction}")
      [:tags]

  """

  @doc """
  Extracts preloads from a query string or parsed AST.

  Returns a list of preloads in Ecto-compatible format.

  ## Examples

      iex> Dequel.Preloads.extract("author.name:Tolkien")
      [:author]

      iex> Dequel.Preloads.extract("author.publisher.name:Penguin")
      [author: :publisher]

      iex> Dequel.Preloads.extract("tags{name:fiction}")
      [:tags]

      iex> Dequel.Preloads.extract("title:Rings")
      []

      iex> Dequel.Preloads.extract("")
      []

  """
  @spec extract(binary() | tuple()) :: list()
  def extract(input) when is_binary(input) do
    if String.trim(input) == "" do
      []
    else
      input
      |> Dequel.Parser.parse!()
      |> extract()
    end
  end

  def extract(ast) when is_tuple(ast) do
    ast
    |> collect_preloads([])
    |> Enum.uniq()
    |> merge_nested_preloads()
  end

  def extract(_), do: []

  # Block syntax: relation { ... } - collect the relation name
  defp collect_preloads({:block, _meta, [relation, inner]}, acc) do
    relation_atom = to_atom(relation)
    inner_preloads = collect_preloads(inner, [])

    preload =
      if inner_preloads == [] do
        relation_atom
      else
        {relation_atom, merge_nested_preloads(inner_preloads)}
      end

    [preload | acc]
  end

  # Semantic nodes: :exists, :join, :embedded - same handling as block
  defp collect_preloads({node_type, _meta, [relation, inner]}, acc)
       when node_type in [:exists, :join, :embedded] do
    relation_atom = to_atom(relation)
    inner_preloads = collect_preloads(inner, [])

    preload =
      if inner_preloads == [] do
        relation_atom
      else
        {relation_atom, merge_nested_preloads(inner_preloads)}
      end

    [preload | acc]
  end

  # Path-based fields: [:author, :country] or ["author", "country"]
  defp collect_preloads({_op, _meta, [path, _value]}, acc) when is_list(path) do
    case path do
      [_first | [_ | _] = _rest] ->
        # Convert path to nested preload format
        preload = path_to_preload(path)
        [preload | acc]

      _ ->
        acc
    end
  end

  # Binary operators - recurse into both sides
  defp collect_preloads({op, _meta, [left, right]}, acc) when op in [:and, :or] do
    acc
    |> collect_preloads(left, acc)
    |> collect_preloads(right, acc)
  end

  # Unary not - recurse into inner
  defp collect_preloads({:not, _meta, inner}, acc) do
    collect_preloads(inner, acc)
  end

  # Simple field expressions - no preloads needed
  defp collect_preloads({_op, _meta, [_field, _value]}, acc), do: acc

  # Between with 3 args
  defp collect_preloads({:between, _meta, [field, _start, _end]}, acc) when is_list(field) do
    case field do
      [_first | [_ | _] = _rest] ->
        preload = path_to_preload(field)
        [preload | acc]

      _ ->
        acc
    end
  end

  defp collect_preloads({:between, _meta, _args}, acc), do: acc

  # Catch-all for other nodes
  defp collect_preloads(_node, acc), do: acc

  # Helper for binary ops to properly accumulate
  defp collect_preloads(acc, node, _base_acc) do
    collect_preloads(node, acc)
  end

  # Convert a path list to Ecto nested preload format
  # [:author, :publisher, :name] -> [author: :publisher]
  # (the final field :name is not a relation, so we drop it)
  defp path_to_preload([first | rest]) do
    first_atom = to_atom(first)

    case rest do
      [_single] ->
        # [:author, :name] -> :author
        first_atom

      [second | more] ->
        # [:author, :publisher, :name] -> {author: :publisher} (drop :name)
        nested = path_to_preload([second | more])
        {first_atom, nested}

      [] ->
        first_atom
    end
  end

  # Merge nested preloads into a consolidated list
  # e.g., [:author, {:author, :publisher}] -> [author: :publisher]
  defp merge_nested_preloads(preloads) do
    preloads
    |> Enum.reduce(%{}, &merge_preload/2)
    |> preload_map_to_list()
  end

  defp merge_preload(preload, acc) when is_atom(preload) do
    Map.update(acc, preload, nil, fn existing -> existing end)
  end

  defp merge_preload({key, value}, acc) when is_atom(key) do
    Map.update(acc, key, value, fn
      nil ->
        value

      existing when is_atom(existing) ->
        [existing, value] |> List.flatten() |> merge_nested_preloads()

      existing when is_list(existing) ->
        merge_nested_preloads([value | existing])

      existing ->
        merge_nested_preloads([existing, value])
    end)
  end

  defp merge_preload(preload, acc) when is_list(preload) do
    Enum.reduce(preload, acc, &merge_preload/2)
  end

  defp preload_map_to_list(map) do
    Enum.map(map, fn
      {key, nil} -> key
      {key, value} when is_atom(value) -> {key, value}
      {key, value} when is_list(value) -> {key, value}
      {key, value} -> {key, value}
    end)
  end

  defp to_atom(value) when is_atom(value), do: value
  defp to_atom(value) when is_binary(value), do: String.to_atom(value)
end
