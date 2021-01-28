import React from 'react';
import classNames from 'classnames';
import trackEvent from '@helpers/tracking';

const defaultClassName =
  'flex justify-center items-center inline-block px-4 py-3 font-semibold text-center transition-colors duration-150 ease-in-out rounded-md border border-transparent rounded-md focus:outline-none focus:shadow-outline';
const primaryVariant = `bg-indigo-200 text-indigo-800 hover:bg-indigo-500 hover:text-white dark:bg-indigo-500 dark:text-indigo-100 dark:hover:bg-indigo-400`;
const twitterVariant = `bg-twitter-200 dark:bg-twitter-500 dark:text-white dark:hover:bg-twitter-400 text-twitter-800 hover:bg-twitter-500 hover:text-white`;
const hackerNewsVariant = `bg-hackernews-200 dark:bg-hackernews-500 dark:text-white dark:hover:bg-hackernews-400 text-hackernews-800 hover:bg-hackernews-500 hover:text-white`;
const secondaryVariant = `bg-green-200 text-green-800 hover:bg-green-500 hover:text-white dark:bg-green-300 dark:text-green-900 dark:hover:text-green-900 dark:hover:bg-green-200`;

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
        [secondaryVariant]: !raw && variant === 'secondary',
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
