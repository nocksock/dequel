defmodule Bench.Compare do
  @moduledoc """
  Compare two benchmark runs to identify performance changes.

  ## Usage

      Bench.Compare.run("bench/results/before.json", "bench/results/after.json")
  """

  def run(before_path, after_path) do
    before = load_results(before_path)
    after_results = load_results(after_path)

    print_header(before, after_results)
    print_comparison(before, after_results)

    :ok
  end

  defp print_header(before, after_results) do
    IO.puts("\n#{String.duplicate("=", 85)}")
    IO.puts("                           BENCHMARK COMPARISON")
    IO.puts(String.duplicate("=", 85))
    IO.puts("Before: #{before.metadata["git_commit"]} (#{before.metadata["timestamp"]})")
    IO.puts("After:  #{after_results.metadata["git_commit"]} (#{after_results.metadata["timestamp"]})")
    IO.puts("Dataset size: #{before.metadata["size"]}")
    IO.puts(String.duplicate("-", 85))
  end

  defp print_comparison(before, after_results) do
    scenarios = Map.keys(before.scenarios) |> Enum.sort()

    header =
      String.pad_trailing("Scenario", 35) <>
        String.pad_leading("Before (ms)", 15) <>
        String.pad_leading("After (ms)", 15) <>
        String.pad_leading("Change", 12) <>
        String.pad_leading("Status", 10)

    IO.puts(header)
    IO.puts(String.duplicate("-", 85))

    Enum.each(scenarios, fn scenario ->
      before_avg = get_average(before.scenarios, scenario)
      after_avg = get_average(after_results.scenarios, scenario)

      {change, status} = calculate_change(before_avg, after_avg)

      row =
        String.pad_trailing(truncate(scenario, 35), 35) <>
          String.pad_leading(format_ms(before_avg), 15) <>
          String.pad_leading(format_ms(after_avg), 15) <>
          String.pad_leading(format_change(change), 12) <>
          String.pad_leading(status, 10)

      IO.puts(row)
    end)

    IO.puts(String.duplicate("=", 85))
    print_summary(before, after_results, scenarios)
  end

  defp print_summary(before, after_results, scenarios) do
    improvements =
      Enum.count(scenarios, fn s ->
        before_avg = get_average(before.scenarios, s)
        after_avg = get_average(after_results.scenarios, s)
        after_avg < before_avg * 0.95
      end)

    regressions =
      Enum.count(scenarios, fn s ->
        before_avg = get_average(before.scenarios, s)
        after_avg = get_average(after_results.scenarios, s)
        after_avg > before_avg * 1.05
      end)

    IO.puts("\nSummary: #{improvements} improvements, #{regressions} regressions, #{length(scenarios) - improvements - regressions} unchanged")
  end

  defp get_average(scenarios, name) do
    get_in(scenarios, [name, "run_time_data", "statistics", "average"]) || 0
  end

  defp calculate_change(before_avg, after_avg) when before_avg > 0 do
    change = (after_avg - before_avg) / before_avg * 100

    status =
      cond do
        change > 5 -> "\e[31mREGRESS\e[0m"
        change < -5 -> "\e[32mFASTER\e[0m"
        true -> "-"
      end

    {change, status}
  end

  defp calculate_change(_, _), do: {0.0, "-"}

  defp format_ms(nanoseconds) do
    ms = nanoseconds / 1_000_000
    :erlang.float_to_binary(ms, decimals: 2)
  end

  defp format_change(change) do
    sign = if change >= 0, do: "+", else: ""
    "#{sign}#{:erlang.float_to_binary(change, decimals: 1)}%"
  end

  defp truncate(string, max_length) do
    if String.length(string) > max_length do
      String.slice(string, 0, max_length - 2) <> ".."
    else
      string
    end
  end

  defp load_results(path) do
    data = path |> File.read!() |> Jason.decode!()

    scenarios =
      data["scenarios"]
      |> Map.new(fn scenario -> {scenario["name"], scenario} end)

    %{
      metadata: data["metadata"],
      scenarios: scenarios
    }
  end
end
