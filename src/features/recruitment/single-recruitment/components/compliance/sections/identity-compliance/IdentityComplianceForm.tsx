import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { FormField } from "@/components/forms/types/field";
import ComplianceFormProvider from "../../ComplianceFormProvider";
import type { ComplianceFormValues } from "@/features/recruitment/types/compliance.types";
import ComplianceFormCard from "../../ComplianceFormCard";
import RecruitmentSectionFields from "../../../application/RecruitmentSectionFields";

interface IdentityComplianceFormProps {
  formId: string;
  title: string;
  description?: string;
  fields: FormField[];
  values?: ComplianceFormValues;
  canEdit?: boolean;
  isSaving?: boolean;
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
  const [isEditing, setIsEditing] = useState(false);

  const { handleSubmit, reset } = useFormContext<ComplianceFormValues>();

  const handleEdit = () => {
    if (!canEdit || isSaving) return;

    setIsEditing(true);
  };

  const handleCancel = () => {
    if (isSaving) return;

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
