import { useEffect, useRef } from "react";

type Timer = ReturnType<typeof setTimeout>;

export const useDebounce = <T extends (...args: any[]) => ReturnType<T>>(
  func: T,
  delay: number = 500,
) => {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as T;

  return debouncedFunction;
};
