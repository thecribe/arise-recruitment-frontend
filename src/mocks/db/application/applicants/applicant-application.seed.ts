import type { ApplicantApplication } from "@/features/application/types";

export const applicantApplicationSeed: ApplicantApplication = {
  applicantId: "applicant-001",

  progress: 15,

  currentPhaseId: "phase-personal",

  currentSectionId: "section-personal-information",

  phases: [
    {
      phaseId: "phase-personal",

      status: "in_progress",

      startedAt: new Date().toISOString(),

      sections: [
        {
          sectionId: "section-personal-information",

          status: "draft",
        },

        {
          sectionId: "section-contact-details",

          status: "locked",
        },

        {
          sectionId: "section-education",

          status: "locked",
        },

        {
          sectionId: "section-employment-history",

          status: "locked",
        },
      ],
    },

    // {
    //   phaseId: "phase-professional",

    //   status: "locked",

    //   sections: [],
    // },

    // {
    //   phaseId: "phase-compliance",

    //   status: "locked",

    //   sections: [],
    // },

    // {
    //   phaseId: "phase-declaration",

    //   status: "locked",

    //   sections: [],
    // },
  ],
};
