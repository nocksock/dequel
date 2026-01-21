import { ModuleNode, defineConfig } from 'vite'
// import react from "@vitejs/plugin-react";
import preact from '@preact/preset-vite'

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

export default defineConfig(() => {
  return {
    plugins: [preact(), fullReloadAlways],
    build: {
      target: ['esnext'],
      lib: {
        entry: resolve(__dirname, './src/main.tsx'),
        name: 'DequelEditor',
        fileName: 'element',
      },
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
