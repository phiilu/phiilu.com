import { Heading } from '@react/Heading';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
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
    data: { title, image, link }
  },
  children
}: GearItemProps) {
  return (
    <div className="flex flex-col h-full gap-4 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-800/50 dark:shadow-none">
      {image && (
        <a className="group" href={link || '#'}>
          <div
            className={
              'transition-colors duration-300 h-56 overflow-hidden flex relative items-center justify-center p-4 rounded-md group-hover:bg-gray-100 dark:group-hover:bg-gray-700'
            }
          >
            <img
              className="object-contain max-w-full max-h-full"
              src={image}
              alt={title}
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 transition-transform duration-300 transform translate-y-full bg-gray-100 shadow-xl group-hover:translate-y-0 dark:bg-gray-700">
              <p className="px-4 py-2 text-sm">Clicking will redirect to the product page</p>
            </div>
          </div>
        </a>
      )}
      <div className="flex flex-col flex-1 space-y-4">
        <Heading noMargin size="h3">
          {title}
        </Heading>
        <div className="prose">{children}</div>
        {link && <ProductLink href={link} />}
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
    data: { link, image, title, label }
  },
  children
}: SoftwareGearItemProps) {
  return (
    <div className="flex flex-col h-full gap-4 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm dark:border-gray-700 dark:shadow-none dark:bg-gray-800/50">
      <div className="flex items-center gap-4">
        <a className="flex-none" href={link || '#'}>
          <img className="object-contain w-14 h-14" src={image} alt={title} loading="lazy" />
        </a>
        <div>
          <Heading noMargin size="h3">
            {title}
          </Heading>
          {label && (
            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              {label}
            </p>
          )}
        </div>
      </div>
      <div className="flex-1">{children}</div>
      <ProductLink href={link || '#'} />
    </div>
  );
}

function ProductLink({ href }: HTMLProps<HTMLAnchorElement>) {
  return (
    <a
      className={'flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400'}
      href={href}
    >
      Open site
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
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
