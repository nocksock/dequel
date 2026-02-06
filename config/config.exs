import Config

case config_env() do
  :bench ->
    config :dequel, ecto_repos: [Shared.Repo]
    import_config "bench.exs"

  _ ->
    config :dequel, ecto_repos: [Dequel.Adapter.Ecto.Repo]
    import_config "test.exs"
end
