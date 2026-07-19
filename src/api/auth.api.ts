/**
 * -----------------------------------------------------------------------------
 * File: auth.api.ts
 * Description:
 * Authentication API endpoints.
 * -----------------------------------------------------------------------------
 */

import type { User } from "@/features/auth/types/auth.types";
import { apiClient } from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  postcode: string;
  jobType: string;
  password: string;
}

export interface AuthUserResponse {
  user: User;
}

export const authApi = {
  login(payload: LoginPayload) {
    return apiClient.post<AuthUserResponse>("/auth/login", payload);
  },

  register(payload: RegisterPayload) {
    return apiClient.post<AuthUserResponse>("/auth/register", payload);
  },

  logout() {
    return apiClient.post("/auth/logout");
  },

  me() {
    return apiClient.get<AuthUserResponse>("/auth/me");
  },

  forgotPassword(email: string) {
    return apiClient.post("/auth/forgot-password", {
      email,
    });
  },

  resetPassword(token: string, password: string) {
    return apiClient.post("/auth/reset-password", {
      token,
      password,
    });
  },
};
