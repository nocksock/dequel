defmodule Mix.Tasks.Dql.Integration do
  @shortdoc "Print the Dequel integration guide (for LLM context)"

  @moduledoc """
  Prints the Dequel integration guide to stdout.

  The guide covers backend API endpoints, frontend web component setup,
  and a complete Phoenix implementation example. It's designed to be
  piped into LLM context or saved to a file.

  ## Usage

      mix dql.integration

      # Pipe to clipboard for LLM context
      mix dql.integration | pbcopy

      # Save to a file
      mix dql.integration > DEQUEL_INTEGRATION.md
  """

  use Mix.Task

  @impl true
  def run(_args) do
    path = Application.app_dir(:dequel, "priv/integration.md")

    case File.read(path) do
      {:ok, content} ->
        Mix.shell().info(content)

      {:error, reason} ->
        Mix.raise("Could not read integration guide at #{path}: #{:file.format_error(reason)}")
    end
  end
end
