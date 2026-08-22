/**
 * -----------------------------------------------------------------------------
 * File: use-debounce.ts
 *
 * Description:
 * Generic debounce hook.
 *
 * Delays updating the returned value until the supplied value has remained
 * unchanged for the specified amount of time.
 *
 * This is useful for search inputs where we don't want to trigger an API
 * request on every keystroke.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

/**
 * Debounces a value.
 *
 * @param value - The value that should be debounced.
 * @param delay - Delay in milliseconds before the value is updated.
 *
 * Example:
 *
 * const debouncedSearch = useDebounce(search, 500);
 *
 * If the user types:
 *
 * J → Jo → Joh → John
 *
 * the returned value will only become "John" after the user stops
 * typing for 500ms.
 */
export function useDebounce<T>(
  value: T,
  delay: number,
): T {
  const [debouncedValue, setDebouncedValue] =
    useState<T>(value);

  useEffect(() => {
    /**
     * Wait for the specified delay before updating the
     * debounced value.
     */
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    /**
     * Clear the previous timer whenever the value or delay
     * changes.
     *
     * This is what makes the debounce work: if the user
     * continues typing, the previous timer is cancelled.
     */
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}