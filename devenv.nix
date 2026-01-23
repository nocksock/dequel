{ pkgs, ... }:

{
  # Elixir development
  languages.elixir.enable = true;

  # Language server
  packages = [
    pkgs.elixir-ls
  ];

  # PostgreSQL for Ecto tests
  services.postgres = {
    enable = true;
    initialDatabases = [
      { name = "dequel_test"; }
    ];
  };

  # Environment variables
  env.MIX_ENV = "dev";

  # Scripts for common tasks
  scripts.test.exec = "MIX_ENV=test mix test $@";
}
