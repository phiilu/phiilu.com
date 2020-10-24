import React from 'react';
import classNames from 'classnames';

const Sizes = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6'
};

const Heading = ({ as, size, children, noMargin, className, ...props }) => {
  const Element = { as: as || size };

  return (
    <Element.as
      className={classNames(
        'font-source-sans-pro tracking-tight text-gray-900',
        {
          'text-4xl font-extrabold': size === Sizes.h1,
          'text-3xl font-bold leading-relaxed': size === Sizes.h2,
          'text-2xl font-bold leading-relaxed': size === Sizes.h3,
          'text-xl font-bold leading-normal': size === Sizes.h4,
          'text-lg font-bold leading-snug': size === Sizes.h5,
          'text-md font-bold leading-tight': size === Sizes.h6
        },
        {
          'mt-12 mb-6': !noMargin
        },
        className
      )}
      {...props}>
      {children}
    </Element.as>
  );
};
Heading.defaultProps = {
  as: undefined,
  size: Sizes.h1,
  className: ''
};

export default Heading;
