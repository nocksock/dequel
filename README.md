# Dequel 

Dequel (DQL, Data Query Language) is a human-friendly query language that feels familiar to anyone who has used search filters on sites like GitHub, Discord, or Gmail.

```dequel
# Find blog posts about Elixir from 2024
tags:*"elixir" created:>(2024-01-01)

# Find high-priority tasks assigned to Sarah
priority:"high" assignee:"sarah" status:!="completed"

# Complex filtering using AND/OR logic
(category:"frontend" || category:"design") status:"pending"
```

## Features

- Simple `field:value` filtering that users already know from search interfaces
- Support for quoted strings, numeric comparisons, and date ranges
- Rich string matching with contains (*), starts_with (^), and ends_with ($)
- Logical operators (AND/OR) with grouping 
- Automatic handling of relationships and joins
- Extensible through adapters 
- Ecto adapter included

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed
by adding `dequel_parser` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:dequel_parser, "~> 0.1.0"}
  ]
end
```

## Getting Started

```elixir
# Parse a query string into an AST
{:ok, ast} = Dequel.parse("status:active priority:>2")

# Use with Ecto
query = Post |> Dequel.Ecto.filter("tags:*elixir created:>(2024-01-01)")
posts = Repo.all(query)

# Compatible with Ecto's composition API:
user_input = "title:contains(css, html)"
from(Content, where: ^Dequel.where(user_input))
|> where(:status, "published") # include only published content
|> where(:user_id, ^current_user.id) # limit to what a user is allowed to see
|> Repo.all()

```

## Why Dequel?

Dequel provides a query interface that's powerful enough for developers but approachable for end users. It's ideal for:

- Adding flexible search/filter interfaces to web applications
- Building dynamic content collections
- Creating data-driven features without exposing SQL complexity
- Provide domain-specific search predicates

## License
MIT
