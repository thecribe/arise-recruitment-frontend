/**
 * -----------------------------------------------------------------------------
 * Recruitment React Query keys.
 * -----------------------------------------------------------------------------
 */

export const recruitmentKeys = {
  all: ["recruitment"] as const,

  applicants: () => [...recruitmentKeys.all, "applicants"] as const,

  applicantList: (filters?: unknown) =>
    [...recruitmentKeys.applicants(), filters] as const,

  applicant: (applicationId: string) =>
    [...recruitmentKeys.applicants(), applicationId] as const,

  applicantSection: (applicationId: string, sectionId: string) =>
    [
      ...recruitmentKeys.all,
      "applicant-section",
      applicationId,
      sectionId,
    ] as const,
};
