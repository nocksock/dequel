# Contributing to Dequel

## Prerequisites

This project uses [devenv](https://devenv.sh/) for development environment management. Install it first:

```bash
# Using the official installer
curl -fsSL https://devenv.sh/install.sh | bash

# Or via Nix
nix profile install github:cachix/devenv
```

## Getting Started

```bash
# Enter the development shell (automatically installs dependencies)
devenv shell

# This runs setup:deps and setup:db automatically on first entry
```

## Development Workflow

### Running Tests

```bash
devenv tasks run test:elixir           # Elixir tests only
devenv tasks run test:editor           # TypeScript tests only
devenv tasks run test:all              # All tests

# Pass arguments to Elixir tests
devenv tasks run test:elixir -- test/parser_test.exs
devenv tasks run test:elixir -- test/parser_test.exs:42
```

### Building

```bash
devenv tasks run build:editor          # Build editor (cached if unchanged)
devenv tasks run build:assets          # Build + copy to priv/static
devenv tasks run build:sync-version    # Sync version from mix.exs to editor
```

### Development Servers

```bash
devenv up                              # Start demo + editor dev servers
devenv up demo                         # Demo server only (localhost:4000)
devenv up editor                       # Editor dev server only
```

The demo is a standalone Phoenix LiveView app in `demo/` that provides:
- Interactive query editor with real-time preview
- Sample bookstore database (authors, books, stores, reviews)
- LiveDashboard at `/dev/dashboard`

For manual setup or running outside devenv:

```bash
cd demo
mix setup                              # First time: deps, db, seeds, assets
mix phx.server                         # Start on localhost:4000
```

## Code Style

### Elixir

- Run `mix format` before committing
- CI enforces `mix compile --warnings-as-errors`

### TypeScript

- Run `pnpm lint` in the `editor/` directory
- Strict TypeScript mode is enabled

## Project Structure

```
lib/
├── dequel_parser/     # NimbleParsec parser
├── dequel_ecto/       # Ecto adapter
└── dequel_ets/        # ETS adapter

editor/                # CodeMirror editor (TypeScript)
└── src/

demo/                  # Standalone Phoenix LiveView demo app
├── lib/
│   ├── dequel_demo/           # Bookstore schemas and context
│   └── dequel_demo_web/       # LiveView, router, endpoint
└── priv/repo/                 # Migrations and seeds

test/
├── parser_test.exs    # Parser tests
├── dequel_ecto/       # Ecto adapter tests
└── dequel_ets/        # ETS adapter tests
```

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Run `devenv tasks run test:all` to verify
4. Run `mix format` and `cd editor && pnpm lint`
5. Submit a PR against `main`
