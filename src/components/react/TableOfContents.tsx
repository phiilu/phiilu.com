import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { clsx } from 'clsx';
import { List, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { spring } from '@/helpers/animation';
import { useReduceMotion } from '@/hooks/useReduceMotion';
import type { MarkdownHeading } from 'astro';

// A heading counts as "current" once its top passes this far below the
// viewport top. Matches the `scroll-margin-top` the anchors jump to.
const TRIGGER_LINE = 120;

// Distance from the bottom edge that keeps the button in thumb reach.
const THUMB_GAP = 24;
// The banner's own `bottom-5` offset.
const BANNER_INSET = 20;

// Headless UI owns a boolean `transition` prop on PopoverPanel, so the panel's
// timing travels inside its variants instead.
const PANEL_TRANSITION = { duration: 0.15, ease: 'easeOut' } as const;

interface TableOfContentsProps {
  headings: MarkdownHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const items = headings.filter((heading) => heading.depth === 2 || heading.depth === 3);
  const activeId = useActiveHeading(items);
  const reduceMotion = useReduceMotion();
  const bannerClearance = useBannerClearance();

  // Two headings are not worth a sidebar of their own.
  if (items.length < 3) return null;

  return (
    <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>
      {/*
        Sits in the article's left gutter, outside the content box. The wrapper
        spans the article so the nav starts level with it and stops at its end;
        the nav itself sticks once it reaches the top. Only 2xl viewports have
        the room for a gutter this wide.
      */}
      <div className="absolute inset-y-0 hidden w-48 -left-52 2xl:block">
        <nav
          aria-label="Table of contents"
          className="sticky overflow-y-auto top-32 max-h-[calc(100vh-10rem)]"
        >
          <TocHeading />
          <TocList items={items} activeId={activeId} />
        </nav>
      </div>

      {/*
        Button and panel share one fixed wrapper: the panel is absolute inside
        it, so an open table of contents stays put while the page scrolls.
      */}
      <div
        className="fixed z-30 right-6 transition-all 2xl:hidden"
        style={{ bottom: bannerClearance }}
      >
        <Popover>
          {({ open }) => (
            <>
              <PopoverButton className="relative flex items-center justify-center transition-colors bg-white rounded-full shadow-lg h-14 w-14 text-slate-600 ring-1 ring-black/5 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-gray-800 dark:text-slate-300 dark:ring-white/10 dark:hover:bg-gray-700">
                {/* Both icons overlap so the swap crossfades instead of queueing. */}
                <AnimatePresence initial={false}>
                  <motion.span
                    key={open ? 'close' : 'open'}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {open ? (
                      <X className="w-6 h-6" aria-hidden="true" />
                    ) : (
                      <List className="w-6 h-6" aria-hidden="true" />
                    )}
                  </motion.span>
                </AnimatePresence>
                <span className="sr-only">
                  {open ? 'Close table of contents' : 'Open table of contents'}
                </span>
              </PopoverButton>
              <AnimatePresence>
                {open && (
                  <PopoverPanel
                    static
                    as={motion.div}
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: PANEL_TRANSITION }}
                    exit={{ opacity: 0, y: 8, scale: 0.96, transition: PANEL_TRANSITION }}
                    className="absolute right-0 p-4 mb-3 overflow-y-auto origin-bottom-right bg-white shadow-xl bottom-full w-72 max-h-[60vh] rounded-xl ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10"
                  >
                    <TocHeading />
                    <TocList items={items} activeId={activeId} mobile />
                  </PopoverPanel>
                )}
              </AnimatePresence>
            </>
          )}
        </Popover>
      </div>
    </MotionConfig>
  );
}

function TocHeading() {
  return (
    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
      On this page
    </p>
  );
}

interface TocListProps {
  items: MarkdownHeading[];
  activeId: string;
  mobile?: boolean;
}

function TocList({ items, activeId, mobile = false }: TocListProps) {
  // Desktop and mobile render the same list at once, so the sliding indicator
  // needs a `layoutId` per instance or the two would fight over it.
  const layoutId = mobile ? 'toc-indicator-mobile' : 'toc-indicator-desktop';

  // Reading a nested section keeps its parent lit, so the trail down to the
  // current spot stays readable. Two levels deep, so one parent lookup.
  const activeIndex = items.findIndex((heading) => heading.slug === activeId);
  const parentSlug =
    items[activeIndex]?.depth === 3
      ? items
          .slice(0, activeIndex)
          .reverse()
          .find((heading) => heading.depth === 2)?.slug
      : undefined;

  return (
    <ul className="relative border-l border-gray-200 dark:border-gray-800">
      {items.map((heading) => {
        const active = activeId === heading.slug;
        const inTrail = parentSlug === heading.slug;

        return (
          <li key={heading.slug} className="relative">
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={spring}
                className="absolute inset-y-0 -left-px w-0.5 bg-indigo-500"
                aria-hidden="true"
              />
            )}
            <a
              href={`#${heading.slug}`}
              aria-current={active ? 'location' : undefined}
              className={clsx(
                'block py-1 pr-2 text-sm leading-snug transition-colors',
                heading.depth === 3 ? 'pl-6' : 'pl-3',
                active && 'font-medium text-indigo-600 dark:text-indigo-400',
                inTrail && 'font-medium text-gray-800 dark:text-gray-200',
                !active &&
                  !inTrail &&
                  'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              )}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** The heading the reader is currently in, tracked on scroll. */
function useActiveHeading(items: MarkdownHeading[]) {
  const [activeId, setActiveId] = useState('');
  // A string so the effect is not re-run on every render by a fresh array.
  const slugs = items.map((heading) => heading.slug).join();

  useEffect(() => {
    const elements = slugs
      .split(',')
      .map((slug) => document.getElementById(slug))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    let frame: number | null = null;

    const pick = () => {
      frame = null;
      const scrolledToBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

      // A last section shorter than the viewport never crosses the trigger
      // line, so pin it once there is nothing left to scroll.
      const current = scrolledToBottom
        ? elements[elements.length - 1]
        : (elements.filter((el) => el.getBoundingClientRect().top <= TRIGGER_LINE).pop() ??
          elements[0]);

      setActiveId(current.id);
    };

    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(pick);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    pick();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [slugs]);

  return activeId;
}

/**
 * How far the floating button has to sit above the viewport bottom to stay in
 * thumb reach without covering the Pokezards banner. The banner is a separate
 * island, so its height is measured rather than guessed.
 */
function useBannerClearance() {
  const [clearance, setClearance] = useState(THUMB_GAP);

  useEffect(() => {
    const read = () => {
      const banner = document.querySelector('aside[aria-label="Announcement"]');
      const height = banner?.getBoundingClientRect().height ?? 0;
      setClearance(height > 0 ? height + BANNER_INSET + THUMB_GAP : THUMB_GAP);
    };

    read();
    // The banner island is client-only, so it can mount after this one.
    const timer = window.setTimeout(read, 300);
    // The close handler fires before React removes the banner from the DOM.
    const readAfterPaint = () => window.requestAnimationFrame(read);

    window.addEventListener('resize', read);
    window.addEventListener('banner-dismissed', readAfterPaint);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', read);
      window.removeEventListener('banner-dismissed', readAfterPaint);
    };
  }, []);

  return clearance;
}
