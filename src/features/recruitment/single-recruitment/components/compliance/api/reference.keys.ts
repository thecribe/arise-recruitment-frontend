export const referenceKeys = {
  all: ["references"] as const,

  lists: () => [...referenceKeys.all, "list"] as const,

  list: (applicationId: string) =>
    [...referenceKeys.lists(), applicationId] as const,

  details: () => [...referenceKeys.all, "detail"] as const,

  detail: (applicationId: string, referenceId: string) =>
    [...referenceKeys.details(), applicationId, referenceId] as const,

  responses: () => [...referenceKeys.all, "response"] as const,

  response: (applicationId: string, referenceId: string) =>
    [...referenceKeys.responses(), applicationId, referenceId] as const,
};
