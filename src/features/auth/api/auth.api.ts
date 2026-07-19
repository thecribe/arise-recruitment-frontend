import type { LoginRequest } from "../types/login-request";
import type { CurrentUser } from "../types/current-user";
import { apiClient } from "@/api/client";

export const authApi = {
  login(payload: LoginRequest) {
    return apiClient.post("/auth/login", payload);
  },

  logout() {
    return apiClient.post("/auth/logout");
  },

  me() {
    return apiClient.get<CurrentUser>("/auth/me");
  },
};
