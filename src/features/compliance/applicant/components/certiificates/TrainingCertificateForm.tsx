import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { X } from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";
import type {
  ApplicantTrainingCertificate,
  TrainingCertificateDocument,
  TrainingCertificateRequirement,
} from "../../types/training-certificate.types";
import {
  useCreateApplicantTrainingCertificate,
  useUpdateApplicantTrainingCertificate,
} from "../../hooks/useTrainingCertificates";
import { getTrainingCertificateFields } from "@/features/recruitment/single-recruitment/components/compliance/sections/training/forms/training-certificate.fields";

interface TrainingCertificateFormValues {
  certificateName: string;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  document: TrainingCertificateDocument | null;
}

interface TrainingCertificateFormProps {
  sectionId: string;
  requirement?: TrainingCertificateRequirement | null;
  certificate?: ApplicantTrainingCertificate | null;
  onClose: () => void;
}

const emptyValues: TrainingCertificateFormValues = {
  certificateName: "",
  certificateNumber: "",
  issueDate: "",
  expiryDate: "",
  document: null,
};

export default function TrainingCertificateForm({
  sectionId,
  requirement = null,
  certificate = null,
  onClose,
}: TrainingCertificateFormProps) {
  const isEditing = Boolean(certificate);
  const isMandatory = Boolean(requirement);

  const methods = useForm<TrainingCertificateFormValues>({
    defaultValues: emptyValues,
    mode: "onBlur",
  });

  const createMutation = useCreateApplicantTrainingCertificate();

  const updateMutation = useUpdateApplicantTrainingCertificate();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const fields = getTrainingCertificateFields({
    includeCertificateName: !isMandatory,
  });

  useEffect(() => {
    if (!certificate) {
      methods.reset({
        ...emptyValues,
        certificateName: requirement?.name ?? "",
      });

      return;
    }

    methods.reset({
      certificateName: certificate.certificate_name ?? "",
      certificateNumber: certificate.certificate_number ?? "",
      issueDate: certificate.issue_date ?? "",
      expiryDate: certificate.expiry_date ?? "",
      document: certificate.document ?? null,
    });
  }, [certificate, requirement, methods]);

  const onSubmit = async (values: TrainingCertificateFormValues) => {
    const payload = {
      requirementId: requirement?.id ?? certificate?.requirement_id ?? null,
      certificateName: requirement?.name ?? values.certificateName,
      certificateNumber: values.certificateNumber || null,
      issueDate: values.issueDate || null,
      expiryDate: values.expiryDate || null,
      document: values.document ?? null,
    };

    if (certificate) {
      await updateMutation.mutateAsync({
        sectionId,
        certificateId: certificate.id,
        payload,
      });
    } else {
      await createMutation.mutateAsync({
        sectionId,
        payload,
      });
    }

    onClose();
  };

  return (
    <div className="rounded-3xl border border-white/20 bg-white/75 p-5 shadow-lg backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {isEditing
              ? "Edit training certificate"
              : isMandatory
                ? `Add ${requirement?.name}`
                : "Add additional certificate"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Provide accurate details and upload your certificate document.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close training certificate form"
          className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {isMandatory && requirement && (
        <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-sm text-blue-800">
          <p className="font-semibold">{requirement.name}</p>

          {requirement.description && (
            <p className="mt-1 text-blue-700">{requirement.description}</p>
          )}
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
          <FormRenderer
            fields={fields}
            config={{
              mode: "edit",
              canEdit: true,
            }}
          />

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200/70 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Update certificate"
                  : "Add certificate"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
