import { instance } from "@/api/client";

import type {
  GeneralSettings,
  GeneralSettingsApiResponse,
  GeneralSettingsFormValues,
} from "../types/general-settings.types";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

const BASE_URL = "/settings/general";

const getGeneralSettings = async (): Promise<GeneralSettings | null> => {
  const response =
    await instance.get<GeneralSettingsApiResponse<GeneralSettings | null>>(
      BASE_URL,
    );

  return response.data.data;
};

const updateGeneralSettings = async (
  values: GeneralSettingsFormValues,
): Promise<GeneralSettings> => {
  const formData = payloadToFormData(values);

  const response = await instance.patch<
    GeneralSettingsApiResponse<GeneralSettings>
  >(BASE_URL, formData);

  return response.data.data;
};

export const generalSettingsApi = {
  getGeneralSettings,
  updateGeneralSettings,
};
