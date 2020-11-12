import Container from '@components/Container/Container';
import Layout from '@components/Layout/Layout';
import Head from '@components/Head/Head';
import PostListItem from '@components/PostListItem/PostListItem';
import Link from '@components/Link/Link';
import Heading from '@components/Heading/Heading';
import Button from '@components/Button/Button';
import Newsletter from '@components/Newsletter/Newsletter';
import SectionHeading from '@components/SectionHeading/SectionHeading';
import Image from 'next/image';

import contentful from '@lib/contentful';
import getOgImage from '@lib/getOgImage';
import generateRssFeed from '@lib/rss';
import generateSitemap from '@lib/sitemap';
import { POST_LIST_ITEM_FIELDS } from '@helpers/transformPost';

export async function getStaticProps() {
  const title = "Phiilu's Blog";
  const posts = await contentful.getEntries(
    'post',
    { order: '-fields.publishedDate', limit: 5 },
    POST_LIST_ITEM_FIELDS
  );
  const ogImage = await getOgImage(`/phiilu.com?title=${title}&url=${process.env.BASE_URL}/`);
  const baseUrl = process.env.BASE_URL;

  await generateRssFeed();
  await generateSitemap();

  return {
    props: { posts, ogImage, baseUrl }
  };
}

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center p-6 mx-4 space-y-4 bg-indigo-100 rounded-lg shadow-sm md:mx-0 md:space-x-8 xl:p-12 md:space-y-0 md:flex-row">
      <picture className="relative flex-none w-40 h-40 rounded-full shadow-xl md:h-44 md:w-44">
        <Image
          className="absolute flex-none object-cover w-40 h-40 rounded-full md:h-44 md:w-44"
          src={'/images/me.jpg'}
          alt="Me"
          width={176}
          height={176}
        />
      </picture>
      <div className="space-y-2">
        <div className="space-y-1 space-y-2 text-xl leading-7 md:text-2xl md:leading-8 lg:text-3xl lg:leading-10">
          <Heading size="h2" noMargin>
            Hey, I&apos;m Florian <i className="font-medium">also known as</i>{' '}
            <Link className="text-indigo-500" to="https://twitter.com/phiilu">
              @phiilu
            </Link>
          </Heading>
          <small>
            I am a <strong className="font-bold">Frontend Developer</strong> from Austria creating
            websites &amp; apps with{' '}
            <Link to="https://reactjs.org/" className="font-semibold text-indigo-600">
              React
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default function IndexPage({ posts, ogImage, baseUrl }) {
  return (
    <>
      <Head title="Home" description="Welcome to my blog!" image={ogImage} url={`${baseUrl}/`} />
      <Layout>
        <Container as="main" noMargin className="md:px-4 space-y-14">
          <Hero />
          <div className="space-y-8 md:space-y-14">
            <SectionHeading heading="Blog" subheading="Latest Articles">
              Here are my latest written articles, I hope you like them! <br /> I write about
              programming and server related topics.
            </SectionHeading>
            <ul className="space-y-16 md:space-y-8">
              {posts.map((post) => (
                <li key={post.id}>
                  <PostListItem post={post} />
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <Button as={Link} to="/articles" width="medium">
                View all
              </Button>
            </div>
          </div>
          <Newsletter />
        </Container>
      </Layout>
    </>
  );
}
