import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { authService } from "../services/auth.service";

export function useCurrentUser() {
  return useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: async () => {
      const response = await authService.me();
      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
