export const QUERY_KEYS = {
  AUTH: {
    ME: ["auth", "me"],
  },

  DASHBOARD: {
    STATS: ["dashboard", "stats"],
  },

  APPLICATION: {
    ALL: ["applications"],

    DETAIL: (id: string) => ["applications", id],
  },

  RECRUITMENT: {
    ALL: ["recruitment"],

    DETAIL: (id: string) => ["recruitment", id],
  },

  STAFF: {
    ALL: ["staff"],

    DETAIL: (id: string) => ["staff", id],
  },

  COMPLIANCE: {
    ALL: ["compliance"],

    DETAIL: (id: string) => ["compliance", id],
  },
} as const;
