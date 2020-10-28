import format from 'date-fns/format';
import { count } from '@wordpress/wordcount';

export default function transformPost(post) {
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

  return {
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
}
