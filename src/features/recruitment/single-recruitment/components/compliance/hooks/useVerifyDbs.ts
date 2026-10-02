import { useMutation } from "@tanstack/react-query";

import { notification } from "@/components/feedback/notification";
import { complianceApi } from "../api/compliance.api";

export interface VerifyDbsPayload {
  disclosureNumber: string;
  dateOfBirth: string;
  surname: string;
}

interface UseVerifyDbsProps {
  applicationId: string;
}

export function useVerifyDbs({ applicationId }: UseVerifyDbsProps) {
  const mutation = useMutation<unknown, unknown, VerifyDbsPayload>({
    mutationFn: (payload) => complianceApi.verifyDbs(applicationId, payload),

    onSuccess: () => {
      notification.success("DBS verification completed successfully.");
    },

    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to verify DBS details. Please try again.",
      );
    },
  });

  return {
    verifyDbs: mutation.mutateAsync,
    verificationResponse: mutation.data,
    isVerifying: mutation.isPending,
    verifyDbsError: mutation.error,
    resetVerification: mutation.reset,
  };
}

export default useVerifyDbs;
