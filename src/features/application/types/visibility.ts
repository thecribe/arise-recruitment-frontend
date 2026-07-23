import type { VisibilityRule } from "./application-field";

/**
 * Represents a single visibility rule.
 */
export interface VisibilityCondition {
  rules: VisibilityRule[];

  /**
   * Determines how multiple rules are evaluated.
   */
  operator?: "AND" | "OR";
}
