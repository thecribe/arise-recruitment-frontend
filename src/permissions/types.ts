export interface AuthUser {
  id: string;

  role: string;

  permissions: string[];
}

export interface AuthState {
  user: AuthUser | null;

  isAuthenticated: boolean;

  isLoading: boolean;
}
