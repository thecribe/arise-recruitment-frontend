/**
 * -----------------------------------------------------------------------------
 * File: ApplicationContext.ts
 *
 * Description:
 * Provides the shared application state used throughout the applicant
 * application experience.
 *
 * Responsibilities:
 * - Exposes the application definition.
 * - Exposes the applicant's progress.
 * - Exposes derived navigation state.
 * - Tracks the currently active phase and section.
 * - Exposes UI permission flags.
 *
 * Notes:
 * - React Query remains the source of truth for all server state.
 * - This context does NOT own form values or API state.
 * - Sections and fields are loaded lazily.
 * -----------------------------------------------------------------------------
 */

import { createContext, useContext } from "react";

import type {
  ApplicantApplication,
  ApplicantPhaseRecord,
  ApplicantSectionRecord,
  ApplicationPhase,
  ApplicationSection,
} from "../types";

/**
 * -----------------------------------------------------------------------------
 * Shared progress information.
 * -----------------------------------------------------------------------------
 */
export interface ProgressSummary {
  percentage: number;

  totalPhases: number;
  completedPhases: number;

  totalSections: number;
  completedSections: number;

  currentPhaseIndex: number;
  currentSectionIndex: number;
}

/**
 * -----------------------------------------------------------------------------
 * Navigation helper information.
 * -----------------------------------------------------------------------------
 */
export interface NavigationSummary {
  previousSection?: ApplicationSection;
  nextSection?: ApplicationSection;

  isFirstSection: boolean;
  isLastSection: boolean;
}

export interface ApplicationContextValue {
  /**
   * Static application definition.
   */
  applicationDefinition: ApplicationPhase[];

  /**
   * Current applicant progress.
   */
  applicantApplication: ApplicantApplication;

  /**
   * Phases available to the applicant.
   */
  availablePhases: ApplicationPhase[];

  /**
   * Backend controlled editable phase.
   */
  currentPhase: ApplicationPhase;

  /**
   * Phase currently selected in the UI.
   */
  activePhase: ApplicationPhase;

  /**
   * Applicant record for the selected phase.
   */
  activeApplicantPhase: ApplicantPhaseRecord;

  /**
   * Applicant record for the selected section.
   */
  activeApplicantSection: ApplicantSectionRecord;

  /**
   * Backend controlled editable section.
   */
  currentSection: ApplicationSection;

  /**
   * Section currently selected in the UI.
   */
  activeSection: ApplicationSection;

  /**
   * ---------------------------------------------------------------------------
   * Derived lookup maps.
   * ---------------------------------------------------------------------------
   */

  /**
   * Quick lookup of applicant phase records by phase id.
   */
  phaseRecordMap: Map<string, ApplicantPhaseRecord>;

  /**
   * Quick lookup of applicant section records by section id.
   */
  sectionRecordMap: Map<string, ApplicantSectionRecord>;

  /**
   * ---------------------------------------------------------------------------
   * Derived summaries.
   * ---------------------------------------------------------------------------
   */

  /**
   * Shared application progress.
   */
  progressSummary: ProgressSummary;

  /**
   * Shared section navigation helpers.
   */
  navigationSummary: NavigationSummary;

  /**
   * ---------------------------------------------------------------------------
   * Actions.
   * ---------------------------------------------------------------------------
   */

  /**
   * Selects a phase.
   */
  selectPhase: (phaseId: string) => void;

  /**
   * Selects a section.
   */
  selectSection: (sectionId: string) => void;

  /**
   * ---------------------------------------------------------------------------
   * Permissions.
   * ---------------------------------------------------------------------------
   */

  canView: boolean;

  canEdit: boolean;

  canSubmit: boolean;
  sections: ApplicationSection[];
}

export const ApplicationContext = createContext<ApplicationContextValue | null>(
  null,
);

/**
 * Provides access to the shared application context.
 *
 * Must be used within the ApplicationProvider.
 */
export function useApplicationContext() {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useApplicationContext must be used inside ApplicationProvider.",
    );
  }

  return context;
}
