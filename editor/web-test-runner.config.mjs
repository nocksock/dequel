import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';
import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware({
  target: 'http://localhost:4242',
  changeOrigin: true,
});

export default {
  files: 'test/**/*.test.{js,ts}',
  concurrency: 10,
  nodeResolve: true,
  filterBrowserLogs(log) {
    // Suppress "Lit is in dev mode" warning from @open-wc/testing dependency
    // and "Unused rule" warnings from lezer parser
    return !log.args.some(
      (arg) =>
        typeof arg === 'string' &&
        (arg.includes('Lit is in dev mode') || arg.includes('Unused rule'))
    );
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
  plugins: [vitePlugin()],
};
