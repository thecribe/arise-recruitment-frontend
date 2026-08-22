/**
 * -----------------------------------------------------------------------------
 * File: normalizeFormValues.ts
 *
 * Description:
 * Converts backend field values into the generic form value structure.
 * -----------------------------------------------------------------------------
 */

import type { FormField } from "../types/field";
import type { FormFileValue } from "../types/file";

export function normalizeFormValues(
  fields: FormField[],
  values?: Record<string, unknown> | null,
): Record<string, unknown> {
  if (!values) {
    return {};
  }

  const normalized: Record<string, unknown> = {
    ...values,
  };

  for (const field of fields) {
    if (!field.name) {
      continue;
    }

    if (field.type !== "file") {
      continue;
    }

    const value = values[field.name];

    /**
     * Already normalized.
     */
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      "existing" in value &&
      "newFiles" in value
    ) {
      continue;
    }

    /**
     * Backend returns uploaded
     * documents directly as an array.
     */
    if (Array.isArray(value)) {
      const fileValue: FormFileValue = {
        existing: value,
        newFiles: [],
      };

      normalized[field.name] = fileValue;

      continue;
    }

    /**
     * No existing files.
     */
    normalized[field.name] = {
      existing: [],
      newFiles: [],
    };
  }

  return normalized;
}
