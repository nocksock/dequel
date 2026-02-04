import Config

config :dequel, Bench.Repo,
  database: "bench.db",
  pool_size: 1,
  priv: "priv/bench_repo"

config :logger, level: :warning
