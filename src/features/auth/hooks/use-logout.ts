import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { QUERY_KEYS } from "@/constants/query-keys";
import { ROUTES } from "@/constants/routes";

import { authService } from "../services/auth.service";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,

    onSuccess: async () => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.AUTH.ME,
      });

      navigate(ROUTES.AUTH.LOGIN, {
        replace: true,
      });
    },
  });
}
