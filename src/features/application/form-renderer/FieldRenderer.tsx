/**
 * -----------------------------------------------------------------------------
 * File: FieldRenderer.tsx
 *
 * Description:
 * Resolves the correct field component from the registry.
 * -----------------------------------------------------------------------------
 */

import { useVisibility } from "../hooks/useVisibility";

import type { ApplicationField } from "../types";

import { FIELD_REGISTRY } from "./registry/field-registry";

interface FieldRendererProps {
  field: ApplicationField;
  prefix?: string;
}

export default function FieldRenderer({ field, prefix }: FieldRendererProps) {
  const visible = useVisibility(field.visibleWhen);

  if (!visible) return null;

  const Component = FIELD_REGISTRY[field.type];

  if (!Component) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 p-4">
        Unsupported field type: <strong>{field.type}</strong>
      </div>
    );
  }

  return <Component field={field} prefix={prefix} />;
}
