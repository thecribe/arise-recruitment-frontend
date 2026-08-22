/**
 * -----------------------------------------------------------------------------
 * File: field.ts
 *
 * Description:
 * Shared dynamic-form field contracts.
 *
 * These types are intentionally feature-agnostic.
 *
 * They can be consumed by:
 *
 * - Application
 * - Recruitment
 * - Interview
 * - Compliance
 * - Staff
 * - Any future dynamic form
 * -----------------------------------------------------------------------------
 */

import type { VisibilityCondition } from "./visibility";

export const FIELD_TYPES = {
  TEXT: "text",
  PASSWORD: "password",

  EMAIL: "email",
  PHONE: "tel",
  NUMBER: "number",
  DATE: "date",
  TIME: "time",
  TEXTAREA: "textarea",
  SWITCH: "switch",
  SELECT: "select",
  MULTISELECT: "multiselect",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  SIGNATURE: "signature",
  UPLOAD: "file",
} as const;

export type FieldType = (typeof FIELD_TYPES)[keyof typeof FIELD_TYPES];

/**
 * -----------------------------------------------------------------------------
 * Field option
 * -----------------------------------------------------------------------------
 */
export interface FormFieldOption {
  label: string;

  value: unknown;

  disabled?: boolean;

  visibleWhen?: VisibilityCondition;
}

/**
 * -----------------------------------------------------------------------------
 * Field width
 * -----------------------------------------------------------------------------
 */

export const FIELD_WIDTH = {
  QUARTER: 3,
  THIRD: 4,
  HALF: 6,
  TWO_THIRDS: 8,
  THREE_QUARTERS: 9,
  FULL: 12,
} as const;

export type FieldWidth = (typeof FIELD_WIDTH)[keyof typeof FIELD_WIDTH];

export const FIELD_WIDTH_CLASS: Record<FieldWidth, string> = {
  3: "col-span-1 min-w-0 md:col-span-3",
  4: "col-span-1 min-w-0 md:col-span-4",
  6: "col-span-1 min-w-0 md:col-span-6",
  8: "col-span-1 min-w-0 md:col-span-8",
  9: "col-span-1 min-w-0 md:col-span-9",
  12: "col-span-1 min-w-0 md:col-span-12",
};

/**
 * -----------------------------------------------------------------------------
 * Field validation
 * -----------------------------------------------------------------------------
 */
export interface FieldValidation {
  min?: number;

  max?: number;

  minLength?: number;

  maxLength?: number;

  pattern?: string;
}

/**
 * -----------------------------------------------------------------------------
 * File configuration
 * -----------------------------------------------------------------------------
 */
export interface FileConfig {
  accept?: string[];

  maxSizeMB?: number;

  multiple?: boolean;
}

/**
 * -----------------------------------------------------------------------------
 * Shared form field
 * -----------------------------------------------------------------------------
 */
export interface FormField {
  id: string;

  type: FieldType;

  required?: boolean;

  label: string;

  name?: string;

  placeholder?: string;

  helpText?: string;

  defaultValue?: unknown;

  /**
   * Field-level validation configuration.
   */
  validation?: FieldValidation;

  disabled?: boolean;

  readOnly?: boolean;

  visibleWhen?: VisibilityCondition;

  options?: FormFieldOption[];

  width?: FieldWidth;

  order: number;

  rows?: number;

  min?: number;

  max?: number;

  step?: number;

  file?: FileConfig;

  metadata?: Record<string, unknown>;
}
