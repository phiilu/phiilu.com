import { useState } from 'react';

// Hook
export function useLocalStorage(key: string, initialValue: any) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (import.meta.env.SSR) {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Storage can be unavailable (private browsing, storage disabled) or hold
      // malformed JSON. Falling back to the initial value is the right
      // behaviour, but warn so a genuine bug is not swallowed silently.
      console.warn(`useLocalStorage: could not read "${key}"`, error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (!import.meta.env.SSR) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Most likely storage being unavailable or the quota being exceeded. The
      // in-memory value is still updated, so the UI stays correct for this page
      // view and only persistence is lost.
      console.warn(`useLocalStorage: could not persist "${key}"`, error);
    }
  };
  return [storedValue, setValue];
}
