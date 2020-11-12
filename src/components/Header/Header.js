import React from 'react';
import Container from '@components/Container/Container';
import Link from '@components/Link/Link';
import classNames from 'classnames';
import { useScroll } from '@hooks/useScroll';

const activeClassName = 'bg-cool-gray-100 rounded-md';

function HeaderLink({ to, children }) {
  return (
    <Link
      to={to}
      className="px-2 py-2 transition-colors duration-100 ease-in-out rounded-md md:px-4 hover:bg-cool-gray-100"
      activeClassName={activeClassName}>
      <span className="font-semibold text-md font-open-sans ">{children}</span>
    </Link>
  );
}

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
      <Container as="header" className="w-full py-8 md:pb-16 md:pt-10">
        <nav className="flex flex-wrap items-center px-4 py-4 space-y-6 bg-white md:space-y-0 md:flex-no-wrap rounded-xl">
          <Link to="/" className="w-full">
            <h1 className="text-4xl font-semibold tracking-tight text-center text-indigo-600 md:text-2xl font-open-sans md:text-left">
              Phiilu
            </h1>
          </Link>
          <ul className="flex items-center justify-center flex-none w-full space-x-2 place-items-center md:w-auto">
            <li>
              <HeaderLink to="/articles">All Articles</HeaderLink>
            </li>
            <li>
              <HeaderLink to="/about-me">About Me</HeaderLink>
            </li>
            <li>
              <HeaderLink to="/uses">Uses</HeaderLink>
            </li>
          </ul>
        </nav>
      </Container>
    </>
  );
};

export default Header;
