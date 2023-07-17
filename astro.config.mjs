import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
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
