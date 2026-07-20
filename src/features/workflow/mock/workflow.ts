import type { RecruitmentWorkflow } from "../types";

export const workflow: RecruitmentWorkflow = {
  applicantId: "1",

  currentPhaseId: "application",

  currentSectionId: "employment-history",

  phases: [
    {
      id: "application",
      title: "Application Phase",
      description: "Complete your application information.",
      order: 1,
      status: "in_progress",

      unlocked: true,

      sections: [
        {
          id: "personal-details",
          title: "Personal Details",
          description: "Basic personal information.",
          route: "/application/application/personal-details",
          order: 1,
          status: "approved",
          visible: true,
          completed: true,
          approved: true,
          approvedBy: "Emma Wilson",
          approvedAt: "18 Jul 2026",
          completedAt: "18 Jul 2026",
        },

        {
          id: "contact-details",
          title: "Contact Details",
          description: "Address and contact information.",
          route: "/application/application/contact-details",
          order: 2,
          status: "approved",
          visible: true,
          completed: true,
          approved: true,
          approvedBy: "Emma Wilson",
          approvedAt: "18 Jul 2026",
          completedAt: "18 Jul 2026",
        },

        {
          id: "education-history",
          title: "Education History",
          description: "Qualifications and education.",
          route: "/application/application/education-history",
          order: 3,
          status: "approved",
          visible: true,
          completed: true,
          approved: true,
          approvedBy: "Emma Wilson",
          approvedAt: "19 Jul 2026",
          completedAt: "19 Jul 2026",
        },

        {
          id: "employment-history",
          title: "Employment History",
          description: "Employment and work experience.",
          route: "/application/application/employment-history",
          order: 4,
          status: "in_progress",
          visible: true,
          completed: false,
          approved: false,
        },

        {
          id: "references",
          title: "References",
          description: "Professional references.",
          route: "/application/application/references",
          order: 5,
          status: "not_started",
          visible: true,
          completed: false,
          approved: false,
        },

        {
          id: "certificates",
          title: "Certificates",
          description: "Professional certificates.",
          route: "/application/application/certificates",
          order: 6,
          status: "locked",
          visible: false,
          completed: false,
          approved: false,
        },

        {
          id: "supporting-documents",
          title: "Supporting Documents",
          description: "Upload supporting documents.",
          route: "/application/application/supporting-documents",
          order: 7,
          status: "locked",
          visible: false,
          completed: false,
          approved: false,
        },
      ],
    },

    {
      id: "pre-employment",
      title: "Pre-Employment Phase",
      description: "Complete all mandatory pre-employment checks.",
      order: 2,
      status: "locked",
      unlocked: false,

      sections: [
        {
          id: "right-to-work",
          title: "Right To Work",
          description: "Upload right to work documentation.",
          route: "/application/pre-employment/right-to-work",
          order: 1,
          status: "locked",
          visible: false,
          completed: false,
          approved: false,
        },

        {
          id: "enhanced-dbs",
          title: "Enhanced DBS",
          description: "Disclosure and Barring Service check.",
          route: "/application/pre-employment/enhanced-dbs",
          order: 2,
          status: "locked",
          visible: false,
          completed: false,
          approved: false,
        },

        {
          id: "occupational-health",
          title: "Occupational Health",
          description: "Occupational health questionnaire.",
          route: "/application/pre-employment/occupational-health",
          order: 3,
          status: "locked",
          visible: false,
          completed: false,
          approved: false,
        },

        {
          id: "bank-details",
          title: "Bank Details",
          description: "Salary payment information.",
          route: "/application/pre-employment/bank-details",
          order: 4,
          status: "locked",
          visible: false,
          completed: false,
          approved: false,
        },

        {
          id: "emergency-contact",
          title: "Emergency Contact",
          description: "Emergency contact information.",
          route: "/application/pre-employment/emergency-contact",
          order: 5,
          status: "locked",
          visible: false,
          completed: false,
          approved: false,
        },
      ],
    },

    {
      id: "compliance",
      title: "Compliance Phase",
      description: "Compliance verification by recruitment.",
      order: 3,
      status: "locked",
      unlocked: false,

      sections: [
        {
          id: "compliance-review",
          title: "Compliance Review",
          description: "Internal compliance review.",
          route: "/application/compliance/review",
          order: 1,
          status: "locked",
          visible: false,
          completed: false,
          approved: false,
        },
      ],
    },

    {
      id: "approval",
      title: "Final Approval",
      description: "Recruitment approval and onboarding.",
      order: 4,
      status: "locked",
      unlocked: false,

      sections: [
        {
          id: "final-review",
          title: "Final Review",
          description: "Recruitment manager approval.",
          route: "/application/approval/final-review",
          order: 1,
          status: "locked",
          visible: false,
          completed: false,
          approved: false,
        },
      ],
    },
  ],
};
