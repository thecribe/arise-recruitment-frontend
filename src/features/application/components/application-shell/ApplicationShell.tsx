/**
 * -----------------------------------------------------------------------------
 * File: ApplicationShell.tsx
 *
 * Description:
 * Coordinates the applicant application experience.
 *
 * Responsibilities:
 * - Loads the application definition.
 * - Loads applicant progress.
 * - Loads sections for the active phase.
 * - Manages active phase/section navigation.
 * - Computes UI permissions.
 * - Exposes derived lookup maps and summaries.
 * -----------------------------------------------------------------------------
 */

import { useMemo, useState } from "react";

import type { PropsWithChildren } from "react";

import { ApplicationContext } from "../../context/ApplicationContext";

import { useApplicationPhases } from "../../hooks/useApplicationPhases";
import { useApplicantApplication } from "../../hooks/useApplicantApplication";
import { usePhaseSections } from "../../hooks/usePhaseSections";

import { SECTION_STATUS } from "../../constants/section-status";
import { PHASE_STATUS } from "../../constants/phase-status";

import type { ApplicantSectionRecord, ApplicationSection } from "../../types";

export default function ApplicationShell({ children }: PropsWithChildren) {
  /**
   * ---------------------------------------------------------------------------
   * Load application phases.
   * ---------------------------------------------------------------------------
   */
  const { data: applicationPhase = [] } = useApplicationPhases();

  /**
   * ---------------------------------------------------------------------------
   * Load applicant progress.
   *
   * If applicant has no profile yet, backend sends default object.
   * ---------------------------------------------------------------------------
   */
  const { data: applicantApplication } = useApplicantApplication();

  /**
   * ---------------------------------------------------------------------------
   * Current editable phase.
   * ---------------------------------------------------------------------------
   */
  const currentPhase = useMemo(() => {
    if (!applicantApplication) return undefined;

    return applicationPhase.find(
      (phase) => phase.id === applicantApplication.currentPhaseId,
    );
  }, [applicationPhase, applicantApplication]);

  /**
   * ---------------------------------------------------------------------------
   * Available phases.
   * ---------------------------------------------------------------------------
   */
  const availablePhases = useMemo(() => {
    if (!applicantApplication) return [];

    const applicantPhases = applicantApplication.phases;

    const updateMap = new Map(
      applicantPhases.map((phase) => [phase.phaseId, phase]),
    );

    return applicationPhase.map((phase) => ({
      ...phase,
      ...(updateMap.get(phase.id) ?? {}),
    }));
  }, [applicationPhase, applicantApplication]);

  /**
   * ---------------------------------------------------------------------------
   * Selected phase.
   *
   * `selectedPhaseId` only stores an explicit user selection.
   *
   * When there is no explicit selection, the current application phase is
   * automatically used.
   * ---------------------------------------------------------------------------
   */
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | undefined>();

  const activePhaseId = selectedPhaseId ?? currentPhase?.id;

  /**
   * ---------------------------------------------------------------------------
   * Active phase.
   * ---------------------------------------------------------------------------
   */
  const activePhase = useMemo(() => {
    if (!activePhaseId) return undefined;

    return applicationPhase.find((phase) => phase.id === activePhaseId);
  }, [applicationPhase, activePhaseId]);

  /**
   * ---------------------------------------------------------------------------
   * Applicant phase.
   * ---------------------------------------------------------------------------
   */
  const activeApplicantPhase = useMemo(() => {
    if (!activePhaseId || !applicantApplication) {
      return undefined;
    }

    return applicantApplication.phases.find(
      (phase) => phase.phaseId === activePhaseId,
    );
  }, [activePhaseId, applicantApplication]);

  /**
   * ---------------------------------------------------------------------------
   * Load sections for the active phase.
   * ---------------------------------------------------------------------------
   */
  const { data: sections = [] } = usePhaseSections(activePhaseId);

  /**
   * ---------------------------------------------------------------------------
   * Current editable section.
   *
   * This represents the applicant's actual backend progress.
   *
   * It may be undefined when the user is viewing a different phase.
   * ---------------------------------------------------------------------------
   */
  const currentSection = useMemo(() => {
    if (!applicantApplication) return undefined;

    return sections.find(
      (section: ApplicationSection) =>
        section.id === applicantApplication.currentSectionId,
    );
  }, [sections, applicantApplication]);

  /**
   * ---------------------------------------------------------------------------
   * Selected section.
   *
   * When the user has not explicitly selected a section, the first section
   * of the active phase becomes the active section automatically.
   *
   * This means changing activePhase automatically changes the active section
   * to sections[0] without needing an effect.
   * ---------------------------------------------------------------------------
   */
  const [selectedSectionId, setSelectedSectionId] = useState<
    string | undefined
  >();

  const activeSectionId = selectedSectionId ?? sections[0]?.id;

  /**
   * ---------------------------------------------------------------------------
   * Active section.
   * ---------------------------------------------------------------------------
   */
  const activeSection = useMemo(() => {
    if (!activeSectionId) return undefined;

    return sections.find(
      (section: ApplicationSection) => section.id === activeSectionId,
    );
  }, [sections, activeSectionId]);

  /**
   * ---------------------------------------------------------------------------
   * Applicant section.
   * ---------------------------------------------------------------------------
   */
  const activeApplicantSection = useMemo(() => {
    if (!activeApplicantPhase || !activeSection) {
      return undefined;
    }

    return activeApplicantPhase.sections.find(
      (section) => section.sectionId === activeSection.id,
    );
  }, [activeApplicantPhase, activeSection]);

  /**
   * ---------------------------------------------------------------------------
   * Section lookup map.
   * ---------------------------------------------------------------------------
   */
  const sectionRecordMap = useMemo(() => {
    const map = new Map<string, ApplicantSectionRecord>();

    if (!activeApplicantPhase) {
      return map;
    }

    activeApplicantPhase.sections.forEach((section) => {
      map.set(section.sectionId, section);
    });

    return map;
  }, [activeApplicantPhase]);

  /**
   * ---------------------------------------------------------------------------
   * Permissions.
   * ---------------------------------------------------------------------------
   */
  const canView = !!activeSection;

  const canEdit =
    activeApplicantSection?.status === PHASE_STATUS.IN_PROGRESS ||
    activeApplicantSection?.status === PHASE_STATUS.REJECTED;

  const canSubmit = canEdit;

  /**
   * ---------------------------------------------------------------------------
   * Progress summary.
   * ---------------------------------------------------------------------------
   */
  const progressSummary = useMemo(() => {
    const completedPhases =
      applicantApplication?.phases.filter(
        (phase) => phase.status === SECTION_STATUS.APPROVED,
      ).length ?? 0;

    const totalSections = sections.length;

    const completedSections = sections.filter((section: ApplicationSection) => {
      const record = sectionRecordMap.get(section.id);

      return record?.status === SECTION_STATUS.APPROVED;
    }).length;

    return {
      percentage: applicantApplication?.progress ?? 0,

      totalPhases: applicantApplication?.phases.length ?? 0,

      completedPhases,

      totalSections,

      completedSections,

      currentPhaseIndex:
        availablePhases.findIndex((phase) => phase.id === currentPhase?.id) + 1,

      currentSectionIndex:
        sections.findIndex(
          (section: ApplicationSection) => section.id === currentSection?.id,
        ) + 1,
    };
  }, [
    applicantApplication,
    availablePhases,
    currentPhase,
    currentSection,
    sections,
    sectionRecordMap,
  ]);

  /**
   * ---------------------------------------------------------------------------
   * Navigation summary.
   * ---------------------------------------------------------------------------
   */
  const navigationSummary = useMemo(() => {
    const index = sections.findIndex(
      (section: ApplicationSection) => section.id === activeSection?.id,
    );

    return {
      previousSection: index > 0 ? sections[index - 1] : undefined,

      nextSection:
        index >= 0 && index < sections.length - 1
          ? sections[index + 1]
          : undefined,

      isFirstSection: index === 0,

      isLastSection: index === sections.length - 1,
    };
  }, [sections, activeSection]);

  /**
   * ---------------------------------------------------------------------------
   * Navigation.
   * ---------------------------------------------------------------------------
   */
  const selectPhase = (phaseId: string) => {
    /**
     * Selecting a new phase automatically causes:
     *
     * selectedPhaseId
     *        ↓
     * activePhaseId
     *        ↓
     * sections
     *        ↓
     * sections[0]
     *        ↓
     * activeSection
     */
    setSelectedPhaseId(phaseId);

    /**
     * Clear the manually selected section.
     *
     * The new phase will therefore default to its first section.
     */
    setSelectedSectionId(undefined);
  };

  const selectSection = (sectionId: string) => {
    setSelectedSectionId(sectionId);
  };

  /**
   * ---------------------------------------------------------------------------
   * Loading guard.
   *
   * `currentSection` is intentionally NOT required here because it represents
   * the applicant's backend progress and may not belong to the phase currently
   * being viewed.
   * ---------------------------------------------------------------------------
   */
  if (
    !applicantApplication ||
    !currentPhase ||
    !activePhase ||
    !activeApplicantPhase ||
    !activeSection ||
    !activeApplicantSection
  ) {
    return null;
  }

  return (
    <ApplicationContext.Provider
      value={{
        applicationPhase,

        applicantApplication,

        availablePhases,

        currentPhase,

        activePhase,

        activeApplicantPhase,

        currentSection,

        activeSection,

        activeApplicantSection,

        sectionRecordMap,

        progressSummary,

        navigationSummary,

        selectPhase,

        selectSection,

        sections,

        canView,

        canEdit,

        canSubmit,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
