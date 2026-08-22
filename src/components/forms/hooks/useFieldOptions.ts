/**
 * -----------------------------------------------------------------------------
 * File: useFieldOptions.ts
 *
 * Description:
 * Returns the currently visible options for a form field.
 *
 * This hook is feature-agnostic and can be used by:
 *
 * - Application
 * - Recruitment
 * - Compliance
 * - Staff
 * - Any future form
 *
 * It automatically re-evaluates whenever form values change.
 * -----------------------------------------------------------------------------
 */

import { useFormContext, useWatch } from "react-hook-form";

import type { FormFieldOption } from "../types/field";

import { filterFieldOptions } from "../utils/filterFieldOptions";

export function useFieldOptions(
  options?: FormFieldOption[],
): FormFieldOption[] {
  const { control } = useFormContext();

  const values = useWatch({
    control,
  });

  return filterFieldOptions(options, values as Record<string, unknown>);
}
