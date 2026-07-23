/**
 * -----------------------------------------------------------------------------
 * File: applicant-application.keys.ts
 *
 * Description:
 * React Query keys for applicant-specific resources.
 * -----------------------------------------------------------------------------
 */

export const applicantApplicationKeys = {
  all: ["applicant-application"] as const,

  application: () => [...applicantApplicationKeys.all, "application"] as const,

  section: (sectionId: string) =>
    [...applicantApplicationKeys.all, "section", sectionId] as const,
};
