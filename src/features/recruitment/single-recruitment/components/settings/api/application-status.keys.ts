export const applicationStatusKeys = {
  all: ["application-status"] as const,

  detail: (applicantId: string) =>
    [...applicationStatusKeys.all, applicantId] as const,
};
