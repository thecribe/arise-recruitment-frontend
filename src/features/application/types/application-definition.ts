/**
 * -----------------------------------------------------------------------------
 * File: application-definition.ts
 *
 * Description:
 * Defines the static application structure returned by the backend.
 *
 * These interfaces represent the blueprint of an application and are shared
 * across every applicant.
 *
 * Responsibilities:
 * - Phase metadata
 * - Visibility rules
 * - Ordering
 *
 * Notes:
 * - Sections are intentionally NOT included.
 * - Sections are lazy-loaded when a phase becomes active.
 * -----------------------------------------------------------------------------
 */

import type { VisibilityCondition } from "./visibility";

/**
 * Represents a single application phase.
 */
export interface ApplicationPhase {
  /**
   * Optional unique key for frontend rendering.
   */
  key?: string;

  /**
   * Unique identifier.
   */
  id: string;

  /**
   * Display title.
   */
  title: string;

  /**
   * Optional description shown to applicants.
   */
  description?: string;

  /**
   * Determines the display order.
   */
  order: number;

  /**
   * Determines whether the phase is visible
   * for the current applicant.
   */
  visibleWhen?: VisibilityCondition;
}
