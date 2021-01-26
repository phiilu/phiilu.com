import Head from '@components/Head/Head';
import Container from '@components/Container/Container';
import Markdown from '@components/Markdown/Markdown';
import { slideInUp } from '@helpers/animation';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import contentful from '@lib/contentful';
import getOgImage from '@lib/getOgImage';
import Heading from '@components/Heading/Heading';

export async function getStaticProps() {
  const title = "Phiilu's Blog";
  const ogImage = await getOgImage(`/phiilu.com?title=${title}&url=${process.env.BASE_URL}/`);
  const baseUrl = process.env.BASE_URL;

  const gear = await contentful.getEntries('gear');
  const gearByCategory = gear.reduce((accu, gearItem) => {
    if (accu[gearItem.category]) {
      accu[gearItem.category].items.push(gearItem);
    } else {
      accu[gearItem.category] = {
        items: [gearItem]
      };
    }
    return accu;
  }, {});

  return {
    props: { ogImage, baseUrl, gearByCategory }
  };
}

function GeneralItems({ items }) {
  return (
    <ul>
      {items.map(({ id, title, description, image }) => {
        return (
          <li key={id}>
            <div>
              <Heading size="h3">{title}</Heading>
              <div className={classNames('grid grid-cols-3 gap-8')}>
                <div
                  className={classNames(
                    'flex items-center justify-center p-4 rounded-md dark:bg-gray-800'
                  )}>
                  <img
                    className="flex justify-center"
                    src={image.fields.file.url}
                    alt={image.fields.title}
                  />
                </div>
                <Markdown className="col-span-2">{description}</Markdown>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function SoftwareItems({ items }) {
  return (
    <ul className={classNames('grid grid-cols-3 gap-8')}>
      {items.map(({ id, title, description, image }) => {
        return (
          <li key={id}>
            <div>
              <div
                className={classNames(
                  'flex justify-center p-4 rounded-md dark:bg-gray-800 w-24 h-24'
                )}>
                <img
                  className="flex justify-center"
                  src={image.fields.file.url}
                  alt={image.fields.title}
                />
              </div>
              <Heading size="h3">{title}</Heading>
              <Markdown className="col-span-2">{description}</Markdown>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const Uses = ({ ogImage, baseUrl, gearByCategory }) => {
  console.log(gearByCategory);
  return (
    <>
      <Head title="Uses" url={`${baseUrl}/uses`} image={ogImage} />
      <Container as="main" className="space-y-4 xl:space-y-0">
        <motion.div className="space-y-12 md:px-4" variants={slideInUp}>
          {/* <Markdown>{usesMarkdown}</Markdown> */}
          <Heading>My Gear / Uses</Heading>
          {Object.entries(gearByCategory).map(([category, { items }]) => {
            return (
              <div key={category}>
                <Heading size="h2">{category}</Heading>
                {category === 'Software' ? (
                  <SoftwareItems items={items} />
                ) : (
                  <GeneralItems items={items} />
                )}
              </div>
            );
          })}
        </motion.div>
      </Container>
    </>
  );
};

export default Uses;
