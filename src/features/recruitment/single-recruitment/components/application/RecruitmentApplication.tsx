/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentApplication.tsx
 *
 * Description:
 * Main application review workspace for a Recruitment Manager.
 *
 * Responsibilities:
 * - Display application phases.
 * - Allow the manager to select a phase.
 * - Display sections belonging to the selected phase.
 * - Allow the manager to select a section.
 * - Lazily load fields and applicant values for the selected section.
 *
 * Important:
 *
 * The initial applicant detail request only contains lightweight section
 * information.
 *
 * Fields and applicant values are requested ONLY for the selected section.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useMemo, useState } from "react";

import GlassCard from "@/components/ui/GlassCard";

import RecruitmentApplicationSectionNavigation from "./RecruitmentApplicationSectionNavigation";

import RecruitmentSectionReview from "./RecruitmentSectionReview";
import type { RecruitmentApplicationPhase } from "@/features/recruitment/types/recruitment.types";
import { useRecruitmentApplicantSection } from "@/features/recruitment/hooks/use-recruitment-applicant-section";
import RecruitmentApplicationPhaseNavigation from "./RecruitmentApplicationPhaseNavigation";
import RecruitmentPhaseActions from "./RecruitmentPhaseActions";

interface RecruitmentApplicationProps {
  /**
   * User ID of the applicant.
   */
  applicantId: string;

  /**
   * ApplicantApplication ID.
   *
   * This is used when requesting section details.
   */
  applicationId: string;

  /**
   * Current phase from the application.
   */
  currentPhaseId?: string;

  /**
   * Lightweight application phases.
   */
  phases: RecruitmentApplicationPhase[];
}

export default function RecruitmentApplication({
  // applicantId,
  applicationId,
  currentPhaseId,
  phases,
}: RecruitmentApplicationProps) {
  /**
   * ---------------------------------------------------------------------------
   * Active phase
   * ---------------------------------------------------------------------------
   *
   * Prefer the application's current phase.
   *
   * If it is unavailable, fall back to the first phase.
   */
  const initialPhaseId = useMemo(() => {
    if (currentPhaseId && phases.some((phase) => phase.id === currentPhaseId)) {
      return currentPhaseId;
    }

    return phases[0]?.id ?? null;
  }, [currentPhaseId, phases]);

  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(
    initialPhaseId,
  );

  /**
   * ---------------------------------------------------------------------------
   * Selected section
   * ---------------------------------------------------------------------------
   */
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null,
  );

  /**
   * ---------------------------------------------------------------------------
   * Resolve selected phase.
   * ---------------------------------------------------------------------------
   */
  const selectedPhase = useMemo(
    () => phases.find((phase) => phase.id === selectedPhaseId) ?? null,
    [phases, selectedPhaseId],
  );

  /**
   * ---------------------------------------------------------------------------
   * When the selected phase changes, select the first usable section.
   *
   * We do not automatically select a locked section.
   * ---------------------------------------------------------------------------
   */
  // useEffect(() => {
  //   if (!selectedPhase) {
  //     // eslint-disable-next-line react-hooks/set-state-in-effect
  //     setSelectedSectionId(null);
  //     return;
  //   }

  //   const firstAvailableSection = selectedPhase.sections.find(
  //     (section) => section.status !== "locked",
  //   );

  //   /**
  //    * If no section is available, there is nothing to request.
  //    */
  //   setSelectedSectionId(firstAvailableSection?.id ?? null);
  // }, [selectedPhase]);

  useEffect(() => {
    if (!selectedPhase) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSectionId(null);
      return;
    }

    const currentSectionStillExists =
      selectedSectionId &&
      selectedPhase.sections.some(
        (section) =>
          section.id === selectedSectionId && section.status !== "locked",
      );

    if (currentSectionStillExists) {
      return;
    }

    const firstAvailableSection = selectedPhase.sections.find(
      (section) => section.status !== "locked",
    );

    setSelectedSectionId(firstAvailableSection?.id ?? null);
  }, [selectedPhase, selectedSectionId]);

  /**
   * ---------------------------------------------------------------------------
   * Fetch selected section.
   *
   * This request only happens when:
   *
   * - applicationId exists
   * - selectedSectionId exists
   * ---------------------------------------------------------------------------
   */
  const {
    data: selectedSection,
    isLoading: isSectionLoading,
    isFetching: isSectionFetching,
    isError: isSectionError,
    error: sectionError,
  } = useRecruitmentApplicantSection(applicationId, selectedSectionId);

  /**
   * ---------------------------------------------------------------------------
   * No phases
   * ---------------------------------------------------------------------------
   */
  if (!phases.length) {
    return (
      <GlassCard className="p-8 text-center">
        <p className="text-sm text-slate-500">
          No application phases are available.
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------- */}
      {/* Phase navigation */}
      {/* ------------------------------------------------------------------- */}

      <RecruitmentApplicationPhaseNavigation
        phases={phases}
        selectedPhaseId={selectedPhaseId}
        onPhaseChange={setSelectedPhaseId}
      />

      {/* ------------------------------------------------------------------- */}
      {/* Selected phase workspace */}
      {/* ------------------------------------------------------------------- */}

      {selectedPhase ? (
        <div className="space-y-6">
          <RecruitmentPhaseActions
            applicationId={applicationId}
            phase={selectedPhase}
          />
          <div
            className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[240px_minmax(0,1fr)]
          "
          >
            {/* --------------------------------------------------------------- */}
            {/* Section navigation */}
            {/* --------------------------------------------------------------- */}

            <GlassCard className="h-fit p-3">
              <RecruitmentApplicationSectionNavigation
                sections={selectedPhase.sections}
                selectedSectionId={selectedSectionId}
                onSectionChange={setSelectedSectionId}
              />
            </GlassCard>

            {/* --------------------------------------------------------------- */}
            {/* Selected section */}
            {/* --------------------------------------------------------------- */}

            <div className="min-w-0">
              {/* ------------------------------------------------------------- */}
              {/* Loading */}
              {/* ------------------------------------------------------------- */}

              {isSectionLoading && (
                <GlassCard className="p-8">
                  <div className="animate-pulse space-y-5">
                    <div className="h-6 w-48 rounded bg-slate-200" />

                    <div className="h-4 w-72 rounded bg-slate-200" />

                    <div className="space-y-3 pt-4">
                      <div className="h-12 rounded bg-slate-200" />
                      <div className="h-12 rounded bg-slate-200" />
                      <div className="h-12 rounded bg-slate-200" />
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* ------------------------------------------------------------- */}
              {/* Error */}
              {/* ------------------------------------------------------------- */}

              {isSectionError && (
                <GlassCard className="border-red-200 p-8">
                  <div className="text-center">
                    <p className="font-medium text-red-700">
                      Unable to load this section.
                    </p>

                    {sectionError instanceof Error && (
                      <p className="mt-2 text-sm text-red-500">
                        {sectionError.message}
                      </p>
                    )}
                  </div>
                </GlassCard>
              )}

              {/* ------------------------------------------------------------- */}
              {/* No selected section */}
              {/* ------------------------------------------------------------- */}

              {!selectedSectionId && !isSectionLoading && (
                <GlassCard className="p-8 text-center">
                  <p className="text-sm text-slate-500">
                    Select an application section to review.
                  </p>
                </GlassCard>
              )}

              {/* ------------------------------------------------------------- */}
              {/* Selected section */}
              {/* ------------------------------------------------------------- */}

              {selectedSection && (
                <div className="relative">
                  {/* --------------------------------------------------------- */}
                  {/* Background fetching indicator.
                   *
                   * This appears when switching between already rendered
                   * sections while React Query fetches the new section.
                   * --------------------------------------------------------- */}

                  {isSectionFetching && (
                    <div
                      className="
                      absolute
                      right-4
                      top-4
                      z-10
                      rounded-full
                      border
                      border-blue-100
                      bg-white/90
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-blue-600
                      shadow-sm
                      backdrop-blur
                    "
                    >
                      Loading...
                    </div>
                  )}

                  {/* <RecruitmentSectionReview section={selectedSection} /> */}

                  {isSectionLoading ? (
                    <div className="p-6 text-sm text-slate-500">
                      Loading section...
                    </div>
                  ) : selectedSection ? (
                    <RecruitmentSectionReview
                      applicationId={applicationId}
                      section={selectedSection}
                    />
                  ) : (
                    <div className="p-6 text-sm text-slate-500">
                      Select a section to review.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <GlassCard className="p-8 text-center">
          <p className="text-sm text-slate-500">
            This application phase does not have an available section.
          </p>
        </GlassCard>
      )}
    </div>
  );
}
