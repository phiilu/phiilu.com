import React from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import trackEvent from '@helpers/tracking';

const baseUrl = 'https://phiilu.com';

const Link = ({ children, activeClassName, to, className, tracking, ...props }) => {
  const { pathname } = useRouter();
  const href = React.useMemo(() => {
    if (to.startsWith(baseUrl)) {
      return to.replace(baseUrl, '');
    }
    return to;
  }, [to]);
  const hasActiveClassName = activeClassName && pathname === href;

  function handleOutboundLinkClicked() {
    trackEvent({ event: 'click', name: 'Outbound Link', value: to });
    handleTracking();
  }

  function handleTracking() {
    if (tracking) {
      trackEvent(tracking);
    }
  }

  if (href.startsWith('http')) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className={classNames(className, {
          [activeClassName]: hasActiveClassName
        })}
        onClick={handleOutboundLinkClicked}>
        {children}
      </a>
    );
  }

  return (
    <NextLink {...props} href={href} onClick={handleTracking}>
      <a
        className={classNames(className, {
          [activeClassName]: hasActiveClassName
        })}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
