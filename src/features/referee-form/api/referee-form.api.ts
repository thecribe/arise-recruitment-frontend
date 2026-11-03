import { instance } from "@/api/client";
import type {
  RefereeFormDetails,
  RefereeFormSubmission,
} from "../types/referee-form.types";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

const BASE_URL = "/references";

export const refereeFormApi = {
  /**
   * Get applicant and referee details using the reference ID and token.
   */
  getReferenceDetails: async (
    referenceId: string,
    token: string,
  ): Promise<RefereeFormDetails> => {
    const response = await instance.get(
      `${BASE_URL}/${referenceId}/referee-form`,
      {
        params: { token },
      },
    );

    return response.data.data;
  },

  /**
   * Submit the completed reference response.
   */
  submitReference: async (
    referenceId: string,
    payload: RefereeFormSubmission & { token: string },
  ) => {
    const formData = payloadToFormData(payload);
    const response = await instance.post(
      `${BASE_URL}/${referenceId}/referee-form`,
      formData,
    );
    return response.data.data;
  },
};
