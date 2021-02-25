import Container from '@components/Container/Container';
import Head from '@components/Head/Head';
import PostListItem from '@components/PostListItem/PostListItem';
import Link from '@components/Link/Link';
import Heading from '@components/Heading/Heading';
import Button from '@components/Button/Button';
import Newsletter from '@components/Newsletter/Newsletter';
import SectionHeading from '@components/SectionHeading/SectionHeading';
import Image from 'next/image';
import { motion } from 'framer-motion';

import contentful from '@lib/contentful';
import getOgImage from '@lib/getOgImage';
import generateRssFeed from '@lib/rss';
import generateSitemap from '@lib/sitemap';
import { POST_LIST_ITEM_FIELDS } from '@helpers/transformPost';
import { listVariants, itemVariants, delayedSlideInUp } from '@helpers/animation';

export async function getStaticProps() {
  const posts = await contentful.getEntries(
    'post',
    { order: '-fields.publishedDate', limit: 5 },
    POST_LIST_ITEM_FIELDS
  );
  const ogImage = await getOgImage(`/phiilu.com/`);
  const baseUrl = process.env.BASE_URL;

  await generateRssFeed();
  await generateSitemap();

  return {
    props: { posts, ogImage, baseUrl }
  };
}

const heroVariants = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  enter: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } }
};

function Hero() {
  return (
    <motion.div
      initial="initial"
      variants={heroVariants}
      className="flex flex-col items-center justify-center p-6 mx-4 space-y-4 bg-indigo-100 rounded-lg shadow-sm md:mx-0 md:space-x-8 xl:p-12 md:space-y-0 md:flex-row dark:bg-gray-800">
      <picture className="relative flex-none w-40 h-40 rounded-full shadow-xl md:h-44 md:w-44">
        <Image
          className="absolute flex-none object-cover w-40 h-40 rounded-full md:h-44 md:w-44"
          src="/images/me.jpg"
          alt="Me"
          width={176}
          height={176}
          priority
        />
      </picture>
      <div className="space-y-2">
        <Heading noMargin>
          Hey, I&apos;m Florian (
          <Link className="text-indigo-500 hover:text-indigo-400" to="https://twitter.com/phiilu">
            @phiilu
          </Link>
          )
        </Heading>
        <p className="text-xl xl:text-3xl xl:leading-snug">
          I am a <strong className="font-bold">Frontend Developer</strong> from{' '}
          <span aria-label="Austria">
            <span className="dark:text-red-500">Au</span>str
            <span className="dark:text-red-500">ia</span>
          </span>{' '}
          creating websites &amp; apps using{' '}
          <Link
            to="https://reactjs.org/"
            className="font-semibold text-indigo-600 dark:text-indigo-500 hover:text-indigo-400">
            React
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default function IndexPage({ posts, ogImage, baseUrl }) {
  return (
    <>
      <Head
        description="Frontend Developer / Jamstack: React, Next.js, JavaScript, TypeScript, Tailwind CSS and a bit of PHP with Laravel / Loves to self-host apps and services"
        image={ogImage}
        url={`${baseUrl}/`}
      />
      <Container as="main" noMargin className="md:px-4 space-y-14">
        <Hero />
        <div className="space-y-8 md:space-y-14">
          <SectionHeading heading="Blog" subheading="Latest Articles">
            Here are my latest written articles, I hope you like them! <br /> I write about
            programming and server related topics.
          </SectionHeading>
          <motion.ul
            initial="initial"
            animate="enter"
            exit="exit"
            variants={listVariants}
            className="space-y-16 md:space-y-8">
            {posts.map((post) => (
              <motion.li variants={itemVariants} key={post.id}>
                <PostListItem post={post} />
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={delayedSlideInUp} className="flex justify-center">
            <Button as={Link} to="/blog" width="medium" scroll={false}>
              Visit My Blog
            </Button>
          </motion.div>
        </div>
        <Newsletter />
      </Container>
    </>
  );
}
