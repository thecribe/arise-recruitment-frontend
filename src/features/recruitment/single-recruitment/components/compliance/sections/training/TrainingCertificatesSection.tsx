import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import type {
  TrainingCertificate,
  TrainingCertificateRequirement,
} from "./types/training-certificate.types";
import { useTrainingCertificates } from "../../hooks/training-certificates.hooks";
import TrainingCertificateList from "./components/TrainingCertificateList";
import TrainingCertificateFormModal from "./components/TrainingCertificateFormModal";
import TrainingCertificateViewModal from "./components/TrainingCertificateViewModal";
import TrainingCertificateDeleteModal from "./components/TrainingCertificateDeleteModal";
import TrainingCertificateComments from "./components/TrainingCertificateComments";
import TrainingCertificateStatus from "./components/TrainingCertificateStatus";

interface TrainingCertificatesSectionProps {
  applicationId: string;

  /**
   * Controls whether the current user can modify certificates.
   *
   * Applicant:
   * - Can edit/delete their own certificates.
   *
   * Manager:
   * - Can edit/delete applicant certificates.
   * - Can upload certificates on behalf of the applicant.
   */
  canEdit?: boolean;
  canDelete?: boolean;
  sectionId: string;
}

const TrainingCertificatesSection = ({
  applicationId,
  canEdit = false,
  canDelete = false,
  sectionId,
}: TrainingCertificatesSectionProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedRequirement, setSelectedRequirement] =
    useState<TrainingCertificateRequirement | null>(null);

  const [selectedCertificate, setSelectedCertificate] =
    useState<TrainingCertificate | null>(null);

  const { data, isLoading, isFetching, isError, refetch } =
    useTrainingCertificates(applicationId);

  const requirements = data?.requirements ?? [];
  const certificates = data?.certificates ?? [];

  const handleAddCertificate = (
    requirement?: TrainingCertificateRequirement,
  ) => {
    setSelectedCertificate(null);
    setSelectedRequirement(requirement ?? null);
    setFormOpen(true);
  };

  const handleEditCertificate = (certificate: TrainingCertificate) => {
    const requirement = certificate.requirementId
      ? (requirements.find((item) => item.id === certificate.requirementId) ??
        null)
      : null;

    setSelectedRequirement(requirement);
    setSelectedCertificate(certificate);
    setFormOpen(true);
  };

  const handleViewCertificate = (certificate: TrainingCertificate) => {
    setSelectedCertificate(certificate);
    setViewOpen(true);
  };

  const handleDeleteCertificate = (certificate: TrainingCertificate) => {
    setSelectedCertificate(certificate);
    setDeleteOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedRequirement(null);
    setSelectedCertificate(null);
  };

  const handleCloseView = () => {
    setViewOpen(false);
    setSelectedCertificate(null);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Training Certificates
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Review the applicant&apos;s mandatory and additional training
            certificates.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-blue-200/70 bg-white/50 px-3 text-sm font-medium text-slate-700 backdrop-blur-xl transition hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/50 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-900/60"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />

            <span className="hidden sm:inline">Refresh</span>
          </button>

          {canEdit && (
            <button
              type="button"
              onClick={() => handleAddCertificate()}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Certificate</span>
            </button>
          )}
        </div>
      </div>
      <div className="mt-6">
        <TrainingCertificateStatus
          applicationId={applicationId}
          sectionId={sectionId}
        />
      </div>
      {/* Content */}
      <div className="rounded-2xl border border-blue-200/60 bg-white/40 p-4 shadow-sm backdrop-blur-xl sm:p-6 dark:border-blue-900/40 dark:bg-slate-950/30">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-48 animate-pulse rounded-2xl border border-blue-100/60 bg-white/40 dark:border-blue-900/30 dark:bg-slate-900/40"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-red-200/70 bg-red-50/50 px-6 text-center dark:border-red-900/40 dark:bg-red-950/20">
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              Unable to load training certificates.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 inline-flex h-9 items-center rounded-lg border border-red-200 bg-white/70 px-3 text-sm font-medium text-red-700 transition hover:bg-white dark:border-red-900/50 dark:bg-slate-900/50 dark:text-red-400"
            >
              Try Again
            </button>
          </div>
        ) : (
          <TrainingCertificateList
            requirements={requirements}
            certificates={certificates}
            canEdit={canEdit}
            canDelete={canDelete}
            onAdd={handleAddCertificate}
            onView={handleViewCertificate}
            onEdit={handleEditCertificate}
            onDelete={handleDeleteCertificate}
          />
        )}

        {/* Training Certificate Comments */}
        <div className="mt-8 border-t border-blue-100/70 pt-6 dark:border-blue-900/40">
          <TrainingCertificateComments
            applicationId={applicationId}
            sectionId={sectionId}
          />
        </div>
      </div>

      {/* Create / Edit */}
      <TrainingCertificateFormModal
        open={formOpen}
        applicationId={applicationId}
        requirement={selectedRequirement}
        certificate={selectedCertificate}
        onClose={handleCloseForm}
      />

      {/* View */}
      <TrainingCertificateViewModal
        open={viewOpen}
        certificate={selectedCertificate}
        onClose={handleCloseView}
      />

      {/* Delete */}
      <TrainingCertificateDeleteModal
        open={deleteOpen}
        applicationId={applicationId}
        certificate={selectedCertificate}
        onClose={handleCloseDelete}
      />
    </section>
  );
};

export default TrainingCertificatesSection;
