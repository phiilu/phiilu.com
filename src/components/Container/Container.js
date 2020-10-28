import React from 'react';
import classNames from 'classnames';

const Container = ({ as, noMargin, children, className }) => {
  const Element = { as };

  return (
    <Element.as
      className={classNames(
        'container max-w-3xl mx-auto xl:max-w-5xl',
        { 'px-4 xl:px-0': !noMargin },
        className
      )}>
      {children}
    </Element.as>
  );
};
Container.defaultProps = {
  noMargin: false,
  as: 'div',
  className: ''
};

export default Container;
