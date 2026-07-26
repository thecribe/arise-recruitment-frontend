import { create } from "zustand";

import { persist } from "zustand/middleware";

import { mockDatabaseSeed } from "./seed";

import type { MockDatabase } from "./types";

interface MockDbState {
  db: MockDatabase;
}

export const useMockDbStore = create<MockDbState>()(
  persist(
    () => ({
      db: mockDatabaseSeed,
    }),
    {
      name: "airse-mock-db",
    },
  ),
);
