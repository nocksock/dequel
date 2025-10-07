defmodule Dequel.Adapter.Ecto.Repo do
  @moduledoc """
  Ecto repository for Dequel testing and development.

  This repository is used internally for testing the Ecto adapter functionality.
  It's configured to use SQLite3 as the database adapter.

  ## Configuration

  The repository is configured in `config/test.exs`:

      config :dequel, Dequel.Adapter.Ecto.Repo,
        database: "myapp_test.db",
        pool: Ecto.Adapters.SQL.Sandbox

  ## Usage in Tests

  This repo is primarily used in the test suite to verify that Dequel queries
  are correctly translated to SQL and executed against a real database.

      # In tests
      alias Dequel.Adapter.Ecto.Repo

      Repo.all(from(Post, where: ^Dequel.where("status:published")))

  ## Note

  This is a test/development repository. Production applications should use
  their own Ecto repositories and call `Dequel.where/1` to generate dynamic
  query expressions that work with any Ecto repository.
  """

  use Ecto.Repo,
    otp_app: :dequel,
    # TODO: Should this be configurable?
    adapter: Ecto.Adapters.SQLite3
end
