/**
 * -----------------------------------------------------------------------------
 * File: BaseField.ts
 *
 * Description:
 * Shared props passed to every generic form field component.
 * -----------------------------------------------------------------------------
 */

import type { FormField } from "../types/field";

export interface FieldComponentProps {
  /**
   * Generic field definition.
   */
  field: FormField;

  /**
   * Optional prefix for nested/repeatable fields.
   *
   * Example:
   *
   * employmentHistory.0
   */
  prefix?: string;
}
