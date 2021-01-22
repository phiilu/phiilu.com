import * as React from 'react';
import useLocalStorageState from 'use-local-storage-state';

export function useDarkMode() {
  const [theme, setTheme] = useLocalStorageState('theme');

  React.useEffect(() => {
    if (
      theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
    } else if (localStorage.theme === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  React.useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [theme]);
}
