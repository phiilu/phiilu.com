import { readFile, readdir } from 'node:fs/promises';
import { defineConfig, fontProviders } from 'astro/config';
import { ANALYTICS, THIRD_PARTY_HOSTS } from './src/data/privacy.ts';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';
import expressiveCode from 'astro-expressive-code';

const SITE = 'https://phiilu.com';

// Keeps /privacy honest: anything the browser fetches without being clicked
// hands the visitor's IP to whoever serves it, so it has to be declared in
// src/data/privacy.ts. Attributes only — an <a href> is a link, not a load.
function verifyPrivacyDisclosures() {
  const LOADED = /(?:\bsrc|\bsrcset|\bposter|<link\b[^>]*?\bhref)\s*=\s*"([^"]+)"/gi;

  return {
    name: 'verify-privacy-disclosures',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const site = new URL(SITE).hostname;
        const undeclared = new Map();

        const walk = async (folder) => {
          for (const entry of await readdir(folder, { withFileTypes: true })) {
            const path = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, folder);
            if (entry.isDirectory()) await walk(path);
            else if (entry.name.endsWith('.html')) await scan(path);
          }
        };

        const scan = async (path) => {
          const html = await readFile(path, 'utf8');
          for (const [, value] of html.matchAll(LOADED)) {
            for (const candidate of value.split(',')) {
              const url = candidate.trim().split(/\s+/)[0];
              if (!/^https?:\/\//i.test(url)) continue;
              const { hostname } = new URL(url);
              if (hostname === site || hostname.endsWith(`.${site}`)) continue;
              const declared = THIRD_PARTY_HOSTS.some(({ hosts }) =>
                hosts.some((host) => hostname === host || hostname.endsWith(`.${host}`))
              );
              if (declared) continue;
              undeclared.set(hostname, path.pathname.split('/dist').pop());
            }
          }
        };

        await walk(dir);

        if (undeclared.size > 0) {
          const list = [...undeclared].map(([host, page]) => `  ${host} (in ${page})`).join('\n');
          throw new Error(
            `These hosts are loaded but not declared in src/data/privacy.ts, so /privacy is now wrong:\n${list}`
          );
        }
      }
    }
  };
}

// Images referenced as `/images/...` live in public/, so Astro never processes
// them and they load eagerly. Astro's own <Image> already sets both of these.
function lazyMarkdownImages() {
  return (tree) => {
    const walk = (node) => {
      if (node.tagName === 'img') {
        node.properties.loading ??= 'lazy';
        node.properties.decoding ??= 'async';
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel({
    edgeMiddleware: true,
    // Driven by the privacy data: dropping ANALYTICS there also stops the
    // script being injected, so the page cannot claim less than it does.
    webAnalytics: {
      enabled: ANALYTICS !== null
    },
    maxDuration: 8
  }),
  site: SITE,
  // Self-hosted from src/assets/fonts, so Astro fingerprints the files and
  // emits the preload links and metric-matched fallbacks. Only the weights and
  // styles the site actually uses are declared.
  fonts: [
    {
      name: 'Open Sans',
      cssVariable: '--font-open-sans-family',
      provider: fontProviders.local(),
      fallbacks: ['sans-serif'],
      display: 'swap',
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['./src/assets/fonts/OpenSans-Regular.woff2'] },
          { weight: 400, style: 'italic', src: ['./src/assets/fonts/OpenSans-Italic.woff2'] },
          { weight: 500, style: 'normal', src: ['./src/assets/fonts/OpenSans-Medium.woff2'] },
          { weight: 600, style: 'normal', src: ['./src/assets/fonts/OpenSans-SemiBold.woff2'] },
          { weight: 700, style: 'normal', src: ['./src/assets/fonts/OpenSans-Bold.woff2'] },
          { weight: 700, style: 'italic', src: ['./src/assets/fonts/OpenSans-BoldItalic.woff2'] }
        ]
      }
    },
    {
      name: 'Source Sans Pro',
      cssVariable: '--font-source-sans-pro-family',
      provider: fontProviders.local(),
      fallbacks: ['sans-serif'],
      display: 'swap',
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['./src/assets/fonts/SourceSansPro-Regular.woff2'] },
          {
            weight: 600,
            style: 'normal',
            src: ['./src/assets/fonts/SourceSansPro-SemiBold.woff2']
          },
          { weight: 700, style: 'normal', src: ['./src/assets/fonts/SourceSansPro-Bold.woff2'] },
          { weight: 900, style: 'normal', src: ['./src/assets/fonts/SourceSansPro-Black.woff2'] }
        ]
      }
    }
  ],
  // The ClientRouter already enables prefetch; this opts every internal link
  // in rather than needing `data-astro-prefetch` on each one. Default strategy
  // is hover, so nothing is fetched until the reader aims at a link.
  prefetch: { prefetchAll: true },
  image: {
    // Post screenshots are wider than the prose column, so they need to scale
    // down with it; `constrained` never renders them above their own size.
    layout: 'constrained',
    responsiveStyles: true
  },
  markdown: {
    processor: unified({ rehypePlugins: [lazyMarkdownImages] })
  },
  integrations: [
    // Must come before mdx() so it can process code blocks in .mdx files.
    expressiveCode({
      themes: ['catppuccin-latte', 'catppuccin-mocha'],
      // The site toggles a `dark` class, so no media query fallback.
      // Latte is the base theme; mocha takes over under the `dark` class.
      // The returned value is appended to `:root`, which is the <html> element
      // carrying that class.
      themeCssSelector: (theme) => theme.name === 'catppuccin-mocha' && '.dark',
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
      filter: (page) => page !== `${SITE}/_image`
    }),
    react(),
    verifyPrivacyDisclosures()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
