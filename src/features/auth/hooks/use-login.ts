/**
 * -----------------------------------------------------------------------------
 * File: use-login.ts
 * Description:
 * React Query mutation hook responsible for authenticating a user.
 *
 * Responsibilities:
 * - Submit login credentials to the backend.
 * - Refresh the authenticated user after a successful login.
 * - Redirect the user to the dashboard.
 *
 * Notes:
 * - Authentication uses HttpOnly cookies.
 * - No tokens are stored on the frontend.
 * -----------------------------------------------------------------------------
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { QUERY_KEYS } from "@/constants/query-keys";
import { ROUTES } from "@/constants/routes";

import { authService } from "../services/auth.service";

/**
 * Handles the login process.
 */
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * Sends the login request to the backend.
     */
    mutationFn: authService.login,

    /**
     * Executes after a successful login.
     *
     * The backend has already set the authentication cookies,
     * so we simply refresh the current user and navigate to the dashboard.
     */
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.ME,
      });

      navigate(ROUTES.DASHBOARD, {
        replace: true,
      });
    },
  });
}
