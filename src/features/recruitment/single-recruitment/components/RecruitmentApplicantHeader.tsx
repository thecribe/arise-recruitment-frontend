/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentApplicantHeader.tsx
 *
 * Description:
 * Header displayed at the top of the Recruitment Applicant single page.
 *
 * Responsibilities:
 * - Display applicant identity.
 * - Display job role.
 * - Display application status.
 * - Display current application stage.
 * - Display application progress.
 * - Provide space for Recruitment Manager quick actions.
 *
 * Important:
 * The application status is displayed here for information and manager
 * actions, but it is NOT used as a filter on the Recruitment applicant list.
 *
 * The Recruitment applicant list uses the current application phase/stage
 * instead.
 * -----------------------------------------------------------------------------
 */

import type { ReactNode } from "react";
import { Mail, Phone } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import StatusBadge from "@/components/ui/StatusBadge";
import type { RecruitmentApplicantStatus } from "../../types/recruitment.types";

interface RecruitmentApplicantHeaderProps {
  /**
   * Applicant identity and contact information.
   */
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };

  /**
   * Job role/type applied for.
   */
  jobType?: {
    id: string;
    name: string;
  } | null;

  /**
   * Overall application lifecycle status.
   *
   * This is different from the current application phase.
   *
   * Example:
   *
   * status: IN_PROGRESS
   * currentStage: Professional Qualifications
   */
  status: RecruitmentApplicantStatus;

  /**
   * Current application phase/stage.
   */
  currentStage?: {
    id: string;
    title: string;
  } | null;

  /**
   * Overall application completion percentage.
   */
  progress: number;

  /**
   * Optional Recruitment Manager actions.
   *
   * Examples:
   * - Approve
   * - Reject
   * - Reinstate
   * - More actions
   */
  actions?: ReactNode;
}

/**
 * -----------------------------------------------------------------------------
 * Status badge mapping.
 *
 * StatusBadge uses the application's shared visual variants.
 * -----------------------------------------------------------------------------
 */
const statusMap: Record<
  RecruitmentApplicantStatus,
  "active" | "rejected" | "approved"
> = {
  IN_PROGRESS: "active",
  REJECTED: "rejected",
  APPROVED: "approved",
};

/**
 * -----------------------------------------------------------------------------
 * Human-readable application status.
 * -----------------------------------------------------------------------------
 */
const statusLabel: Record<RecruitmentApplicantStatus, string> = {
  IN_PROGRESS: "Active",
  REJECTED: "Rejected",
  APPROVED: "Approved",
};

export default function RecruitmentApplicantHeader({
  applicant,
  jobType,
  status,
  currentStage,
  progress,
  actions,
}: RecruitmentApplicantHeaderProps) {
  /**
   * ---------------------------------------------------------------------------
   * Applicant display name.
   * ---------------------------------------------------------------------------
   */
  const fullName = `${applicant.firstName} ${applicant.lastName}`;

  /**
   * ---------------------------------------------------------------------------
   * Keep progress safely between 0 and 100.
   *
   * This protects the progress bar if the backend ever returns an unexpected
   * value.
   * ---------------------------------------------------------------------------
   */
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="flex flex-col gap-6">
        {/* ----------------------------------------------------------------- */}
        {/* Main applicant information */}
        {/* ----------------------------------------------------------------- */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            {/* ------------------------------------------------------------- */}
            {/* Applicant avatar */}
            {/* ------------------------------------------------------------- */}

            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-blue-100
                text-lg
                font-bold
                text-blue-700
              "
              aria-hidden="true"
            >
              {applicant.firstName.charAt(0)}
              {applicant.lastName.charAt(0)}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* Applicant identity */}
            {/* ------------------------------------------------------------- */}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {fullName}
                </h1>

                <StatusBadge status={statusMap[status]} />
              </div>

              {/* ----------------------------------------------------------- */}
              {/* Job role */}
              {/* ----------------------------------------------------------- */}

              {jobType && (
                <p className="mt-1 text-sm font-medium text-blue-600">
                  {jobType.name}
                </p>
              )}

              {/* ----------------------------------------------------------- */}
              {/* Contact information */}
              {/* ----------------------------------------------------------- */}

              <div
                className="
                  mt-3
                  flex
                  flex-col
                  gap-2
                  text-sm
                  text-slate-500
                  sm:flex-row
                  sm:flex-wrap
                  sm:gap-4
                "
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />

                  <span className="truncate">{applicant.email}</span>
                </span>

                {applicant.phone && (
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0" />

                    {applicant.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Manager actions */}
          {/* ---------------------------------------------------------------- */}

          {actions && (
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
                lg:justify-end
              "
            >
              {actions}
            </div>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Application summary */}
        {/* ----------------------------------------------------------------- */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            border-t
            border-slate-200/70
            pt-5
            sm:grid-cols-3
          "
        >
          {/* --------------------------------------------------------------- */}
          {/* Current stage */}
          {/* --------------------------------------------------------------- */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Current Stage
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {currentStage?.title ?? "Not available"}
            </p>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* Application status */}
          {/* --------------------------------------------------------------- */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Application Status
            </p>

            <div className="mt-1">
              <StatusBadge status={statusMap[status]} />
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* Application progress */}
          {/* --------------------------------------------------------------- */}

          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Application Progress
              </p>

              <span className="text-sm font-semibold text-blue-600">
                {safeProgress}%
              </span>
            </div>

            <div
              className="
                mt-2
                h-2
                overflow-hidden
                rounded-full
                bg-slate-100
              "
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={safeProgress}
              aria-label="Application progress"
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-blue-600
                  transition-all
                "
                style={{
                  width: `${safeProgress}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Status explanation */}
        {/* ----------------------------------------------------------------- */}

        <div className="text-xs text-slate-400">
          Application status:{" "}
          <span className="font-medium text-slate-500">
            {statusLabel[status]}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
