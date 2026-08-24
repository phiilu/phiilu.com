import { useSyncExternalStore } from 'react';
import { getReduceMotion, subscribe } from '@/helpers/preferences';

/**
 * The "Reduce motion" setting from the header menu, which defaults to the OS
 * preference. CSS reads the `reduce-motion` class on <html>; JS animations need
 * this. `false` on the server, where there is nothing to animate anyway.
 */
export function useReduceMotion() {
  return useSyncExternalStore(subscribe, getReduceMotion, () => false);
}
