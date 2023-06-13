import { useRef, useEffect } from "react";

export default function useDebouncedFunction<F extends (...args: any[]) => any>(func: F, delay = 500, cleanUp = false) {
  const timeoutRef = useRef();

  // Очистка таймера
  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return (...args: Parameters<F>) => {
    clearTimer();
    // @ts-ignore
    timeoutRef.current = setTimeout(() => func(...args), delay);
  };
}
