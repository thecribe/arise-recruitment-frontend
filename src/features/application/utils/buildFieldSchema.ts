/**
 * -----------------------------------------------------------------------------
 * File: buildFieldSchema.ts
 *
 * Description:
 * Builds a Zod schema for a single application field.
 * -----------------------------------------------------------------------------
 */

import { z } from "zod";

import { VALIDATION_TYPES } from "../types/validation-rule";
import type { ApplicationField } from "../types/field";

const fileSchema = z
  .instanceof(File, {
    message: "Please select a file.",
  })
  .nullable();

export function buildFieldSchema(field: ApplicationField) {
  let schema: z.ZodTypeAny;

  switch (field.type) {
    case "text":
    case "textarea":
    case "email":
    case "password":
    case "tel":
      schema = z.string();
      break;

    case "number":
      schema = z.coerce.number();
      break;

    case "checkbox":
      schema = z.boolean();
      break;

    case "date":
      schema = z.string();
      break;

    case "select":
    case "radio":
      schema = z.string();
      break;

    case "multiselect":
      schema = z.array(z.string());
      break;

    case "file":
    case "signature":
      schema = fileSchema;
      break;

    default:
      schema = z.any();
  }

  if (!field.validation?.length) {
    return schema;
  }

  for (const rule of field.validation) {
    switch (rule.type) {
      case VALIDATION_TYPES.REQUIRED:
        if (schema instanceof z.ZodString) {
          schema = schema.min(1, rule.message);
        } else if (field.type === "file" || field.type === "signature") {
          schema = fileSchema.refine(
            (file) => file instanceof File,
            rule.message,
          );
        }
        break;

      case VALIDATION_TYPES.MIN_LENGTH:
        if (schema instanceof z.ZodString) {
          schema = schema.min(Number(rule.value), rule.message);
        }
        break;

      case VALIDATION_TYPES.MAX_LENGTH:
        if (schema instanceof z.ZodString) {
          schema = schema.max(Number(rule.value), rule.message);
        }
        break;

      case VALIDATION_TYPES.EMAIL:
        if (schema instanceof z.ZodString) {
          schema = schema.email(rule.message);
        }
        break;

      case VALIDATION_TYPES.PATTERN:
        if (schema instanceof z.ZodString) {
          schema = schema.regex(rule.value as RegExp, rule.message);
        }
        break;

      case VALIDATION_TYPES.MIN:
        if (schema instanceof z.ZodNumber) {
          schema = schema.min(Number(rule.value), rule.message);
        }
        break;

      case VALIDATION_TYPES.MAX:
        if (schema instanceof z.ZodNumber) {
          schema = schema.max(Number(rule.value), rule.message);
        }
        break;
    }
  }

  return schema;
}
