const contentful = require('contentful');

const isDev = process.env.NODE_ENV === 'development';

const client = contentful.createClient({
  host: isDev ? `preview.contentful.com` : undefined,
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: isDev ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
});

export default {
  async getEntries(content_type = 'post') {
    const entries = await client.getEntries({
      content_type
    });
    if (entries.items) return entries.items;
    console.log(`Error getting Entries for post.`);
  },
  async getPostEntry(slug) {
    const entry = await client.getEntries({
      content_type: 'post',
      'fields.slug': slug
    });

    if (entry.total > 1) throw new Error('slug is not unique and returns more than 1 post');

    const { tags: origTags, ...fields } = entry.items[0].fields;
    const tags = origTags.map((tag) => tag.fields);

    return { ...fields, tags };
  }
};
