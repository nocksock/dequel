import Config

config :dequel,
  ecto_repos: [Dequel.Adapter.Ecto.Repo]

import_config "test.exs"
