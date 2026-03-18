import Config

# Configure your database for benchmarking
config :dequel_demo, DequelDemo.Repo,
  database: Path.expand("../dequel_demo_bench.db", __DIR__),
  pool_size: 10

# We don't run a server during benchmarks
config :dequel_demo, DequelDemoWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4003],
  secret_key_base: "Z+tJL/+SoawFo7s2ZNGWVCwQB+mjgHTQN+o3EuO64Z6BrAjmm/pWUTa2GBrknBtu",
  server: false

# Print only warnings and errors during benchmarks
config :logger, level: :warning
