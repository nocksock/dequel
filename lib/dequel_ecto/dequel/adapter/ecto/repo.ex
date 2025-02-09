defmodule Dequel.Adapter.Ecto.Repo do
  use Ecto.Repo,
    otp_app: :dequel,
    # TODO: Should this be configurable?
    adapter: Ecto.Adapters.SQLite3
end
