import Config

config :dequel, Dequel.Adapter.Ecto.Repo,
  username: "postgres",
  password: "postgres",
  database: "myapp_test.db",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
