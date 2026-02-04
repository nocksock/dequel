defmodule Mix.Tasks.Bench do
  @shortdoc "Run Dequel benchmarks"

  @moduledoc """
  Run Dequel benchmarks with the bookstore domain.

  ## Usage

      # Run all benchmarks with small dataset
      MIX_ENV=bench mix bench

      # Run with medium dataset
      MIX_ENV=bench mix bench --size medium

      # Run with large dataset
      MIX_ENV=bench mix bench --size large

      # Run specific scenario groups
      MIX_ENV=bench mix bench --groups simple_equality,string_matching

  ## Available groups

  - simple_equality: Basic field equality queries
  - string_matching: contains/starts_with/ends_with predicates
  - relationship: Dot notation path traversal
  - block_syntax: EXISTS subqueries with block syntax
  - logical_operators: AND/OR/NOT combinations
  - complex_queries: Combined complex scenarios

  ## Output

  Results are saved to `bench/results/` as JSON files with timestamps and metadata
  including git commit, Elixir/OTP versions, and dataset statistics.
  """

  use Mix.Task

  @impl true
  def run(args) do
    {opts, _, _} =
      OptionParser.parse(args,
        strict: [size: :string, groups: :string]
      )

    size = (opts[:size] || "small") |> String.to_existing_atom()

    groups =
      case opts[:groups] do
        nil -> :all
        str -> str |> String.split(",") |> Enum.map(&String.to_existing_atom/1)
      end

    Mix.Task.run("app.start")
    {:ok, _} = Bench.Repo.start_link()

    File.mkdir_p!("bench/results")

    Bench.Runner.run(size, groups)
  end
end

defmodule Mix.Tasks.Bench.Compare do
  @shortdoc "Compare two benchmark runs"

  @moduledoc """
  Compare two benchmark JSON files to identify performance changes.

  ## Usage

      MIX_ENV=bench mix bench.compare bench/results/before.json bench/results/after.json

  The comparison shows:
  - Average execution time for each scenario
  - Percentage change between runs
  - Color-coded status (green = faster, red = regression)
  """

  use Mix.Task

  @impl true
  def run([before_path, after_path]) do
    Mix.Task.run("app.start")
    Bench.Compare.run(before_path, after_path)
  end

  def run(_) do
    Mix.shell().error("Usage: mix bench.compare <before.json> <after.json>")
  end
end
