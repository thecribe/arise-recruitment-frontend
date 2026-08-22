/**
 * -----------------------------------------------------------------------------
 * File: useFieldVisibility.ts
 *
 * Description:
 * Evaluates a field's visibility against current form values.
 *
 * This hook is completely feature-agnostic.
 * -----------------------------------------------------------------------------
 */

import { useWatch } from "react-hook-form";

import { evaluateVisibility } from "../utils/evaluateVisibility";

import type { VisibilityCondition } from "../types/visibility";

export function useFieldVisibility(visibility?: VisibilityCondition): boolean {
  const values = useWatch();

  return evaluateVisibility(visibility, values as Record<string, unknown>);
}
