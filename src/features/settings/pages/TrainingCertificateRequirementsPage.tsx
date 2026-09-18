import { Plus, RefreshCw } from "lucide-react";
import { useState } from "react";

import TrainingCertificateRequirementList from "../components/training-certificates/TrainingCertificateRequirementList";
import {
  useTrainingCertificateRequirements,
  useUpdateTrainingCertificateRequirementStatus,
} from "../hooks/training-certificate-requirements.hooks";
import type { TrainingCertificateRequirement } from "../types/training-certificate-requirement.types";
import TrainingCertificateRequirementModal from "../components/training-certificates/TrainingCertificateRequirementModal";
import TrainingCertificateRequirementStatusModal from "../components/training-certificates/TrainingCertificateRequirementStatusModal";

const TrainingCertificateRequirementsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedRequirement, setSelectedRequirement] =
    useState<TrainingCertificateRequirement | null>(null);

  const [statusRequirement, setStatusRequirement] =
    useState<TrainingCertificateRequirement | null>(null);

  const updateStatus = useUpdateTrainingCertificateRequirementStatus(
    statusRequirement?.id ?? "",
  );

  const { data, isLoading, isFetching, isError, refetch } =
    useTrainingCertificateRequirements();

  const requirements: TrainingCertificateRequirement[] = Array.isArray(data)
    ? data
    : [];

  const handleAdd = () => {
    setSelectedRequirement(null);
    setModalOpen(true);
  };

  const handleEdit = (requirement: TrainingCertificateRequirement) => {
    setSelectedRequirement(requirement);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRequirement(null);
  };

  const handleToggleStatus = (requirement: TrainingCertificateRequirement) => {
    setStatusRequirement(requirement);
  };
  const handleCloseStatusModal = () => {
    if (updateStatus.isPending) {
      return;
    }

    setStatusRequirement(null);
  };

  const handleConfirmStatusChange = async () => {
    if (!statusRequirement) {
      return;
    }

    try {
      await updateStatus.mutateAsync(!statusRequirement.active);

      setStatusRequirement(null);
    } catch {
      // Error is handled by the mutation/application
      // error handling.
    }
  };
  return (
    <section
      className="
        rounded-2xl
        border border-blue-200/60
        bg-white/40
        shadow-sm
        backdrop-blur-xl
        dark:border-blue-400/20
        dark:bg-slate-900/30
      "
    >
      {/* Header */}
      <div
        className="
          flex flex-col gap-4
          border-b border-blue-100/70
          px-5 py-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          dark:border-blue-400/20
        "
      >
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Training Certificates
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Manage the mandatory training certificates applicants must provide
            during recruitment.
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="
              inline-flex w-full items-center justify-center gap-2
              rounded-xl
              border border-blue-200/60
              bg-white/50
              px-4 py-2.5
              text-sm font-medium
              text-slate-700
              shadow-sm
              backdrop-blur-sm
              transition
              hover:bg-blue-50/70
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
              dark:border-blue-400/20
              dark:bg-slate-900/30
              dark:text-slate-200
              dark:hover:bg-blue-500/10
            "
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="
              inline-flex w-full items-center justify-center gap-2
              rounded-xl
              bg-blue-600
              px-4 py-2.5
              text-sm font-medium
              text-white
              shadow-lg shadow-blue-950/20
              transition
              hover:bg-blue-500
              sm:w-auto
            "
          >
            <Plus className="h-4 w-4" />
            Add Certificate
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="
                  h-28
                  animate-pulse
                  rounded-2xl
                  border border-blue-100/60
                  bg-blue-50/40
                  dark:border-blue-400/10
                  dark:bg-slate-800/30
                "
              />
            ))}
          </div>
        ) : isError ? (
          <div
            className="
              flex min-h-[260px] items-center justify-center
              rounded-2xl
              border border-red-200/60
              bg-red-50/40
              px-6 py-10
              text-center
              dark:border-red-400/20
              dark:bg-red-500/5
            "
          >
            <div>
              <h3 className="text-sm font-semibold text-red-700 dark:text-red-300">
                Unable to load training certificates
              </h3>

              <p className="mt-1.5 text-sm text-red-600/70 dark:text-red-300/60">
                Something went wrong while loading the requirements.
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="
                  mt-4
                  rounded-xl
                  bg-blue-600
                  px-4 py-2
                  text-sm font-medium
                  text-white
                  transition
                  hover:bg-blue-500
                "
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <TrainingCertificateRequirementList
            requirements={requirements}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>
      <TrainingCertificateRequirementModal
        open={modalOpen}
        requirement={selectedRequirement}
        onClose={handleCloseModal}
      />
      <TrainingCertificateRequirementStatusModal
        open={Boolean(statusRequirement)}
        requirement={statusRequirement}
        isPending={updateStatus.isPending}
        onConfirm={handleConfirmStatusChange}
        onClose={handleCloseStatusModal}
      />
    </section>
  );
};

export default TrainingCertificateRequirementsPage;
