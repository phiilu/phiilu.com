import React from 'react';
import classNames from 'classnames';
import trackEvent from '@helpers/tracking';

const defaultClassName =
  'inline-block px-4 py-2 font-semibold text-center transition-colors duration-300 ease-in-out rounded-md';
const primaryVariant = `bg-indigo-200 text-indigo-800 hover:bg-indigo-500 hover:text-white`;
const twitterVariant = `bg-twitter-200 text-twitter-800 hover:bg-twitter-500 hover:text-white`;
const hackerNewsVariant = `bg-hackernews-200 text-hackernews-800 hover:bg-hackernews-500 hover:text-white`;

const Button = ({ as, variant, width, children, onClick, tracking, className, raw, ...props }) => {
  const Element = { as };

  function handleOnClick(event) {
    if (tracking) {
      trackEvent(tracking);
    }
    if (onClick) {
      onClick(event);
    }
  }

  return (
    <Element.as
      className={classNames(className, {
        [defaultClassName]: !raw,
        [primaryVariant]: !raw && variant === 'primary',
        [twitterVariant]: !raw && variant === 'twitter',
        [hackerNewsVariant]: !raw && variant === 'hackernews',
        'w-full': !raw && width === 'full',
        'px-8': !raw && width === 'medium'
      })}
      onClick={handleOnClick}
      {...props}>
      {children}
    </Element.as>
  );
};
Button.defaultProps = {
  as: 'button',
  variant: 'primary',
  width: 'full'
};

export default Button;
