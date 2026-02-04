defmodule Dequel.MixProject do
  use Mix.Project

  def project do
    [
      name: "Dequel",
      app: :dequel,
      version: "0.3.1",
      elixir: "~> 1.0",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      package: package(),
      elixirc_paths: elixirc_paths(Mix.env()),
      source_url: "https://github.com/nocksock/dequel",
      docs: [
        extras: [
          "README.md"
        ]
      ]
    ]
  end

  def application do
    [
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  defp elixirc_paths(:test),
    do: ["lib", "test/support", "test/dequel_ecto/support", "test/dequel_ets/support"]

  defp elixirc_paths(:bench),
    do: ["lib", "bench"]

  defp elixirc_paths(_), do: ["lib"]

  defp deps do
    [
      {:nimble_parsec, "~> 1.4"},
      {:jason, "~> 1.2"},
      {:ex_doc, "~> 0.31", only: :dev, runtime: false},
      {:credo, "~> 1.7", only: [:dev, :test], runtime: false},
      {:telemetry, "~> 1.3"},
      {:ecto_sql, "~> 3.10"},
      {:ecto_sqlite3, "~> 0.16"},
      {:benchee, "~> 1.3", only: :bench},
      {:benchee_json, "~> 1.0", only: :bench}
    ]
  end

  defp package() do
    [
      description: "friendly query language for user input built on Ecto",
      licenses: ["MIT"],
      links: %{
        "Github" => "https://github.com/nocksock/dequel"
      }
    ]
  end
end
