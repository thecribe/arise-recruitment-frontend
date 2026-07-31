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

import { useEffect, useMemo, useState } from "react";

import type { PropsWithChildren } from "react";

import { ApplicationContext } from "../../context/ApplicationContext";

import { useApplicationPhases } from "../../hooks/useApplicationPhases";
import { useApplicantApplication } from "../../hooks/useApplicantApplication";
import { usePhaseSections } from "../../hooks/usePhaseSections";

import { SECTION_STATUS } from "../../constants/section-status";

import type {
  ApplicantPhaseRecord,
  ApplicantSectionRecord,
  ApplicationSection,
} from "../../types";
import { PHASE_STATUS } from "../../constants/phase-status";

export default function ApplicationShell({ children }: PropsWithChildren) {
  /**
   * ---------------------------------------------------------------------------
   * Load application phases.
   * ---------------------------------------------------------------------------
   */
  const { data: applicationPhase = [] } = useApplicationPhases();

  /**
   * ---------------------------------------------------------------------------
   * Load applicant progress. (if applicant as no profile yet, backend sends default object)
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
    const applicantPahses = applicantApplication.phases;

    const updateMap = new Map(
      applicantPahses.map((phase) => [phase.phaseId, phase]),
    );

    const mergePhases = applicationPhase.map((phase) => ({
      ...phase,
      ...(updateMap.get(phase.id) ?? {}),
    }));

    return mergePhases;
  }, [applicationPhase, applicantApplication]);

  /**
   * ---------------------------------------------------------------------------
   * Active phase.
   * ---------------------------------------------------------------------------
   */
  const [activePhaseId, setActivePhaseId] = useState<string>();

  useEffect(() => {
    if (!currentPhase) return;

    setActivePhaseId((previous) => previous ?? currentPhase.id);
  }, [currentPhase]);

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
   * Phase lookup map.
   * ---------------------------------------------------------------------------
   */
  const phaseRecordMap = useMemo(() => {
    if (!applicantApplication) {
      return new Map<string, ApplicantPhaseRecord>();
    }

    return new Map<string, ApplicantPhaseRecord>(
      applicantApplication.phases.map((phase) => [phase.phaseId, phase]),
    );
  }, [applicantApplication]);

  console.log(activeApplicantPhase);
  /**
   * ---------------------------------------------------------------------------
   * Load sections.
   * ---------------------------------------------------------------------------
   */
  const { data: sections = [] } = usePhaseSections(activePhaseId);

  /**
   * ---------------------------------------------------------------------------
   * Current editable section.
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
   * Active section.
   * ---------------------------------------------------------------------------
   */
  const [activeSectionId, setActiveSectionId] = useState<string>();

  useEffect(() => {
    if (!sections.length) return;

    setActiveSectionId((previous) => {
      if (previous) return previous;

      return currentSection?.id ?? sections[0].id;
    });
  }, [sections, currentSection]);

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
    activeApplicantPhase?.status === PHASE_STATUS.IN_PROGRESS ||
    activeApplicantPhase?.status === PHASE_STATUS.REJECTED ||
    activeApplicantPhase?.status === PHASE_STATUS.DRAFT;

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
    setActivePhaseId(phaseId);
  };

  const selectSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
  };

  /**
   * ---------------------------------------------------------------------------
   * Loading guard.
   * ---------------------------------------------------------------------------
   */
  if (
    !applicantApplication ||
    !currentPhase ||
    !activePhase ||
    !activeApplicantPhase ||
    !currentSection ||
    !activeSection ||
    !activeApplicantSection
  ) {
    return "null";
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

        phaseRecordMap,

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
