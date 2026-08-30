/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentApplicantPage.tsx
 *
 * Description:
 * Recruitment Applicant single-page workspace.
 *
 * Route:
 * /recruitment/:id
 *
 * Responsibilities:
 * - Resolve the ApplicantApplication ID from the route.
 * - Fetch lightweight applicant/application information.
 * - Display applicant information.
 * - Display Recruitment Manager actions.
 * - Manage the active applicant workspace tab.
 *
 * Important:
 *
 * Application section fields, values and review data are NOT loaded here.
 *
 * They are loaded lazily when the manager selects a section.
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";
import { useParams } from "react-router-dom";

import RecruitmentApplicantHeader from "../single-recruitment/components/RecruitmentApplicantHeader";

import RecruitmentApplicantTabs, {
  type RecruitmentApplicantTab,
} from "../single-recruitment/components/RecruitmentApplicantTabs";

import RecruitmentApplication from "../single-recruitment/components/application/RecruitmentApplication";

import { useRecruitmentApplicant } from "../hooks/useRecruitmentApplicant";
import RecruitmentApplicantMoreActions from "../single-recruitment/components/application/RecruitmentApplicantMoreActions";
import type { RecruitmentApplicationStage } from "../types/recruitment.types";

export default function RecruitmentApplicantPage() {
  const { applicantId } = useParams<{
    applicantId: string;
  }>();

  /**
   * ---------------------------------------------------------------------------
   * Active applicant workspace tab.
   *
   * IMPORTANT:
   *
   * Hooks are declared before conditional returns.
   * ---------------------------------------------------------------------------
   */

  const [activeTab, setActiveTab] =
    useState<RecruitmentApplicantTab>("application");

  /**
   * ---------------------------------------------------------------------------
   * Applicant detail query.
   * ---------------------------------------------------------------------------
   *
   * `id` represents the ApplicantApplication ID.
   */
  const { data, isLoading, isError, error } =
    useRecruitmentApplicant(applicantId);

  /**
   * ---------------------------------------------------------------------------
   * Missing route ID.
   * ---------------------------------------------------------------------------
   */

  if (!applicantId) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-700">Applicant ID is missing.</p>
      </div>
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * Loading state.
   * ---------------------------------------------------------------------------
   */

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white/50 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 rounded bg-slate-200" />

            <div className="h-4 w-72 rounded bg-slate-200" />

            <div className="h-4 w-56 rounded bg-slate-200" />
          </div>
        </div>

        <div className="h-20 animate-pulse rounded-2xl bg-slate-200/60" />

        <div className="h-96 animate-pulse rounded-2xl bg-slate-200/60" />
      </div>
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * Error state.
   * ---------------------------------------------------------------------------
   */

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-700">Unable to load applicant.</p>

        {error instanceof Error && (
          <p className="mt-2 text-sm text-red-600">{error.message}</p>
        )}
      </div>
    );
  }

  const { applicant, jobType, application, application_status } = data;

  /**
   * ---------------------------------------------------------------------------
   * Applicant workspace.
   * ---------------------------------------------------------------------------
   */

  const getStage = (stage: RecruitmentApplicationStage): string => {
    switch (stage) {
      case "APPLICATION_FORM":
        return "Application Form";
        break;
      case "INTERVIEW":
        return "Interview";
        break;
      case "COMPLIANCE":
        return "Compliance";
        break;
      default:
        return "Application Form";
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------- */}
      {/* Applicant header */}
      {/* ------------------------------------------------------------------- */}

      <RecruitmentApplicantHeader
        applicant={{
          firstName: applicant.firstName,
          lastName: applicant.lastName,
          email: applicant.email,
          phone: applicant.phone ?? undefined,
        }}
        jobType={jobType}
        status={application_status.status}
        currentStage={
          application.currentPhase
            ? {
                id: application_status.stage,
                title: getStage(application_status.stage),
              }
            : null
        }
        progress={application.progress}
        actions={
          <>
            <RecruitmentApplicantMoreActions
              applicantId={applicant.id}
              status={application_status.status}
              stage={application_status.stage}
            />
          </>
        }
      />

      {/* ------------------------------------------------------------------- */}
      {/* Applicant workspace navigation */}
      {/* ------------------------------------------------------------------- */}

      <RecruitmentApplicantTabs
        value={activeTab}
        onValueChange={setActiveTab}
      />

      {/* ------------------------------------------------------------------- */}
      {/* Applicant workspace content */}
      {/* ------------------------------------------------------------------- */}

      <div className="min-h-100">
        {/* --------------------------------------------------------------- */}
        {/* Application */}
        {/* --------------------------------------------------------------- */}

        {activeTab === "application" && (
          <RecruitmentApplication
            applicantId={applicant.id}
            applicationId={application.id}
            currentPhaseId={application.currentPhase?.id}
            phases={application.phases}
          />
        )}

        {/* --------------------------------------------------------------- */}
        {/* Interview */}
        {/* --------------------------------------------------------------- */}

        {activeTab === "interview" && (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-200
              bg-white/40
              p-8
              text-center
              text-slate-500
              backdrop-blur-xl
            "
          >
            Interview content
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* Compliance */}
        {/* --------------------------------------------------------------- */}

        {activeTab === "compliance" && (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-200
              bg-white/40
              p-8
              text-center
              text-slate-500
              backdrop-blur-xl
            "
          >
            Compliance content
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* Profile & Settings */}
        {/* --------------------------------------------------------------- */}

        {activeTab === "profile" && (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-200
              bg-white/40
              p-8
              text-center
              text-slate-500
              backdrop-blur-xl
            "
          >
            Profile &amp; Settings content
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* Documents */}
        {/* --------------------------------------------------------------- */}

        {activeTab === "documents" && (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-200
              bg-white/40
              p-8
              text-center
              text-slate-500
              backdrop-blur-xl
            "
          >
            Documents content
          </div>
        )}
      </div>
    </div>
  );
}
