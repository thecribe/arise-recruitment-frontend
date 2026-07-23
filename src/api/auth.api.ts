import type { User } from "@/types/auth";

import { http } from "./http";

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
    return http.post<AuthUserResponse>("/auth/login", payload);
  },

  register(payload: RegisterPayload) {
    return http.post<AuthUserResponse>("/auth/register", payload);
  },

  logout() {
    return http.post<void>("/auth/logout");
  },

  me() {
    return http.get<AuthUserResponse>("/auth/me");
  },

  forgotPassword(email: string) {
    return http.post<void>("/auth/forgot-password", {
      email,
    });
  },

  resetPassword(token: string, password: string) {
    return http.post<void>("/auth/reset-password", {
      token,
      password,
    });
  },
};
