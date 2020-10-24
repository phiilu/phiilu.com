import Container from '@components/Container/Container';
import Layout from '@components/Layout/Layout';
import Head from '@components/Head/Head';
import PostListItem from '@components/PostListItem/PostListItem';
import Link from '@components/Link/Link';
import format from 'date-fns/format';

import contentful from '@lib/contentful';

import meImage from '@images/me.jpeg?resize&size=400&trace';
import meImageTrace from '@images/me.jpeg?trace';

export async function getStaticProps() {
  const res = await contentful.getEntries('post');
  const posts = await res.map(({ sys, fields }) => {
    const { id } = sys;
    const tags = fields.tags.map((tag) => tag.fields);
    const icon = {
      url: fields.icon.fields.file.url,
      alt: fields.icon.fields.title
    };
    const { title, slug, description, published, publishedDate } = fields;
    const date = format(new Date(publishedDate), 'MMMM dd, yyyy');

    return { id, slug, title, description, icon, tags, published, date };
  });

  return {
    props: { posts }
  };
}

export default function IndexPage({ posts }) {
  return (
    <>
      <Head title="Phiilu's Blog" />
      <Layout>
        <Container as="main" noMargin className="px-4 space-y-14">
          <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-indigo-100 rounded-lg shadow-sm md:space-x-8 md:p-12 md:space-y-0 md:flex-row">
            <picture className="relative flex-none w-40 h-40 rounded-full shadow-xl md:h-44 md:w-44">
              <img
                className="absolute flex-none object-cover w-40 h-40 rounded-full shadow-xl md:h-44 md:w-44"
                src={meImageTrace.trace}
                alt="Me"
              />
              <img
                className="absolute flex-none object-cover w-40 h-40 rounded-full shadow-xl md:h-44 md:w-44"
                src={meImage}
                alt="Me"
              />
            </picture>
            <div className="space-y-2">
              <div className="space-y-1 space-y-2 text-xl leading-7 md:text-2xl md:leading-8 lg:text-3xl lg:leading-10">
                <h4 className="font-bold">
                  Hey, I&apos;m Florian <i className="font-medium">also known as</i>{' '}
                  <Link to="https://twitter.com/phiilu">@phiilu</Link>
                </h4>
                <h4>
                  I am a <strong className="font-bold">Frontend Developer</strong> from Austria
                  creating websites &amp; apps with{' '}
                  <Link to="https://reactjs.org/" className="font-semibold text-indigo-600">
                    React
                  </Link>
                </h4>
              </div>
            </div>
          </div>

          <div className="space-y-8 md:space-y-14">
            <div className="lg:text-center">
              <p className="text-base font-semibold leading-6 tracking-wide text-indigo-600 uppercase">
                Blog
              </p>
              <h1 className="mt-2 text-2xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                Latest Articles
              </h1>
              <p className="max-w-2xl mt-4 text-xl leading-9 text-gray-500 lg:mx-auto">
                Here are my latest written articles I hope you like them! <br /> I write about
                programming and server related topics.
              </p>
            </div>

            <ul className="space-y-8">
              {posts.map((post) => (
                <li key={post.id}>
                  <PostListItem post={post} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Layout>
    </>
  );
}
