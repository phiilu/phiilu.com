import React from 'react';
import classNames from 'classnames';
import trackEvent from '@helpers/tracking';

const className =
  'inline-block px-4 py-2 font-semibold text-center transition-colors duration-300 ease-in-out rounded-md';
const primaryVariant = `bg-indigo-200 text-indigo-800 hover:bg-indigo-500 hover:text-white`;
const twitterVariant = `bg-twitter-200 text-twitter-800 hover:bg-twitter-500 hover:text-white`;
const hackerNewsVariant = `bg-hackernews-200 text-hackernews-800 hover:bg-hackernews-500 hover:text-white`;

const Button = ({ as, variant, width, children, onClick, tracking, ...props }) => {
  const Element = { as };

  function handleOnClick(event) {
    if (tracking) {
      trackEvent(tracking);
    }
    onClick(event);
  }

  return (
    <Element.as
      className={classNames(className, {
        [primaryVariant]: variant === 'primary',
        [twitterVariant]: variant === 'twitter',
        [hackerNewsVariant]: variant === 'hackernews',
        'w-full': width === 'full',
        'px-8': width === 'medium'
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
