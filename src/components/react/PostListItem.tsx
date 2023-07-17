import { DraftBadge } from '@react/DraftBadge';
import { format as formatDate } from 'date-fns';
import { Heading } from '@react/Heading';
import { TagList } from '@react/TagList';
import { useMemo } from 'react';

interface PostListItemProps {
  post: {
    slug: string;
    title: string;
    description: string;
    icon: string;
    publishedDate: Date;
    tags: string[];
    updatedDate?: Date | undefined;
    published: boolean;
  };
}

export const PostListItem = ({
  post: { slug, title, description, published, icon, publishedDate, tags }
}: PostListItemProps) => {
  return useMemo(
    () => (
      <article className="relative inline-block p-4 text-gray-900 rounded-md outline-none group dark:text-gray-100 post-item hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:shadow-sm focus:text-gray-700 dark:focus:bg-gray-800 dark:hover:bg-gray-800">
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a
          href={`/${slug}`}
          className="absolute top-0 bottom-0 left-0 right-0"
          aria-label={`link to blog post "${title}" detail page`}
        />
        <div className="relative z-10 space-y-4 pointer-events-none xl:space-y-0 xl:grid xl:grid-cols-4 xl:col-gap-6">
          <DraftBadge isPublished={published} />
          <div className="flex items-center pr-4 xl:space-x-6 xl:pb-0 xl:col-span-3">
            <div className="flex-shrink-0 hidden w-12 h-12 xl:inline-block">
              <img src={icon} height={48} width={48} alt={icon} className="object-contain" />
            </div>
            <div className="space-y-2">
              <Heading size="h2" noMargin>
                {title}
              </Heading>
              <p className="text-lg tracking-tight text-gray-800 xl:text-lg xl:leading-8 dark:text-gray-100">
                {description}
              </p>
            </div>
          </div>
          <div className="flex items-center pt-4 space-x-6 border-t border-gray-200 dark:group-hover:border-gray-700 dark:border-gray-800 xl:pl-4 xl:pt-0 xl:space-x-0 xl:border-l xl:border-t-0">
            <div className="inline-block w-12 h-12 xl:hidden">
              <img src={icon} height={48} width={48} alt={icon} className="object-contain" />
            </div>
            <div>
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-time font-source-sans-pro dark:text-gray-200">
                  <time dateTime="2020-06-30T18:05:31Z">
                    {formatDate(publishedDate, 'MMMM dd, yyyy')}
                  </time>
                </dd>
              </dl>
              <TagList tags={tags}></TagList>
            </div>
          </div>
        </div>
      </article>
    ),
    [slug, title, description, published, icon, publishedDate, tags]
  );
};
