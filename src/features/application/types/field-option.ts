import type { VisibilityCondition } from "./visibility";

export interface FieldOption {
  label: string;

  value: string | boolean;

  disabled?: boolean;

  visibleWhen?: VisibilityCondition;
}
