/**
 * Update a section's form data.
 */
saveSectionData(
  applicantId: string,
  sectionId: string,
  values: SectionValues
): void;

/**
 * Update a section's status.
 */
updateSectionStatus(
  applicantId: string,
  sectionId: string,
  status: SectionStatus
): void;

/**
 * Update a phase's status.
 */
updatePhaseStatus(
  applicantId: string,
  phaseId: string,
  status: PhaseStatus
): void;

/**
 * Update overall application progress.
 */
updateApplicationProgress(
  applicantId: string,
  progress: number
): void;





import { useMockDbStore } from "./mock-db.store";
import type { SectionValues } from "./types";


export const saveSectionData = (
  applicantId: string,
  sectionId: string,
  values: SectionValues
) => {
  useMockDbStore.setState((state) => ({
    db: {
      ...state.db,
      applicantSectionData: state.db.applicantSectionData.map((section) =>
        section.applicantId === applicantId &&
        section.sectionId === sectionId
          ? {
              ...section,
              values,
            }
          : section
      ),
    },
  }));
};