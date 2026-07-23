/**
 * -----------------------------------------------------------------------------
 * File: application-field.ts
 *
 * Description:
 * Shared field-related contracts.
 *
 * This file also defines the visibility engine used throughout the
 * application definition.
 *
 * Visibility rules may be attached to:
 *
 * - Phases
 * - Sections
 * - Fields
 * -----------------------------------------------------------------------------
 */

/**
 * Represents one visibility expression.
 */
export interface VisibilityRule {
  field: string;

  operator:
    | "equals"
    | "notEquals"
    | "contains"
    | "greaterThan"
    | "lessThan"
    | "isEmpty"
    | "isNotEmpty";

  value?: unknown;
}
