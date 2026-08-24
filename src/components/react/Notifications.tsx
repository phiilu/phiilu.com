import { Toaster } from 'sonner';
import { useSyncExternalStore } from 'react';
import { getTheme, subscribe } from '@/helpers/preferences';

export const Notifications = () => {
  // Sonner takes 'light' | 'dark' | 'system', which is exactly what the theme
  // preference already stores.
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'system' as const);

  return (
    <Toaster
      position="bottom-right"
      // Clears the fixed Pokézards banner, which also lives in the bottom corner.
      offset={{ bottom: '6.5rem', right: '1.25rem' }}
      mobileOffset={{ bottom: '6.5rem', left: '1.25rem', right: '1.25rem' }}
      theme={theme}
      closeButton
      toastOptions={{
        classNames: {
          toast:
            'font-open-sans! rounded-md! border-0! bg-white! text-gray-900! shadow-lg! ring-1 ring-black/5 dark:bg-gray-800! dark:text-gray-100! dark:ring-white/10',
          description: 'text-gray-600! dark:text-gray-400!',
          closeButton:
            'bg-white! text-gray-500! border-gray-200! hover:text-gray-900! dark:bg-gray-800! dark:text-gray-300! dark:border-gray-700! dark:hover:text-white!',
          success: 'text-green-600! dark:text-green-400!',
          error: 'text-red-600! dark:text-red-400!',
          loading: 'text-indigo-600! dark:text-indigo-400!'
        }
      }}
    />
  );
};
