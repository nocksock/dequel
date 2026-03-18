defmodule Bench.Output do
  @moduledoc "Handles benchmark output with metadata enhancement"

  def enhance_json(path, metadata) do
    content = File.read!(path)
    scenarios_list = Jason.decode!(content)

    seed_stats =
      metadata.seed_stats
      |> Enum.map(fn {k, v} -> {to_string(k), v} end)
      |> Map.new()

    # Strip large sample arrays to reduce file size
    scenarios =
      scenarios_list
      |> Enum.map(fn scenario ->
        scenario
        |> Map.update("run_time_data", %{}, fn rtd ->
          Map.put(rtd, "samples", [])
        end)
        |> Map.update("memory_usage_data", %{}, fn mud ->
          Map.put(mud, "samples", [])
        end)
      end)

    enhanced = %{
      "scenarios" => scenarios,
      "metadata" => %{
        "size" => to_string(metadata.size),
        "seed_stats" => seed_stats,
        "git_commit" => metadata.git_commit,
        "timestamp" => metadata.timestamp,
        "elixir_version" => System.version(),
        "otp_version" => :erlang.system_info(:otp_release) |> to_string()
      }
    }

    File.write!(path, Jason.encode!(enhanced, pretty: true))
  end
end
