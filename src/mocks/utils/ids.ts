/**
 * -----------------------------------------------------------------------------
 * Generates mock ids.
 * -----------------------------------------------------------------------------
 */

export function generateId(prefix = "id"): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

// export const APPLICATION_IDS = {
//   applicant: "applicant-001",

//   application: "application-001",

//   phase1: "phase-1",
//   phase2: "phase-2",
//   phase3: "phase-3",

//   sectionPersonal: "section-personal",
//   sectionAddress: "section-address",
//   sectionEmployment: "section-employment",
//   sectionReferences: "section-references",
// } as const;

export const APPLICATION_IDS = {
  phases: {
    personal: "phase-personal",
    professional: "phase-professional",
    compliance: "phase-compliance",
    declaration: "phase-declaration",
  },

  sections: {
    personalDetails: "section-personal-details",
    contactDetails: "section-contact-details",

    qualifications: "section-qualifications",
    employmentHistory: "section-employment-history",
    references: "section-references",

    rightToWork: "section-right-to-work",
    dbs: "section-dbs",
    health: "section-health",

    declaration: "section-declaration",
    signature: "section-signature",
  },
} as const;
