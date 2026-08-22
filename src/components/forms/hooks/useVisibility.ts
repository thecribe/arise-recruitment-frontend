/**
 * -----------------------------------------------------------------------------
 * File: useVisibility.ts
 *
 * Description:
 * Evaluates a field/section visibility condition against current form values.
 * -----------------------------------------------------------------------------
 */

import { useWatch } from "react-hook-form";

import { evaluateVisibility } from "../utils/evaluateVisibility";
import type { VisibilityCondition } from "../types/visibility";

export function useVisibility(
  visibility?: VisibilityCondition,
  prefix?: string,
): boolean {
  const values = useWatch();

  /**
   * No visibility condition means
   * the field is always visible.
   */
  if (!visibility) {
    return true;
  }

  /**
   * Add the repeatable row prefix
   * to each visibility rule.
   */
  const scopedVisibility = {
    ...visibility,

    rules: visibility.rules.map((rule) => ({
      ...rule,

      field: prefix ? `${prefix}.${rule.field}` : rule.field,
    })),
  };

  return evaluateVisibility(
    scopedVisibility,
    values as Record<string, unknown>,
  );
}
