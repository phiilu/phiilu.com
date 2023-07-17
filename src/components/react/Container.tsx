import { clsx } from 'clsx';

interface ContainerProps {
  as?: any;
  noMargin?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ as, noMargin, children, className }: ContainerProps) => {
  const Element = { as: as || 'div' };

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

Container.defaultProps = {
  noMargin: false,
  as: 'div',
  className: ''
};
