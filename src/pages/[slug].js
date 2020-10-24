import React from 'react';

import Layout from '@components/Layout/Layout';
import Container from '@components/Container/Container';
import Markdown from '@components/Markdown/Markdown';
import contentful from '@lib/contentful';

export async function getStaticProps({ params: { slug } }) {
  const post = await contentful.getPostEntry(slug);

  return {
    props: { post }
  };
}

export async function getStaticPaths() {
  const res = await contentful.getEntries('post');
  const paths = await res.map(({ fields }) => {
    return { params: { slug: fields.slug } };
  });

  return {
    paths,
    fallback: false
  };
}

const PostDetails = ({ post }) => {
  return (
    <Layout>
      <Container>
        <h1>{post.title}</h1>
        <Markdown>{post.content}</Markdown>
      </Container>
    </Layout>
  );
};

export default PostDetails;
