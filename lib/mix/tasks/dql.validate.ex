defmodule Mix.Tasks.Dql.Validate do
  @shortdoc "Validate a Dequel query string"

  @moduledoc """
  Validate a Dequel query string and optionally output the AST.

  ## Usage

      mix dql.validate "name:foo"
      mix dql.validate "name:*bar status:active"
      mix dql.validate --ast "items { name:ring }"

  ## Options

    * `--ast` - Output the parsed AST (untyped)

  ## Examples

      $ mix dql.validate "name:foo"
      Valid query.

      $ mix dql.validate --ast "name:foo"
      Valid query.
      AST: {:==, [], [:name, "foo"]}

      $ mix dql.validate "name:"
      Invalid query: ...
  """

  use Mix.Task

  @impl true
  def run(args) do
    {opts, rest, _} =
      OptionParser.parse(args,
        strict: [ast: :boolean]
      )

    query =
      case rest do
        [q] -> q
        [] -> Mix.raise("Usage: mix dql.validate [--ast] \"<query>\"")
        _ -> Mix.raise("Expected a single query string argument")
      end

    case Dequel.Parser.parse!(query) do
      {:error, %{message: message, line: line, column: column}} ->
        Mix.shell().error("Invalid query at line #{line}, column #{column}: #{message}")

      ast ->
        Mix.shell().info("Valid query.")

        if opts[:ast] do
          Mix.shell().info("AST: #{inspect(ast, pretty: true)}")
        end
    end
  end
end
