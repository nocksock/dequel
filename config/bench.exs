import Config

config :dequel, Shared.Repo,
  database: "bench.db",
  pool_size: 1,
  priv: "priv/shared_repo"

config :logger, level: :warning
