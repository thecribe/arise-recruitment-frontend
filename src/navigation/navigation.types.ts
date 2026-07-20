/**
 * -----------------------------------------------------------------------------
 * File: navigation.types.ts
 * Description:
 * Shared navigation type definitions.
 *
 * Responsibilities:
 * - Define navigation item structure.
 * - Support nested navigation.
 * - Support permission-based visibility.
 * -----------------------------------------------------------------------------
 */

import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  /**
   * Unique identifier.
   */
  id: string;

  /**
   * Display label.
   */
  title: string;

  /**
   * Navigation route.
   */
  href: string;

  /**
   * Navigation icon.
   */
  icon: LucideIcon;

  /**
   * Required permissions.
   *
   * Empty or undefined means visible to every authenticated user.
   */
  permissions?: string[];

  /**
   * Child navigation items.
   */
  children?: NavigationItem[];
}
