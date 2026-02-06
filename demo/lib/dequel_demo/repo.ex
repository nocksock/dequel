defmodule DequelDemo.Repo do
  use Ecto.Repo,
    otp_app: :dequel_demo,
    adapter: Ecto.Adapters.SQLite3
end
