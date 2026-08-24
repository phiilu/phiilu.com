import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';
import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel({
    edgeMiddleware: true,
    webAnalytics: {
      enabled: true
    },
    maxDuration: 8
  }),
  site: 'https://phiilu.com',
  integrations: [
    // Must come before mdx() so it can process code blocks in .mdx files.
    expressiveCode({
      themes: ['catppuccin-latte', 'catppuccin-mocha'],
      // The site toggles a `dark` class, so no media query fallback.
      // Latte is the base theme; mocha only takes over under the `dark` class.
      themeCssSelector: (theme) => theme.name === 'catppuccin-mocha' && 'html.dark',
      useDarkModeMediaQuery: false,
      // The post body renders inside a hydrated island, which drops EC's
      // injected <link>; inlined styles survive it.
      emitExternalStylesheet: false,
      styleOverrides: {
        borderRadius: '0.375rem',
        codeFontSize: '0.875rem'
      },
      plugins: [
        {
          // Code blocks scroll horizontally, so they have to be reachable by
          // keyboard (axe: scrollable-region-focusable).
          name: 'focusable-code',
          hooks: {
            postprocessRenderedBlock: ({ renderData }) => {
              const findPre = (node) =>
                node.tagName === 'pre'
                  ? node
                  : node.children?.reduce((found, child) => found ?? findPre(child), undefined);
              const pre = findPre(renderData.blockAst);
              if (pre) pre.properties.tabindex = '0';
            }
          }
        }
      ]
    }),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.9,
      filter: (page) => page !== 'https://phiilu.com/_image'
    }),
    react()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
