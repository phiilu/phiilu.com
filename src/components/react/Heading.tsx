import { clsx } from 'clsx';
import type { CSSProperties, ReactNode } from 'react';

interface HeadingProps {
  as?: any;
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: ReactNode;
  noMargin?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Heading = ({
  as,
  size = 'h1',
  children,
  noMargin,
  className = '',
  ...props
}: HeadingProps) => {
  const Element = { as: as || size };

  return (
    <Element.as
      className={clsx(
        'font-source-sans-pro tracking-tight text-gray-900 dark:text-gray-100',
        {
          'text-4xl xl:text-5xl font-extrabold leading-tight xl:leading-tight': size === 'h1',
          'text-3xl xl:text-4xl font-bold leading-snug xl:leading-snug': size === 'h2',
          'text-2xl xl:text-3xl font-bold leading-snug xl:leading-snug': size === 'h3',
          'text-xl xl:text-2xl font-bold leading-snug xl:leading-snug': size === 'h4',
          'text-lg xl:text-xl font-bold leading-snug xl:leading-snug': size === 'h5',
          'text-md xl:text-lg font-bold leading-snug xl:leading-snug': size === 'h6'
        },
        {
          'mt-12 mb-6': !noMargin
        },
        className
      )}
      {...props}
    >
      {children}
    </Element.as>
  );
};
