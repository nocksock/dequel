import { esbuildPlugin } from '@web/dev-server-esbuild';
import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware({
  target: 'http://localhost:4000',
  changeOrigin: true,
});

export default {
  files: 'test/**/*.test.{js,ts}',
  concurrency: 10,
  nodeResolve: {
    exportConditions: ['browser', 'import', 'default'],
  },
  middleware: [
    function proxy(ctx, next) {
      if (ctx.url.startsWith('/api/')) {
        return new Promise((resolve) => {
          apiProxy(ctx.req, ctx.res, resolve);
        });
      }
      return next();
    },
  ],
  plugins: [
    esbuildPlugin({
      ts: true,
      tsx: true,
      target: 'auto',
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    }),
    // Redirect axios to its pre-bundled browser-compatible ESM build
    {
      name: 'axios-browser-redirect',
      resolveImport({ source }) {
        if (source === 'axios') {
          return '/node_modules/axios/dist/esm/axios.js';
        }
      },
    },
  ],
};
