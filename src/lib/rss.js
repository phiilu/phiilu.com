const Feed = require('feed').Feed;
const contentful = require('./contentful').default;
const markdown = require('markdown').markdown;
const fs = require('fs');

async function generateRssFeed() {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const baseUrl = process.env.BASE_URL;
  const date = new Date();
  const author = {
    name: 'Florian Kapfenberger',
    email: 'hey@phiilu.com',
    link: 'https://twitter.com/phiilu'
  };

  const feed = new Feed({
    title: `Phiilu's Blog`,
    description: 'Welcome to my blog!',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: `${baseUrl}/images/logo.svg`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Florian Kapfenberger`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`
    },
    author
  });

  const posts = await contentful.getEntries('post', { order: '-fields.publishedDate' });

  posts.forEach((post) => {
    const url = `${baseUrl}/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: markdown.toHTML(post.content),
      author: [author],
      contributor: [author],
      date: new Date(post.rawDate)
    });
  });

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
}
export default generateRssFeed;
