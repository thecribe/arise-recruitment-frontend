import { authApi } from "../api/auth.api";

export const authService = {
  login: authApi.login,

  logout: authApi.logout,

  me: authApi.me,
};
