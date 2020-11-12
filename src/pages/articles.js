import Container from '@components/Container/Container';
import Layout from '@components/Layout/Layout';
import Head from '@components/Head/Head';
import PostListItem from '@components/PostListItem/PostListItem';
import Heading from '@components/Heading/Heading';
import Newsletter from '@components/Newsletter/Newsletter';
import dateFormat from 'date-fns/format';
import formatISO9075 from 'date-fns/formatISO9075';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';

import contentful from '@lib/contentful';
import getOgImage from '@lib/getOgImage';
import { POST_LIST_ITEM_FIELDS } from '@helpers/transformPost';

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
  const title = 'All Articles';
  const posts = await contentful.getEntries('post', { order: '-fields.publishedDate' }, [
    ...POST_LIST_ITEM_FIELDS,
    'rawDate'
  ]);
  const ogImage = await getOgImage(
    `/phiilu.com?title=${title}&url=${process.env.BASE_URL}/articles`
  );
  const baseUrl = process.env.BASE_URL;
  const postsByMonth = getPostsByMonth(posts);

  return {
    props: { postsByMonth, ogImage, baseUrl }
  };
}

function Articles({ postsByMonth, baseUrl, ogImage }) {
  return (
    <>
      <Head
        title="All Articles"
        description="All written blog articles"
        image={ogImage}
        url={`${baseUrl}/`}
      />
      <Layout>
        <Container as="main" noMargin className="space-y-14">
          {postsByMonth.map((month) => {
            return (
              <div key={month.date} className="space-y-8">
                <Heading
                  noMargin
                  size="h3"
                  className="mx-4 text-indigo-500 border-b-2 border-gray-100 md:mx-0">
                  {dateFormat(new Date(month.date), 'MMMM yyyy')}
                </Heading>
                <div className="space-y-8 md:space-y-14">
                  <ul className="space-y-16 md:space-y-8">
                    {month.posts.map((post) => (
                      <li key={post.id}>
                        <PostListItem post={post} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <Newsletter />
        </Container>
      </Layout>
    </>
  );
}

export default Articles;