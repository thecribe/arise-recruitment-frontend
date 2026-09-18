/**
 * -----------------------------------------------------------------------------
 * File: training-certificate-comments.keys.ts
 * -----------------------------------------------------------------------------
 */

export const trainingCertificateCommentKeys = {
  all: ["training-certificate-comments"] as const,

  list: (applicationId: string, sectionId: string) =>
    [
      ...trainingCertificateCommentKeys.all,
      "list",
      applicationId,
      sectionId,
    ] as const,
};
