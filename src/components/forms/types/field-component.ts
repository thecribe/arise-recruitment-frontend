/**
 * -----------------------------------------------------------------------------
 * File: field-component.ts
 *
 * Description:
 * Props shared by every dynamic form field component.
 * -----------------------------------------------------------------------------
 */

import type { FormField } from "./field";
import type { FormUploadedFile } from "./file";

export interface FieldComponentProps {
  /**
   * Field definition.
   */
  field: FormField;

  /**
   * Optional React Hook Form field prefix.
   */
  prefix?: string;

  /**
   * Called when an existing backend document is requested for deletion.
   *
   * The feature using the renderer decides how the deletion is performed.
   */
  onDeleteFile?: (file: FormUploadedFile) => void;

  /**
   * Optional callback when an existing document is opened.
   *
   * Normally the shared upload field can handle viewing itself, so this is
   * only needed when a feature wants to override that behavior.
   */
  onViewFile?: (file: FormUploadedFile) => void;
}
