import { SetStateAction, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  defaultValue?: T,
  fallbackToDefaultOnError = true
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      if (fallbackToDefaultOnError) {
        return defaultValue;
      } else {
        throw error;
      }
    }
  });

  const setValue = (value: SetStateAction<T>) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
};
