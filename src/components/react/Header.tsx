import React, { ReactNode } from "react";
import clsx from "clsx";
import { Container } from "./Container";
import { useScroll } from "../../hooks/useScroll";
import { motion, EventInfo } from "framer-motion";
import { Banner } from "./Banner";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { PokezardsIcon } from "./icons/PokezardsIcon";
import { spring } from "../../helpers/animation";

interface MenuItemProps {
  onHoverStart: (event: MouseEvent, info: EventInfo) => void;
  onHoverEnd: (event: MouseEvent, info: EventInfo) => void;
  onClick: React.MouseEventHandler<HTMLLIElement>;
  active: boolean;
  children: ReactNode;
  href: string;
}

function MenuItem({
  onHoverStart,
  onHoverEnd,
  onClick,
  href,
  active,
  children,
}: MenuItemProps) {
  return (
    <motion.li
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
    >
      <a
        href={href}
        className="relative inline-block px-2 py-2 text-center transition-colors duration-100 ease-in-out rounded-md sm:inline md:px-4 font-semibold text-md font-open-sans"
      >
        {active && <SharedHover />}
        <span className="relative z-10 bg-blend-overlay">{children}</span>
      </a>
    </motion.li>
  );
}

function SharedHover() {
  return (
    <motion.div
      initial={false}
      transition={spring}
      layoutId="active-pill"
      className="absolute inset-0 rounded-md bg-slate-100 dark:bg-slate-800"
    />
  );
}

const menuItems = [
  {
    index: 0,
    href: "/blog",
    name: "Blog",
  },
  {
    index: 1,
    href: "/about-me",
    name: "About Me",
  },
  {
    index: 2,
    href: "/my-gear",
    name: "My Gear",
  },
];

function getActiveIndex(pathname: string) {
  return menuItems.findIndex((item) => item.href === pathname);
}

interface HeaderProps {
  route: string;
}

export const Header = ({ route }: HeaderProps) => {
  const [showBanner, setShowBanner] = useLocalStorage("show_banner", true);
  const [scrolled] = useScroll();
  const [activeHoverIndex, setActiveHoverIndex] = React.useState(() =>
    getActiveIndex(route),
  );
  const hasClicked = React.useRef(false);
  const hasHover = React.useRef(false);

  const handleOnClicked = () => {
    hasClicked.current = true;
  };
  const handleOnHoverStart = React.useCallback(
    (index: number) => () => {
      hasHover.current = true;
      setActiveHoverIndex(index);
    },
    [],
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
      {showBanner ? (
        <Banner
          icon={<PokezardsIcon className="w-8 h-8" />}
          ctaText={"Check it out"}
          ctaHref="//pokezards.com?ref=phiilu.com"
          text="Hey! If you like Pokémon TCG you might like my new project I am working on »Pokézards«"
          shortText="I am working on a new product!"
          onClose={() => setShowBanner(!showBanner)}
        />
      ) : null}
      <div
        className={clsx(
          "fixed top-0 left-0 z-20 h-2 bg-indigo-500 bg-opacity-75",
          {
            "rounded-r-full": scrolled !== 100,
          },
        )}
        style={{ width: `${scrolled}%` }}
      />
      <Container as="header" className="w-full py-8 md:pb-16 md:pt-10">
        <nav className="flex flex-wrap items-center px-4 py-4 space-y-6 bg-white dark:bg-gray-900 md:space-y-0 md:flex-no-wrap rounded-xl">
          <a href="/" className="flex-1">
            <h1 className="text-4xl font-semibold tracking-tight text-center text-indigo-600 dark:text-indigo-500 md:text-2xl font-open-sans md:text-left">
              Phiilu
            </h1>
          </a>
          <ul className="flex items-center justify-center flex-none w-full space-x-2 place-items-center md:w-auto">
            {menuItems.map(({ href, name, index }) => (
              <MenuItem
                href={href}
                key={index}
                active={activeHoverIndex === index}
                onHoverStart={handleOnHoverStart(index)}
                onHoverEnd={handleOnHoverEnd}
                onClick={handleOnClicked}
              >
                {name}
              </MenuItem>
            ))}
          </ul>
        </nav>
      </Container>
    </>
  );
};
