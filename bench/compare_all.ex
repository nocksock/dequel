defmodule Bench.CompareAll do
  @moduledoc """
  Compare all benchmark results to show performance trends over time.

  Groups results by dataset size and shows chronological comparison.
  """

  @results_dir "bench/results"

  def run(opts \\ []) do
    results = load_all_results()
    size_filter = Keyword.get(opts, :size)

    if Enum.empty?(results) do
      IO.puts("No benchmark results found in #{@results_dir}/")
      :ok
    else
      results_by_size = Enum.group_by(results, & &1.metadata["size"])

      results_by_size =
        if size_filter do
          Map.take(results_by_size, [size_filter])
        else
          results_by_size
        end

      if Enum.empty?(results_by_size) do
        IO.puts("No benchmark results found for size: #{size_filter}")
      else
        Enum.each(results_by_size, fn {size, size_results} ->
          print_size_comparison(size, size_results, opts)
        end)
      end

      :ok
    end
  end

  defp load_all_results do
    Path.wildcard(Path.join(@results_dir, "*.json"))
    |> Enum.map(&load_result/1)
    |> Enum.sort_by(& &1.metadata["timestamp"])
  end

  defp load_result(path) do
    data = path |> File.read!() |> Jason.decode!()

    scenarios =
      data["scenarios"]
      |> Map.new(fn scenario -> {scenario["name"], scenario} end)

    %{
      path: path,
      filename: Path.basename(path),
      metadata: data["metadata"],
      scenarios: scenarios
    }
  end

  defp print_size_comparison(size, results, opts) do
    IO.puts("\n#{String.duplicate("=", 100)}")
    IO.puts("                              BENCHMARK HISTORY: #{String.upcase(to_string(size))} DATASET")
    IO.puts(String.duplicate("=", 100))

    # Print explanation
    sample = List.first(results)
    seed_stats = sample.metadata["seed_stats"]

    IO.puts("""

    Dataset: #{seed_stats["books"]} books, #{seed_stats["authors"]} authors, \
    #{seed_stats["bookstores"]} bookstores, #{seed_stats["reviews"]} reviews
    Metric: queries/sec (higher = faster). Each scenario runs one Ecto query.
    """)

    # Print run info
    IO.puts("Runs (#{length(results)} total):")

    results
    |> Enum.each(fn result ->
      commit = result.metadata["git_commit"] || "unknown"
      timestamp = format_timestamp(result.metadata["timestamp"])
      seed = get_seed(result.metadata)
      IO.puts("  #{commit} @ #{timestamp} (seed: #{seed})")
    end)

    IO.puts("")

    # Get all scenarios across all runs
    all_scenarios =
      results
      |> Enum.flat_map(fn r -> Map.keys(r.scenarios) end)
      |> Enum.uniq()
      |> Enum.sort()

    # Print header with commit IDs
    run_headers =
      results
      |> Enum.map(fn r ->
        commit = r.metadata["git_commit"] || "?"
        String.pad_leading(commit, 12)
      end)
      |> Enum.join("")

    IO.puts(String.pad_trailing("Scenario", 40) <> run_headers)
    IO.puts(String.duplicate("-", 40 + length(results) * 12))

    # Print each scenario
    Enum.each(all_scenarios, fn scenario ->
      ips_values =
        Enum.map(results, fn result ->
          get_ips(result.scenarios, scenario)
        end)

      ips_str = format_ips_with_trends(ips_values)

      IO.puts(String.pad_trailing(truncate(scenario, 40), 40) <> ips_str)
    end)

    IO.puts(String.duplicate("=", 100))

    # Print legend and summary
    print_legend()

    if length(results) > 1 do
      print_summary(results, all_scenarios, opts)
    end
  end

  defp print_legend do
    IO.puts("\nColors: \e[42;37m >10% faster \e[0m  \e[32m5-10% faster\e[0m  normal  \e[31m5-10% slower\e[0m  \e[41;37m >10% slower \e[0m")
  end

  defp print_summary(results, scenarios, _opts) do
    first = List.first(results)
    last = List.last(results)

    improvements =
      Enum.count(scenarios, fn s ->
        first_ips = get_ips(first.scenarios, s)
        last_ips = get_ips(last.scenarios, s)
        first_ips > 0 and last_ips > first_ips * 1.05
      end)

    regressions =
      Enum.count(scenarios, fn s ->
        first_ips = get_ips(first.scenarios, s)
        last_ips = get_ips(last.scenarios, s)
        first_ips > 0 and last_ips < first_ips * 0.95
      end)

    unchanged = length(scenarios) - improvements - regressions

    IO.puts("First → Last: #{improvements} faster, #{regressions} slower, #{unchanged} unchanged")
  end

  defp get_ips(scenarios, name) do
    get_in(scenarios, [name, "run_time_data", "statistics", "ips"]) || 0
  end

  defp get_seed(metadata) do
    metadata["seed"] ||
      get_in(metadata, ["seed_stats", "seed"]) ||
      "?"
  end

  defp format_ips_with_trends(ips_values) do
    ips_values
    |> Enum.with_index()
    |> Enum.map(fn {ips, idx} ->
      prev = if idx > 0, do: Enum.at(ips_values, idx - 1), else: nil
      format_ips_with_trend(ips, prev)
    end)
    |> Enum.join("")
  end

  defp format_ips_with_trend(ips, nil) do
    String.pad_leading(format_ips(ips), 12)
  end

  defp format_ips_with_trend(ips, prev) when ips == 0 or prev == 0 do
    String.pad_leading(format_ips(ips), 12)
  end

  defp format_ips_with_trend(ips, prev) do
    change = (ips - prev) / prev * 100
    padded = String.pad_leading(format_ips(ips), 12)
    colorize(padded, change)
  end

  defp colorize(str, change) do
    cond do
      # Large improvement: green bg, white fg
      change > 10 -> "\e[42;37m#{str}\e[0m"
      # Small improvement: green fg
      change > 5 -> "\e[32m#{str}\e[0m"
      # Large regression: red bg, white fg
      change < -10 -> "\e[41;37m#{str}\e[0m"
      # Small regression: red fg
      change < -5 -> "\e[31m#{str}\e[0m"
      # No significant change
      true -> str
    end
  end

  defp format_ips(ips) when ips == 0, do: "-"

  defp format_ips(ips) when ips >= 1000 do
    "#{Float.round(ips / 1000, 1)}K"
  end

  defp format_ips(ips) do
    "#{round(ips)}"
  end

  defp format_timestamp(nil), do: "unknown"

  defp format_timestamp(iso_string) do
    case DateTime.from_iso8601(iso_string) do
      {:ok, dt, _} -> Calendar.strftime(dt, "%Y-%m-%d %H:%M")
      _ -> iso_string
    end
  end

  defp truncate(string, max_length) do
    if String.length(string) > max_length do
      String.slice(string, 0, max_length - 2) <> ".."
    else
      string
    end
  end
end
