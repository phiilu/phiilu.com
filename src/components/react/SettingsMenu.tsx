import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator
} from '@headlessui/react';
import {
  CheckIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SparklesIcon,
  SunIcon
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { useSyncExternalStore } from 'react';
import {
  getReduceMotion,
  getTheme,
  setReduceMotion,
  setTheme,
  subscribe,
  type Theme
} from '@/helpers/preferences';

const themeOptions = [
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
  { value: 'system', label: 'System', Icon: ComputerDesktopIcon }
] as const satisfies ReadonlyArray<{ value: Theme; label: string; Icon: typeof SunIcon }>;

function getSettings() {
  return `${getTheme()}|${getReduceMotion()}`;
}

export function SettingsMenu() {
  // The snapshot is a string so that it stays referentially stable between
  // renders. `null` on the server: neither localStorage nor matchMedia exists
  // there, so the button renders as a placeholder until hydration.
  const settings = useSyncExternalStore(subscribe, getSettings, () => null);

  if (!settings) {
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  const [theme, reduceMotion] = [settings.split('|')[0] as Theme, settings.endsWith('true')];

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center justify-center w-9 h-9 transition-colors duration-100 ease-in-out rounded-md text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800">
        <Cog6ToothIcon className="w-5 h-5" aria-hidden="true" />
        <span className="sr-only">Settings</span>
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="z-30 mt-2 w-44 p-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
      >
        <MenuSection>
          <MenuHeading className={headingClassName}>Theme</MenuHeading>
          {themeOptions.map(({ value, label, Icon }) => (
            <MenuItem
              key={value}
              as="button"
              type="button"
              onClick={() => setTheme(value)}
              className={itemClassName(value === theme)}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {label}
              {value === theme && (
                <>
                  <span className="sr-only">(selected)</span>
                  <CheckIcon className="w-4 h-4 ml-auto" aria-hidden="true" />
                </>
              )}
            </MenuItem>
          ))}
        </MenuSection>
        <MenuSeparator className="my-1 h-px bg-slate-200 dark:bg-slate-700" />
        <MenuSection>
          <MenuHeading className={headingClassName}>Motion</MenuHeading>
          <MenuItem
            as="button"
            type="button"
            onClick={() => setReduceMotion(!reduceMotion)}
            className={itemClassName(reduceMotion)}
          >
            <SparklesIcon className="w-4 h-4" aria-hidden="true" />
            Reduce motion
            {reduceMotion && (
              <>
                <span className="sr-only">(on)</span>
                <CheckIcon className="w-4 h-4 ml-auto" aria-hidden="true" />
              </>
            )}
          </MenuItem>
        </MenuSection>
      </MenuItems>
    </Menu>
  );
}

const headingClassName =
  'px-2 py-1 text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400';

function itemClassName(active: boolean) {
  return clsx(
    'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-open-sans data-focus:bg-slate-100 dark:data-focus:bg-slate-700',
    active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200'
  );
}
