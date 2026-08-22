/**
 * -----------------------------------------------------------------------------
 * File: application-field.ts
 *
 * Description:
 * Shared field-related contracts.
 *
 * This file also defines the visibility engine used throughout the
 * application definition.
 *
 * Visibility rules may be attached to:
 *
 * - Phases
 * - Sections
 * - Fields
 * -----------------------------------------------------------------------------
 */

import type { FieldType } from "../../constants/field-types";
// import type { ValidationRule } from "../validation-rule";
import type { VisibilityCondition } from "../visibility";

/**
 * Represents one visibility expression.
 */

export interface FieldOption {
  label: string;

  value: string | boolean;

  disabled?: boolean;

  visibleWhen?: VisibilityCondition;
}

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

export interface SelectOption {
  label: string;
  value: string;
}

export interface FieldValidation {
  required?: boolean;

  min?: number;
  max?: number;

  minLength?: number;
  maxLength?: number;

  pattern?: string;
}

export interface FileConfig {
  accept?: string[];

  maxSizeMB?: number;

  multiple?: boolean;
}

export interface ApplicationField {
  id: string;

  type: FieldType;

  label: string;

  name?: string;

  placeholder?: string;

  helpText?: string;

  defaultValue?: unknown;

  required?: boolean;

  disabled?: boolean;

  readOnly?: boolean;

  visibleWhen?: VisibilityCondition;

  // validation?: ValidationRule[];

  options?: FieldOption[];

  width?: FieldWidth;
  order: number;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  // multiple?: boolean;
  // accept?: string;
  file?: FileConfig;
  // dependsOn?: string[];
  metadata?: Record<string, unknown>;
}
