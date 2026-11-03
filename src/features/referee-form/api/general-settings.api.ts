import { instance } from "@/api/client";
import type { GeneralSettings } from "../types/general-settings.types";

export const generalSettingsApi = {
  getGeneralSettings: async (): Promise<GeneralSettings | null> => {
    const response = await instance.get("/settings/general");

    return response.data.data;
  },
};
