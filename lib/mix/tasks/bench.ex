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
      MIX_ENV=bench mix bench --only simple_equality,string_matching

      # Run individual scenarios
      MIX_ENV=bench mix bench --only simple_author_country
      MIX_ENV=bench mix bench --only simple_author_country,simple_book_title

      # Skip saving JSON results
      MIX_ENV=bench mix bench --only block_syntax --no-save

      # Suppress console output (quiet mode)
      MIX_ENV=bench mix bench --size large --quiet

      # Run with specific seed for reproducibility
      MIX_ENV=bench mix bench --seed 12345 --only block_syntax

      # Overwrite existing results for current commit
      MIX_ENV=bench mix bench --force

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
        strict: [
          size: :string,
          groups: :string,
          only: :string,
          save: :boolean,
          quiet: :boolean,
          seed: :integer,
          force: :boolean
        ],
        aliases: [o: :only, q: :quiet, s: :seed, f: :force]
      )

    size =
      (opts[:size] || "small")
      |> String.to_atom()

    # --only is an alias for --groups
    groups =
      case opts[:only] || opts[:groups] do
        nil -> :all
        str -> str |> String.split(",") |> Enum.map(&String.to_atom/1)
      end

    save = Keyword.get(opts, :save, true)
    quiet = Keyword.get(opts, :quiet, false)
    seed = Keyword.get(opts, :seed)
    force = Keyword.get(opts, :force, false)

    Mix.Task.run("app.start")
    {:ok, _} = Bench.Repo.start_link()

    File.mkdir_p!("bench/results")

    run_opts = [save: save, quiet: quiet, seed: seed, force: force]

    case Bench.Runner.run(size, groups, run_opts) do
      {:exists, existing_path, commit} ->
        Mix.shell().info("Benchmark results already exist for commit #{commit}:")
        Mix.shell().info("  #{existing_path}")

        if Mix.shell().yes?("Overwrite?") do
          File.rm!(existing_path)
          Bench.Runner.run(size, groups, Keyword.put(run_opts, :force, true))
        else
          Mix.shell().info("Aborted.")
        end

      _result ->
        :ok
    end
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

defmodule Mix.Tasks.Bench.History do
  @shortdoc "Show benchmark history across all runs"

  @moduledoc """
  Compare all benchmark results to show performance trends over time.

  ## Usage

      # Show history for all dataset sizes
      MIX_ENV=bench mix bench.history

      # Show history for specific dataset size
      MIX_ENV=bench mix bench.history --size large

  Groups results by dataset size and displays:
  - Chronological list of benchmark runs with commit and timestamp
  - Execution times for each scenario across all runs
  - Trend indicators (↑ faster, ↓ slower, → stable)
  - Summary of improvements/regressions from first to last run
  """

  use Mix.Task

  @impl true
  def run(args) do
    {opts, _, _} =
      OptionParser.parse(args,
        strict: [size: :string],
        aliases: [s: :size]
      )

    size = if opts[:size], do: opts[:size], else: nil

    Mix.Task.run("app.start")
    Bench.CompareAll.run(size: size)
  end
end
