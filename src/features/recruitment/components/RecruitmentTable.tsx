import { useNavigate } from "react-router-dom";
import { AlertCircle, ChevronRight, Users } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import EmptyState from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

import type { RecruitmentApplicant } from "../types/recruitment.types";

/**
 * Props required by the RecruitmentTable.
 *
 * The table does not fetch data itself.
 * Data fetching remains the responsibility of
 * useRecruitmentApplicants() in the page.
 */
interface RecruitmentTableProps {
  /**
   * Applicants returned from the recruitment API.
   */
  applicants: RecruitmentApplicant[];

  /**
   * Indicates that the initial applicant request is loading.
   */
  isLoading: boolean;

  /**
   * Indicates that a request is currently being fetched.
   *
   * This can happen when changing filters or pagination while
   * React Query keeps the previous data visible.
   */
  isFetching?: boolean;

  /**
   * Indicates that the applicant request failed.
   */
  isError: boolean;

  /**
   * Allows the user to retry the failed request.
   */
  onRetry: () => void;
}

/**
 * Displays the recruitment applicant list.
 *
 * Responsibilities:
 *
 * - Display loading state
 * - Display error state
 * - Display empty state
 * - Display applicant data
 * - Navigate to an applicant's recruitment detail page
 *
 * Data fetching and filtering are intentionally kept outside
 * this component.
 */
export default function RecruitmentTable({
  applicants,
  isLoading,
  isFetching = false,
  isError,
  onRetry,
}: RecruitmentTableProps) {
  const navigate = useNavigate();

  /**
   * Navigate to the selected applicant's recruitment page.
   *
   * We use applicantId rather than applicationId because the
   * recruitment detail page represents the applicant as the
   * primary resource.
   */
  const handleApplicantClick = (applicantId: string) => {
    const path = ROUTES.RECRUITMENT.APPLICANT.replace(
    ":applicantId",
    applicantId,
  );

  navigate(path);
  };

  /*
   * Initial loading state.
   *
   * We show several skeleton rows instead of an empty table
   * while the first request is being made.
   */
  if (isLoading) {
    return <RecruitmentTableSkeleton />;
  }

  /*
   * Error state.
   *
   * We provide a retry action instead of leaving the user
   * with an empty page.
   */
  if (isError) {
    return (
      <GlassCard className="p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            Unable to load applicants
          </h3>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            We couldn't retrieve the recruitment applicants.
            Please try again.
          </p>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-5"
            onClick={onRetry}
          >
            Try again
          </Button>
        </div>
      </GlassCard>
    );
  }

  /*
   * Empty state.
   *
   * This is different from the loading state:
   * the request succeeded, but there are no applicants
   * matching the current filters.
   */
  if (applicants.length === 0) {
    return (
      <EmptyState
        icon={<Users className="h-8 w-8 text-blue-500" />}
        title="No applicants found"
        description="There are no applicants matching the current search or filters."
      />
    );
  }

  return (
    <GlassCard className="overflow-hidden">
      {/* 
        When changing filters or pagination, React Query can keep
        the previous data visible. We use isFetching to provide
        a subtle visual indication that fresh data is being loaded.
      */}
      <div className="relative">
        {isFetching && (
          <div className="absolute inset-x-0 top-0 z-10 h-0.5 overflow-hidden bg-blue-100">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-blue-500" />
          </div>
        )}

        {/* 
          The table is wrapped in overflow-x-auto so that the
          desktop table remains usable on smaller screens.
        */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-slate-200/70 bg-white/30">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Applicant
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Job Type
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Current Stage
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Stage Status
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Updated
                </th>

                <th className="w-12 px-4 py-4" />
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/60">
              {applicants.map((applicant) => (
                <tr
                  key={applicant.applicationId}
                  className="group cursor-pointer transition-colors hover:bg-blue-50/40"
                  onClick={() =>
                    handleApplicantClick(applicant.applicantId)
                  }
                >
                  {/* Applicant */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* 
                        Simple initials avatar for now.
                        We can replace this with UserAvatar later
                        if the applicant API provides an avatar.
                      */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                        {getApplicantInitials(applicant)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">
                          {applicant.applicant.firstName}{" "}
                          {applicant.applicant.lastName}
                        </p>

                        <p className="truncate text-sm text-slate-500">
                          {applicant.applicant.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Job Type */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700">
                      {applicant.jobType.name}
                    </span>
                  </td>

                  {/* Current Stage */}
                  <td className="px-6 py-4">
                    {applicant.currentStage ? (
                      <div>
                        <p className="font-medium text-slate-800">
                          {applicant.currentStage.title}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Stage {applicant.currentStage.order}
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">
                        Not started
                      </span>
                    )}
                  </td>

                  {/* Stage Status */}
                  <td className="px-6 py-4">
                    {applicant.currentStage?.status ? (
                      <StageStatus
                        status={applicant.currentStage.status}
                      />
                    ) : (
                      <span className="text-sm text-slate-400">
                        —
                      </span>
                    )}
                  </td>

                  {/* Updated */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">
                      {formatDate(applicant.updatedAt)}
                    </span>
                  </td>

                  {/* Navigation */}
                  <td className="px-4 py-4">
                    <ChevronRight
                      className="
                        h-5 w-5
                        text-slate-400
                        transition-transform
                        group-hover:translate-x-0.5
                        group-hover:text-blue-500
                      "
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </GlassCard>
  );
}

/**
 * Loading skeleton for the applicant table.
 *
 * We keep the same general table dimensions so the layout
 * doesn't jump when the real data arrives.
 */
function RecruitmentTableSkeleton() {
  const rows = Array.from({ length: 6 });

  return (
    <GlassCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-200/70">
              {[
                "Applicant",
                "Job Type",
                "Current Stage",
                "Stage Status",
                "Updated",
                "",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200/60">
            {rows.map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-44" />
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-28" />
                </td>

                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </td>

                <td className="px-6 py-4">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>

                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-20" />
                </td>

                <td className="px-4 py-4">
                  <Skeleton className="h-5 w-5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

/**
 * Creates a two-letter initials representation for the applicant.
 *
 * This is intentionally kept as a small UI utility because the
 * recruitment list only needs initials and doesn't require a
 * separate avatar data model.
 */
function getApplicantInitials(
  applicant: RecruitmentApplicant,
): string {
  const firstInitial =
    applicant.applicant.firstName?.charAt(0) ?? "";

  const lastInitial =
    applicant.applicant.lastName?.charAt(0) ?? "";

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

/**
 * Formats the backend ISO date into a readable date for the
 * recruitment table.
 *
 * Keeping date formatting here prevents date formatting logic
 * from leaking into the page component.
 */
function formatDate(value: string | null | undefined): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Displays the current phase status.
 *
 * We don't use the existing StatusBadge directly here because
 * StatusBadge currently accepts a fixed lowercase Variant type.
 * Application phase statuses are currently strings, so we keep
 * this presentation flexible until the backend status union is
 * finalized.
 */
function StageStatus({ status }: { status: string }) {
  const normalizedStatus = status.toLowerCase();

  const statusClasses: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    draft: "bg-slate-100 text-slate-700",
    active: "bg-blue-100 text-blue-700",
    in_progress: "bg-blue-100 text-blue-700",
    submitted: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        px-3 py-1
        text-xs
        font-semibold
        capitalize
        ${statusClasses[normalizedStatus] ?? "bg-slate-100 text-slate-700"}
      `}
    >
      {normalizedStatus.replaceAll("_", " ")}
    </span>
  );
}