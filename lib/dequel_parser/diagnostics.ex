defmodule Dequel.Parser.Diagnostics do
  def add(context, diagnostic) do
    context =
      context
      |> Map.put_new(:diagnostics, [])
      |> Map.update!(:diagnostics, fn dg -> dg ++ diagnostic end)

    context
  end

  def add_diagnostics(rest, [fn_name], context, line, offset, :unknown_function) do
    context =
      context
      |> Map.put_new(:diagnostics, [])
      |> Map.update!(:diagnostics, fn dg ->
        dg ++
          [
            error: {line, offset, "#{fn_name} is not defined"}
          ]
      end)

    {rest, [fn_name], context}
  end
end
