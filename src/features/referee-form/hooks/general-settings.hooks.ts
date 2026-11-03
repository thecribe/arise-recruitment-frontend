import { useQuery } from "@tanstack/react-query";

import { generalSettingsApi } from "../api/general-settings.api";

export const generalSettingsKeys = {
  all: ["general-settings"] as const,
  detail: () => [...generalSettingsKeys.all, "detail"] as const,
};

export const useGeneralSettings = () => {
  return useQuery({
    queryKey: generalSettingsKeys.detail(),

    queryFn: generalSettingsApi.getGeneralSettings,

    staleTime: 5 * 60 * 1000,

    refetchOnWindowFocus: false,

    retry: 1,
  });
};
