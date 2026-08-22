/**
 * -----------------------------------------------------------------------------
 * File: useFieldOptions.ts
 *
 * Description:
 * Returns only the visible options for a field.
 *
 * Automatically re-evaluates whenever any form value changes.
 * -----------------------------------------------------------------------------
 */

import { useWatch } from "react-hook-form";

import { filterFieldOptions } from "../utils/filterFieldOptions";
import { useApplicationForm } from "../hooks/useApplicationForm";
import type { FieldOption } from "../types";

/**
 * Returns filtered options based on current form values.
 */
export function useFieldOptions(options?: FieldOption[]): FieldOption[] {
  const { control } = useApplicationForm();

  const values = useWatch({ control });

  return filterFieldOptions(options, values as Record<string, unknown>);
}
