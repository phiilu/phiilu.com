// Accessibility linter: runs axe against every built page, in both themes.
// Usage: pnpm build && pnpm lint:a11y   (or: pnpm lint:a11y http://localhost:4321)
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const DIST = new URL('../dist/', import.meta.url).pathname;

function routes() {
  const found = [];
  const walk = (dir, prefix) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(`${dir}${entry.name}/`, `${prefix}${entry.name}/`);
      else if (entry.name === 'index.html') found.push(prefix);
    }
  };
  walk(DIST, '/');
  return found.sort();
}

const TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.xml': 'application/xml'
};

// `astro preview` daemonises itself in this setup, which makes it awkward to
// start and stop from a script. dist/ is plain static output, so serve it here.
function serveDist() {
  const server = createServer((req, res) => {
    let file = join(DIST, decodeURIComponent(req.url.split('?')[0]));
    if (!extname(file)) file = join(file, 'index.html');
    try {
      const body = readFileSync(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
  return new Promise((resolve) => {
    server.listen(0, () => {
      resolve({ url: `http://localhost:${server.address().port}`, stop: () => server.close() });
    });
  });
}

const baseUrl = process.argv[2];
if (!baseUrl && !existsSync(DIST)) {
  console.error('No dist/ found. Run `pnpm build` first, or pass a base URL.');
  process.exit(1);
}

const server = baseUrl ? { url: baseUrl, stop: () => {} } : await serveDist();
const browser = await chromium.launch();
const failures = [];

try {
  for (const theme of ['light', 'dark']) {
    // Without this, axe measures the post list mid fade-in and reports every
    // heading as low contrast.
    const context = await browser.newContext({ colorScheme: theme, reducedMotion: 'reduce' });
    // The site stores its own preference, which wins over the OS setting.
    await context.addInitScript(`localStorage.setItem('theme', '${theme}')`);
    const page = await context.newPage();
    // Third-party images (buymeacoffee, og-image) never settle and are not ours to audit.
    await page.route('**/*', (route) =>
      route.request().url().startsWith(server.url) ? route.continue() : route.abort()
    );
    for (const route of routes()) {
      await page.goto(`${server.url}${route}`, { waitUntil: 'load' });
      const { violations } = await new AxeBuilder({ page }).analyze();
      for (const violation of violations) {
        failures.push(
          `${theme} ${route} — ${violation.id} (${violation.impact}) x${violation.nodes.length}\n` +
            `    ${violation.nodes[0].html.slice(0, 100)}\n` +
            `    ${violation.helpUrl}`
        );
      }
    }
    // The settings menu is the one interactive widget on the site; audit it
    // open. Scoped to the menu itself, because Headless UI hides the rest of
    // the page from assistive tech while it is open.
    await page.goto(`${server.url}/`, { waitUntil: 'load' });
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.waitForSelector('[role="menu"]');
    const menu = await new AxeBuilder({ page }).include('[role="menu"]').analyze();
    for (const violation of menu.violations) {
      failures.push(
        `${theme} settings menu — ${violation.id} (${violation.impact}) x${violation.nodes.length}\n` +
          `    ${violation.nodes[0].html.slice(0, 100)}\n` +
          `    ${violation.helpUrl}`
      );
    }

    await context.close();
  }
} finally {
  await browser.close();
  server.stop();
}

if (failures.length) {
  console.error(`\n${failures.length} accessibility violation(s):\n`);
  console.error(failures.join('\n\n'));
  process.exit(1);
}
console.log('No accessibility violations.');
