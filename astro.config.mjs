import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

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
  markdown: {
    shikiConfig: {
      theme: 'dracula-soft'
    }
  },
  integrations: [
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
