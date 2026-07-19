/**
 * ------------------------------------------------------------------
 * Authentication apiClient
 * ------------------------------------------------------------------
 *
 * This file only communicates with backend endpoints.
 *
 * No business logic should exist here.
 *
 * Example:
 *
 * auth.apiClient.ts
 *      |
 *      |
 *      --> POST /auth/login
 *
 * The service layer decides what to do with the response.
 * ------------------------------------------------------------------
 */

import type { User } from "@/types/auth";
import { apiClient } from "./client";

interface LoginPayload {
  email: string;

  password: string;
}

interface LoginResponse {
  user: User;
}

/**
 * Login user
 *
 * Backend responsibilities:
 *
 * - Validate credentials
 * - Create cookies
 * - Return user profile
 */
export const loginRequest = async (payload: LoginPayload) => {
  const response = await apiClient.post<LoginResponse>("/auth/login", payload);

  return response.data;
};

/**
 * Get currently authenticated user
 *
 * Browser automatically sends cookies.
 *
 * Backend validates session.
 */
export const meRequest = async () => {
  const response = await apiClient.get<LoginResponse>("/auth/me");

  return response.data;
};

/**
 * Logout user
 *
 * Backend clears cookies.
 */
export const logoutRequest = async () => {
  await apiClient.post("/auth/logout");
};
