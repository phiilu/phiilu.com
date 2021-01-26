import Head from '@components/Head/Head';
import Container from '@components/Container/Container';
import Markdown from '@components/Markdown/Markdown';
import { slideInUp } from '@helpers/animation';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import contentful from '@lib/contentful';
import getOgImage from '@lib/getOgImage';
import Heading from '@components/Heading/Heading';
import Link from '@components/Link/Link';
import Button from '@components/Button/Button';

export async function getStaticProps() {
  const title = "Phiilu's Blog";
  const ogImage = await getOgImage(`/phiilu.com?title=${title}&url=${process.env.BASE_URL}/`);
  const baseUrl = process.env.BASE_URL;

  const gear = await contentful.getEntries('gear', { order: 'fields.title' });
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

  console.log(gear);

  const sortedGearByCategory = {
    Hardware: gearByCategory.Hardware,
    Software: gearByCategory.Software,
    Office: gearByCategory.Office,
    Lifestyle: gearByCategory.Lifestyle
  };

  return {
    props: { ogImage, baseUrl, gearByCategory: sortedGearByCategory }
  };
}

function GeneralItems({ items }) {
  return (
    <ul>
      {items.map(({ id, title, description, image, link, affiliateLink, affiliateLinkText }) => {
        return (
          <li key={id}>
            <div>
              <Heading size="h3">{title}</Heading>
              <div className={classNames('grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-8')}>
                <Link
                  className="group"
                  to={affiliateLink || link}
                  tracking={{
                    event: 'click',
                    name: 'Affiliate Link',
                    value: affiliateLink
                  }}>
                  <div
                    className={classNames(
                      'overflow-hidden flex relative items-center justify-center p-4 rounded-md bg-gray-100 dark:bg-gray-800'
                    )}>
                    <img
                      className="flex justify-center"
                      src={image.fields.file.url}
                      alt={image.fields.title}
                    />
                    <div className="absolute bottom-0 left-0 right-0 transition-transform duration-300 transform translate-y-full bg-gray-300 shadow-xl group-hover:translate-y-0 dark:bg-gray-700">
                      <p className="px-4 py-2 text-sm">
                        Clicking will redirect using the affiliate link
                      </p>
                    </div>
                  </div>
                </Link>
                <Markdown className="lg:col-span-2">{description}</Markdown>
                <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:col-start-2">
                  {link && (
                    <Button as={Link} to={link}>
                      Product Details
                    </Button>
                  )}
                  {affiliateLink && (
                    <Button
                      as={Link}
                      to={affiliateLink}
                      variant="secondary"
                      tracking={{
                        event: 'click',
                        name: 'Affiliate Link',
                        value: affiliateLink
                      }}>
                      {affiliateLinkText || 'Buy'}
                    </Button>
                  )}
                </div>
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
    <>
      <ul className="grid gap-8 lg:grid-cols-2">
        {items.map(({ id, title, description, image, link }) => {
          return (
            <li key={id}>
              <div className="flex flex-col gap-8 lg:flex-row">
                <Link to={link}>
                  <div
                    className={classNames(
                      'flex-none flex justify-center p-4 rounded-md bg-gray-100 dark:bg-gray-800 w-24 h-24'
                    )}>
                    <img
                      className="flex justify-center"
                      src={image.fields.file.url}
                      alt={image.fields.title}
                    />
                  </div>
                </Link>
                <div className="space-y-4">
                  <Heading noMargin size="h3">
                    {title}
                  </Heading>
                  <Markdown className="col-span-2 xl:h-44">{description}</Markdown>
                  <div className="grid gap-4 xl:grid-cols-2 xl:col-span-2 xl:col-start-2">
                    <Button as={Link} to={link}>
                      Visit Homepage
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const Uses = ({ ogImage, baseUrl, gearByCategory }) => {
  console.log(gearByCategory);
  return (
    <>
      <Head title="Uses" url={`${baseUrl}/uses`} image={ogImage} />
      <Container as="main" className="space-y-4 xl:space-y-0">
        <motion.div className="space-y-12 md:px-4" variants={slideInUp}>
          <Heading>My Gear</Heading>
          {Object.entries(gearByCategory).map(([category, { items }]) => {
            return (
              <div key={category} className="space-y-4">
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
