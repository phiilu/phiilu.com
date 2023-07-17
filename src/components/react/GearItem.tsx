import { Button } from '@react/Button';
import { Heading } from '@react/Heading';
import type { AstroComponentFactory } from 'astro/dist/runtime/server';
import type { CollectionEntry } from 'astro:content';
import type { HTMLProps, ReactNode } from 'react';

export type GearCollectionEntryRendered = {
  Content: AstroComponentFactory;
} & CollectionEntry<'gear'>;

interface GearItemProps {
  gear: GearCollectionEntryRendered;
  children: ReactNode;
}

export function GearItem({
  gear: {
    data: { title, affiliateLink, affilateLinkText, image, link }
  },
  children
}: GearItemProps) {
  return (
    <div className="space-y-4">
      <div className={'grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-8 lg:gap-y-4'}>
        <a className="group" href={affiliateLink || link || '#'}>
          <div
            className={
              'transition-colors duration-300 h-full overflow-hidden flex relative items-center justify-center p-4 rounded-md bg-gray-100 group-hover:bg-gray-300 dark:bg-gray-800 dark:group-hover:bg-gray-700'
            }>
            <img className="flex justify-center" src={image} alt={title} />
            <div className="absolute bottom-0 left-0 right-0 transition-transform duration-300 transform translate-y-full bg-gray-100 shadow-xl group-hover:translate-y-0 dark:bg-gray-800">
              <p className="px-4 py-2 text-sm">
                {affiliateLink
                  ? 'Clicking will redirect using the affiliate link'
                  : 'Clicking will redirect to product page'}
              </p>
            </div>
          </div>
        </a>
        <div className="flex flex-col space-y-4 lg:col-span-2">
          <Heading noMargin size="h3">
            {title}
          </Heading>
          <div className="lg:col-span-2 prose lg:prose-lg dark:prose-dark">{children}</div>
          {link && <ProductLink href={link}>Homepage</ProductLink>}
          {affiliateLink && (
            <div className="flex items-end flex-1 max-w-sm">
              <Button as={'a'} href={affiliateLink} variant="secondary">
                {affilateLinkText || 'Buy'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SoftwareGearItemProps {
  gear: GearCollectionEntryRendered;
  children: ReactNode;
}

export function SoftwareGearItem({
  gear: {
    data: { link, image, title }
  },
  children
}: SoftwareGearItemProps) {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
      <a href={link || '#'}>
        <div
          className={
            'flex-none flex justify-center p-4 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 w-24 h-24'
          }>
          <img className="flex justify-center" src={image} alt={image} />
        </div>
      </a>
      <div className="space-y-4">
        <Heading noMargin size="h3">
          {title}
        </Heading>
        <div className="col-span-2">{children}</div>
        <ProductLink href={link || '#'}>Homepage</ProductLink>
      </div>
    </div>
  );
}

function ProductLink({ href }: HTMLProps<HTMLAnchorElement>) {
  return (
    <a className={'flex items-center gap-2 font-bold text-indigo-500'} href={href}>
      Product Details
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
    </a>
  );
}
