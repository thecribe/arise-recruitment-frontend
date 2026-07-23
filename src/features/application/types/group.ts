import type { ApplicationField } from "./field";
import type { VisibilityCondition } from "./visibility";

export interface FieldGroup {
  id: string;

  key: string;

  title: string;

  description?: string;

  order: number;

  fields: ApplicationField[];

  visibleWhen?: VisibilityCondition;
}
