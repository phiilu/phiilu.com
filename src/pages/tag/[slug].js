import classNames from 'classnames';

import Head from '@components/Head/Head';
import Container from '@components/Container/Container';
import Heading from '@components/Heading/Heading';
import PostListItem from '@components/PostListItem/PostListItem';
import { motion } from 'framer-motion';

import contentful from '@lib/contentful';
import getOgImage from '@lib/getOgImage';
import tagColors from '@helpers/tagColors';
import { POST_LIST_ITEM_FIELDS } from '@helpers/transformPost';
import { listVariants, itemVariants, slideInUp } from '@helpers/animation';

export async function getStaticProps({ params: { slug } }) {
  const tag = await contentful.getEntry('tag', slug);
  const posts = await contentful.getEntries(
    'post',
    {
      'fields.tags.sys.id': tag.id
    },
    POST_LIST_ITEM_FIELDS
  );
  const ogImage = await getOgImage(
    `/phiilu.com/post?title=Tag: ${tag.title}&url=${process.env.BASE_URL}/tag/${slug}`
  );
  const baseUrl = process.env.BASE_URL;

  return {
    props: { tag, posts, ogImage, baseUrl }
  };
}

export async function getStaticPaths() {
  const tags = await contentful.getEntries('tag');
  const paths = await tags.map(({ slug }) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false
  };
}

function TagDetail({ tag, posts, ogImage, baseUrl }) {
  const { description, bg, text, title, mainColor } = { ...tagColors[tag.slug], ...tag };
  const count = posts.length;

  return (
    <>
      <Head
        title={`Tag: ${title}`}
        description={description}
        url={`${baseUrl}/tag/${tag.slug}`}
        image={ogImage}
      />
      <Container as="main" noMargin>
        <article className="space-y-12">
          <motion.div
            variants={slideInUp}
            initial="initial"
            animate="enter"
            exit="exit"
            className="px-4 space-y-4">
            <Heading noMargin className="flex items-center space-x-2">
              <span className={classNames('font-bold', mainColor)}>{count}</span>
              <span>
                Post
                {count > 1 ? 's ' : ' '}
                in
              </span>
              <span
                className={classNames(
                  'inline-block rounded-md px-4 py-1 text-3xl font-semibold',
                  bg,
                  text
                )}>
                {title}
              </span>
            </Heading>
            {description && (
              <p className="mb-12 text-xl text-gray-800 dark:text-gray-200">{description}</p>
            )}
          </motion.div>
          <motion.ul
            variants={listVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="space-y-8">
            {posts.map((post) => (
              <motion.li
                variants={itemVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                key={post.id}>
                <PostListItem post={post} />
              </motion.li>
            ))}
          </motion.ul>
        </article>
      </Container>
    </>
  );
}

export default TagDetail;
