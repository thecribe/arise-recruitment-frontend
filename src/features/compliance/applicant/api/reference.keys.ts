export const referenceKeys = {
  all: ["applicant-references"] as const,

  lists: () => [...referenceKeys.all, "list"] as const,

  list: () => [...referenceKeys.lists(), "applicant"] as const,

  details: () => [...referenceKeys.all, "detail"] as const,

  detail: (referenceId: string) =>
    [...referenceKeys.details(), referenceId] as const,
};
