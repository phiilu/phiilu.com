import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CheckIcon, ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark' | 'system';

const options = [
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
  { value: 'system', label: 'System', Icon: ComputerDesktopIcon }
] as const satisfies ReadonlyArray<{ value: Theme; label: string; Icon: typeof SunIcon }>;

function applyTheme(theme: Theme) {
  const dark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
}

// Tiny store so the menu re-renders on change and stays in sync across tabs.
// `getServerSnapshot` returns null, which renders the placeholder until
// hydration: localStorage does not exist while rendering on the server.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== 'theme') return;
    applyTheme(getTheme());
    onChange();
  };
  listeners.add(onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onStorage);
  };
}

function getTheme(): Theme {
  const stored = localStorage.getItem('theme');
  return options.some((o) => o.value === stored) ? (stored as Theme) : 'system';
}

function setTheme(theme: Theme) {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
  listeners.forEach((listener) => listener());
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => null);

  if (!theme) {
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  const current = options.find((o) => o.value === theme)!;

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center justify-center w-9 h-9 transition-colors duration-100 ease-in-out rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
        <current.Icon className="w-5 h-5" aria-hidden="true" />
        <span className="sr-only">Change theme, current theme is {current.label}</span>
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="z-30 mt-2 w-36 p-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
      >
        {options.map(({ value, label, Icon }) => (
          <MenuItem key={value}>
            <button
              type="button"
              onClick={() => setTheme(value)}
              className={clsx(
                'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-open-sans data-focus:bg-slate-100 dark:data-focus:bg-slate-700',
                value === theme
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-700 dark:text-slate-200'
              )}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {label}
              {value === theme && <CheckIcon className="w-4 h-4 ml-auto" aria-hidden="true" />}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
