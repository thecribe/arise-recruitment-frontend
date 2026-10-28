import { useState } from "react";
import {
  AlertCircle,
  BriefcaseBusiness,
  LoaderCircle,
  Plus,
  RefreshCw,
} from "lucide-react";

import {
  useDeleteJobType,
  useJobTypes,
  useSetDefaultJobType,
} from "../hooks/useJobTypes";
import type { JobType } from "../types/job-type.types";
import JobTypeTable from "../components/job-types/JobTypeTable";
import JobTypeFormModal from "../components/job-types/JobTypeFormModal";
import ConfirmDeleteModal from "@/features/compliance/applicant/components/reference/ConfirmDeleteModal";

export default function JobTypesSettingsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null);
  const [jobTypeToDelete, setJobTypeToDelete] = useState<JobType | null>(null);

  const jobTypesQuery = useJobTypes();
  const setDefaultMutation = useSetDefaultJobType();
  const deleteMutation = useDeleteJobType();

  const jobTypes = jobTypesQuery.data ?? [];

  const busyJobTypeId = setDefaultMutation.isPending
    ? setDefaultMutation.variables
    : deleteMutation.isPending
      ? deleteMutation.variables
      : null;

  const openCreateModal = () => {
    setSelectedJobType(null);
    setIsFormOpen(true);
  };

  const openEditModal = (jobType: JobType) => {
    setSelectedJobType(jobType);
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setSelectedJobType(null);
  };

  //   const handleDelete = async () => {
  //     if (!jobTypeToDelete) return;

  //     try {
  //       await deleteMutation.mutateAsync(jobTypeToDelete.id);
  //       setJobTypeToDelete(null);
  //     } catch {
  //       // The mutation hook displays an error notification.
  //       // Keep the confirmation open so the user can retry.
  //     }
  //   };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 pb-8">
      {/* Page heading */}
      <header className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-sky-100 p-5 shadow-sm dark:border-blue-900/50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/60 sm:p-7">
        <div className="pointer-events-none absolute -right-12 -top-16 size-48 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/70 text-blue-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-blue-300">
              <BriefcaseBusiness size={21} />
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                Job types
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Manage the job roles available throughout the recruitment
                process and choose the default job type.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
          >
            <Plus size={17} />
            Add job type
          </button>
        </div>
      </header>

      {/* Job type list */}
      <section className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl sm:p-5 dark:border-white/10 dark:bg-slate-900/60">
        {jobTypesQuery.isError ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/30"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-600 dark:text-red-300" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                  Unable to load job types
                </p>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                  Check your connection and try again.
                </p>
                <button
                  type="button"
                  onClick={() => void jobTypesQuery.refetch()}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-800 underline underline-offset-4 dark:text-red-200"
                >
                  <RefreshCw size={14} />
                  Try again
                </button>
              </div>
            </div>
          </div>
        ) : (
          <JobTypeTable
            jobTypes={jobTypes}
            isLoading={jobTypesQuery.isPending}
            busyJobTypeId={busyJobTypeId}
            onEdit={openEditModal}
            onSetDefault={(jobType) => {
              void setDefaultMutation.mutateAsync(jobType.id).catch(() => {
                // The mutation hook displays an error notification.
              });
            }}
            onDelete={setJobTypeToDelete}
          />
        )}

        {jobTypesQuery.isFetching && !jobTypesQuery.isPending && (
          <p className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <LoaderCircle size={13} className="animate-spin" />
            Refreshing job types...
          </p>
        )}
      </section>

      {/* Create / edit modal */}
      <JobTypeFormModal
        open={isFormOpen}
        jobType={selectedJobType}
        onClose={closeFormModal}
      />

      {/* Delete confirmation */}
      <ConfirmDeleteModal
        open={Boolean(jobTypeToDelete)}
        title="Delete job type?"
        description={
          jobTypeToDelete
            ? `Are you sure you want to delete "${jobTypeToDelete.name}"? Applicants and staff currently assigned to this job type may be reassigned to the default job type. This action cannot be undone.`
            : "Are you sure you want to delete this job type?"
        }
        confirmLabel="Delete job type"
        cancelLabel="Cancel"
        isLoading={deleteMutation.isPending}
        onCancel={() => {
          if (!deleteMutation.isPending) {
            setJobTypeToDelete(null);
          }
        }}
        onConfirm={() => {
          if (!jobTypeToDelete || deleteMutation.isPending) return;

          deleteMutation.mutate(jobTypeToDelete.id, {
            onSuccess: () => {
              setJobTypeToDelete(null);
            },
          });
        }}
      />
    </div>
  );
}
