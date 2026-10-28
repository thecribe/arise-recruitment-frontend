import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BriefcaseBusiness, LoaderCircle, X } from "lucide-react";
import { useCreateJobType, useUpdateJobType } from "../../hooks/useJobTypes";
import {
  jobTypeSchema,
  type JobTypeFormValues,
} from "../../schemas/job-type.schema";
import type { JobType } from "../../types/job-type.types";

interface JobTypeFormModalProps {
  open: boolean;
  jobType: JobType | null;
  onClose: () => void;
}

export default function JobTypeFormModal({
  open,
  jobType,
  onClose,
}: JobTypeFormModalProps) {
  const isEditing = Boolean(jobType);
  const createMutation = useCreateJobType();
  const updateMutation = useUpdateJobType();

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobTypeFormValues>({
    resolver: zodResolver(jobTypeSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (open) {
      reset({ name: jobType?.name ?? "" });
    }
  }, [open, jobType, reset]);

  if (!open) return null;

  const submit = async (values: JobTypeFormValues) => {
    try {
      if (jobType) {
        await updateMutation.mutateAsync({
          id: jobType.id,
          values,
        });
      } else {
        await createMutation.mutateAsync(values);
      }

      onClose();
    } catch {
      // The mutation hook displays the error notification.
      // Keep the modal open so the user can correct or retry.
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-type-modal-title"
        className="my-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/60 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95"
      >
        <header className="flex items-start justify-between gap-3 border-b border-slate-200/70 px-5 py-4 dark:border-slate-700/70">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <BriefcaseBusiness size={19} />
            </div>

            <div>
              <h2
                id="job-type-modal-title"
                className="text-base font-semibold text-slate-900 dark:text-white"
              >
                {isEditing ? "Edit job type" : "Add job type"}
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {isEditing
                  ? "Update the name of this job type."
                  : "Create a job type for your recruitment process."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit(submit)} className="space-y-5 p-5">
          <div className="space-y-1.5">
            <label
              htmlFor="job-type-name"
              className="block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Job type name <span className="text-red-500">*</span>
            </label>

            <input
              id="job-type-name"
              autoFocus
              maxLength={100}
              placeholder="e.g. Registered Nurse"
              disabled={isSaving}
              {...register("name")}
              className={`w-full rounded-xl border bg-white/80 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:bg-slate-950/50 dark:text-white ${
                errors.name
                  ? "border-red-400"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            />

            <div className="flex items-start justify-between gap-3">
              {errors.name ? (
                <p
                  role="alert"
                  className="text-xs text-red-600 dark:text-red-400"
                >
                  {errors.name.message}
                </p>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Use a clear name between 2 and 100 characters.
                </p>
              )}

              <span className="shrink-0 text-xs text-slate-400">Up to 100</span>
            </div>
          </div>

          <footer className="flex flex-col-reverse gap-2 border-t border-slate-200/70 pt-4 sm:flex-row sm:justify-end dark:border-slate-700/70">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 sm:w-auto dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSaving && <LoaderCircle size={16} className="animate-spin" />}
              {isSaving
                ? "Saving..."
                : isEditing
                  ? "Save changes"
                  : "Create job type"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
