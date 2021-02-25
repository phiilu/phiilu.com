import Head from '@components/Head/Head';
import Container from '@components/Container/Container';
import { slideInUp } from '@helpers/animation';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import contentful from '@lib/contentful';
import getOgImage from '@lib/getOgImage';
import Heading from '@components/Heading/Heading';
import Link from '@components/Link/Link';
import Button from '@components/Button/Button';

const Markdown = dynamic(() => import('@components/Markdown/Markdown'));

const CategoryIcons = {
  Hardware: (
    <svg
      className="w-8 h-8 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    </svg>
  ),
  Software: (
    <svg
      className="w-8 h-8 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  Office: (
    <svg
      className="w-8 h-8 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  Lifestyle: (
    <svg
      className="w-8 h-8 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )
};

export async function getStaticProps() {
  const title = "Phiilu's Blog";
  const ogImage = await getOgImage(`/phiilu.com/post?title=${title}&url=${process.env.BASE_URL}/`);
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
                      'transition-colors duration-300 h-full overflow-hidden flex relative items-center justify-center p-4 rounded-md bg-gray-100 group-hover:bg-gray-300 dark:bg-gray-800 dark:group-hover:bg-gray-700'
                    )}>
                    <img
                      className="flex justify-center"
                      src={image.fields.file.url}
                      alt={image.fields.title}
                    />
                    <div className="absolute bottom-0 left-0 right-0 transition-transform duration-300 transform translate-y-full bg-gray-100 shadow-xl group-hover:translate-y-0 dark:bg-gray-800">
                      <p className="px-4 py-2 text-sm">
                        {affiliateLink
                          ? 'Clicking will redirect using the affiliate link'
                          : 'Clicking will redirect to product page'}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col space-y-4 lg:col-span-2">
                  <Heading noMargin size="h3">
                    {title}
                  </Heading>
                  <Markdown className="lg:col-span-2">{description}</Markdown>
                  {link && <ProductLink to={link}>Product Details</ProductLink>}
                  {affiliateLink && (
                    <div className="flex items-end flex-1 max-w-sm">
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
                    </div>
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
              <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
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
  return (
    <>
      <Head title="My Gear / Uses" url={`${baseUrl}/uses`} image={ogImage} />
      <Container as="main" className="space-y-4 xl:space-y-0">
        <motion.div className="space-y-12 md:px-4" variants={slideInUp}>
          <Heading noMargin>My Gear</Heading>
          <p className="text-lg">
            Inspired by{' '}
            <Link className="font-bold text-indigo-500" to="https://uses.tech/">
              many others
            </Link>{' '}
            I created a list on hardware, software and equipment I use daily to make my life easier.
          </p>

          {Object.entries(gearByCategory).map(([category, { items }]) => {
            return (
              <div key={category} className="relative space-y-4">
                <Heading size="h2" className="flex items-center">
                  {CategoryIcons[category]}
                  {category}
                </Heading>
                {category === 'Software' ? (
                  <SoftwareItems items={items} />
                ) : (
                  <GeneralItems items={items} />
                )}
              </div>
            );
          })}

          <div className="p-4 bg-blue-200 rounded-md dark:bg-blue-300 dark:border-blue-900">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-blue-400 dark:text-blue-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3 space-y-2">
                <p className="text-sm text-blue-800 dark:text-blue-900">
                  If you click <strong>Buy</strong> or <strong>the image</strong> you will get
                  redirected to a page where you can buy the product using an{' '}
                  <strong>affilated link</strong>.
                </p>

                <p className="text-sm text-blue-800 dark:text-blue-900">
                  An affilate link will not increase your price, but it will get me a small
                  commission and helps me out :)
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
