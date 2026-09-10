/**
 * -----------------------------------------------------------------------------
 * File: buildComplianceFormSchema.ts
 *
 * Description:
 *
 * Builds a Zod schema for Compliance dynamic forms.
 *
 * Features:
 *
 * - Supports shared dynamic FormField definitions.
 * - Supports conditional field visibility.
 * - Required validation only applies when a field is visible.
 * - Supports new File uploads.
 * - Supports existing uploaded files returned by the backend.
 * - Supports single and multiple file fields.
 *
 * -----------------------------------------------------------------------------
 */

import { z } from "zod";
import type { VisibilityCondition, VisibilityRule } from "../types/visibility";
import type { FieldType, FormField } from "../types/field";

/**
 * -----------------------------------------------------------------------------
 * Existing file contract.
 *
 * This matches the object handled by payloadToFormData.
 * -----------------------------------------------------------------------------
 */

export const existingFileSchema = z.object({
  document_url: z.string().min(1),
  name: z.string().min(1),
  id: z.string().min(1),
  mimetype: z.string().min(1),
  size: z.number().min(1),
});

export type ExistingFile = z.infer<typeof existingFileSchema>;

/**
 * -----------------------------------------------------------------------------
 * Browser File schema.
 *
 * Using a custom validator avoids potential issues where File is unavailable
 * outside the browser environment.
 * -----------------------------------------------------------------------------
 */

const fileSchema = z.custom<File>(
  (value) => {
    return typeof File !== "undefined" && value instanceof File;
  },
  {
    message: "Please upload a valid file.",
  },
);

/**
 * -----------------------------------------------------------------------------
 * Compliance file value.
 *
 * A file field can contain:
 *
 * - A newly selected File.
 * - An existing backend document.
 * -----------------------------------------------------------------------------
 */

const complianceFileSchema = z.union([fileSchema, existingFileSchema]);

/**
 * -----------------------------------------------------------------------------
 * Utility:
 *
 * Determines whether a value should be treated as empty.
 * -----------------------------------------------------------------------------
 */

function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
}

/**
 * -----------------------------------------------------------------------------
 * Utility:
 *
 * Convert values into numbers when possible.
 * -----------------------------------------------------------------------------
 */

function toComparableNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isNaN(value) ? null : value;
  }

  if (typeof value === "string") {
    const numberValue = Number(value);

    return Number.isNaN(numberValue) ? null : numberValue;
  }

  return null;
}

/**
 * -----------------------------------------------------------------------------
 * Visibility rule evaluation.
 * -----------------------------------------------------------------------------
 */

function evaluateVisibilityRule(
  rule: VisibilityRule,
  values: Record<string, unknown>,
): boolean {
  const fieldValue = values[rule.field];

  switch (rule.operator) {
    case "equals":
      return fieldValue === rule.value;

    case "notEquals":
      return fieldValue !== rule.value;

    case "contains":
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(rule.value);
      }

      if (typeof fieldValue === "string") {
        return fieldValue.includes(String(rule.value ?? ""));
      }

      return false;

    case "notContains":
      if (Array.isArray(fieldValue)) {
        return !fieldValue.includes(rule.value);
      }

      if (typeof fieldValue === "string") {
        return !fieldValue.includes(String(rule.value ?? ""));
      }

      return true;

    case "greaterThan": {
      const currentValue = toComparableNumber(fieldValue);

      const comparisonValue = toComparableNumber(rule.value);

      if (currentValue === null || comparisonValue === null) {
        return false;
      }

      return currentValue > comparisonValue;
    }

    case "lessThan": {
      const currentValue = toComparableNumber(fieldValue);

      const comparisonValue = toComparableNumber(rule.value);

      if (currentValue === null || comparisonValue === null) {
        return false;
      }

      return currentValue < comparisonValue;
    }

    case "isEmpty":
      return isEmptyValue(fieldValue);

    case "isNotEmpty":
      return !isEmptyValue(fieldValue);

    case "in":
      return Array.isArray(rule.value) && rule.value.includes(fieldValue);

    case "notIn":
      return Array.isArray(rule.value) && !rule.value.includes(fieldValue);

    default:
      return true;
  }
}

/**
 * -----------------------------------------------------------------------------
 * Visibility condition evaluation.
 *
 * Fields without visibleWhen are always visible.
 * -----------------------------------------------------------------------------
 */

function isFieldVisible(
  condition: VisibilityCondition | undefined,
  values: Record<string, unknown>,
): boolean {
  if (!condition || condition.rules.length === 0) {
    return true;
  }

  const results = condition.rules.map((rule) =>
    evaluateVisibilityRule(rule, values),
  );

  if (condition.operator === "OR") {
    return results.some(Boolean);
  }

  return results.every(Boolean);
}

/**
 * -----------------------------------------------------------------------------
 * Build field schema.
 *
 * Fields are optional at this stage.
 *
 * Required validation is applied later inside superRefine because whether a
 * field is required depends on whether visibleWhen currently evaluates to true.
 * -----------------------------------------------------------------------------
 */

function buildFieldSchema(field: FormField): z.ZodTypeAny {
  const validation = field.validation;

  switch (field.type as FieldType) {
    case "email":
      return z.string().email("Please enter a valid email address.").optional();

    case "number": {
      return z
        .union([z.number(), z.string()])
        .optional()
        .superRefine((value, context) => {
          if (isEmptyValue(value)) {
            return;
          }

          const numericValue = toComparableNumber(value);

          if (numericValue === null) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message: `${field.label} must be a valid number.`,
            });

            return;
          }

          if (validation?.min !== undefined && numericValue < validation.min) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                validation.min === validation.max
                  ? `${field.label} must be ${validation.min}.`
                  : `${field.label} must be at least ${validation.min}.`,
            });
          }

          if (validation?.max !== undefined && numericValue > validation.max) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message: `${field.label} must not exceed ${validation.max}.`,
            });
          }
        });
    }

    case "checkbox":
      return z.union([z.boolean(), z.array(z.unknown())]).optional();

    case "multiselect":
      return z.array(z.unknown()).optional();

    case "switch":
      return z.boolean().optional();

    case "file": {
      const fileValueSchema = field.file?.multiple
        ? z.array(complianceFileSchema).optional()
        : complianceFileSchema.nullable().optional();

      return fileValueSchema;
    }

    case "date":
    case "time":
    case "text":
    case "password":
    case "tel":
    case "textarea":
    case "select":
    case "radio":
    case "signature":
    default:
      return z
        .string()
        .optional()
        .superRefine((value, context) => {
          if (isEmptyValue(value) || !value) {
            return;
          }

          if (
            validation?.minLength !== undefined &&
            value.length < validation.minLength
          ) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message: `${field.label} must contain at least ${validation.minLength} characters.`,
            });
          }

          if (
            validation?.maxLength !== undefined &&
            value.length > validation.maxLength
          ) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message: `${field.label} must not exceed ${validation.maxLength} characters.`,
            });
          }

          if (validation?.pattern) {
            const pattern = new RegExp(validation.pattern);

            if (!pattern.test(value)) {
              context.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${field.label} has an invalid format.`,
              });
            }
          }
        });
  }
}

/**
 * -----------------------------------------------------------------------------
 * Validate required field.
 * -----------------------------------------------------------------------------
 */

function validateRequiredField(
  field: FormField,
  value: unknown,
  context: z.RefinementCtx,
): void {
  /**
   * File fields.
   */

  if (field.type === "file") {
    if (field.file?.multiple) {
      if (!Array.isArray(value) || value.length === 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field.name ?? field.id],
          message: `${field.label} is required.`,
        });
      }

      return;
    }

    if (value === null || value === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [field.name ?? field.id],
        message: `${field.label} is required.`,
      });
    }

    return;
  }

  /**
   * Multiple selection fields.
   */

  if (
    field.type === "multiselect" &&
    (!Array.isArray(value) || value.length === 0)
  ) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [field.name ?? field.id],
      message: `${field.label} is required.`,
    });

    return;
  }

  /**
   * Checkbox.
   */

  if (
    field.type === "checkbox" &&
    value !== true &&
    (!Array.isArray(value) || value.length === 0)
  ) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [field.name ?? field.id],
      message: `${field.label} is required.`,
    });

    return;
  }

  /**
   * Standard fields.
   */

  if (isEmptyValue(value)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [field.name ?? field.id],
      message: `${field.label} is required.`,
    });
  }
}

/**
 * -----------------------------------------------------------------------------
 * Build Compliance schema.
 *
 * IMPORTANT:
 *
 * Field-level schemas handle value format.
 *
 * superRefine handles:
 *
 * - visibleWhen
 * - conditional required fields
 * -----------------------------------------------------------------------------
 */

export function buildComplianceFormSchema(fields: FormField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  /**
   * Build the object shape.
   */

  fields.forEach((field) => {
    const fieldName = field.name ?? field.id;

    shape[fieldName] = buildFieldSchema(field);
  });

  /**
   * Create base schema.
   */

  const baseSchema = z.object(shape);

  /**
   * Conditional validation.
   */

  return baseSchema.superRefine((values, context) => {
    const formValues = values as Record<string, unknown>;

    fields.forEach((field) => {
      const fieldName = field.name ?? field.id;

      const visible = isFieldVisible(field.visibleWhen, formValues);

      /**
       * Hidden fields should not participate in
       * required validation.
       */

      if (!visible) {
        return;
      }

      if (field.required) {
        validateRequiredField(field, formValues[fieldName], context);
      }
    });
  });
}

export default buildComplianceFormSchema;
