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

/**
 * -----------------------------------------------------------------------------
 * File: application-review.keys.ts
 * -----------------------------------------------------------------------------
 */

export const applicationReviewKeys = {
  all: ["application-review"] as const,

  sectionComments: (sectionId: string) =>
    [...applicationReviewKeys.all, "section-comments", sectionId] as const,
};
