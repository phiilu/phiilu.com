import glob from 'fast-glob';
import contentful from './contentful';
import { SitemapStream, streamToPromise } from 'sitemap';
// const { Readable } = require('stream');
import fs from 'fs';
import { Readable } from 'stream';

// pages that should not be in the sitemap
const blocklist = ['/newsletter-success', '/404'];

async function generateSitemap() {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const baseUrl = process.env.BASE_URL;
  const pages = await glob([
    'src/pages/**/*{.js,.mdx}',
    '!src/pages/**/[*',
    '!src/pages/_*.js',
    '!src/pages/api'
  ]);

  // normal page routes
  const pageLinks = pages
    .map((page) => {
      const path = page
        .replace('pages', '')
        .replace('.js', '')
        .replace('.mdx', '')
        .replace('src/', '');
      return path === '/index'
        ? { url: '/', changefreq: 'daily', priority: 0.7 }
        : { url: path, changefreq: 'daily', priority: 0.7 };
    })
    .filter((page) => !blocklist.includes(page.url));

  // post routes
  const posts = await contentful.getEntries('post', { order: '-fields.publishedDate' });
  const postLinks = posts.map((post) => ({
    url: `/${post.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }));

  // tag routes
  const tags = await contentful.getEntries('tag');
  const tagLinks = tags.map((tag) => ({
    url: `/tag/${tag.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }));

  const links = [...pageLinks, ...postLinks, ...tagLinks];
  const stream = new SitemapStream({ hostname: baseUrl });

  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  );

  fs.writeFileSync('./public/sitemap.xml', xml);
}

export default generateSitemap;
