import { apiClient } from "@/api/client";
import type {
  LoginPayload,
  RegisterPayload,
  AuthUser,
  LoginResponse,
} from "../types/auth.types";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", payload);

    return response.data;
  },

  register: async (payload: RegisterPayload) => {
    const response = await apiClient.post("/auth/register", payload);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post("/auth/forgot-password", {
      email,
    });

    return response.data;
  },

  resetPassword: async (payload: { token: string; password: string }) => {
    const response = await apiClient.post("/auth/reset-password", payload);

    return response.data;
  },
  verifyEmail: async (token: string) => {
    const response = await apiClient.post("/auth/verify-email", {
      token,
    });

    return response.data;
  },
};
