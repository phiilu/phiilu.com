import toastAction, { Toaster, ToastBar, resolveValue } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

export const Notifications = () => {
  return (
    <Toaster position="top-right">
      {(t) => (
        <Transition
          show={t.visible}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="-translate-y-full opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transform transition ease-in duration-300"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-full"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{resolveValue(t.icon, t)}</div>
                {resolveValue(t.message, t)}
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex text-gray-400 bg-white rounded-md dark:bg-gray-900 dark:text-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      toastAction.dismiss(t.id);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      )}
    </Toaster>
  );
};
