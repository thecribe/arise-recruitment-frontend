/**
 * -----------------------------------------------------------------------------
 * File: mergeFormValues.ts
 *
 * Description:
 * Merges backend values into generated form defaults.
 *
 * Backend values take precedence.
 * Missing values retain their generated defaults.
 * -----------------------------------------------------------------------------
 */

export function mergeFormValues(
  defaults: Record<string, unknown>,
  values?: Record<string, unknown> | null,
): Record<string, unknown> {
  if (!values) {
    return defaults;
  }

  return {
    ...defaults,
    ...values,
  };
}
