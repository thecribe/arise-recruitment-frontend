/**
 * -----------------------------------------------------------------------------
 * File: getNestedValue.ts
 *
 * Description:
 * Safely retrieves a nested value using dot notation.
 *
 * Supports:
 *
 * user.firstName
 * employment-history.0.status
 * education.2.qualification
 * -----------------------------------------------------------------------------
 */

export function getNestedValue(object: unknown, path: string): unknown {
  if (object === null || object === undefined || !path) {
    return undefined;
  }

  return path.split(".").reduce<unknown>((current, key) => {
    if (current === null || current === undefined) {
      return undefined;
    }

    if (typeof current !== "object") {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, object);
}
