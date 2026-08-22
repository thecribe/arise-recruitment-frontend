/**
 * -----------------------------------------------------------------------------
 * File: visibility.ts
 *
 * Description:
 * Shared visibility contracts for dynamic forms.
 * -----------------------------------------------------------------------------
 */

export type VisibilityOperator =
  | "equals"
  | "notEquals"
  | "contains"
  | "notContains"
  | "greaterThan"
  | "lessThan"
  | "isEmpty"
  | "isNotEmpty"
  | "in"
  | "notIn";

/**
 * -----------------------------------------------------------------------------
 * A single visibility rule.
 * -----------------------------------------------------------------------------
 */
export interface VisibilityRule {
  /**
   * Name of the field whose value is being evaluated.
   */
  field: string;

  operator: VisibilityOperator;

  /**
   * Value used by operators such as:
   *
   * equals
   * contains
   * greaterThan
   * in
   * etc.
   */
  value?: unknown;
}

/**
 * -----------------------------------------------------------------------------
 * Visibility condition.
 * -----------------------------------------------------------------------------
 */
export interface VisibilityCondition {
  rules: VisibilityRule[];

  /**
   * Determines how multiple rules are combined.
   *
   * Example:
   *
   * AND:
   *   country === "UK"
   *   AND
   *   hasVisa === true
   *
   * OR:
   *   status === "current"
   *   OR
   *   status === "previous"
   */
  operator?: "AND" | "OR";
}
