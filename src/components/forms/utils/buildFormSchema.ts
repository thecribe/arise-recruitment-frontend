import { z } from "zod";

import type { FormField } from "../types/field";

interface BuildFormSchemaOptions {
  fields: FormField[];

  repeatable?: boolean;

  sectionId?: string;
}

export function buildFormSchema({
  fields,
  repeatable = false,
  sectionId,
}: BuildFormSchemaOptions) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    const fieldName = field.name;

    if (!fieldName) {
      continue;
    }

    let schema: z.ZodTypeAny;

    /**
     * Your existing field schema logic goes here.
     *
     * For example:
     */
    switch (field.type) {
      case "email":
        schema = z.string().email("Please enter a valid email address");
        break;

      case "number":
        schema = z.coerce.number();
        break;
      case "file":
        schema = z.array(z.unknown());
        break;
      default:
        schema = z.string();
    }

    /**
     * Apply required / optional logic.
     */
    if (!field.required) {
      schema = schema.optional();
    }

    shape[fieldName] = schema;
  }

  /**
   * The schema for ONE row.
   *
   * Example:
   *
   * {
   *   title: string,
   *   placeOfWork: string,
   *   pay: string
   * }
   */
  const rowSchema = z.object(shape);

  /**
   * Non-repeatable section.
   */
  if (!repeatable) {
    return rowSchema;
  }

  /**
   * Repeatable sections require a section ID because
   * RHF stores the values under that key.
   */
  if (!sectionId) {
    throw new Error(
      "sectionId is required when building a repeatable form schema.",
    );
  }

  /**
   * Repeatable section.
   *
   * {
   *   [sectionId]: [
   *     {...row},
   *     {...row}
   *   ]
   * }
   */
  return z.object({
    [sectionId]: z.array(rowSchema),
  });
}
