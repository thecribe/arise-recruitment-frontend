/**
 * -----------------------------------------------------------------------------
 * File: buildDefaultValues.ts
 *
 * Description:
 * Builds the default values for a section.
 * -----------------------------------------------------------------------------
 */

import type { ApplicationSection } from "../types";

export function buildDefaultValues(section: ApplicationSection) {
  const values: Record<string, unknown> = {};

  section.fields.forEach((field) => {
    if (!field.name) return;

    switch (field.type) {
      case "checkbox":
        values[field.name] = false;
        break;

      case "file":
      case "signature":
        values[field.name] = null;
        break;

      default:
        values[field.name] = "";
    }
  });

  return {
    [section.key]: [values],
  };
}
