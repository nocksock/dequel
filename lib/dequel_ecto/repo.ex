defmodule Dequel.Adapter.Ecto.Repo do
  use Ecto.Repo,
    otp_app: :dequel,
    # SQLite3 is the default adapter for Dequel
    adapter: Ecto.Adapters.SQLite3
end
