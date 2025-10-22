import { useEffect, useState } from "react";

interface IDebounceValue<T> {
  debounceValue: T;
}

export const useDebounce = <T>(
  value: T,
  delay: number,
): IDebounceValue<T> => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return { debounceValue };
};
