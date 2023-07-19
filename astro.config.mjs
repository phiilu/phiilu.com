import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  trailingSlash: 'never',
  adapter: vercel({
    analytics: true
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
    tailwind(),
    react()
  ],
  experimental: {
    assets: true
  }
});
