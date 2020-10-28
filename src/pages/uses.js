import Layout from '@components/Layout/Layout';
import Head from '@components/Head/Head';
import Container from '@components/Container/Container';
import Markdown from '@components/Markdown/Markdown';

import usesMarkdown from '@md/uses.md';
import getOgImage from '@lib/getOgImage';

export async function getStaticProps() {
  const title = "Phiilu's Blog";
  const ogImage = await getOgImage(`/phiilu.com?title=${title}&url=${process.env.BASE_URL}/`);

  return {
    props: { ogImage }
  };
}

const Uses = ({ ogImage }) => {
  return (
    <>
      <Head title="Uses" url={`/uses`} image={ogImage} />
      <Layout>
        <Container as="main" className="space-y-4 xl:space-y-0">
          <div className="space-y-12">
            <Markdown>{usesMarkdown}</Markdown>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Uses;
