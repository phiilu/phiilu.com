import React from 'react';
import Container from '@components/Container/Container';
import Link from '@components/Link/Link';
import classNames from 'classnames';
import { useScroll } from '@hooks/useScroll';

const activeClassName = 'bg-cool-gray-100 rounded-md';

const Header = () => {
  const [scrolled] = useScroll();

  return (
    <>
      <div
        className={classNames('fixed top-0 left-0 z-20 h-2 bg-indigo-500 bg-opacity-75', {
          'rounded-r-full': scrolled !== 100
        })}
        style={{ width: `${scrolled}%` }}
      />
      <Container as="header" className="w-full pt-10 pb-16">
        <nav className="flex items-center space-x-8">
          <Link to="/">
            <h1 className="text-2xl font-semibold tracking-tight text-indigo-600 font-open-sans">
              Phiilu
            </h1>
          </Link>
          <ul className="flex space-x-2">
            <li>
              <Link to="/articles" className="px-4 py-2" activeClassName={activeClassName}>
                <span className="font-semibold text-md font-open-sans">All Articles</span>
              </Link>
            </li>
            <li>
              <Link to="/uses" className="px-4 py-2" activeClassName={activeClassName}>
                <span className="font-semibold text-md font-open-sans">Uses</span>
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </>
  );
};

export default Header;
