import Container from '@components/Container/Container';
import Layout from '@components/Layout/Layout';
import Head from '@components/Head/Head';
import Link from '@components/Link/Link';

import contentful from '@lib/contentful';

export async function getStaticProps() {
  const res = await contentful.getEntries('post');
  const posts = await res.map(({ sys, fields }) => {
    const { id } = sys;
    const tags = fields.tags.map((tag) => tag.fields);
    return { ...fields, tags, id };
  });

  return {
    props: { posts }
  };
}

export default function IndexPage({ posts }) {
  // console.log(posts);
  return (
    <>
      <Head title="Phiilu's Blog" />
      <Layout>
        <Container>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </Layout>
    </>
  );
}
