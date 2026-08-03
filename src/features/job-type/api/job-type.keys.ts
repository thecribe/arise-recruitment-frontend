export const jobTypeKeys = {
  all: ["job-types"] as const,

  list: () => [...jobTypeKeys.all, "list"] as const,

  detail: (id: string) => [...jobTypeKeys.all, "detail", id] as const,
};
