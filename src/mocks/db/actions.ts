import { useMockDbStore } from "./mock-db.store";
import type { SectionValues } from "./types";
import type { SectionStatus } from "@/features/application/types/applicant/applicant-application";

export const saveSectionData = (
  applicantId: string,
  sectionId: string,
  values: SectionValues,
) => {
  useMockDbStore.setState((state) => ({
    db: {
      ...state.db,
      applicantSectionData: state.db.applicantSectionData.map((section) =>
        section.applicantId === applicantId && section.sectionId === sectionId
          ? {
              ...section,
              values,
            }
          : section,
      ),
    },
  }));
};

export const updateSectionStatus = (
  applicantId: string,
  sectionId: string,
  status: SectionStatus,
) => {
  useMockDbStore.setState((state) => ({
    db: {
      ...state.db,
      applicantApplications: state.db.applicantApplications.map(
        (application) => {
          if (application.applicantId !== applicantId) {
            return application;
          }

          return {
            ...application,
            phases: application.phases.map((phase) => ({
              ...phase,
              sections: phase.sections.map((section) =>
                section.sectionId === sectionId
                  ? {
                      ...section,
                      status,
                    }
                  : section,
              ),
            })),
          };
        },
      ),
    },
  }));
};

export const setCurrentSection = (applicantId: string, sectionId: string) => {
  useMockDbStore.setState((state) => ({
    db: {
      ...state.db,
      applicantApplications: state.db.applicantApplications.map(
        (application) =>
          application.applicantId === applicantId
            ? {
                ...application,
                currentSectionId: sectionId,
              }
            : application,
      ),
    },
  }));
};

export const setCurrentPhase = (applicantId: string, phaseId: string) => {
  useMockDbStore.setState((state) => ({
    db: {
      ...state.db,
      applicantApplications: state.db.applicantApplications.map(
        (application) =>
          application.applicantId === applicantId
            ? {
                ...application,
                currentPhaseId: phaseId,
              }
            : application,
      ),
    },
  }));
};
// /**
//  * Update a section's form data.
//  */
// saveSectionData(
//   applicantId: string,
//   sectionId: string,
//   values: SectionValues
// ): void;

// /**
//  * Update a section's status.
//  */
// updateSectionStatus(
//   applicantId: string,
//   sectionId: string,
//   status: SectionStatus
// ): void;

// /**
//  * Update a phase's status.
//  */
// updatePhaseStatus(
//   applicantId: string,
//   phaseId: string,
//   status: PhaseStatus
// ): void;

// /**
//  * Update overall application progress.
//  */
// updateApplicationProgress(
//   applicantId: string,
//   progress: number
// ): void;
