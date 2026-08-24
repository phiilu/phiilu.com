export type Theme = 'light' | 'dark' | 'system';

export const themes: Theme[] = ['light', 'dark', 'system'];

const listeners = new Set<() => void>();

function prefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getTheme(): Theme {
  const stored = localStorage.getItem('theme') as Theme | null;
  return stored && themes.includes(stored) ? stored : 'system';
}

// `null` means "follow the operating system".
export function getReduceMotion(): boolean {
  const stored = localStorage.getItem('reduce-motion');
  return stored === null ? prefersReducedMotion() : stored === 'true';
}

// Mirrors the inline script in BaseHead.astro, which has to run before the
// first paint and therefore cannot import this module.
export function applyPreferences() {
  const root = document.documentElement;
  const theme = getTheme();
  root.classList.toggle('dark', theme === 'dark' || (theme === 'system' && prefersDark()));
  root.classList.toggle('reduce-motion', getReduceMotion());
}

function notify() {
  applyPreferences();
  listeners.forEach((listener) => listener());
}

export function setTheme(theme: Theme) {
  localStorage.setItem('theme', theme);
  notify();
}

export function setReduceMotion(reduce: boolean) {
  localStorage.setItem('reduce-motion', String(reduce));
  notify();
}

// Store contract for useSyncExternalStore: re-render on our own changes and on
// changes made in another tab.
export function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== 'theme' && event.key !== 'reduce-motion') return;
    notify();
  };
  listeners.add(onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onStorage);
  };
}
