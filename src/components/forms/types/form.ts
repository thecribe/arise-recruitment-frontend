/**
 * -----------------------------------------------------------------------------
 * File: form.ts
 * -----------------------------------------------------------------------------
 */

export type FormMode = "create" | "edit" | "view";

export interface FormRendererConfig {
  /**
   * Current form mode.
   */
  mode?: FormMode;

  /**
   * Optional explicit permission override.
   */
  canEdit?: boolean;

  /**
   * Disable the entire form.
   */
  disabled?: boolean;

  /**
   * Force the entire form into read-only mode.
   */
  readOnly?: boolean;
}
