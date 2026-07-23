import type { FieldType } from "../constants/field-types";
import type { VisibilityCondition } from "./visibility";
import type { FieldOption } from "./field-option";
import type { FieldWidth } from "./field-width";
import type { ValidationRule } from "./validation-rule";

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

  validation?: ValidationRule[];

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
  dependsOn?: string[];
  metadata?: Record<string, unknown>;
}
