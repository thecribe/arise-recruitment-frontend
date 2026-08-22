/**
 * -----------------------------------------------------------------------------
 * File: useFormDefaults.ts
 *
 * Description:
 * Creates default values for a collection of fields.
 * -----------------------------------------------------------------------------
 */

import { useMemo } from "react";

import { buildDefaultValues } from "../utils/buildDefaultValues";
import type { FormField } from "../types/field";

export function useFormDefaults(fields: FormField[]) {
  return useMemo(() => buildDefaultValues(fields), [fields]);
}
