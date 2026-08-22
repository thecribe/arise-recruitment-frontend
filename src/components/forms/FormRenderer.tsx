/**
 * -----------------------------------------------------------------------------
 * File: FormRenderer.tsx
 *
 * Description:
 * Generic renderer for a collection of dynamic form fields.
 *
 * Responsibilities:
 * - Render fields in configured order.
 * - Provide generic renderer configuration.
 * - Support nested/repeatable field prefixes.
 * - Provide existing file deletion callbacks.
 *
 * Important:
 * This component does NOT create React Hook Form state.
 *
 * The consuming feature owns:
 *
 * - useForm()
 * - FormProvider
 * - validation resolver
 * - submit handling
 * - server state
 *
 * This keeps the renderer completely feature-agnostic.
 * -----------------------------------------------------------------------------
 */

import FormRendererProvider from "./context/FormRendererProvider";
import FieldRenderer from "./FieldRenderer";

import type { FormField } from "./types/field";
import type { FormUploadedFile } from "./types/file";
import type { FormRendererConfig } from "./types/form";

interface FormRendererProps {
  /**
   * Fields to render.
   */
  fields: FormField[];

  /**
   * Generic renderer configuration.
   */
  config: FormRendererConfig;

  /**
   * Optional prefix for nested/repeatable fields.
   *
   * Example:
   *
   * employmentHistory.0
   */
  prefix?: string;

  /**
   * Called when a stored backend document should be deleted.
   *
   * The consuming feature owns the actual API operation.
   */
  onDeleteFile?: (file: FormUploadedFile) => void;

  /**
   * Optional class name for the field grid.
   */
  className?: string;
}

export default function FormRenderer({
  fields,
  config,
  prefix,
  onDeleteFile,
  className,
}: FormRendererProps) {
  /**
   * ---------------------------------------------------------------------------
   * Keep fields consistently ordered.
   *
   * Never mutate the original field array because the same definition may be
   * consumed elsewhere.
   * ---------------------------------------------------------------------------
   */

  const orderedFields = [...fields].sort((a, b) => a.order - b.order);

  return (
    <FormRendererProvider config={config} onDeleteFile={onDeleteFile}>
      <div
        className={["grid grid-cols-12 gap-5", className]
          .filter(Boolean)
          .join(" ")}
      >
        {orderedFields.map((field) => (
          <FieldRenderer key={field.id} field={field} prefix={prefix} />
        ))}
      </div>
    </FormRendererProvider>
  );
}
