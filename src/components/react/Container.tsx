import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface ContainerProps {
  as?: any;
  noMargin?: boolean;
  children: ReactNode;
  className?: string;
}

export const Container = ({
  as = 'div',
  noMargin = false,
  children,
  className = ''
}: ContainerProps) => {
  const Element = { as };

  return (
    <Element.as
      className={clsx(
        'container max-w-3xl mx-auto xl:max-w-5xl',
        { 'px-4 xl:px-0': !noMargin },
        className
      )}
    >
      {children}
    </Element.as>
  );
};
