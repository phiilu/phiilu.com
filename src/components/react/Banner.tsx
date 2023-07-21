// import trackEvent from "@helpers/tracking";

import type { ReactElement } from 'react';

interface BannerProps {
  onClose: () => void;
  shortText: string;
  ctaText: string;
  icon: ReactElement;
  ctaHref: string;
  text: string;
}

export function Banner({ onClose, shortText, ctaText, icon, ctaHref, text }: BannerProps) {
  return (
    <div className="fixed sm:container max-w-3xl mx-auto xl:max-w-5xl bottom-5 rounded-md shadow-md left-5 right-5 z-20 bg-gradient-to-r from-pokezards-yellow to-pokezards-dark-red">
      <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center flex-1 w-0">
            <span className="flex p-2 bg-orange-100 rounded-lg">{icon}</span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">{shortText}</span>
              <span className="hidden md:inline">{text}</span>
            </p>
          </div>
          <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href={ctaHref}
              target="_blank"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-white border border-transparent rounded-md shadow-sm text-pokezards-dark-red hover:bg-orange-50"
              rel="noreferrer"
            >
              {ctaText}
            </a>
          </div>
          <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                // trackEvent({
                //   event: "click",
                //   name: "Banner closed",
                //   value: ctaHref,
                //   type: "close",
                // });
              }}
              className="flex p-2 -mr-1 rounded-md hover:bg-pokezards-dark-red-light focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
