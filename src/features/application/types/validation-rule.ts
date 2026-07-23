export const VALIDATION_TYPES = {
  REQUIRED: "required",
  MIN: "min",
  MAX: "max",
  MIN_LENGTH: "minLength",
  MAX_LENGTH: "maxLength",
  PATTERN: "pattern",
  EMAIL: "email",
  URL: "url",
  CUSTOM: "custom",
} as const;

export type ValidationType =
  (typeof VALIDATION_TYPES)[keyof typeof VALIDATION_TYPES];

export interface ValidationRule {
  type: ValidationType;

  value?: string | number | boolean | RegExp;

  message: string;
}
