import { SetStateAction, useCallback, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  defaultValue?: T,
  fallbackToDefaultOnError = true
) => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      if (fallbackToDefaultOnError) {
        return defaultValue;
      } else {
        throw error;
      }
    }
  });

  const setValue = useCallback(
    (value: SetStateAction<T | undefined>) => {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
};
