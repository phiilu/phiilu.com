import React from 'react';
import Container from '@components/Container/Container';
import Link from '@components/Link/Link';
import classNames from 'classnames';
import { useScroll } from '@hooks/useScroll';
import { motion, AnimateSharedLayout } from 'framer-motion';

import { spring } from '@helpers/animation';

function MenuItem({ onHoverStart, onHoverEnd, onClick, active, children }) {
  return (
    <motion.li
      className="relative"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}>
      {children}
      {active && <SharedHover />}
    </motion.li>
  );
}

function SharedHover() {
  return (
    <motion.div
      initial={false}
      transition={spring}
      layoutId="hover"
      className="absolute left-0 right-0 rounded-md bg-cool-gray-100 dark:bg-cool-gray-800"
      style={{
        top: -7,
        bottom: -7,
        left: 0,
        right: 0
      }}
    />
  );
}

function HeaderLink({ to, children }) {
  return (
    <Link
      to={to}
      className="relative z-10 inline-block px-2 py-2 text-center transition-colors duration-100 ease-in-out rounded-md sm:inline md:px-4">
      <span className="font-semibold text-md font-open-sans">{children}</span>
    </Link>
  );
}

const menuItems = [
  {
    index: 0,
    to: '/articles',
    name: 'All Articles'
  },
  {
    index: 1,
    to: '/about-me',
    name: 'About Me'
  },
  {
    index: 2,
    to: '/uses',
    name: 'Uses'
  }
];

function getActiveIndex(pathname) {
  return menuItems.findIndex((item) => item.to === pathname);
}

const Header = ({ route }) => {
  const [scrolled] = useScroll();
  const [activeHoverIndex, setActiveHoverIndex] = React.useState(() => getActiveIndex(route));
  const hasClicked = React.useRef(false);
  const hasHover = React.useRef(false);

  const handleOnClicked = () => {
    hasClicked.current = true;
  };
  const handleOnHoverStart = React.useCallback(
    (index) => () => {
      hasHover.current = true;
      setActiveHoverIndex(index);
    },
    []
  );
  function handleOnHoverEnd() {
    if (hasClicked.current) {
      return;
    }
    const index = getActiveIndex(route);

    // if we are on the homepage check if there is a hover state on another
    // item, otherwise we set the activeIndex to -1 and remove the hover
    // active/state
    //
    // else set the hover index
    if (index < 0) {
      setTimeout(() => {
        if (hasHover.current) return;
        setActiveHoverIndex(index);
      }, 500);
    } else {
      setActiveHoverIndex(index);
    }

    hasHover.current = false;
  }

  React.useEffect(() => {
    hasClicked.current = false;
    setActiveHoverIndex(getActiveIndex(route));
  }, [route]);

  return (
    <>
      <div
        className={classNames(
          'fixed top-0 left-0 z-20 h-2 bg-indigo-500 bg-opacity-75 dark:bg-indigo-800',
          {
            'rounded-r-full': scrolled !== 100
          }
        )}
        style={{ width: `${scrolled}%` }}
      />
      <Container as="header" className="w-full py-8 md:pb-16 md:pt-10">
        <nav className="flex flex-wrap items-center px-4 py-4 space-y-6 bg-white dark:bg-gray-900 md:space-y-0 md:flex-no-wrap rounded-xl">
          <Link to="/" className="flex-1" scroll={false}>
            <h1 className="text-4xl font-semibold tracking-tight text-center text-indigo-600 dark:text-indigo-500 md:text-2xl font-open-sans md:text-left">
              Phiilu
            </h1>
          </Link>
          <AnimateSharedLayout>
            <ul className="flex items-center justify-center flex-none w-full space-x-2 place-items-center md:w-auto">
              {menuItems.map(({ to, name, index }) => (
                <MenuItem
                  key={index}
                  active={activeHoverIndex === index}
                  onHoverStart={handleOnHoverStart(index)}
                  onHoverEnd={handleOnHoverEnd}
                  onClick={handleOnClicked}>
                  <HeaderLink to={to}>{name}</HeaderLink>
                </MenuItem>
              ))}
            </ul>
          </AnimateSharedLayout>
        </nav>
      </Container>
    </>
  );
};

export default Header;
