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

  let schema = z.array(itemSchema);

  if (section.minItems !== undefined) {
    schema = schema.min(section.minItems);
  }

  if (section.maxItems !== undefined) {
    schema = schema.max(section.maxItems);
  }

  return z.object({
    [section.key]: schema,
  });
}
