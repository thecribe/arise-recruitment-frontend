/**
 * -----------------------------------------------------------------------------
 * File: section.ts
 *
 * Description:
 * Defines a single application section.
 *
 * Sections belong to a phase and contain the fields required to complete
 * that section.
 *
 * Notes:
 * - Fields are loaded lazily.
 * - Applicant values are loaded separately.
 * -----------------------------------------------------------------------------
 */

import type { ApplicationField } from "./field";
import type { VisibilityCondition } from "./visibility";

import type { SectionType } from "../constants/section-types";
import type { SectionStatus } from "../constants/section-status";

import type { ApplicationSectionPermissions } from "./application-permissions";
import type { SectionReview } from "./review";

export interface ApplicationSection {
  /**
   * Unique identifier.
   */
  id: string;

  /**
   * Form key.
   */
  key: string;

  /**
   * Parent phase.
   */
  phaseId: string;

  /**
   * Display title.
   */
  title: string;

  /**
   * Optional description.
   */
  description?: string;

  /**
   * Display order.
   */
  order: number;

  /**
   * Section type.
   */
  type: SectionType;

  /**
   * Determines whether multiple entries
   * may be added.
   */
  repeatable: boolean;

  minItems?: number;

  maxItems?: number;

  /**
   * Dynamic visibility.
   */
  visibleWhen?: VisibilityCondition;

  /**
   * Fields belonging to this section.
   */
  fields: ApplicationField[];

  /**
   * Applicant values.
   *
   * Loaded independently from the section definition.
   */
  values: Record<string, unknown>[];

  /**
   * Current section status.
   */
  status: SectionStatus;

  /**
   * UI permissions.
   */
  permissions: ApplicationSectionPermissions;

  /**
   * Recruiter review.
   */
  review?: SectionReview;
}
