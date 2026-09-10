/**
 * -----------------------------------------------------------------------------
 * File: ProfessionalMembershipsForm.tsx
 *
 * Description:
 *
 * Reusable Compliance form used by the Professional Memberships section.
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

interface ProfessionalMembershipsFormProps {
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

export default function ProfessionalMembershipsForm({
  formId,
  title,
  description,
  fields,
  values,
  canEdit = true,
  isSaving = false,
  onSave,
}: ProfessionalMembershipsFormProps) {
  return (
    <ComplianceFormProvider formId={formId} fields={fields} values={values}>
      <ProfessionalMembershipsFormContent
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

interface ProfessionalMembershipsFormContentProps {
  title: string;
  description?: string;
  fields: FormField[];
  canEdit: boolean;
  isSaving: boolean;
  onSave: (values: ComplianceFormValues) => Promise<unknown>;
}

function ProfessionalMembershipsFormContent({
  title,
  description,
  fields,
  canEdit,
  isSaving,
  onSave,
}: ProfessionalMembershipsFormContentProps) {
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
