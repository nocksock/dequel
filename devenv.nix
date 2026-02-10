{ pkgs, config, ... }:

{
  # Elixir development
  languages.elixir.enable = true;

  # Node.js for editor
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;
    pnpm.enable = true;
  };

  packages = with pkgs; [
    elixir-ls
    ] ++ lib.optionals stdenv.isLinux [
      # For ExUnit Notifier on Linux.
      libnotify

      # For file_system on Linux.
      inotify-tools
    ] ++ lib.optionals stdenv.isDarwin ([
      # For ExUnit Notifier on macOS.
      terminal-notifier

      # For file_system on macOS.
      darwin.apple_sdk.frameworks.CoreFoundation
      darwin.apple_sdk.frameworks.CoreServices
    ]);

  # PostgreSQL for Ecto tests
  services.postgres = {
    enable = true;
    initialDatabases = [
      { name = "dequel_test"; }
    ];
  };

  env.MIX_ENV = "dev";

  # ===================
  # SETUP TASKS
  # ===================

  tasks."setup:deps" = {
    exec = ''
      echo "Installing Elixir dependencies..."
      mix deps.get

      echo "Installing editor dependencies..."
      cd editor && pnpm install
    '';
    before = [ "devenv:enterShell" ];
    status = ''
      # Skip if deps are already installed
      [ -d deps ] && [ -d editor/node_modules ]
    '';
  };

  tasks."setup:db" = {
    exec = ''
      echo "Running database migrations..."
      MIX_ENV=test mix ecto.create --quiet 2>/dev/null || true
      MIX_ENV=test mix ecto.migrate
    '';
    after = [ "setup:deps" ];
    before = [ "devenv:enterShell" ];
  };

  tasks."setup:demo" = {
    exec = ''
      echo "Setting up demo app..."
      cd demo
      mix deps.get
      mix ecto.create --quiet 2>/dev/null || true
      mix ecto.migrate
      mix run priv/repo/seeds.exs 2>/dev/null || true
      mix assets.setup 2>/dev/null || true
    '';
    after = [ "setup:deps" ];
    status = ''
      # Skip if demo deps are already installed
      [ -d demo/deps ] && [ -f demo/dequel_demo_dev.db ]
    '';
  };

  # ===================
  # TEST TASKS
  # ===================

  tasks."test:elixir" = {
    exec = "MIX_ENV=test mix test $@";
  };

  tasks."test:editor" = {
    exec = "cd editor && pnpm test";
  };

  tasks."test:all" = {
    exec = ''
      devenv tasks run test:elixir
      devenv tasks run test:editor
    '';
  };

  # ===================
  # BUILD TASKS
  # ===================

  tasks."build:editor" = {
    exec = "cd editor && pnpm build";
    execIfModified = [
      "editor/src"
      "editor/package.json"
      "editor/vite.config.ts"
    ];
  };

  tasks."build:assets" = {
    exec = ''
      echo "Copying editor assets to priv/static..."
      mkdir -p priv/static
      cp editor/dist/dequel-editor.js priv/static/
      cp editor/dist/dequel-lang.js priv/static/
      cp editor/dist/style.css priv/static/
      echo "Done!"
    '';
    after = [ "build:editor" ];
  };

  tasks."build:sync-version" = {
    exec = ''
      VERSION=$(grep -m1 'version:' mix.exs | sed 's/.*"\([^"]*\)".*/\1/')
      echo "Syncing version: $VERSION"
      cd editor && npm version "$VERSION" --no-git-tag-version --allow-same-version
    '';
  };

  # ===================
  # DEVELOPMENT PROCESSES
  # ===================

  processes.demo = {
    exec = "mix deps.get --quiet && mix ecto.migrate --quiet && mix phx.server";
    cwd = "demo";
  };

  processes.editor = {
    exec = "pnpm dev";
    cwd = "editor";
  };
}
