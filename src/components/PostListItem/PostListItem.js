import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Heading from '@components/Heading/Heading';
import Tags from '@components/Tags/Tags';
import DraftBadge from '@components/DraftBadge/DraftBadge';

const PostListItem = ({ post: { slug, title, description, published, icon, date, tags } }) => {
  return React.useMemo(
    () => (
      <article className="relative inline-block text-gray-900 rounded-md outline-none md:p-4 post-item hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:shadow-sm focus:text-gray-700">
        <Link href={slug}>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a
            className="absolute top-0 bottom-0 left-0 right-0"
            aria-label={`link to blog post "${title}" detail page`}></a>
        </Link>
        <div className="relative z-10 space-y-4 pointer-events-none xl:space-y-0 xl:grid xl:grid-cols-4 xl:col-gap-6">
          <DraftBadge isPublished={published}></DraftBadge>
          <div className="flex items-center pr-2 xl:space-x-6 xl:pb-0 xl:col-span-3">
            <div className="hidden w-12 h-12 xl:inline-block">
              <Image
                src={`https:${icon.url}`}
                height={48}
                width={48}
                alt={icon.alt}
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <Heading size="h2" noMargin>
                {title}
              </Heading>
              <p className="text-lg tracking-tight text-gray-800">{description}</p>
            </div>
          </div>
          <div className="flex items-center pt-4 space-x-6 border-t border-gray-200 xl:pl-4 xl:pt-0 xl:space-x-0 xl:border-l xl:border-t-0">
            <div className="inline-block w-12 h-12 xl:hidden">
              <Image
                src={`https:${icon.url}`}
                height={48}
                width={48}
                alt={icon.alt}
                className="object-cover"
              />
            </div>
            <div>
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-time font-source-sans-pro">
                  <time dateTime="2020-06-30T18:05:31Z">{date}</time>
                </dd>
              </dl>
              <Tags tags={tags}></Tags>
            </div>
          </div>
        </div>
      </article>
    ),
    [slug, title, description, published, icon, date, tags]
  );
};

export default PostListItem;
