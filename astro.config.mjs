import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    analytics: true,
    imageService: true,
  }),
  site: "https://phiilu.com",
  integrations: [
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.9,
    }),
    tailwind(),
    react(),
  ],
  experimental: {
    assets: true,
  },
});
