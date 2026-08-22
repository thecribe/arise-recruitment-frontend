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

import type { FormFieldOption } from "../types/field";
import { evaluateVisibility } from "./evaluateVisibility";

/**
 * Filters visible options for a field.
 */
export function filterFieldOptions(
  options: FormFieldOption[] = [],
  values: Record<string, unknown>,
): FormFieldOption[] {
  return options.filter((option) =>
    evaluateVisibility(option.visibleWhen, values),
  );
}
