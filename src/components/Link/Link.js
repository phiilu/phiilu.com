import React from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import trackEvent from '@helpers/tracking';

const Link = ({ children, activeClassName, to, className, tracking, ...props }) => {
  const { pathname } = useRouter();

  function handleOutboundLinkClicked() {
    trackEvent({ event: 'click', name: 'Outbound Link', value: to });
    handleTracking();
  }

  function handleTracking() {
    if (tracking) {
      trackEvent(tracking);
    }
  }

  if (to.startsWith('http')) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        href={to}
        className={classNames(className, {
          [activeClassName]: pathname === to
        })}
        onClick={handleOutboundLinkClicked}>
        {children}
      </a>
    );
  }

  return (
    <NextLink {...props} href={to} onClick={handleTracking}>
      <a
        className={classNames(className, {
          [activeClassName]: pathname === to
        })}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
