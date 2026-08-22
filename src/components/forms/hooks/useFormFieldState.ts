/**
 * -----------------------------------------------------------------------------
 * File: useFormFieldState.ts
 *
 * Description:
 * Computes the effective runtime state of a form field.
 *
 * Combines:
 * - Field-level configuration
 * - Form-level configuration
 * - Runtime edit permissions
 * -----------------------------------------------------------------------------
 */

import { useFormRendererContext } from "../context/FormRendererContext";

import type { FormField } from "../types/field";

export function useFormFieldState(field: FormField) {
  const {
    mode,
    canEdit,
    disabled: formDisabled,
    readOnly: formReadOnly,
    onDeleteFile,
  } = useFormRendererContext();

  /**
   * Explicit disabled state.
   */
  const isDisabled = Boolean(field.disabled) || formDisabled;

  /**
   * Read-only state.
   *
   * If the user cannot edit the form, the field should generally
   * remain visible and display its value rather than appearing disabled.
   */
  const isReadOnly = Boolean(field.readOnly) || formReadOnly || !canEdit;

  return {
    mode,
    onDeleteFile,
    isDisabled,
    isReadOnly,
  };
}
