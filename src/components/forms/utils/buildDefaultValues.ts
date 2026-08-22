/**
 * -----------------------------------------------------------------------------
 * File: buildDefaultValues.ts
 *
 * Description:
 * Builds default React Hook Form values from dynamic form fields.
 *
 * This utility is feature-agnostic and knows nothing about:
 *
 * - Application
 * - Recruitment
 * - Sections
 * - Repeatable sections
 * -----------------------------------------------------------------------------
 */

import type { FormField } from "@/components/forms/types/field";

/**
 * Creates default values for a single form row.
 */
function createDefaultRow(fields: FormField[]): Record<string, unknown> {
  const values: Record<string, unknown> = {};

  fields.forEach((field) => {
    if (!field.name) return;

    /**
     * Explicit default value takes priority.
     */
    if (field.defaultValue !== undefined) {
      values[field.name] = field.defaultValue;
      return;
    }

    /**
     * Field-type defaults.
     */
    switch (field.type) {
      case "checkbox":
        values[field.name] = field.options?.length ? [] : false;
        break;

      case "multiselect":
        values[field.name] = [];
        break;

      case "file":
      case "signature":
        values[field.name] = null;
        break;

      default:
        values[field.name] = "";
    }
  });

  return values;
}

/**
 * Builds default values for a collection of fields.
 */
export function buildDefaultValues(
  fields?: FormField[],
): Record<string, unknown> {
  return createDefaultRow(fields ?? []);
}
