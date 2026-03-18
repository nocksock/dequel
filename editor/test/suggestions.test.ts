import { fixture, expect, html, aTimeout } from '@open-wc/testing';
import { DequelEditorElement } from '../src/element.js';
import { SuggestionSchemaEffect, SuggestionsAPIResponse } from '../src/editor/suggestions/suggestions.js';

// Ensure the element is registered
import '../src/element.js';

const sampleSuggestions: SuggestionsAPIResponse = {
  '*': {
    title: 'Filter books',
    values: [
      { label: 'title:', description: 'Filter by title', action: { type: 'append', value: 'title:' } },
      { label: 'genre:', description: 'Filter by genre', action: { type: 'append', value: 'genre:' } },
    ],
  },
  title: {
    title: 'Filter by title',
    description: 'Text matching on book titles',
    type: 'text',
  },
  genre: {
    title: 'Filter by genre',
    type: 'keyword',
    values: [
      { label: 'fiction', action: { type: 'setPredicate', value: 'fiction' } },
      { label: 'sci-fi', action: { type: 'setPredicate', value: 'sci-fi' } },
    ],
  },
};

describe('Suggestions', () => {
  describe('target resolution', () => {
    it('finds dequel-suggestions element via for attribute', async () => {
      const container = await fixture(html`
        <div>
          <dequel-editor id="test-ed" endpoint="/api/dql" name="query" collection="books"></dequel-editor>
          <dequel-suggestions for="test-ed"></dequel-suggestions>
        </div>
      `);

      const editor = container.querySelector('dequel-editor') as DequelEditorElement;
      const suggestions = container.querySelector('dequel-suggestions')!;

      // Wait for editor to initialize
      await aTimeout(50);

      // Dispatch suggestion data
      editor.editor!.dispatch({
        effects: SuggestionSchemaEffect.of(sampleSuggestions),
      });

      await aTimeout(50);

      expect(suggestions.innerHTML).to.not.equal('');
    });

    it('finds dequel-suggestions even when a label[for] exists first', async () => {
      const container = await fixture(html`
        <div>
          <label for="test-label-ed">Query</label>
          <dequel-editor id="test-label-ed" endpoint="/api/dql" name="query" collection="books"></dequel-editor>
          <dequel-suggestions for="test-label-ed"></dequel-suggestions>
        </div>
      `);

      const editor = container.querySelector('dequel-editor') as DequelEditorElement;
      const suggestions = container.querySelector('dequel-suggestions')!;
      const label = container.querySelector('label')!;

      await aTimeout(50);

      editor.editor!.dispatch({
        effects: SuggestionSchemaEffect.of(sampleSuggestions),
      });

      await aTimeout(50);

      // Suggestions should render into dequel-suggestions, not the label
      expect(suggestions.innerHTML).to.not.equal('');
      expect(label.querySelector('.card')).to.be.null;
    });

    it('does not crash when no suggestions element exists', async () => {
      const el = await fixture(html`
        <dequel-editor id="no-sug" endpoint="/api/dql" name="query" collection="books"></dequel-editor>
      `);

      const editor = el as DequelEditorElement;
      await aTimeout(50);

      // Should not throw
      editor.editor!.dispatch({
        effects: SuggestionSchemaEffect.of(sampleSuggestions),
      });

      expect(editor.editor).to.exist;
    });
  });

  describe('rendering', () => {
    it('renders the wildcard suggestion title when editor is empty', async () => {
      const container = await fixture(html`
        <div>
          <dequel-editor id="sug-empty" endpoint="/api/dql" name="query" collection="books"></dequel-editor>
          <dequel-suggestions for="sug-empty"></dequel-suggestions>
        </div>
      `);

      const editor = container.querySelector('dequel-editor') as DequelEditorElement;
      const suggestions = container.querySelector('dequel-suggestions')!;

      await aTimeout(50);

      editor.editor!.dispatch({
        effects: SuggestionSchemaEffect.of(sampleSuggestions),
      });

      await aTimeout(50);

      expect(suggestions.textContent).to.contain('Filter books');
    });

    it('renders field-specific suggestions when cursor is on a field', async () => {
      const container = await fixture(html`
        <div>
          <dequel-editor
            id="sug-field"
            endpoint="/api/dql"
            name="query"
            value="title:test"
            collection="books"
          ></dequel-editor>
          <dequel-suggestions for="sug-field"></dequel-suggestions>
        </div>
      `);

      const editor = container.querySelector('dequel-editor') as DequelEditorElement;
      const suggestions = container.querySelector('dequel-suggestions')!;

      await aTimeout(50);

      // Place cursor on the "title" field
      editor.editor!.dispatch({
        selection: { anchor: 3 },
        effects: SuggestionSchemaEffect.of(sampleSuggestions),
      });

      await aTimeout(50);

      expect(suggestions.textContent).to.contain('Filter by title');
    });

    it('renders value suggestions as clickable buttons', async () => {
      const container = await fixture(html`
        <div>
          <dequel-editor id="sug-vals" endpoint="/api/dql" name="query" collection="books"></dequel-editor>
          <dequel-suggestions for="sug-vals"></dequel-suggestions>
        </div>
      `);

      const editor = container.querySelector('dequel-editor') as DequelEditorElement;
      const suggestions = container.querySelector('dequel-suggestions')!;

      await aTimeout(50);

      editor.editor!.dispatch({
        effects: SuggestionSchemaEffect.of(sampleSuggestions),
      });

      await aTimeout(50);

      const buttons = suggestions.querySelectorAll('button');
      expect(buttons.length).to.be.greaterThan(0);
    });

    it('clicking a value suggestion modifies the editor', async () => {
      const container = await fixture(html`
        <div>
          <dequel-editor id="sug-click" endpoint="/api/dql" name="query" collection="books"></dequel-editor>
          <dequel-suggestions for="sug-click"></dequel-suggestions>
        </div>
      `);

      const editor = container.querySelector('dequel-editor') as DequelEditorElement;
      const suggestions = container.querySelector('dequel-suggestions')!;

      await aTimeout(50);

      editor.editor!.dispatch({
        effects: SuggestionSchemaEffect.of(sampleSuggestions),
      });

      await aTimeout(50);

      const docBefore = editor.editor!.state.doc.toString();
      const firstButton = suggestions.querySelector('button');
      expect(firstButton).to.exist;

      firstButton!.click();
      await aTimeout(50);

      const docAfter = editor.editor!.state.doc.toString();
      expect(docAfter).to.not.equal(docBefore);
    });
  });
});
