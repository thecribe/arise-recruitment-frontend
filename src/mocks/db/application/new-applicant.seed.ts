import type { ApplicantApplication } from "@/features/application/types";

export const newApplicant: ApplicantApplication = {
  applicantId: "applicant-001",

  progress: 0,

  currentPhaseId: "phase-personal",

  currentSectionId: "section-personal-details",

  phases: [
    {
      phaseId: "phase-personal",

      status: "draft",

      sections: [
        {
          sectionId: "section-personal-details",
          status: "draft",
        },
        {
          sectionId: "section-contact-details",
          status: "locked",
        },
      ],
    },

    {
      phaseId: "phase-professional",

      status: "locked",

      sections: [],
    },

    {
      phaseId: "phase-compliance",

      status: "locked",

      sections: [],
    },

    {
      phaseId: "phase-declaration",

      status: "locked",

      sections: [],
    },
  ],
};
