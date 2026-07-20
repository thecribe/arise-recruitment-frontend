/**
 * -----------------------------------------------------------------------------
 * File: navigation.utils.ts
 * Description:
 * Navigation helper functions.
 *
 * Responsibilities:
 * - Filter navigation based on user permissions.
 * -----------------------------------------------------------------------------
 */

import type { NavigationItem } from "./navigation.types";

/**
 * Filters navigation items by user permissions.
 */
export function filterNavigation(
  items: NavigationItem[],
  permissions: string[],
): NavigationItem[] {
  return items.filter((item) => {
    if (!item.permissions?.length) {
      return true;
    }

    return item.permissions.every((permission) =>
      permissions.includes(permission),
    );
  });
}
