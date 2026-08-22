/**
 * -----------------------------------------------------------------------------
 * File: createFormValues.ts
 *
 * Description:
 * Creates the complete initial form state from:
 *
 * - Field definitions
 * - Backend values
 * -----------------------------------------------------------------------------
 */

import { buildDefaultValues } from "./buildDefaultValues";

import { normalizeFormValues } from "./normalizeFormValues";

import { mergeFormValues } from "./mergeFormValues";
import type { FormField } from "../types/field";

export function createFormValues(
  fields: FormField[],
  values?: Record<string, unknown> | null,
) {
  const defaults = buildDefaultValues(fields);

  const normalized = normalizeFormValues(fields, values);

  return mergeFormValues(defaults, normalized);
}
