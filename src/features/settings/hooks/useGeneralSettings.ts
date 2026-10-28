import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { generalSettingsApi } from "../api/general-settings.api";
import type { GeneralSettingsFormValues } from "../types/general-settings.types";
import { notification } from "@/components/feedback/notification";
import type { AxiosError } from "axios";

export const generalSettingsKeys = {
  all: ["general-settings"] as const,
  detail: () => [...generalSettingsKeys.all, "detail"] as const,
};

export const useGeneralSettings = () =>
  useQuery({
    queryKey: generalSettingsKeys.detail(),
    queryFn: generalSettingsApi.getGeneralSettings,
  });

export const useUpdateGeneralSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: GeneralSettingsFormValues) =>
      generalSettingsApi.updateGeneralSettings(values),

    onSuccess: (settings) => {
      queryClient.setQueryData(generalSettingsKeys.detail(), settings);
      notification.success("General settings updated successfully.");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{
        message?: string;
      }>;

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to update application stage. Please try again.",
      );
    },
  });
};
