import { useMemo, useState } from "react";
import { Plus, Send, ShieldCheck } from "lucide-react";

import TrainingCertificateCard from "./TrainingCertificateCard";
import TrainingCertificateForm from "./TrainingCertificateForm";
import TrainingCertificateStatusHeader from "./TrainingCertificateStatusHeader";
import {
  useApplicantTrainingCertificates,
  useDeleteApplicantTrainingCertificate,
  useSubmitApplicantTrainingCertificates,
} from "../../hooks/useTrainingCertificates";
import type {
  ApplicantTrainingCertificate,
  TrainingCertificateRequirement,
  TrainingCertificateSectionStatus,
} from "../../types/training-certificate.types";
import ConfirmationModal from "../reference/ConfirmDeleteModal";
import type { ComplianceSectionId } from "@/features/recruitment/types/compliance.types";

interface TrainingCertificatesTabProps {
  sectionId: ComplianceSectionId;
}

export default function TrainingCertificatesTab({
  sectionId,
}: TrainingCertificatesTabProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] =
    useState<TrainingCertificateRequirement | null>(null);
  const [selectedCertificate, setSelectedCertificate] =
    useState<ApplicantTrainingCertificate | null>(null);
  const [certificateToDelete, setCertificateToDelete] =
    useState<ApplicantTrainingCertificate | null>(null);

  const { data, isLoading, isError, refetch } =
    useApplicantTrainingCertificates(sectionId);

  const deleteMutation = useDeleteApplicantTrainingCertificate();

  const submitMutation = useSubmitApplicantTrainingCertificates();

  const status: TrainingCertificateSectionStatus =
    data?.status ?? "in_progress";

  const certificates = data?.certificates ?? [];
  const requirements = data?.requirements ?? [];
  const comments = data?.comments ?? [];

  const canEdit = status === "in_progress" || status === "rejected";

  const canSubmit = canEdit;

  const certificateByRequirement = useMemo(() => {
    return new Map(
      certificates
        .filter((certificate) => certificate.requirement_id)
        .map((certificate) => [
          certificate.requirement_id as string,
          certificate,
        ]),
    );
  }, [certificates]);

  const additionalCertificates = useMemo(() => {
    return certificates.filter((certificate) => !certificate.requirement_id);
  }, [certificates]);

  const openCreateForm = (
    requirement: TrainingCertificateRequirement | null = null,
  ) => {
    setSelectedRequirement(requirement);
    setSelectedCertificate(null);
    setIsFormOpen(true);
  };

  const openEditForm = (certificate: ApplicantTrainingCertificate) => {
    const requirement =
      requirements.find((item) => item.id === certificate.requirement_id) ??
      null;

    setSelectedRequirement(requirement);
    setSelectedCertificate(certificate);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedRequirement(null);
    setSelectedCertificate(null);
  };

  const handleDelete = async () => {
    if (!certificateToDelete) return;

    await deleteMutation.mutateAsync({
      sectionId,
      certificateId: certificateToDelete.id,
    });

    setCertificateToDelete(null);
  };

  const handleSubmit = async () => {
    await submitMutation.mutateAsync(sectionId);
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/60 p-6 text-center shadow-sm backdrop-blur-xl">
        <p className="text-sm text-slate-500">
          Loading training certificates...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50/70 p-6 text-center">
        <p className="text-sm text-red-600">
          Failed to load training certificates.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TrainingCertificateStatusHeader status={status} comments={comments} />

      {isFormOpen ? (
        <TrainingCertificateForm
          sectionId={sectionId}
          requirement={selectedRequirement}
          certificate={selectedCertificate}
          onClose={closeForm}
        />
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Required Certificates
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Provide all mandatory training certificates.
              </p>
            </div>
          </div>

          {requirements.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center">
              <ShieldCheck className="mx-auto h-8 w-8 text-slate-400" />

              <p className="mt-2 text-sm text-slate-500">
                No mandatory certificate requirements found.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {requirements.map((requirement) => {
                const certificate = certificateByRequirement.get(
                  requirement.id,
                );

                return certificate ? (
                  <TrainingCertificateCard
                    key={certificate.id}
                    certificate={certificate}
                    requirement={requirement}
                    canEdit={canEdit}
                    onEdit={openEditForm}
                    onDelete={setCertificateToDelete}
                  />
                ) : (
                  <div
                    key={requirement.id}
                    className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-4 dark:border-blue-900/50 dark:bg-blue-950/20"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {requirement.name}
                        </h3>

                        {requirement.description && (
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {requirement.description}
                          </p>
                        )}

                        <p className="mt-2 text-xs font-medium text-amber-600">
                          Not provided
                        </p>
                      </div>

                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => openCreateForm(requirement)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          <Plus className="h-4 w-4" />
                          Add certificate
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Additional Certificates
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Add any other relevant training certificates.
                </p>
              </div>

              {canEdit && (
                <button
                  type="button"
                  onClick={() => openCreateForm()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  <Plus className="h-4 w-4" />
                  Add certificate
                </button>
              )}
            </div>

            {additionalCertificates.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center">
                <p className="text-sm text-slate-500">
                  No additional certificates added.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {additionalCertificates.map((certificate) => (
                  <TrainingCertificateCard
                    key={certificate.id}
                    certificate={certificate}
                    canEdit={canEdit}
                    onEdit={openEditForm}
                    onDelete={setCertificateToDelete}
                  />
                ))}
              </div>
            )}
          </div>

          {canSubmit && (
            <div className="flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Ready to submit?
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  All mandatory certificates must be provided.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />

                {submitMutation.isPending
                  ? "Submitting..."
                  : "Submit certificates"}
              </button>
            </div>
          )}
        </>
      )}

      <ConfirmationModal
        open={Boolean(certificateToDelete)}
        title="Delete certificate"
        description="Are you sure you want to delete this training certificate? This action cannot be undone."
        confirmLabel="Delete certificate"
        cancelLabel="Cancel"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!deleteMutation.isPending) {
            setCertificateToDelete(null);
          }
        }}
      />
    </div>
  );
}
