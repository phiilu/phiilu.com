import { Heading } from './Heading';

interface SectionHeadingProps {
  heading: string;
  subheading: string;
  children: React.ReactNode;
}

export function SectionHeading({ heading, subheading, children }: SectionHeadingProps) {
  return (
    <div className="mx-4 md:mx-0 lg:text-center">
      <p className="font-semibold leading-6 tracking-wide text-indigo-600 uppercase text-md xl:text-xl xl:leading-6 dark:text-indigo-500">
        {heading}
      </p>
      <Heading noMargin>{subheading}</Heading>
      <p className="max-w-2xl mt-4 text-xl leading-9 text-gray-500 xl:text-xl dark:text-gray-100 lg:mx-auto xl:leading-9">
        {children}
      </p>
    </div>
  );
}
