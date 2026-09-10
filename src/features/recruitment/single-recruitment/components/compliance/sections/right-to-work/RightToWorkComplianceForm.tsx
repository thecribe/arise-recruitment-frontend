/**
 * -----------------------------------------------------------------------------
 * File: IdentityComplianceForm.tsx
 *
 * Description:
 *
 * Reusable Compliance form used by the Identity Compliance section.
 *
 * Responsibilities:
 *
 * - Create Compliance React Hook Form state.
 * - Manage view/edit state.
 * - Render dynamic fields.
 * - Submit validated values.
 * - Reset the form when editing is cancelled.
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

interface IdentityComplianceFormProps {
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

export default function IdentityComplianceForm({
  formId,
  title,
  description,
  fields,
  values,
  canEdit = true,
  isSaving = false,
  onSave,
}: IdentityComplianceFormProps) {
  return (
    <ComplianceFormProvider formId={formId} fields={fields} values={values}>
      <IdentityComplianceFormContent
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

interface IdentityComplianceFormContentProps {
  title: string;
  description?: string;
  fields: FormField[];
  canEdit: boolean;
  isSaving: boolean;
  onSave: (values: ComplianceFormValues) => Promise<unknown>;
}

function IdentityComplianceFormContent({
  title,
  description,
  fields,
  canEdit,
  isSaving,
  onSave,
}: IdentityComplianceFormContentProps) {
  /**
   * ---------------------------------------------------------------------------
   * Local edit state.
   * ---------------------------------------------------------------------------
   */
  const [isEditing, setIsEditing] = useState(false);

  /**
   * ---------------------------------------------------------------------------
   * React Hook Form.
   * ---------------------------------------------------------------------------
   */
  const { handleSubmit, reset } = useFormContext<ComplianceFormValues>();

  /**
   * ---------------------------------------------------------------------------
   * Enter editing mode.
   * ---------------------------------------------------------------------------
   */
  const handleEdit = () => {
    if (!canEdit || isSaving) {
      return;
    }

    setIsEditing(true);
  };

  /**
   * ---------------------------------------------------------------------------
   * Cancel editing.
   *
   * reset() restores the values originally supplied to the form.
   * ---------------------------------------------------------------------------
   */
  const handleCancel = () => {
    if (isSaving) {
      return;
    }

    reset();
    setIsEditing(false);
  };

  /**
   * ---------------------------------------------------------------------------
   * Save.
   * ---------------------------------------------------------------------------
   */
  const handleSave = handleSubmit(async (formValues) => {
    await onSave(formValues);

    /**
     * Only leave edit mode when the save completes successfully.
     */
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
