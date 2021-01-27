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

function ProductLink({ children, className, to }) {
  return (
    <Link
      className={classNames('flex items-center gap-2 font-bold text-indigo-500', className)}
      to={to}>
      {children}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </Link>
  );
}

function GeneralItems({ items }) {
  return (
    <ul className="space-y-12">
      {items.map(({ id, title, description, image, link, affiliateLink, affiliateLinkText }) => {
        return (
          <li key={id}>
            <div className="space-y-4">
              <Heading noMargin size="h3">
                {title}
              </Heading>
              <div
                className={classNames(
                  'grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-8 lg:gap-y-4'
                )}>
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
                        {affiliateLink
                          ? 'Clicking will redirect using the affiliate link'
                          : 'Clicking will redirect to product page'}
                      </p>
                    </div>
                  </div>
                </Link>
                <Markdown className="lg:col-span-2">{description}</Markdown>
                {link && (
                  <ProductLink className="justify-center" to={link}>
                    Product Details
                  </ProductLink>
                )}
                <div className="lg:col-start-2 ma">
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
      <ul className="grid gap-8">
        {items.map(({ id, title, description, image, link }) => {
          return (
            <li key={id}>
              <div className="flex gap-8 lg:flex-row">
                <Link to={link}>
                  <div
                    className={classNames(
                      'flex-none flex justify-center p-4 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 w-24 h-24'
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
                  <Markdown className="col-span-2">{description}</Markdown>
                  <ProductLink to={link}>Homepage</ProductLink>
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
      <Head title="My Gear / Uses" url={`${baseUrl}/uses`} image={ogImage} />
      <Container as="main" className="space-y-4 xl:space-y-0">
        <motion.div className="space-y-12 md:px-4" variants={slideInUp}>
          <Heading>My Gear</Heading>
          <p className="text-lg">
            Inspired by{' '}
            <Link className="font-bold text-indigo-500" to="https://uses.tech/">
              many other people
            </Link>{' '}
            I created a list on hardware, software and equipment I use daily to make my life easier.
          </p>

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

          <div className="p-4 border-l-4 border-amber-400 rounded-r-md bg-amber-200 dark:bg-amber-300 dark:border-amber-900">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-amber-500 dark:text-amber-800"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3 space-y-2">
                <p className="text-sm text-amber-800 dark:text-amber-900">
                  If you click <strong>Buy</strong> or <strong>the image</strong> you will get
                  redirected to a page where you can buy the product using an{' '}
                  <strong>affilated link</strong>.
                </p>

                <p className="text-sm text-amber-800 dark:text-amber-900">
                  An affilate link will not increase your price, but it will gain me a small
                  commission if you buy it through my link..
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </>
  );
};

export default Uses;
