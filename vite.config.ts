import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Preloads the fonts that paint above the fold (hero headline + body copy) so the
 * condensed display face is ready before first render instead of swapping in late.
 * Fonts are fingerprinted by Vite, so the hashed filenames are looked up in the bundle.
 */
function preloadCriticalFonts(patterns: RegExp[]): Plugin {
  let base = '/';
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return [];
        const files = Object.keys(ctx.bundle);
        return patterns.flatMap((pattern) => {
          const file = files.find((name) => pattern.test(name));
          return file
            ? [
                {
                  tag: 'link',
                  attrs: { rel: 'preload', href: `${base}${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
                  injectTo: 'head' as const,
                },
              ]
            : [];
        });
      },
    },
  };
}

export default defineConfig({
  // Relative base keeps the build portable: it works at a domain root, a sub-path
  // (e.g. GitHub Pages project sites) or straight from a static file host.
  base: './',
  plugins: [
    react(),
    preloadCriticalFonts([/barlow-condensed-800-[\w-]+\.woff2$/, /inter-var-[\w-]+\.woff2$/]),
  ],
  build: {
    target: 'es2022',
    cssMinify: true,
    assetsInlineLimit: 0,
  },
  experimental: {
    // Assets imported from JS (e.g. the logo) get document-relative URLs in both the
    // client and prerender builds, so the static HTML and the hydrated page agree
    // and sub-path hosting keeps working. CSS/HTML keep Vite's relative handling.
    renderBuiltUrl(filename, { hostType }) {
      return hostType === 'js' ? `./${filename}` : { relative: true };
    },
  },
});
