import contentful from '@lib/contentful';
import classNames from 'classnames';
import Layout from '@components/Layout/Layout';
import Head from '@components/Head/Head';
import Container from '@components/Container/Container';
import Heading from '@components/Heading/Heading';
import PostListItem from '@components/PostListItem/PostListItem';

import getOgImage from '@lib/getOgImage';
import tagColors from '@helpers/tagColors';

export async function getStaticProps({ params: { slug } }) {
  const tag = await contentful.getEntry('tag', slug);
  const posts = await contentful.getEntries('post', {
    'fields.tags.sys.id': tag.id
  });
  const ogImage = await getOgImage(
    `/phiilu.com?title=Tag: ${tag.title}&url=https://phiilu.com/tag/${slug}`
  );

  return {
    props: { tag, posts, ogImage }
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

function TagDetail({ tag, posts, ogImage }) {
  const { description, bg, text, title, mainColor } = { ...tagColors[tag.slug], ...tag };
  const count = posts.length;

  return (
    <Layout>
      <Head
        title={`Tag: ${title}`}
        description={description}
        path={`/tag/${tag.slug}`}
        image={ogImage}
      />
      <Container as="main" noMargin>
        <article className="space-y-12">
          <div className="px-4 space-y-4">
            <Heading noMargin className="space-x-2">
              <span className={classNames('font-bold', mainColor)}>{count}</span> Post
              {count > 1 ? 's ' : ' '}
              in
              <span
                className={classNames(
                  'inline-block rounded-md px-4 py-1 text-3xl font-semibold',
                  bg,
                  text
                )}>
                {title}
              </span>
            </Heading>
            {description && <p className="mb-12 text-xl text-gray-800">{description}</p>}
          </div>
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.id}>
                <PostListItem post={post} />
              </li>
            ))}
          </ul>
        </article>
      </Container>
    </Layout>
  );
}

export default TagDetail;
