# Dequel Query Language Syntax

Dequel (DQL) is a human-friendly query language inspired by search filters from GitHub, Discord, and Gmail.

## Field Matching

### Basic Equality
```
field:value           # Implicit string
field:"value"         # Explicit string (required for spaces)
field:"value with spaces"
```

### Predicates (String Matching)

**Shorthand syntax:**
```
field:*value          # contains
field:^value          # starts_with
field:$value          # ends_with
```

**Function syntax:**
```
field:contains(value)
field:starts_with(value)
field:ends_with(value)
```

**With quoted values:**
```
field:*"hello world"
field:contains("hello world")
```

### Predicate Flags
Predicates accept optional flags after the value:
```
field:ends_with("foo" i)           # Single flag
field:ends_with("foo" a b c)       # Multiple flags
```

### Multiple Values (OR expansion)
Multiple values in predicates expand to OR:
```
field:contains(foo, bar)           # contains(foo) OR contains(bar)
field:starts_with(a, b, c)         # starts_with(a) OR starts_with(b) OR starts_with(c)
```

With flags per value:
```
field:ends_with("a" i, b x y)      # ends_with("a", i) OR ends_with("b", x, y)
```

### one_of / IN Predicate
```
field:one_of(value)                # Single value → equality
field:one_of(a, b)                 # Multiple values → IN clause
field:one_of(a, b, c, d)           # Any number of values
city:one_of("New York", London)    # Mixed quoted/unquoted
```

**Bracket shorthand:**
```
field:[value]                      # Same as one_of(value)
field:[a, b]                       # Same as one_of(a, b)
city:["New York", London]
```

## Negation

```
!field:value                       # NOT field = value
-field:value                       # Same (minus prefix)
!field:contains(value)             # NOT contains
!field:one_of(a, b)                # NOT IN
```

## Logical Operators

### Implicit AND (whitespace)
```
a:1 b:2                            # a=1 AND b=2
a:1 b:2 c:3                        # a=1 AND (b=2 AND c=3)
```

### Explicit AND
```
a:1 && b:2
a:1 ( b:2 )                        # Parentheses for grouping
```

### OR
```
a:1 || b:2
a:1 or b:2                         # Keyword form
```

### Precedence and Grouping
OR binds tighter within a term; AND separates terms:
```
a:1 || b:2 c:3                     # (a OR b) AND c
a:1 b:2 || c:3                     # a AND (b OR c)
```

Use parentheses for explicit grouping:
```
( a:1 b:2 ) or c:3                 # (a AND b) OR c
a:1 ( b:2 || c:3 )                 # a AND (b OR c)
```

## Relationship Filtering

### Dot Notation (belongs_to / has_one)
```
author.name:Tolkien                # Filter by related field
author.address.city:Shire          # Multi-level path
author.name:*frodo                 # With predicate
!author.name:frodo                 # Negated
```

### Block Syntax (Semantic Relations)
Block syntax provides cleaner relation filtering with full inner expressions.
Requires `schema:` option when using the Ecto adapter.

```
items { name:foo }                 # has_many → EXISTS subquery
author { name:Tolkien }            # belongs_to → LEFT JOIN
```

With predicates:
```
items { name:*ring }               # Contains
items { name:^"the" }              # Starts with
```

Multiple conditions inside block:
```
items { name:foo rarity:legendary }           # AND
items { name:foo || name:bar }                # OR
items { !name:ring }                          # Negation inside block
```

Combined with local fields:
```
title:LOTR items { name:ring }     # Local field AND relation block
bio:*British items { name:LOTR }   # Filter both parent and children
```

Nested blocks:
```
author { books { title:*Ring } }   # Nested relation filtering
```

## Type Coercion (with schema)

When using semantic analysis with a schema, values are automatically coerced:

| Type              | Input                      | Output                     |
|-------------------|----------------------------|----------------------------|
| `:integer`        | `"25"`                     | `25`                       |
| `:float`          | `"3.14"`                   | `3.14`                     |
| `:boolean`        | `"true"/"false"/"1"/"0"`   | `true`/`false`             |
| `:date`           | `"2024-01-15"`             | `~D[2024-01-15]`           |
| `:naive_datetime` | `"2024-01-15T10:30:00"`    | `~N[2024-01-15 10:30:00]`  |
| `:utc_datetime`   | `"2024-01-15T10:30:00Z"`   | `~U[2024-01-15 10:30:00Z]` |
| `:decimal`        | `"19.99"`                  | `Decimal.new("19.99")`     |
| `:string`         | `"foo"`                    | `"foo"` (unchanged)        |

## AST Format

The parser produces AST tuples: `{operator, metadata, args}`

```elixir
# Equality
{:==, [], [:field, "value"]}

# Predicates
{:contains, [], [:field, "value"]}
{:starts_with, [], [:field, "value"]}
{:ends_with, [], [:field, "value"]}

# IN clause
{:in, [], [:field, ["a", "b", "c"]]}

# Logical operators
{:and, [], [left, right]}
{:or, [], [left, right]}
{:not, [], expr}

# Relationship paths
{:==, [], [[:author, :name], "value"]}

# Block (pre-semantic analysis)
{:block, [], [:items, inner_expr]}

# Semantic nodes (post-analysis)
{:exists, [cardinality: :many], [:items, inner_expr]}    # has_many
{:join, [cardinality: :one], [:author, inner_expr]}      # belongs_to/has_one
{:embedded, [cardinality: :one], [:address, inner_expr]} # embeds_one/many
```

## Ecto Adapter Usage

```elixir
# Basic query (no schema needed for simple fields)
from(i in ItemSchema)
|> Filter.query("name:Tolkien")
|> Repo.all()

# With relationship paths (auto-joins)
from(i in ItemSchema)
|> Filter.query("author.name:Tolkien")
|> Repo.all()

# With block syntax (requires schema for semantic analysis)
from(a in AuthorSchema)
|> Filter.query("items { name:ring }", schema: AuthorSchema)
|> Repo.all()

# Combined
from(a in AuthorSchema)
|> Filter.query("bio:*British items { name:LOTR }", schema: AuthorSchema)
|> Repo.all()
```

## Quick Reference

| Syntax                    | Meaning                                      |
|---------------------------|----------------------------------------------|
| `field:value`             | Equality                                     |
| `field:"value"`           | Equality (quoted)                            |
| `field:*value`            | Contains                                     |
| `field:^value`            | Starts with                                  |
| `field:$value`            | Ends with                                    |
| `field:[a, b, c]`         | IN (one_of)                                  |
| `!field:value`            | NOT                                          |
| `-field:value`            | NOT (alternate)                              |
| `a:1 b:2`                 | AND (implicit)                               |
| `a:1 && b:2`              | AND (explicit)                               |
| `a:1 \|\| b:2`            | OR                                           |
| `( expr )`                | Grouping                                     |
| `rel.field:value`         | Relationship path                            |
| `rel { conditions }`      | Block syntax (has_many/belongs_to)           |
