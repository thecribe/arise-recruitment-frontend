/**
 * -----------------------------------------------------------------------------
 * File: buildFormSchema.ts
 *
 * Description:
 * Builds the Zod schema for a section.
 * Supports both normal and repeatable sections.
 * -----------------------------------------------------------------------------
 */

import { z } from "zod";

import { buildFieldSchema } from "./buildFieldSchema";
import type { ApplicationSection } from "../types";

export function buildFormSchema(section: ApplicationSection) {
  const shape: Record<string, z.ZodTypeAny> = {};

  section.fields.forEach((field) => {
    if (!field.name) return;

    shape[field.name] = buildFieldSchema(field);
  });

  const itemSchema = z.object(shape);

  if (!section.repeatable) {
    return itemSchema;
  }

  let arraySchema = z.array(itemSchema);

  if (section.minItems !== undefined) {
    arraySchema = arraySchema.min(section.minItems);
  }

  if (section.maxItems !== undefined) {
    arraySchema = arraySchema.max(section.maxItems);
  }

  return z.object({
    [section.key]: arraySchema,
  });
}
