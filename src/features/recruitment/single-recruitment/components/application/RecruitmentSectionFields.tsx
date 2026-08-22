/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentSectionFields.tsx
 *
 * Description:
 * Renders a non-repeatable Recruitment application section using
 * the generic FormRenderer.
 * -----------------------------------------------------------------------------
 */

import FormRenderer from "@/components/forms/FormRenderer";

import type { ApplicationField } from "@/features/application/types";

interface RecruitmentSectionFieldsProps {
  fields?: ApplicationField[];

  prefix?: string;
  isEditing: boolean;
}

export default function RecruitmentSectionFields({
  fields = [],
  prefix,
  isEditing,
}: RecruitmentSectionFieldsProps) {
  if (!fields.length) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-slate-200
          bg-slate-50/50
          p-6
          text-center
        "
      >
        <p className="text-sm text-slate-500">
          This section does not contain any fields.
        </p>
      </div>
    );
  }

  return (
    <FormRenderer
      fields={fields}
      prefix={prefix}
      config={{
        mode: isEditing ? "edit" : "view",
        canEdit: isEditing,
        readOnly: !isEditing,
      }}
    />
  );
}
