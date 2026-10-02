import { useMutation } from "@tanstack/react-query";
import { complianceApi } from "../api/compliance.api";
import { notification } from "@/components/feedback/notification";

interface UseVerifyRightToWorkProps {
  applicationId: string;
}

export interface VerifyRightToWorkPayload {
  shareCode: string;
  dateOfBirth: string;
}

export default function useVerifyRightToWork({
  applicationId,
}: UseVerifyRightToWorkProps) {
  const mutation = useMutation<unknown, unknown, VerifyRightToWorkPayload>({
    mutationFn: (payload) =>
      complianceApi.verifyRightToWork(applicationId, payload),

    onSuccess: () => {
      notification.success(
        "Right to Work verification completed successfully.",
      );
    },

    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            error?: {
              message?: string;
            };
            message?: string;
          };
        };
      };

      notification.error(
        axiosError.response?.data?.error?.message ||
          axiosError.response?.data?.message ||
          "Unable to verify Right to Work details. Please try again.",
      );
    },
  });

  return {
    verifyRightToWork: mutation.mutateAsync,
    verificationResponse: mutation.data,
    isVerifying: mutation.isPending,
    verifyRightToWorkError: mutation.error,
    resetVerification: mutation.reset,
  };
}
