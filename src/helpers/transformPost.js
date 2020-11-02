import format from 'date-fns/format';
import { count } from '@wordpress/wordcount';

export const POST_LIST_ITEM_FIELDS = [
  'id',
  'slug',
  'title',
  'description',
  'published',
  'icon',
  'date',
  'tags'
];

export default function transformPost(post, returnFields = []) {
  const { sys, fields } = post;
  const { id } = sys;
  const tags = fields.tags.map((tag) => tag.fields);
  const icon = {
    url: fields.icon.fields.file.url,
    alt: fields.icon.fields.title
  };
  const { title, slug, description, published, publishedDate, content } = fields;
  const rawDate = publishedDate;
  const date = format(new Date(publishedDate), 'MMMM dd, yyyy');
  const numberOfWords = count(content, 'words', {});
  const timeToRead = Math.round(numberOfWords / 275); // average reading speed is 275 WPM

  const newPost = {
    id,
    slug,
    title,
    description,
    icon,
    tags,
    published,
    rawDate,
    date,
    content,
    numberOfWords,
    timeToRead
  };

  if (returnFields.length <= 0) return newPost;

  return Object.keys(newPost).reduce((post, field) => {
    if (returnFields.includes(field)) {
      return {
        ...post,
        [field]: newPost[field]
      };
    }

    return post;
  }, {});
}
