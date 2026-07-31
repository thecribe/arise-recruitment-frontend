

import type { ApplicantApplication, ApplicantSectionRecord, PhaseStatus, SectionStatus } from "@/features/application/types";
import type { Applicant } from "../types/applicant";


const FIRST_NAMES = [
  "John",
  "Mary",
  "James",
  "Sarah",
  "David",
  "Grace",
  "Peter",
  "Ruth",
  "Michael",
  "Esther",
];

const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Taylor",
  "Wilson",
  "Thomas",
  "Moore",
  "White",
  "Clark",
];

const PHASE_STATUSES: PhaseStatus[] = [
  "approved",
  "submitted",
  "in_progress",
  "draft",
];

const SECTION_STATUSES: SectionStatus[] = [
  "approved",
  "submitted",
  "in_progress",
  "draft",
];

const randomItem = <T>(items: readonly T[]) =>
  items[Math.floor(Math.random() * items.length)];

const randomDate = () =>
  new Date(
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 60),
  ).toISOString();

function generateSections(
  phaseId: string,
  phaseStatus: PhaseStatus,
): ApplicantSectionRecord[] {
  return APPLICATION_SECTIONS.filter(
    (section) => section.phaseId === phaseId,
  ).map((section) => ({
    sectionId: section.id,
    status:
      phaseStatus === "approved" ? "approved" : randomItem(SECTION_STATUSES),
    recruiterComment: "",
    submittedAt: randomDate(),
    approvedAt: phaseStatus === "approved" ? randomDate() : undefined,
  }));
}

function generateApplication(applicantId: string): ApplicantApplication {
  const currentPhase =
    APPLICATION_PHASES[Math.floor(Math.random() * APPLICATION_PHASES.length)];

  const phases: ApplicantPhaseRecord[] = APPLICATION_PHASES.map((phase) => {
    let status: PhaseStatus;

    if (phase.order < currentPhase.order) {
      status = "approved";
    } else if (phase.order === currentPhase.order) {
      status = randomItem(PHASE_STATUSES);
    } else {
      status = "locked";
    }

    return {
      phaseId: phase.id,
      status,
      startedAt: randomDate(),
      completedAt: status === "approved" ? randomDate() : undefined,
      sections: generateSections(phase.id, status),
    };
  });

  return {
    applicantId,
    progress: Math.round(
      (currentPhase.order / APPLICATION_PHASES.length) * 100,
    ),
    currentPhaseId: currentPhase.id,
    currentSectionId: phases.find((p) => p.phaseId === currentPhase.id)!
      .sections[0].sectionId,
    phases,
  };
}

export function generateApplicants(count: number): Applicant[] {
  return Array.from({ length: count }, (_, index) => {
    const firstName = randomItem(FIRST_NAMES);
    const lastName = randomItem(LAST_NAMES);

    const id = crypto.randomUUID();

    return {
      id,

      firstName,
      lastName,

      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@airse.co.uk`,

      phone: `07${Math.floor(100000000 + Math.random() * 900000000)}`,

      postcode: `AB${Math.floor(Math.random() * 90)} ${Math.floor(
        1 + Math.random() * 9,
      )}CD`,

      jobRole: randomItem(JOB_ROLES),

      application: generateApplication(id),

      createdAt: randomDate(),
      updatedAt: randomDate(),
    };
  });
}
