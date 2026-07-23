/**
 * -----------------------------------------------------------------------------
 * File: useFieldState.ts
 *
 * Description:
 * Computes the runtime state of a form field.
 *
 * Responsibilities:
 * - Respect application permissions.
 * - Respect field configuration.
 * - Provide a single source of truth for field state.
 * -----------------------------------------------------------------------------
 */

import { useApplicationContext } from "../context/ApplicationContext";

import type { ApplicationField } from "../types";

export function useFieldState(field: ApplicationField) {
  const { canEdit } = useApplicationContext();

  const isDisabled = field.disabled || !canEdit;

  const isReadOnly = field.readOnly || !canEdit;

  return {
    isDisabled,
    isReadOnly,
  };
}
