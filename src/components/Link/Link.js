import NextLink from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const cn = 'link';

const Link = ({ children, activeClassName, to, className, ...props }) => {
  const { pathname } = useRouter();

  if (to.startsWith('http')) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        href={to}
        className={classNames(cn, className, {
          [activeClassName]: pathname === to
        })}>
        {children}
      </a>
    );
  }

  return (
    <NextLink {...props} href={to}>
      <a
        className={classNames(cn, className, {
          [activeClassName]: pathname === to
        })}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
