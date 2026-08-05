import { instance } from "@/api/client";
import type {
  LoginPayload,
  RegisterPayload,
  AuthUser,
  LoginResponse,
} from "../types/auth.types";


export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await instance.post("/auth/login", payload);

    return response.data;
  },

  register: async (payload: RegisterPayload) => {
    const response = await instance.post("/auth/register", payload);
    return response.data;
  },

  logout: async () => {
    const response = await instance.post("/auth/logout");
    return response.data;
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    const response = await instance.get("/auth/me");

    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await instance.post("/auth/forgot-password", {
      email,
    });

    return response.data;
  },

  resetPassword: async (payload: { token: string; password: string }) => {
    const response = await instance.post("/auth/reset-password", payload);

    return response.data;
  },

  setPassword: async (payload: { token: string; password: string, confirmPassword: string }) => {
    const response = await instance.post("/auth/set-password", payload);

    return response.data;
  },
  
verifyEmail: async (token: string) => {
  console.log("Calling verify API...", token);

  const response = await instance.get("/auth/verify-email", {
    params: { token },
  });

  console.log("API response:", response.data);

  return response.data;
},
};
