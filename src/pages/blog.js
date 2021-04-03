import Container from '@components/Container/Container';
import Head from '@components/Head/Head';
import PostListItem from '@components/PostListItem/PostListItem';
import Heading from '@components/Heading/Heading';
import Newsletter from '@components/Newsletter/Newsletter';
import dateFormat from 'date-fns/format';
import formatISO9075 from 'date-fns/formatISO9075';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import { motion } from 'framer-motion';

import contentful from '@lib/contentful';
import getOgImage from '@lib/getOgImage';
import { POST_LIST_ITEM_FIELDS } from '@helpers/transformPost';
import { listVariants, itemVariants } from '@helpers/animation';

function getPostsByMonth(posts) {
  return posts.reduce((postsByDate, post) => {
    const exists = postsByDate.find((p) => {
      const newDate = new Date(post.rawDate);
      const existingDate = new Date(p.date);
      return isSameMonth(newDate, existingDate) && isSameYear(newDate, existingDate);
    });

    if (exists) {
      exists.posts.push(post);
    } else {
      const date = new Date(post.rawDate);
      postsByDate.push({
        date: formatISO9075(date, { representation: 'date' }),
        posts: [post]
      });
    }

    return postsByDate;
  }, []);
}

export async function getStaticProps() {
  const title = 'Blog';
  const posts = await contentful.getEntries('post', { order: '-fields.publishedDate' }, [
    ...POST_LIST_ITEM_FIELDS,
    'rawDate'
  ]);
  const ogImage = await getOgImage(
    `/phiilu.com/post?title=${title}&url=${process.env.BASE_URL}/blog`
  );
  const baseUrl = process.env.BASE_URL;
  const postsByMonth = getPostsByMonth(posts);

  return {
    props: { postsByMonth, ogImage, baseUrl }
  };
}

function Blog({ postsByMonth, baseUrl, ogImage }) {
  return (
    <>
      <Head title="Blog" description="Florian's Blog" image={ogImage} url={`${baseUrl}/`} />
      <Container as="main" noMargin className="md:px-4">
        <motion.div
          variants={listVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="space-y-16">
          {postsByMonth.map((month) => {
            return (
              <motion.div
                variants={itemVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                key={month.date}
                className="space-y-8">
                <Heading
                  noMargin
                  as="h1"
                  size="h3"
                  className="mx-4 text-indigo-500 border-b-2 border-gray-100 dark:border-gray-800 md:mx-0">
                  {dateFormat(new Date(month.date), 'MMMM yyyy')}
                </Heading>
                <div className="space-y-8 md:space-y-14">
                  <motion.ul
                    variants={listVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="space-y-16 md:space-y-8">
                    {month.posts.map((post) => (
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
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <Newsletter />
      </Container>
    </>
  );
}

export default Blog;
