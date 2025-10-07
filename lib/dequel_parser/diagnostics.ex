defmodule Dequel.Parser.Diagnostics do
  @moduledoc """
  Error reporting and diagnostic utilities for the Dequel parser.

  This module provides functions to collect and manage parsing diagnostics,
  including errors and warnings that occur during query parsing.

  Diagnostics are stored in the parser context and can be used to provide
  helpful error messages to users when queries fail to parse.

  ## Diagnostic Format

  Diagnostics are stored as tuples with severity and details:

      {:error, {line, column, message}}

  ## Functions

  - `add/2` - Adds a diagnostic to the parser context
  - `add_diagnostics/6` - Adds specific diagnostics during parsing (used as post-traverse)
  """

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
