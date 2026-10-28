export const APPLICATION_SECTION_STATUS = {
  LOCKED: "locked",
  IN_PROGRESS: "in_progress",
  SUBMITTED: "submitted",
  REJECTED: "rejected",
  APPROVED: "approved",
} as const;

export type ApplicationSectionStatus =
  (typeof APPLICATION_SECTION_STATUS)[keyof typeof APPLICATION_SECTION_STATUS];

export const canEditApplicationSection = (
  status: ApplicationSectionStatus,
): boolean => {
  return (
    status === APPLICATION_SECTION_STATUS.IN_PROGRESS ||
    status === APPLICATION_SECTION_STATUS.REJECTED
  );
};
