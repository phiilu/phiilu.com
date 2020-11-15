import Head from '@components/Head/Head';
import Container from '@components/Container/Container';
import Markdown from '@components/Markdown/Markdown';
import { slideInUp } from '@helpers/animation';
import { motion } from 'framer-motion';

import usesMarkdown from '@md/uses.md';
import getOgImage from '@lib/getOgImage';

export async function getStaticProps() {
  const title = "Phiilu's Blog";
  const ogImage = await getOgImage(`/phiilu.com?title=${title}&url=${process.env.BASE_URL}/`);
  const baseUrl = process.env.BASE_URL;

  return {
    props: { ogImage, baseUrl }
  };
}

const Uses = ({ ogImage, baseUrl }) => {
  return (
    <>
      <Head title="Uses" url={`${baseUrl}/uses`} image={ogImage} />
      <Container as="main" className="space-y-4 xl:space-y-0">
        <motion.div className="space-y-12 md:px-4" variants={slideInUp}>
          <Markdown>{usesMarkdown}</Markdown>
        </motion.div>
      </Container>
    </>
  );
};

export default Uses;
