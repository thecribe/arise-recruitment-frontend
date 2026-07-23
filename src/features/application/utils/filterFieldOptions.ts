/**
 * -----------------------------------------------------------------------------
 * File: filterFieldOptions.ts
 *
 * Description:
 * Filters field options based on their visibility rules.
 *
 * Example:
 * Country = UK
 *
 * Profession Options
 * ------------------
 * Nurse
 * Doctor
 *
 * If an option has visibleWhen configured, it is evaluated against
 * the current form values.
 * -----------------------------------------------------------------------------
 */

import type { FieldOption } from "../types/field-option";

import { evaluateVisibility } from "./evaluateVisibility";

/**
 * Filters visible options for a field.
 */
export function filterFieldOptions(
  options: FieldOption[] = [],
  values: Record<string, unknown>,
): FieldOption[] {
  return options.filter((option) =>
    evaluateVisibility(option.visibleWhen, values),
  );
}
