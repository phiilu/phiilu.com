const contentful = require('contentful');
const transformPost = require('@helpers/transformPost').default;
const transformTag = require('@helpers/transformTag').default;

const isDev = process.env.NODE_ENV === 'development';

const client = contentful.createClient({
  host: isDev ? `preview.contentful.com` : undefined,
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: isDev ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
});

export default {
  async getEntries(content_type = 'post', options = { order: '-sys.createdAt' }) {
    const entries = await client.getEntries({
      content_type,
      ...options
    });
    if (entries.items) {
      switch (content_type) {
        case 'post':
          return entries.items.map(transformPost);
        case 'tag':
          return entries.items.map(transformTag);
        default:
          return entries.items;
      }
    }
    throw new Error(`Error getting Entries for post.`);
  },
  async getEntry(content_type = 'post', slug) {
    const entry = await client.getEntries({
      content_type,
      'fields.slug': slug
    });

    if (entry.total > 1) throw new Error('slug is not unique and returns more than 1 post');

    const [item] = entry.items;

    switch (content_type) {
      case 'post':
        return transformPost(item);
      case 'tag':
        return transformTag(item);
      default:
        return item;
    }
  }
};
