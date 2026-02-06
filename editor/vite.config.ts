import { ModuleNode, defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite';
import { Plugin } from 'vite'
import { resolve } from 'path'

const fullReloadAlways: Plugin = {
  name: 'full-reload',
  handleHotUpdate({ server, modules, timestamp, file }) {
    // eslint-disable-next-line no-constant-condition
    if (true || file.endsWith('language.ts')) {
      console.log('full reload')
      server.ws.send({ type: 'full-reload' })
      const invalidatedModules = new Set<ModuleNode>()
      for (const mod of modules) {
        server.moduleGraph.invalidateModule(
          mod,
          invalidatedModules,
          timestamp,
          true
        )
      }
    }
    return []
  },
}

// Build mode: 'full' for bundled web component, 'lang' for language plugin only
const buildMode = process.env.BUILD_MODE || 'full'

export default defineConfig(() => {
  const isLangOnly = buildMode === 'lang'

  return {
    plugins: [preact(), fullReloadAlways, tailwindcss()],
    build: {
      target: ['esnext'],
      emptyOutDir: !isLangOnly, // Don't clear dist when building lang (second pass)
      lib: isLangOnly
        ? {
            entry: resolve(__dirname, './src/dequel-lang/index.ts'),
            name: 'DequelLang',
            fileName: 'dequel-lang',
            formats: ['es'],
          }
        : {
            entry: resolve(__dirname, './src/element.ts'),
            name: 'DequelEditor',
            fileName: 'dequel-editor',
            formats: ['es'],
          },
      rollupOptions: isLangOnly
        ? {
            // Externalize CodeMirror deps for lang-only build
            external: [
              /^@codemirror\/.*/,
              /^@lezer\/.*/,
            ],
          }
        : {},
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
  }
})
