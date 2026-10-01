import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  Save,
  RotateCcw,
  BriefcaseBusiness,
} from "lucide-react";

import {
  useApplicationStatus,
  useUpdateApplicationStatus,
} from "../hooks/useApplicationStatus";
import { useProfile, useUpdateJobType } from "../hooks/useProfile";
import { useBootstrapData } from "@/hooks/useBootstrapData";

import type {
  ApplicationStage,
  ApplicationStatus,
} from "../types/application-status.types";

import { APPLICATION_STAGE, APPLICATION_STATUS } from "../constants";

const schema = z
  .object({
    stage: z.enum(["APPLICATION_FORM", "INTERVIEW", "COMPLIANCE"]),
    status: z.enum(["IN_PROGRESS", "APPROVED", "REJECTED"]),
    reason: z.string().trim().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.status === APPLICATION_STATUS.REJECTED && !values.reason) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["reason"],
        message: "A reason is required when rejecting an application.",
      });
    }
  });

const jobTypeSchema = z.object({
  job_type_id: z.string().min(1, "Please select a job type."),
});

type FormValues = z.infer<typeof schema>;
type JobTypeFormValues = z.infer<typeof jobTypeSchema>;

interface ProfileApplicationSettingsProps {
  applicantId: string;
}

const stageOptions: {
  value: ApplicationStage;
  label: string;
}[] = [
  {
    value: APPLICATION_STAGE.APPLICATION_FORM as ApplicationStage,
    label: "Application form",
  },
  {
    value: APPLICATION_STAGE.INTERVIEW as ApplicationStage,
    label: "Interview",
  },
  {
    value: APPLICATION_STAGE.COMPLIANCE as ApplicationStage,
    label: "Compliance",
  },
];

const statusOptions: {
  value: ApplicationStatus;
  label: string;
}[] = [
  {
    value: APPLICATION_STATUS.IN_PROGRESS as ApplicationStatus,
    label: "In progress",
  },
  {
    value: APPLICATION_STATUS.APPROVED as ApplicationStatus,
    label: "Approved",
  },
  {
    value: APPLICATION_STATUS.REJECTED as ApplicationStatus,
    label: "Rejected",
  },
];

const statusStyles: Record<ApplicationStatus, string> = {
  IN_PROGRESS: "bg-blue-50 text-blue-700 ring-blue-200",
  APPROVED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  REJECTED: "bg-red-50 text-red-700 ring-red-200",
};

const ProfileApplicationSettings = ({
  applicantId,
}: ProfileApplicationSettingsProps) => {
  const { data: userData } = useProfile(applicantId);

  const user = userData?.user;

  const { data, isLoading, isError, refetch } =
    useApplicationStatus(applicantId);

  const {
    jobTypes: jobTypeData,
    isLoading: isJobTypesLoading,
    isError: isJobTypesError,
  } = useBootstrapData();

  const updateMutation = useUpdateApplicationStatus(applicantId);
  const updateJobTypeMutation = useUpdateJobType(applicantId);

  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [confirmJobTypeUpdate, setConfirmJobTypeUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      stage: APPLICATION_STAGE.APPLICATION_FORM as ApplicationStage,
      status: APPLICATION_STATUS.IN_PROGRESS as ApplicationStatus,
      reason: "",
    },
  });

  const jobTypeForm = useForm<JobTypeFormValues>({
    resolver: zodResolver(jobTypeSchema),
    defaultValues: {
      job_type_id: "",
    },
  });

  const {
    reset: resetJobType,
    control: jobTypeControl,
    register: registerJobType,
    handleSubmit: handleJobTypeSubmit,
    formState: { errors: jobTypeErrors, isDirty: isJobTypeDirty },
  } = jobTypeForm;

  const selectedStage = useWatch({
    control,
    name: "stage",
  });

  const selectedStatus = useWatch({
    control,
    name: "status",
  });

  const selectedReason = useWatch({
    control,
    name: "reason",
  });

  const selectedJobTypeId = useWatch({
    control: jobTypeControl,
    name: "job_type_id",
  });

  useEffect(() => {
    if (!data) return;

    reset({
      stage: data.stage,
      status: data.status,
      reason: data.reason ?? "",
    });
  }, [data, reset]);

  useEffect(() => {
    if (!user) return;

    resetJobType({
      job_type_id: user.job_type_id ? String(user.job_type_id) : "",
    });
  }, [user, resetJobType]);

  const hasChanges = useMemo(() => {
    if (!data) return false;

    return (
      selectedStage !== data.stage ||
      selectedStatus !== data.status ||
      (selectedStatus === APPLICATION_STATUS.REJECTED &&
        (selectedReason ?? "") !== (data.reason ?? ""))
    );
  }, [data, selectedStage, selectedStatus, selectedReason]);

  const currentJobTypeId = user?.job_type_id ? String(user.job_type_id) : "";

  const hasJobTypeChanges =
    Boolean(currentJobTypeId) && selectedJobTypeId !== currentJobTypeId;

  const onSubmit = async (values: FormValues) => {
    if (!hasChanges) return;

    setConfirmUpdate(false);

    await updateMutation.mutateAsync({
      stage: values.stage,
      status: values.status,
      reason:
        values.status === APPLICATION_STATUS.REJECTED
          ? values.reason
          : undefined,
    });
  };

  const onJobTypeSubmit = async (values: JobTypeFormValues) => {
    if (!hasJobTypeChanges) return;

    setConfirmJobTypeUpdate(false);

    await updateJobTypeMutation.mutateAsync({
      job_type_id: values.job_type_id,
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        <span className="ml-2 text-sm text-slate-500">
          Loading application settings...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-700">
          Could not load the application status.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-2 text-sm font-medium text-blue-700 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          No application status has been recorded yet.
        </p>
      </div>
    );
  }

  const jobTypes = jobTypeData?.data?.jobTypes ?? [];

  const currentJobType = jobTypes.find(
    (jobType: { id: string; name: string }) =>
      String(jobType.id) === currentJobTypeId,
  );

  const selectedJobType = jobTypes.find(
    (jobType: { id: string; name: string }) =>
      String(jobType.id) === selectedJobTypeId,
  );

  return (
    <section className="space-y-4">
      {/* Application state */}
      <div className="rounded-2xl border border-blue-100 bg-white/70 p-4 shadow-sm backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Application state
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Manage the applicant's current stage and status.
            </p>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ${statusStyles[data.status]}`}
          >
            {data.status === APPLICATION_STATUS.APPROVED ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : data.status === APPLICATION_STATUS.REJECTED ? (
              <AlertCircle className="h-3.5 w-3.5" />
            ) : (
              <Clock3 className="h-3.5 w-3.5" />
            )}
            {
              statusOptions.find((option) => option.value === data.status)
                ?.label
            }
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-blue-50/70 p-3">
            <p className="text-xs text-slate-500">Current stage</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {
                stageOptions.find((option) => option.value === data.stage)
                  ?.label
              }
            </p>
          </div>

          <div className="rounded-xl bg-blue-50/70 p-3">
            <p className="text-xs text-slate-500">Last updated</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {data.updatedAt
                ? new Date(data.updatedAt).toLocaleString()
                : "Not available"}
            </p>
          </div>
        </div>
      </div>

      {/* Job type */}
      <form
        onSubmit={handleJobTypeSubmit(() => setConfirmJobTypeUpdate(true))}
        className="rounded-2xl border border-blue-100 bg-white/70 p-4 shadow-sm backdrop-blur-xl sm:p-5"
      >
        <div className="mb-4 flex items-start gap-3">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
            <BriefcaseBusiness className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Applicant job type
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Change the job type assigned to this applicant.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-end">
          <div>
            <label
              htmlFor="job_type_id"
              className="mb-1.5 block text-xs font-medium text-slate-600"
            >
              Job type
            </label>
            <select
              id="job_type_id"
              {...registerJobType("job_type_id")}
              disabled={isJobTypesLoading || isJobTypesError}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value="">
                {isJobTypesLoading
                  ? "Loading job types..."
                  : isJobTypesError
                    ? "Could not load job types"
                    : "Select a job type"}
              </option>

              {jobTypes.map((jobType: { id: string; name: string }) => (
                <option key={jobType.id} value={String(jobType.id)}>
                  {jobType.name}
                </option>
              ))}
            </select>

            {jobTypeErrors.job_type_id && (
              <p className="mt-1 text-xs text-red-600">
                {jobTypeErrors.job_type_id.message}
              </p>
            )}

            {isJobTypesError && (
              <p className="mt-1 text-xs text-red-600">
                Unable to load job types.
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() =>
                resetJobType({
                  job_type_id: currentJobTypeId,
                })
              }
              disabled={!isJobTypeDirty || updateJobTypeMutation.isPending}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>

            <button
              type="submit"
              disabled={
                !hasJobTypeChanges ||
                isJobTypesLoading ||
                isJobTypesError ||
                updateJobTypeMutation.isPending
              }
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateJobTypeMutation.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Save job type
            </button>
          </div>
        </div>

        {currentJobType && (
          <p className="mt-3 text-xs text-slate-500">
            Current job type:{" "}
            <span className="font-medium text-slate-700">
              {currentJobType.name}
            </span>
          </p>
        )}
      </form>

      {/* Application stage and status */}
      <form
        onSubmit={handleSubmit(() => setConfirmUpdate(true))}
        className="rounded-2xl border border-blue-100 bg-white/70 p-4 shadow-sm backdrop-blur-xl sm:p-5"
      >
        <h3 className="mb-4 text-sm font-semibold text-slate-800">
          Update application state
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="application-stage"
              className="mb-1.5 block text-xs font-medium text-slate-600"
            >
              Application stage
            </label>
            <select
              id="application-stage"
              {...register("stage")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              {stageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.stage && (
              <p className="mt-1 text-xs text-red-600">
                {errors.stage.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="application-status"
              className="mb-1.5 block text-xs font-medium text-slate-600"
            >
              Application status
            </label>
            <select
              id="application-status"
              {...register("status")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="mt-1 text-xs text-red-600">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        {selectedStatus === APPLICATION_STATUS.REJECTED && (
          <div className="mt-4">
            <label
              htmlFor="rejection-reason"
              className="mb-1.5 block text-xs font-medium text-slate-600"
            >
              Rejection reason <span className="text-red-500">*</span>
            </label>
            <textarea
              id="rejection-reason"
              {...register("reason")}
              rows={3}
              placeholder="Enter the reason for rejection..."
              className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
            {errors.reason && (
              <p className="mt-1 text-xs text-red-600">
                {errors.reason.message}
              </p>
            )}
          </div>
        )}

        <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() =>
              reset({
                stage: data.stage,
                status: data.status,
                reason: data.reason ?? "",
              })
            }
            disabled={!isDirty || updateMutation.isPending}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>

          <button
            type="submit"
            disabled={!hasChanges || updateMutation.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updateMutation.isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            Save changes
          </button>
        </div>
      </form>

      {/* Confirm application status */}
      {confirmUpdate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-status-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-sm rounded-2xl border border-white/50 bg-white p-5 shadow-xl">
            <h3
              id="confirm-status-title"
              className="text-base font-semibold text-slate-800"
            >
              Confirm application update
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Are you sure you want to update this applicant's stage and status?
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmUpdate(false)}
                disabled={updateMutation.isPending}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={updateMutation.isPending}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {updateMutation.isPending && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                )}
                Confirm update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm job type */}
      {confirmJobTypeUpdate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-job-type-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-sm rounded-2xl border border-white/50 bg-white p-5 shadow-xl">
            <h3
              id="confirm-job-type-title"
              className="text-base font-semibold text-slate-800"
            >
              Confirm job type change
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Are you sure you want to change this applicant's job type to{" "}
              <span className="font-medium text-slate-700">
                {selectedJobType?.name ?? "the selected job type"}
              </span>
              ?
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmJobTypeUpdate(false)}
                disabled={updateJobTypeMutation.isPending}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleJobTypeSubmit(onJobTypeSubmit)}
                disabled={updateJobTypeMutation.isPending}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {updateJobTypeMutation.isPending && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                )}
                Confirm change
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileApplicationSettings;
