export const profileKeys = {
  all: ["profile"] as const,

  detail: (applicantId: string) => [...profileKeys.all, applicantId] as const,
};
