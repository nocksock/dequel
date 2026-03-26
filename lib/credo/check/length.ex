defmodule Credo.Check.Readability.Length do
  use Credo.Check,
    base_priority: :high,
    category: :readability,
    param_defaults: [max_line_count: 20, ignore_comments: true],
    explanations: [
      check: """
      Functions should not exceed a maximum number of lines.

      Long functions are harder to read, test, and maintain. If a function grows
      beyond the allowed line count, consider extracting helper functions.
      """,
      params: [
        max_line_count: "The maximum number of lines a function body should have.",
        ignore_comments: "Whether to ignore comment lines when counting."
      ]
    ]

  alias Credo.Check.Context

  import Context, only: [put_issue: 2]

  @def_ops [:def, :defp]

  @doc false
  @impl true
  def run(%SourceFile{} = source_file, params) do
    ctx = Context.build(source_file, params, __MODULE__)
    result = Credo.Code.prewalk(source_file, &walk(&1, &2), ctx)
    result.issues
  end

  defp walk({op, meta, _} = ast, ctx) when op in @def_ops do
    name = fun_name(ast)
    issue = check_length(ast, meta, name, op, ctx)
    {ast, put_issue(ctx, issue)}
  end

  defp walk(ast, ctx), do: {ast, ctx}

  defp fun_name({_op, _meta, [{:when, _, [{name, _, _} | _]} | _]}), do: name
  defp fun_name({_op, _meta, [{name, _, _} | _]}), do: name

  defp check_length(ast, meta, name, op, ctx) do
    %{max_line_count: max, ignore_comments: ignore_comments} = ctx.params

    count = count_lines(ast, meta, ctx.source_file, ignore_comments)

    if count > max do
      format_issue(ctx,
        message: "Function `#{name}` is too long (#{count} lines, max #{max}).",
        trigger: "#{op}",
        line_no: meta[:line]
      )
    end
  end

  defp count_lines(ast, meta, source_file, ignore_comments) do
    span = Credo.Code.prewalk(ast, &find_max_line_no/2, meta[:line]) - meta[:line]

    source_file
    |> Credo.Code.to_lines()
    |> Enum.slice(meta[:line] - 1, span + 1)
    |> maybe_reject_comments(ignore_comments)
    |> length()
  end

  defp maybe_reject_comments(lines, true) do
    Enum.reject(lines, fn {_line_no, line} -> Regex.match?(~r/^\s*#/, line) end)
  end

  defp maybe_reject_comments(lines, false), do: lines

  defp find_max_line_no({_, meta, _} = ast, max) do
    line_no = meta[:line] || 0
    {ast, max(line_no, max)}
  end

  defp find_max_line_no(ast, max), do: {ast, max}
end
