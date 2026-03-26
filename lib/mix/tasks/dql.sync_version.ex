defmodule Mix.Tasks.Dql.SyncVersion do
  @shortdoc "Sync version numbers between mix.exs and editor/package.json"

  @moduledoc """
  Synchronize version numbers across the Dequel project.

  The version in mix.exs is considered the source of truth.
  Running this task will update editor/package.json to match.

  ## Usage

      mix dql.sync_version        # Update editor version to match mix.exs
      mix dql.sync_version --check  # Check if versions are in sync (no changes)

  ## Options

    * `--check` - Only check if versions match, don't modify files. Exits with
      status 1 if versions differ.
    * `--strict` - Require exact version match (including patch). By default,
      only major and minor versions must match.

  ## Examples

      $ mix dql.sync_version
      Syncing version 0.5.0 to editor/package.json

      $ mix dql.sync_version --check
      Versions in sync: 0.5.0 / 0.5.1

      $ mix dql.sync_version --check --strict
      Version mismatch: mix.exs has 0.5.0, editor/package.json has 0.5.1
  """

  use Mix.Task

  @impl true
  def run(args) do
    {opts, _, _} = OptionParser.parse(args, strict: [check: :boolean, strict: :boolean])

    mix_version = Dequel.MixProject.project()[:version]
    package_json_path = Path.join([File.cwd!(), "editor", "package.json"])

    case File.read(package_json_path) do
      {:ok, content} ->
        case Jason.decode(content) do
          {:ok, package} ->
            editor_version = package["version"]
            handle_versions(mix_version, editor_version, package_json_path, content, opts)

          {:error, reason} ->
            Mix.raise("Failed to parse package.json: #{inspect(reason)}")
        end

      {:error, reason} ->
        Mix.raise("Failed to read editor/package.json: #{inspect(reason)}")
    end
  end

  defp handle_versions(mix_version, editor_version, path, content, opts) do
    if versions_match?(mix_version, editor_version, opts[:strict]) do
      Mix.shell().info("Versions in sync: #{mix_version} / #{editor_version}")
    else
      handle_mismatch(mix_version, editor_version, path, content, opts)
    end
  end

  defp handle_mismatch(mix_version, editor_version, _path, _content, check: true) do
    Mix.shell().error(
      "Version mismatch: mix.exs has #{mix_version}, editor/package.json has #{editor_version}"
    )

    Mix.raise("Versions out of sync")
  end

  defp handle_mismatch(mix_version, _editor_version, path, content, _opts) do
    updated_content =
      String.replace(content, ~r/"version":\s*"[^"]+"/, ~s("version": "#{mix_version}"),
        global: false
      )

    case File.write(path, updated_content) do
      :ok -> Mix.shell().info("Synced version #{mix_version} to editor/package.json")
      {:error, reason} -> Mix.raise("Failed to write editor/package.json: #{inspect(reason)}")
    end
  end

  defp versions_match?(v1, v2, true = _strict), do: v1 == v2

  defp versions_match?(v1, v2, _strict) do
    {major1, minor1, _patch1} = parse_version(v1)
    {major2, minor2, _patch2} = parse_version(v2)
    major1 == major2 and minor1 == minor2
  end

  defp parse_version(version) do
    case String.split(version, ".") do
      [major, minor, patch | _] ->
        {String.to_integer(major), String.to_integer(minor), patch}

      [major, minor] ->
        {String.to_integer(major), String.to_integer(minor), "0"}

      _ ->
        Mix.raise("Invalid version format: #{version}")
    end
  end
end
