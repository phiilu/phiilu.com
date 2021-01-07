import React from 'react';

import Container from '@components/Container/Container';
import Markdown from '@components/Markdown/Markdown';
import Heading from '@components/Heading/Heading';
import Link from '@components/Link/Link';
import Button from '@components/Button/Button';
import contentful from '@lib/contentful';
import getOgImage from '@lib/getOgImage';
import Comments from '@components/Comments/Comments';
import Tags from '@components/Tags/Tags';
import DraftBadge from '@components/DraftBadge/DraftBadge';
import Head from '@components/Head/Head';
import Newsletter from '@components/Newsletter/Newsletter';
import { slideInUp, slideInRight, delayedSlideInUp } from '@helpers/animation';
import { motion } from 'framer-motion';

export async function getStaticProps({ params: { slug } }) {
  const post = await contentful.getEntry('post', slug);
  const ogImage = await getOgImage(
    `/phiilu.com?title=${post.title}&url=${process.env.BASE_URL}/${slug}`
  );
  const baseUrl = process.env.BASE_URL;

  return {
    props: { post, ogImage, baseUrl }
  };
}

export async function getStaticPaths() {
  const posts = await contentful.getEntries('post');
  const paths = await posts.map(({ slug }) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false
  };
}

function PostSidebar({ title, url, icon, date, tags, timeToRead, handleSocialShare }) {
  return (
    <motion.aside variants={slideInRight} className="pb-10">
      <div className="sticky top-0 flex flex-col items-start pt-4 border-t border-gray-200 xl:pl-4 sm:flex-row xl:border-l xl:border-t-0 xl:space-y-8 xl:block">
        <img
          src={icon.url}
          height="48px"
          width="48px"
          className="inline-block object-contain w-12 h-12 mt-4 mr-8 xl:block xl:self-center self-justify-center xl:mt-0 xl:mr-0"
          alt={icon.alt}
        />
        <div className="flex flex-wrap xl:block xl:space-y-8">
          <dl className="mt-4 mr-8 xl:mt-0 xl:mr-0">
            <dt className="font-semibold font-source-sans-pro">Published on</dt>
            <dd className="text-base font-medium leading-6 text-time">
              <time dateTime={date}>{date}</time>
            </dd>
          </dl>
          {timeToRead > 0 && (
            <dl className="mt-4 md:mr-8 xl:mt-0 xl:mr-0">
              <dt className="font-semibold font-source-sans-pro">Reading time</dt>
              <dd className="text-base font-medium leading-6 text-time">
                {timeToRead} Minute
                {timeToRead > 1 ? 's' : ''}
              </dd>
            </dl>
          )}
          <dl className="w-full mt-4 md:mr-8 md:w-auto xl:mt-0 xl:mr-0">
            <dt className="font-semibold font-source-sans-pro">Tags</dt>
            <dd className="text-base font-medium leading-6 text-time">
              <Tags tags={tags}></Tags>
            </dd>
          </dl>
          <dl className="w-full mt-4 lg:mr-8 sm:mt-2 xl:space-y-2 xl:mt-0 xl:mr-0">
            <dt className="font-semibold font-source-sans-pro">Social Corner</dt>
            <dd className="mt-2 text-base font-medium leading-6 xl:mt-0 text-time">
              <ul className="space-y-2 sm:items-start sm:space-x-2 sm:space-y-0 xl:space-y-2 sm:flex xl:space-x-0 xl:block">
                <li className="w-full">
                  <Button
                    tracking={{
                      event: 'click',
                      value: 'Share on Twitter clicked',
                      name: 'Share on Twitter clicked'
                    }}
                    variant="twitter"
                    onClick={handleSocialShare(
                      `https://twitter.com/share?text=${title} via @phiilu&url=${url}`,
                      'twitter-share',
                      'width=550,height=235'
                    )}>
                    Share on Twitter
                  </Button>
                </li>
                <li className="w-full">
                  <Button
                    tracking={{
                      event: 'click',
                      value: 'Share on Hacker News clicked',
                      name: 'Share on Hacker News clicked'
                    }}
                    variant="hackernews"
                    onClick={handleSocialShare(
                      `https://news.ycombinator.com/submitlink?u=${url}&t=${title}`,
                      'hn-share',
                      'width=550,height=350'
                    )}>
                    Share on Hacker News
                  </Button>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </motion.aside>
  );
}

function ShareOnTwitterCta({ onClick }) {
  return (
    <aside
      aria-label="Share on Twitter card"
      className="px-6 py-6 space-y-4 rounded-md bg-indigo-50">
      <Heading size="h2" noMargin>
        Did you find this post useful or learned something?
      </Heading>
      <p className="prose lg:prose-xl">
        I would be really grateful if you let me{' '}
        <Link
          tracking={{
            event: 'click',
            value: 'Twitter CTA',
            name: 'Twitter CTA'
          }}
          to="https://twitter.com/phiilu">
          @phiilu
        </Link>{' '}
        know by sharing it on Twitter!
      </p>
      <Button
        variant="twitter"
        onClick={onClick}
        tracking={{
          event: 'click',
          value: 'Share on Twitter clicked',
          name: 'Share on Twitter clicked'
        }}>
        Share on Twitter
      </Button>
    </aside>
  );
}

const PostDetails = ({
  post: { title, description, slug, content, icon, rawDate, date, tags, published, timeToRead },
  ogImage,
  baseUrl
}) => {
  const handleSocialShare = React.useCallback(
    (url, name, windowSize) => (e) => {
      e.preventDefault();
      window.open(url, name, windowSize);
    },
    []
  );

  const url = `${baseUrl}/${slug}`;
  const keywords = tags?.map((tag) => tag.title).join(', ') ?? '';

  return (
    <>
      <Head
        title={title}
        description={description}
        url={url}
        image={ogImage}
        date={rawDate}
        keywords={keywords}
      />
      <Container as="main">
        <article className="relative flex flex-col md:px-4 xl:grid xl:grid-cols-4 xl:col-gap-6">
          <DraftBadge isPublished={published}></DraftBadge>
          <motion.div variants={slideInUp} className="pb-4 md:mr-8 xl:pb-0 xl:mb-8 xl:col-span-3">
            <Heading noMargin>{title}</Heading>
          </motion.div>
          <motion.div
            variants={delayedSlideInUp}
            className="order-1 space-y-16 md:mr-8 xl:order-none xl:col-span-3">
            <Markdown>{content}</Markdown>
            <Newsletter />

            <hr className="border-gray-200" />
            <ShareOnTwitterCta
              title={title}
              onClick={handleSocialShare(
                `https://twitter.com/share?text=${title} via @phiilu&url=${url}`,
                'twitter-share',
                'width=550,height=235'
              )}
            />
            <Comments />
          </motion.div>
          <PostSidebar
            icon={icon}
            date={date}
            tags={tags}
            timeToRead={timeToRead}
            title={title}
            url={url}
            handleSocialShare={handleSocialShare}
          />
        </article>
      </Container>
    </>
  );
};

export default PostDetails;
