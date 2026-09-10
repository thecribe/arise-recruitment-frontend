/**
 * -----------------------------------------------------------------------------
 * File: DbsComplianceForm.tsx
 *
 * Description:
 *
 * Reusable Compliance form used by the DBS Update Check section.
 *
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { useFormContext } from "react-hook-form";

import ComplianceFormProvider from "../../ComplianceFormProvider";

import ComplianceFormCard from "../../ComplianceFormCard";

import RecruitmentSectionFields from "../../../application/RecruitmentSectionFields";

import type { FormField } from "@/components/forms/types/field";

import type { ComplianceFormValues } from "@/features/recruitment/types/compliance.types";

interface DbsComplianceFormProps {
  /**
   * Unique form identity.
   */
  formId: string;

  /**
   * Card title.
   */
  title: string;

  /**
   * Optional form description.
   */
  description?: string;

  /**
   * Dynamic fields.
   */
  fields: FormField[];

  /**
   * Existing backend values.
   */
  values?: ComplianceFormValues;

  /**
   * Whether this form can be edited.
   */
  canEdit?: boolean;

  /**
   * Saving state.
   */
  isSaving?: boolean;

  /**
   * Save callback.
   */
  onSave: (values: ComplianceFormValues) => Promise<unknown>;
}

export default function DbsComplianceForm({
  formId,
  title,
  description,
  fields,
  values,
  canEdit = true,
  isSaving = false,
  onSave,
}: DbsComplianceFormProps) {
  return (
    <ComplianceFormProvider formId={formId} fields={fields} values={values}>
      <DbsComplianceFormContent
        title={title}
        description={description}
        fields={fields}
        canEdit={canEdit}
        isSaving={isSaving}
        onSave={onSave}
      />
    </ComplianceFormProvider>
  );
}

interface DbsComplianceFormContentProps {
  title: string;
  description?: string;
  fields: FormField[];
  canEdit: boolean;
  isSaving: boolean;
  onSave: (values: ComplianceFormValues) => Promise<unknown>;
}

function DbsComplianceFormContent({
  title,
  description,
  fields,
  canEdit,
  isSaving,
  onSave,
}: DbsComplianceFormContentProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { handleSubmit, reset } = useFormContext<ComplianceFormValues>();

  const handleEdit = () => {
    if (!canEdit || isSaving) {
      return;
    }

    setIsEditing(true);
  };

  const handleCancel = () => {
    if (isSaving) {
      return;
    }

    reset();
    setIsEditing(false);
  };

  const handleSave = handleSubmit(async (formValues) => {
    await onSave(formValues);

    setIsEditing(false);
  });

  return (
    <ComplianceFormCard
      title={title}
      description={description}
      isEditing={isEditing}
      isSaving={isSaving}
      onEdit={handleEdit}
      onCancel={handleCancel}
      onSave={handleSave}
    >
      <RecruitmentSectionFields
        fields={fields}
        isEditing={isEditing && canEdit}
      />
    </ComplianceFormCard>
  );
}
