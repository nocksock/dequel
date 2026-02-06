# Dequel

Dequel (DQL, Data Query Language) is a human-friendly query language that feels familiar to anyone who has used search filters on sites like GitHub, Discord, or Gmail.

```dequel
# Find posts containing "elixir" in tags
tags:*elixir

# Find high-priority tasks assigned to Sarah
priority:high assignee:sarah !status:completed

# Numeric comparisons and ranges
price:>19.99 quantity:<=100
age:18..65

# Multiple values with OR expansion
category:[frontend, design] status:pending

# Relationship filtering
author.name:Tolkien items { rarity:legendary }
```

## Features

- Simple `field:value` filtering that users already know from search interfaces
- String matching: contains (`*`), starts_with (`^`), ends_with (`$`)
- Numeric comparisons: `>`, `<`, `>=`, `<=`, and range syntax (`10..50`)
- `one_of`/IN predicates with bracket shorthand: `field:[a, b, c]`
- Negation with `!` or `-` prefix
- Logical operators (AND/OR) with grouping
- Relationship filtering via dot notation and block syntax
- Type coercion with schema support (integers, dates, booleans, etc.)
- Ecto and ETS adapters included

See [SYNTAX.md](./SYNTAX.md) for the complete syntax reference.

## Installation

Add `dequel` to your dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:dequel, "~> 0.4.0"}
  ]
end
```

Then run:

```bash
mix deps.get
```

## Usage

### Basic Filtering with Ecto

```elixir
import Ecto.Query
alias Dequel.Adapter.Ecto.Filter

# Simple field filtering
from(p in Post)
|> Filter.query("status:published tags:*elixir")
|> Repo.all()

# Relationship paths (auto-joins)
from(p in Post)
|> Filter.query("author.name:Tolkien")
|> Repo.all()

# Block syntax for has_many/belongs_to (requires schema)
from(a in Author)
|> Filter.query("items { rarity:legendary }", schema: Author)
|> Repo.all()
```

### Composing with Ecto Queries

Use `Dequel.where/1` to get a dynamic expression you can compose:

```elixir
import Ecto.Query

user_input = "title:*ring category:[fantasy, adventure]"

from(c in Content)
|> where(^Dequel.where(user_input))
|> where([c], c.status == "published")
|> where([c], c.user_id == ^current_user.id)
|> Repo.all()
```

### Parsing Queries

```elixir
# Parse a query string into an AST
ast = Dequel.Parser.parse!("status:active name:*frodo")
# => {:and, [], [{:==, [], [:status, "active"]}, {:contains, [], [:name, "frodo"]}]}
```

## Quick Reference

| Syntax                        | Meaning                             |
| ----------------------------- | ----------------------------------- |
| `field:value`                 | Equality                            |
| `field:"some value"`          | Equality (quoted)                   |
| `field:contains(value)`       | Contains                            |
| `field:*value`                | Contains (shorthand)                |
| `field:starts_with(value)`    | Starts with                         |
| `field:^value`                | Starts with (shorthand)             |
| `field:$value`                | Ends with (shorthand)               |
| `field:ends_with(value)`      | Ends with                           |
| `field:one_of(a, b, c)`       | IN                                  |
| `field:[a, b, c]`             | IN (shorthand)                      |
| `field:>18`                   | Greater than                        |
| `field:<100`                  | Less than                           |
| `field:>=0`                   | Greater than or equal               |
| `field:<=99`                  | Less than or equal                  |
| `field:10..50`                | Between (inclusive range)           |
| `field:between(10 50)`        | Between (predicate form)            |
| `!field:value`                | NOT                                 |
| `-field:value`                | NOT (alternate)                     |
| `a:1 b:2`                     | AND (implicit)                      |
| `a:1 or b:2`                  | OR (keyword)                        |
| `( expr )`                    | Grouping                            |
| `rel.field:value`             | Relationship path                   |
| `rel { field_a:1 field_b:2 }` | Block syntax (has_many/belongs_to)  |

Spaces after `:` are allowed. So this works too:

```
last_name: Baggins
first_name: contains(o)
```

## Why Dequel?

Dequel provides a query interface that's powerful enough for developers but approachable for end users. It's ideal for:

- Adding flexible search/filter interfaces to web applications
- Building dynamic content collections
- Creating data-driven features without exposing SQL
- Providing domain-specific search predicates

## License

MIT
