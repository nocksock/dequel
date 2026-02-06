defmodule Bench.Runner do
  @moduledoc """
  Orchestrates benchmark runs with Benchee.

  ## Usage

      # Run all benchmarks with small dataset
      Bench.Runner.run()

      # Run with specific dataset size
      Bench.Runner.run(:large)

      # Run specific scenario groups
      Bench.Runner.run(:medium, [:simple_equality, :string_matching])
  """

  alias Shared.Seeder
  alias Bench.Output

  @scenario_modules %{
    simple_equality: Bench.Scenarios.SimpleEquality,
    string_matching: Bench.Scenarios.StringMatching,
    relationship: Bench.Scenarios.Relationship,
    block_syntax: Bench.Scenarios.BlockSyntax,
    logical_operators: Bench.Scenarios.LogicalOperators,
    complex_queries: Bench.Scenarios.ComplexQueries
  }

  @results_dir "bench/results"

  def run(size \\ :small, groups \\ :all, opts \\ []) do
    save = Keyword.get(opts, :save, true)
    quiet = Keyword.get(opts, :quiet, false)
    seed = Keyword.get(opts, :seed)
    force = Keyword.get(opts, :force, false)

    commit = git_commit()

    case {save, force, find_existing_result(size, commit)} do
      {true, false, {:ok, existing}} ->
        {:exists, existing, commit}

      _ ->
        do_run(size, groups, seed, commit, save: save, quiet: quiet)
    end
  end

  defp do_run(size, groups, seed, commit, opts) do
    save = Keyword.get(opts, :save, true)
    quiet = Keyword.get(opts, :quiet, false)

    seed_stats = Seeder.seed(size, seed)

    scenarios = collect_scenarios(groups)

    output_path = build_output_path(size)

    formatters = build_formatters(output_path, save: save, quiet: quiet)

    IO.puts("\nRunning #{map_size(scenarios)} benchmark scenarios...")

    Benchee.run(
      scenarios,
      warmup: 2,
      time: 10,
      memory_time: 2,
      formatters: formatters
    )

    if save do
      File.mkdir_p!(Path.dirname(output_path))

      Output.enhance_json(output_path, %{
        size: size,
        seed: seed_stats.seed,
        seed_stats: seed_stats,
        git_commit: commit,
        timestamp: DateTime.utc_now() |> DateTime.to_iso8601()
      })

      IO.puts("\nResults saved to: #{output_path}")
      output_path
    else
      IO.puts("\nBenchmark complete (results not saved)")
      nil
    end
  end

  defp build_formatters(output_path, opts) do
    save = Keyword.get(opts, :save, true)
    quiet = Keyword.get(opts, :quiet, false)

    formatters = []

    formatters =
      if quiet,
        do: formatters,
        else: [{Benchee.Formatters.Console, extended_statistics: true} | formatters]

    formatters =
      if save, do: [{Benchee.Formatters.JSON, file: output_path} | formatters], else: formatters

    formatters
  end

  defp collect_scenarios(:all) do
    all_scenarios()
  end

  defp collect_scenarios(filters) when is_list(filters) do
    all = all_scenarios()

    Enum.flat_map(filters, fn filter ->
      cond do
        # Filter is a group name (e.g., :simple_equality)
        Map.has_key?(@scenario_modules, filter) ->
          @scenario_modules[filter].scenarios()

        # Filter is an individual scenario name (e.g., :simple_author_country)
        Map.has_key?(all, to_string(filter)) ->
          [{to_string(filter), all[to_string(filter)]}]

        true ->
          Mix.raise("Unknown group or scenario: #{filter}\n\nAvailable groups: #{inspect(Map.keys(@scenario_modules))}\nAvailable scenarios: #{inspect(Map.keys(all))}")
      end
    end)
    |> Map.new()
  end

  defp all_scenarios do
    @scenario_modules
    |> Map.values()
    |> Enum.flat_map(& &1.scenarios())
    |> Map.new()
  end

  defp build_output_path(size) do
    timestamp = DateTime.utc_now() |> Calendar.strftime("%Y%m%d_%H%M%S")
    "bench/results/benchmark_#{size}_#{timestamp}.json"
  end

  defp find_existing_result(size, commit) do
    Path.wildcard(Path.join(@results_dir, "*.json"))
    |> Enum.find_value(:none, fn path ->
      with {:ok, content} <- File.read(path),
           {:ok, data} <- Jason.decode(content),
           %{"metadata" => %{"git_commit" => ^commit, "size" => file_size}} <- data,
           true <- to_string(size) == file_size do
        {:ok, path}
      else
        _ -> nil
      end
    end)
  end

  defp git_commit do
    case System.cmd("git", ["rev-parse", "--short", "HEAD"], stderr_to_stdout: true) do
      {commit, 0} -> String.trim(commit)
      _ -> "unknown"
    end
  end
end
