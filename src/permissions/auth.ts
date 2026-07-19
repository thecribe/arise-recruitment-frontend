import type { AuthState } from "./types";

export function useAuth(): AuthState {
  /**
   * Temporary implementation.
   *
   * Later this will read from Zustand.
   */

  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  };
}
