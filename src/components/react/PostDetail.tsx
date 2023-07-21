import { countWords } from '@/helpers/countWords';
import { format } from 'date-fns';
import { Heading } from '@react/Heading';
import { Share } from '@react/Share';
import { ShareOnTwitterCta } from '@react/ShareOnTwitterCta';
import { TagList } from '@react/TagList';
import { useCallback, type ReactNode } from 'react';
import type { CollectionEntry } from 'astro:content';

interface PostDetailProps {
  post: CollectionEntry<'posts'>;
  children: ReactNode;
  url: string;
}

export function PostDetail({ post, url, children }: PostDetailProps) {
  const wordCount = countWords(post.body);
  const timeToRead = Math.round(wordCount / 275);

  const handleSocialShare = useCallback(
    (url: string, name: string, windowSize: string) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      console.log('open');
      window.open(url, name, windowSize);
    },
    []
  );

  return (
    <article className="relative flex flex-col md:px-4 xl:grid xl:grid-cols-4 xl:col-gap-6">
      {/* <DraftBadge isPublished={published} /> */}
      <div className="pb-4 md:mr-8 xl:pb-0 xl:mb-8 xl:col-span-3">
        <Heading noMargin>{post.data.title}</Heading>
      </div>
      <div className="order-1 space-y-16 md:mr-8 xl:order-none xl:col-span-3">
        <div className="prose lg:prose-lg dark:prose-dark">{children}</div>

        <hr className="border-gray-200 dark:border-gray-800" />
        <ShareOnTwitterCta
          onClick={handleSocialShare(
            `https://twitter.com/share?text=${post.data.title} via @phiilu&url=${url}`,
            'twitter-share',
            'width=550,height=235'
          )}
        />
      </div>
      <PostSidebar
        icon={post.data.icon}
        date={post.data.publishedDate}
        tags={post.data.tags}
        timeToRead={timeToRead}
        title={post.data.title}
        url={url}
        handleSocialShare={handleSocialShare}
      />
    </article>
  );
}

interface PostSidebarProps {
  title: string;
  url: string;
  icon: string;
  date: Date;
  tags: string[];
  timeToRead?: number;
  handleSocialShare: (url: string, name: string, windowSize: string) => React.MouseEventHandler;
}

function PostSidebar({
  title,
  url,
  icon,
  date,
  tags,
  timeToRead,
  handleSocialShare
}: PostSidebarProps) {
  return (
    <aside className="pb-10">
      <div className="sticky top-0 flex flex-col items-start pt-4 border-t border-gray-200 dark:border-gray-800 xl:pl-4 sm:flex-row xl:border-l xl:border-t-0 xl:space-y-8 xl:block">
        <img
          src={icon}
          height="48px"
          width="48px"
          className="inline-block object-contain w-12 h-12 mt-4 mr-8 xl:block xl:self-center self-justify-center xl:mt-0 xl:mr-0"
          alt={icon}
        />
        <div className="flex flex-wrap xl:block xl:space-y-8">
          <dl className="mt-4 mr-8 xl:mt-0 xl:mr-0">
            <dt className="font-semibold font-source-sans-pro">Published on</dt>
            <dd className="text-base font-medium leading-6 text-time dark:text-gray-400">
              <time dateTime={`${date.getTime()}`}>{format(date, 'MMMM dd, yyyy')}</time>
            </dd>
          </dl>
          {timeToRead && timeToRead > 0 && (
            <dl className="mt-4 md:mr-8 xl:mt-0 xl:mr-0">
              <dt className="font-semibold font-source-sans-pro">Reading time</dt>
              <dd className="text-base font-medium leading-6 text-time dark:text-gray-400">
                {timeToRead} Minute
                {timeToRead > 1 ? 's' : ''}
              </dd>
            </dl>
          )}
          <dl className="w-full mt-4 md:mr-8 md:w-auto xl:mt-0 xl:mr-0">
            <dt className="font-semibold font-source-sans-pro">Tags</dt>
            <dd className="text-base font-medium leading-6 text-time dark:text-gray-400">
              <TagList tags={tags}></TagList>
            </dd>
          </dl>
          <dl className="w-full mt-4 lg:mr-8 sm:mt-2 xl:space-y-2 xl:mt-0 xl:mr-0">
            <dt className="font-semibold font-source-sans-pro">Social Corner</dt>
            <dd className="mt-2 text-base font-medium leading-6 xl:mt-0 text-time dark:text-gray-400">
              <Share title={title} url={url} onClick={handleSocialShare} />
            </dd>
          </dl>
          <dl className="w-full mt-4 lg:mr-8 sm:mt-2 xl:space-y-2 xl:mt-0 xl:mr-0">
            <dt className="font-semibold font-source-sans-pro">Support Corner</dt>
            <dd className="mt-2 text-base font-medium leading-6 xl:mt-0 text-time dark:text-gray-400">
              <a
                // tracking={{
                //   event: "click",
                //   name: "Buy Me a Coffee",
                //   value: "Buy Me a Coffee",
                //   type: "link",
                // }}
                href="https://www.buymeacoffee.com/phiilu"
              >
                <img
                  alt="Buy me a mate tea"
                  src="https://img.buymeacoffee.com/button-api/?text=Buy me a mate tea&emoji=🍵&slug=phiilu&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
                />
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </aside>
  );
}
