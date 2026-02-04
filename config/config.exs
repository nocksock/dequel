import Config

if config_env() == :bench do
  config :dequel, ecto_repos: [Bench.Repo]
  import_config "bench.exs"
else
  config :dequel, ecto_repos: [Dequel.Adapter.Ecto.Repo]
  import_config "test.exs"
end
