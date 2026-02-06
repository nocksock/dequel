# dequel-editor

A CodeMirror 6-based editor for [Dequel](https://github.com/nocksock/dequel), a human-friendly query language.

## Installation

```bash
npm install dequel-editor
# or
pnpm add dequel-editor
```

## Usage

### Web Component (Full Bundle)

The simplest way to use the editor - just import and use the custom element:

```html
<script type="module">
  import 'dequel-editor'
</script>

<dequel-editor
  id="my-editor"
  name="query"
  endpoint="/api/completions"
></dequel-editor>
```

Don't forget to include the styles:

```html
<link rel="stylesheet" href="node_modules/dequel-editor/dist/style.css">
```

Or import in your JavaScript:

```javascript
import 'dequel-editor'
import 'dequel-editor/style.css'
```

### Language Plugin Only

If you already have CodeMirror in your app and just want the Dequel language support:

```javascript
import { DequelLang } from 'dequel-editor/lang'
import { EditorView, basicSetup } from 'codemirror'

new EditorView({
  extensions: [basicSetup, DequelLang()],
  parent: document.getElementById('editor'),
})
```

This export externalizes CodeMirror dependencies for better tree-shaking.

### Phoenix/Elixir Integration

If you're using the [dequel](https://hex.pm/packages/dequel) Hex package:

```javascript
// In assets/js/app.js
import "../../deps/dequel/priv/static/dequel-editor.js"
```

## Web Component API

### Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | Yes | Form field name |
| `endpoint` | Yes | URL for query preview/validation |
| `autocompletions` | No | URL for field schema (enables autocomplete) |
| `suggestions` | No | URL for query suggestions widget |
| `value` | No | Initial query value |
| `locale` | No | Locale for i18n (default: auto-detect) |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `input` | `string` | Fired when query changes |

### Form Integration

The editor is a form-associated custom element:

```html
<form>
  <dequel-editor name="query" endpoint="/api/preview"></dequel-editor>
  <button type="submit">Search</button>
</form>
```

Press `Ctrl+Enter` (or `Cmd+Enter` on Mac) to submit the form.

## API Endpoints

The editor expects endpoints to return JSON in specific formats:

### Completion Schema (`autocompletions` attribute)

```json
{
  "fields": [
    {
      "name": "status",
      "title": "Status",
      "description": "Filter by item status",
      "type": "string",
      "values": ["active", "inactive", "pending"]
    }
  ]
}
```

### Query Preview (`endpoint` attribute)

The endpoint receives the query and should return validation/preview results.

## License

MIT
