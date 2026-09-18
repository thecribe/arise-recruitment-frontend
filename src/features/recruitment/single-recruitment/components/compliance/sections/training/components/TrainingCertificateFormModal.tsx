import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";
import type {
  TrainingCertificate,
  TrainingCertificateRequirement,
} from "../types/training-certificate.types";
import {
  trainingCertificateSchema,
  type TrainingCertificateSchemaValues,
} from "../schemas/training-certificate.schema";
import type { FormUploadedFile } from "@/components/forms/types/file";
import {
  useCreateTrainingCertificate,
  useUpdateTrainingCertificate,
} from "../../../hooks/training-certificates.hooks";
import { getTrainingCertificateFields } from "../forms/training-certificate.fields";
import type { FormField } from "@/components/forms/types/field";

interface TrainingCertificateFormModalProps {
  open: boolean;
  applicationId: string;
  requirement?: TrainingCertificateRequirement | null;
  certificate?: TrainingCertificate | null;
  onClose: () => void;
}

const getDefaultValues = (
  certificate: TrainingCertificate | null,
): TrainingCertificateSchemaValues => {
  if (!certificate) {
    return {
      certificateName: "",
      certificateNumber: "",
      issueDate: "",
      expiryDate: "",
      document: null,
    };
  }

  const certificateDocument = certificate.document;

  const uploadedFile: FormUploadedFile | null = certificateDocument
    ? {
        id: certificateDocument.id,
        document_url: certificateDocument.document_url,
        name: certificateDocument.name,
        mimeType: certificateDocument.mimetype,
        size: certificateDocument.size,
      }
    : null;

  return {
    certificateName: certificate.certificateName ?? "",
    certificateNumber: certificate.certificateNumber ?? "",
    issueDate: certificate.issueDate ?? "",
    expiryDate: certificate.expiryDate ?? "",
    document: uploadedFile,
  };
};

const TrainingCertificateFormModal = ({
  open,
  applicationId,
  requirement = null,
  certificate = null,
  onClose,
}: TrainingCertificateFormModalProps) => {
  const isEditing = Boolean(certificate);
  const isMandatory = Boolean(requirement);

  const createCertificate = useCreateTrainingCertificate(applicationId);

  const updateCertificate = useUpdateTrainingCertificate(
    applicationId,
    certificate?.id ?? "",
  );

  const isPending = createCertificate.isPending || updateCertificate.isPending;

  const fields = useMemo<FormField[]>(() => {
    return getTrainingCertificateFields({
      includeCertificateName: !isMandatory,
    });
  }, [isMandatory]);

  const methods = useForm<TrainingCertificateSchemaValues>({
    resolver: zodResolver(trainingCertificateSchema),
    defaultValues: getDefaultValues(certificate),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (!open) {
      return;
    }

    reset(getDefaultValues(certificate));
  }, [open, certificate, reset]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, isPending, onClose]);

  if (!open) {
    return null;
  }

  const handleSubmitForm = async (values: TrainingCertificateSchemaValues) => {
    try {
      if (isEditing && certificate) {
        await updateCertificate.mutateAsync({
          certificateNumber: values.certificateNumber,
          issueDate: values.issueDate,
          expiryDate: values.expiryDate,
          document: values.document,
        });

        onClose();
        return;
      }

      await createCertificate.mutateAsync({
        requirementId: requirement?.id ?? null,
        certificateName: isMandatory
          ? (requirement?.name ?? "")
          : values.certificateName,
        certificateNumber: values.certificateNumber,
        issueDate: values.issueDate,
        expiryDate: values.expiryDate,
        document: values.document,
      });

      onClose();
    } catch {
      // Global mutation/error handling handles the error.
    }
  };

  const title = isEditing
    ? "Edit Training Certificate"
    : isMandatory
      ? `Upload ${requirement?.name ?? "Certificate"}`
      : "Add Training Certificate";

  const description = isEditing
    ? "Update the certificate details and document."
    : isMandatory
      ? "Upload the required training certificate for this application."
      : "Add an additional training certificate to this application.";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="training-certificate-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isPending) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-blue-200/60 bg-white/90 shadow-2xl backdrop-blur-2xl dark:border-blue-400/20 dark:bg-slate-950/95">
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-blue-100/70 px-5 py-4 sm:px-6 dark:border-blue-900/40">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                <Upload className="h-4 w-4" />
              </div>

              <h2
                id="training-certificate-modal-title"
                className="text-base font-semibold text-slate-900 dark:text-white"
              >
                {title}
              </h2>
            </div>

            <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
              {description}
            </p>

            {isMandatory && requirement && (
              <div className="mt-3 rounded-xl border border-blue-200/60 bg-blue-50/50 px-3 py-2.5 dark:border-blue-900/40 dark:bg-blue-950/20">
                <p className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  Mandatory Certificate
                </p>

                <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
                  {requirement.name}
                </p>

                {requirement.description && (
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {requirement.description}
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <FormRenderer
                fields={fields}
                config={{
                  mode: "edit",
                  canEdit: true,
                  disabled: isPending,
                  readOnly: false,
                }}
              />
            </div>

            {/* Footer */}
            <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-blue-100/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-6 dark:border-blue-900/40">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white/60 px-4 text-sm font-medium text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    {isEditing ? "Save Changes" : "Upload Certificate"}
                  </>
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>,
    document.body,
  );
};

export default TrainingCertificateFormModal;
