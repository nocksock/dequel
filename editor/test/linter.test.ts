import { expect, fixture, html, aTimeout } from '@open-wc/testing';
import { DequelEditorElement } from '../src/element.js';
import { SchemaEffect, Schema } from '../src/editor/completion.js';
import { forceLinting, diagnosticCount } from '@codemirror/lint';

// Ensure the element is registered
import '../src/element.js';

const testSchema: Schema = {
  fields: {
    title: { type: 'string', info: 'Book title' },
    price: { type: 'number', info: 'Book price' },
    published_at: { type: 'date', info: 'Publication date' },
    active: { type: 'boolean', info: 'Is active' },
    genre: { type: 'keyword', info: 'Book genre', values: ['fiction', 'non-fiction', 'mystery', 'sci-fi'] },
    author: { type: 'relationship', schema: 'authors', info: 'Book author' },
  },
};

/**
 * Helper to set schema and force re-linting.
 */
async function setSchemaAndLint(editor: DequelEditorElement, schema: Schema): Promise<void> {
  editor.editor!.dispatch({
    effects: SchemaEffect.of(schema),
  });
  // Small delay to ensure schema effect is applied
  await aTimeout(20);
  // Force the linter to re-run after schema change
  forceLinting(editor.editor!);
  // Wait for async linter to complete
  await aTimeout(100);
}

/**
 * Get the diagnostic count from the editor state.
 */
function getDiagnosticCount(editor: DequelEditorElement): number {
  return diagnosticCount(editor.editor!.state);
}

describe('Linter', () => {
  describe('integration', () => {
    it('shows no diagnostics when schema is not loaded', async () => {
      const el = await fixture(html`
        <dequel-editor
          endpoint="/api/dql"
          name="query"
          value="unknown_field:value"
          collection="books"
        ></dequel-editor>
      `);

      const editor = el as DequelEditorElement;
      await aTimeout(50);

      // No schema means no validation
      expect(getDiagnosticCount(editor)).to.equal(0);
    });

    it('produces diagnostics for invalid queries when schema is loaded', async () => {
      const el = await fixture(html`
        <dequel-editor
          endpoint="/api/dql"
          name="query"
          value="unknown_field:foo"
          collection="books"
        ></dequel-editor>
      `);

      const editor = el as DequelEditorElement;
      await aTimeout(50);

      // Set schema and force linting
      await setSchemaAndLint(editor, testSchema);

      // Should have at least one diagnostic for unknown field
      expect(getDiagnosticCount(editor)).to.be.greaterThan(0);
    });

    it('produces no diagnostics for valid queries', async () => {
      const el = await fixture(html`
        <dequel-editor
          endpoint="/api/dql"
          name="query"
          value="title:foo"
          collection="books"
        ></dequel-editor>
      `);

      const editor = el as DequelEditorElement;
      await aTimeout(50);

      await setSchemaAndLint(editor, testSchema);

      expect(getDiagnosticCount(editor)).to.equal(0);
    });
  });
});
