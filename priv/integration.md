# Dequel Editor Integration Guide

This guide explains how to integrate the Dequel editor web component into your application.

## Overview

Dequel provides a CodeMirror-based query editor as a web component (`<dequel-editor>`) that requires backend API endpoints for schema and suggestion data. The editor supports autocompletion, syntax highlighting, and relationship path resolution.

## Installation

### Frontend (npm/pnpm)

```bash
pnpm add dequel-editor
# or
npm install dequel-editor
```

### Backend (Elixir/Phoenix)

Add to `mix.exs`:

```elixir
defp deps do
  [
    {:dequel, "~> 0.6"}
  ]
end
```

## Backend API Endpoints

The editor expects two JSON API endpoints per collection:

### 1. Schema Endpoint

**GET** `{endpoint}/{collection}/schema`

Returns field definitions for autocompletion.

**Response format:**

```json
{
  "fields": [
    {
      "label": "title",
      "type": "string",
      "info": "Book title"
    },
    {
      "label": "price",
      "type": "number",
      "info": "Book price"
    },
    {
      "label": "genre",
      "type": "keyword",
      "info": "Book genre"
    },
    {
      "label": "author",
      "type": "relationship",
      "target": "authors",
      "info": "Book author"
    },
    {
      "label": "reviews",
      "type": "relationship",
      "target": "reviews",
      "cardinality": "many",
      "info": "Book reviews"
    }
  ],
  "values": {
    "genre": ["fiction", "non-fiction", "mystery", "sci-fi"]
  }
}
```

**Field properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | yes | Field name shown in autocomplete |
| `type` | string | yes | One of: `string`, `number`, `keyword`, `uuid`, `relationship` |
| `info` | string | no | Description shown in autocomplete tooltip |
| `target` | string | no | For relationships: target collection name |
| `cardinality` | string | no | For relationships: `"one"` or `"many"` |

**`values` object:** Maps field names to arrays of allowed values (for keyword/enum fields).

### 2. Suggestions Endpoint

**GET** `{endpoint}/{collection}/suggestions`

Returns contextual suggestions shown below the editor.

**Response format:**

```json
{
  "*": {
    "title": "Filter books",
    "values": [
      {
        "label": "title:",
        "action": { "type": "append", "value": "title:" },
        "description": "Filter by title"
      },
      {
        "label": "genre:",
        "action": { "type": "append", "value": "genre:" },
        "description": "Filter by genre"
      }
    ]
  },
  "genre": {
    "title": "Filter by genre",
    "type": "keyword",
    "values": [
      {
        "label": "fiction",
        "action": { "type": "setPredicate", "value": "\"|\"" },
        "description": "Fiction books"
      }
    ]
  },
  "title": {
    "title": "Filter by title",
    "type": "text"
  }
}
```

**Keys:**
- `"*"` - Fallback suggestions when cursor is not in a recognized field context
- `"field_name"` - Field-specific suggestions when cursor is in that field's value position

**Field configuration properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | string | no | Section title shown above suggestions |
| `description` | string | no | Additional description text |
| `type` | string | no | Field type: `text`, `keyword`, `uuid`, or `date` (determines available predicates) |
| `values` | array | no | Array of value suggestions |

**Value suggestion properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | yes | Display text for the suggestion |
| `description` | string | no | Additional description text |
| `action` | object | yes | Action to perform when suggestion is clicked |

**Action types:**

| Type | Description | Properties |
|------|-------------|------------|
| `setPredicate` | Replace the current field's predicate value | `value`: New predicate with `\|` marking cursor position |
| `append` | Append text to the end of the query | `value`: Text to append |
| `insert` | Insert text at a specific position | `value`: Text to insert<br>`position`: `"cursor"` or `"end"` |

**Cursor positioning:**

Use the pipe character `|` in action values to mark where the cursor should be positioned after the action:

```json
{
  "action": { "type": "setPredicate", "value": "\"|\"" }
}
```

This places the cursor between the quotes, ready for the user to type.

## Phoenix Implementation Example

### Router

```elixir
# lib/my_app_web/router.ex
scope "/api/dql", MyAppWeb do
  pipe_through :api

  get "/:collection/schema", DqlController, :schema
  get "/:collection/suggestions", DqlController, :suggestions
end
```

### Controller

```elixir
# lib/my_app_web/controllers/dql_controller.ex
defmodule MyAppWeb.DqlController do
  use MyAppWeb, :controller

  @schemas %{
    "books" => %{
      fields: [
        %{label: "title", type: "string", info: "Book title"},
        %{label: "isbn", type: "string", info: "ISBN identifier"},
        %{label: "price", type: "number", info: "Book price"},
        %{label: "genre", type: "keyword", info: "Book genre"},
        %{label: "author", type: "relationship", target: "authors", info: "Book author"}
      ],
      values: %{
        "genre" => ["fiction", "non-fiction", "mystery", "sci-fi", "fantasy"]
      }
    },
    "authors" => %{
      fields: [
        %{label: "name", type: "string", info: "Author name"},
        %{label: "bio", type: "string", info: "Author biography"},
        %{label: "country", type: "string", info: "Country of origin"}
      ]
    }
  }

  def schema(conn, %{"collection" => collection}) do
    case Map.fetch(@schemas, collection) do
      {:ok, schema} -> json(conn, schema)
      :error ->
        conn
        |> put_status(400)
        |> json(%{error: "Unknown collection: #{collection}"})
    end
  end

  def suggestions(conn, %{"collection" => _collection}) do
    # Return suggestions based on collection
    json(conn, %{
      "*" => %{
        title: "Start typing to filter",
        values: []
      }
    })
  end
end
```

## Frontend Integration

### HTML Usage

```html
<!-- Load the editor script -->
<script type="module" src="path/to/dequel-editor.js"></script>

<!-- Use the web component -->
<form action="/search" method="get">
  <dequel-editor
    id="query-editor"
    name="query"
    endpoint="/api/dql"
    collection="books"
  ></dequel-editor>

  <!-- Optional: suggestions panel -->
  <dequel-suggestions for="query-editor"></dequel-suggestions>

  <button type="submit">Search</button>
</form>
```

### Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | yes | Form field name |
| `endpoint` | yes | Base URL for API endpoints (e.g., `/api/dql`) |
| `collection` | yes | Current collection name (e.g., `books`) |
| `value` | no | Initial query value |
| `locale` | no | Locale for i18n (e.g., `de`) |

### Suggestions Panel

The editor can optionally render contextual suggestions into a separate element using the `<dequel-suggestions>` component:

```html
<dequel-editor id="my-editor" name="query" endpoint="/api/dql" collection="books"></dequel-editor>
<dequel-suggestions for="my-editor"></dequel-suggestions>
```

The `for` attribute links the suggestions panel to the editor by matching the editor's `id` attribute.

**Note:** Currently, any HTML element with a `for` attribute will work as the suggestions container, but `<dequel-suggestions>` will become a dedicated web component in a future release.

### Changing Collection Dynamically

```javascript
// Update collection when selector changes
document.getElementById("collection-select").addEventListener("change", (e) => {
  document.getElementById("query-editor").setAttribute("collection", e.target.value);
});
```

### Events

The editor dispatches an `input` event on value changes:

```javascript
document.getElementById("query-editor").addEventListener("input", (e) => {
  console.log("Query changed:", e.detail);
});
```

### Form Submission

The editor is form-associated. Use `Ctrl+Enter` (or `Cmd+Enter` on Mac) to submit the parent form.

## Relationship Path Autocompletion

When a field has `type: "relationship"` with a `target`, the editor enables dotted path autocompletion:

1. User types `author.`
2. Editor fetches schema for `authors` collection
3. Autocomplete shows fields from the related schema

This works for arbitrarily nested paths (e.g., `author.publisher.location`).

**Requirements:**
- Each relationship field must have `target` set to a valid collection name
- Each target collection must have its own schema endpoint

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="/assets/dequel-editor.js"></script>
  <style>
    dequel-editor {
      display: block;
      border: 1px solid #ccc;
      border-radius: 4px;
      min-height: 60px;
    }
  </style>
</head>
<body>
  <form action="/search" method="get">
    <label for="collection">Collection:</label>
    <select id="collection" name="collection">
      <option value="books">Books</option>
      <option value="authors">Authors</option>
    </select>

    <label for="editor">Query:</label>
    <dequel-editor
      id="editor"
      name="query"
      endpoint="/api/dql"
      collection="books"
    ></dequel-editor>

    <!-- Optional: Suggestions panel -->
    <dequel-suggestions for="editor"></dequel-suggestions>

    <button type="submit">Search</button>
  </form>

  <script>
    document.getElementById("collection").addEventListener("change", (e) => {
      document.getElementById("editor").setAttribute("collection", e.target.value);
    });
  </script>
</body>
</html>
```

## Troubleshooting

### Autocompletion not working
- Verify the schema endpoint returns valid JSON with a `fields` array
- Check browser console for network errors
- Ensure `endpoint` and `collection` attributes are set

### Relationship paths not resolving
- Verify the relationship field has `type: "relationship"` and `target` set
- Ensure the target collection has its own schema endpoint
- Check that the target collection name matches exactly

### Editor not rendering
- Ensure the script is loaded with `type="module"`
- Check that the custom element is registered (`customElements.get('dequel-editor')`)
