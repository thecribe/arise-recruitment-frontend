/**
 * -----------------------------------------------------------------------------
 * File: SendReferenceModal.tsx
 *
 * Description:
 * Confirmation modal for sending a reference request to the referee.
 *
 * Important:
 * Sending the reference only affects the mail/request lifecycle.
 * It does not approve, reject, or otherwise modify reference.status.
 * -----------------------------------------------------------------------------
 */

import { Mail, X } from "lucide-react";

import type { ManagerReference } from "@/features/recruitment/types/reference.types";
import { useSendReference } from "../../../../hooks/reference.hooks";

interface SendReferenceModalProps {
  applicationId: string;
  reference: ManagerReference;
  open: boolean;
  onClose: () => void;
}

export default function SendReferenceModal({
  applicationId,
  reference,
  open,
  onClose,
}: SendReferenceModalProps) {
  const sendReference = useSendReference(applicationId, reference.id);

  if (!open) {
    return null;
  }

  const handleSend = async () => {
    await sendReference.mutateAsync();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-xl">
        {/* -------------------------------------------------------------------
         * Header
         * ------------------------------------------------------------------- */}
        <div className="flex items-start justify-between gap-4 border-b  border-blue-100/70 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-300">
              <Mail className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Send Reference</h2>

              <p className="mt-1 text-sm ">
                Send a reference request to the referee.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={sendReference.isPending}
            aria-label="Close"
            className="rounded-lg p-2  transition hover:bg-red/10 hover:text-red-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* -------------------------------------------------------------------
         * Content
         * ------------------------------------------------------------------- */}
        <div className="px-6 py-6">
          <p className="text-sm leading-6 ">
            Are you sure you want to send the reference request to{" "}
            <span className="font-medium text-blue-900">
              {reference.refereeName || "the referee"}
            </span>
            ?
          </p>

          {reference.refereeEmail && (
            <div className="mt-4 rounded-xl border border-white/10 bg-blue-500 px-4 py-3">
              <p className="text-xs text-white">Email address</p>

              <p className="mt-1 break-all text-sm text-blue-100">
                {reference.refereeEmail}
              </p>
            </div>
          )}

          <div className="mt-4 rounded-xl border border-blue-400/10 bg-blue-500 px-4 py-3">
            <p className="text-xs leading-5 text-white/70">
              Once sent, the mail status will change to{" "}
              <span className="font-medium text-blue-100">Pending</span>.
            </p>
          </div>
        </div>

        {/* -------------------------------------------------------------------
         * Footer
         * ------------------------------------------------------------------- */}
        <div className="flex flex-col-reverse gap-3 border-t border-white/10 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={sendReference.isPending}
            className="rounded-xl border border-white/10 bg-red-800 px-5 py-2.5 text-sm font-medium text-blue-100 transition hover:bg-red-800/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={sendReference.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Mail className="h-4 w-4" />

            {sendReference.isPending ? "Sending..." : "Send Reference"}
          </button>
        </div>
      </div>
    </div>
  );
}
