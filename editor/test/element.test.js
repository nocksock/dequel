import { fixture, expect, html, aTimeout, oneEvent } from '@open-wc/testing';
import { DequelEditorElement } from '../src/element.ts';

// Ensure the element is registered
import '../src/element.ts';

describe('DequelEditorElement', () => {
  describe('registration', () => {
    it('is defined as a custom element', () => {
      expect(customElements.get('dequel-editor')).to.equal(DequelEditorElement);
    });

    it('has form-associated flag set', () => {
      expect(DequelEditorElement.formAssociated).to.be.true;
    });

    it('observes the correct attributes', () => {
      expect(DequelEditorElement.observedAttributes).to.deep.equal([
        'value',
        'autocompletions',
        'suggestions',
        'locale',
        'collection',
      ]);
    });
  });

  describe('rendering', () => {
    it('renders with shadow DOM', async () => {
      const el = await fixture(html`
        <dequel-editor endpoint="/api/dql" name="query" collection="books"></dequel-editor>
      `);

      expect(el.shadowRoot).to.exist;
    });

    it('creates a CodeMirror editor in shadow DOM', async () => {
      const el = await fixture(html`
        <dequel-editor endpoint="/api/dql" name="query" collection="books"></dequel-editor>
      `);

      // CodeMirror creates a .cm-editor element
      const cmEditor = el.shadowRoot.querySelector('.cm-editor');
      expect(cmEditor).to.exist;
    });

    it('renders with initial value', async () => {
      const el = await fixture(html`
        <dequel-editor
          endpoint="/api/dql"
          name="query"
          value="status:active"
        ></dequel-editor>
      `);

      expect(el.value).to.equal('status:active');
    });
  });

  describe('value property', () => {
    it('gets and sets value', async () => {
      const el = await fixture(html`
        <dequel-editor endpoint="/api/dql" name="query" collection="books"></dequel-editor>
      `);

      el.value = 'name:"test"';
      expect(el.value).to.equal('name:"test"');
    });

    it('reflects value attribute to property', async () => {
      const el = await fixture(html`
        <dequel-editor
          endpoint="/api/dql"
          name="query"
          value="initial"
        ></dequel-editor>
      `);

      expect(el.value).to.equal('initial');
    });
  });

  describe('form integration', () => {
    it('exposes form property via ElementInternals', async () => {
      const form = await fixture(html`
        <form>
          <dequel-editor
            endpoint="/api/dql"
            name="query"
            value="test"
          ></dequel-editor>
        </form>
      `);

      const editor = form.querySelector('dequel-editor');
      expect(editor.form).to.equal(form);
    });

    it('exposes name property', async () => {
      const el = await fixture(html`
        <dequel-editor endpoint="/api/dql" name="myquery" collection="books"></dequel-editor>
      `);

      expect(el.name).to.equal('myquery');
    });
  });

  describe('events', () => {
    it('dispatches input event on value change', async () => {
      const el = await fixture(html`
        <dequel-editor endpoint="/api/dql" name="query" collection="books"></dequel-editor>
      `);

      // Wait for editor to initialize
      await aTimeout(50);

      // Type into the editor by dispatching to the editor view
      setTimeout(() => {
        el.editor?.dispatch({
          changes: { from: 0, to: el.editor.state.doc.length, insert: 'new value' },
        });
      });

      const event = await oneEvent(el, 'input');
      expect(event.detail).to.equal('new value');
      expect(event.bubbles).to.be.true;
    });
  });

  describe('attribute changes', () => {
    it('updates value when attribute changes', async () => {
      const el = await fixture(html`
        <dequel-editor endpoint="/api/dql" name="query" value="initial"></dequel-editor>
      `);

      el.setAttribute('value', 'updated');
      expect(el.value).to.equal('updated');
    });
  });
});
