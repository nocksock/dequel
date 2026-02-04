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

  alias Bench.Seeder
  alias Bench.Output

  @scenario_modules %{
    simple_equality: Bench.Scenarios.SimpleEquality,
    string_matching: Bench.Scenarios.StringMatching,
    relationship: Bench.Scenarios.Relationship,
    block_syntax: Bench.Scenarios.BlockSyntax,
    logical_operators: Bench.Scenarios.LogicalOperators,
    complex_queries: Bench.Scenarios.ComplexQueries
  }

  def run(size \\ :small, groups \\ :all) do
    seed_stats = Seeder.seed(size)

    scenarios = collect_scenarios(groups)

    output_path = build_output_path(size)
    File.mkdir_p!(Path.dirname(output_path))

    IO.puts("\nRunning #{map_size(scenarios)} benchmark scenarios...")

    Benchee.run(
      scenarios,
      warmup: 2,
      time: 10,
      memory_time: 2,
      formatters: [
        {Benchee.Formatters.Console, extended_statistics: true},
        {Benchee.Formatters.JSON, file: output_path}
      ]
    )

    Output.enhance_json(output_path, %{
      size: size,
      seed_stats: seed_stats,
      git_commit: git_commit(),
      timestamp: DateTime.utc_now() |> DateTime.to_iso8601()
    })

    IO.puts("\nResults saved to: #{output_path}")
    output_path
  end

  defp collect_scenarios(:all) do
    @scenario_modules
    |> Map.values()
    |> Enum.flat_map(& &1.scenarios())
    |> Map.new()
  end

  defp collect_scenarios(groups) when is_list(groups) do
    groups
    |> Enum.map(&Map.fetch!(@scenario_modules, &1))
    |> Enum.flat_map(& &1.scenarios())
    |> Map.new()
  end

  defp build_output_path(size) do
    timestamp = DateTime.utc_now() |> Calendar.strftime("%Y%m%d_%H%M%S")
    "bench/results/benchmark_#{size}_#{timestamp}.json"
  end

  defp git_commit do
    case System.cmd("git", ["rev-parse", "--short", "HEAD"], stderr_to_stdout: true) do
      {commit, 0} -> String.trim(commit)
      _ -> "unknown"
    end
  end
end
