import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useDeleteTrainingCertificate } from "../../../hooks/training-certificates.hooks";
import type { TrainingCertificate } from "../types/training-certificate.types";

interface TrainingCertificateDeleteModalProps {
  open: boolean;
  applicationId: string;
  certificate: TrainingCertificate | null;
  onClose: () => void;
}

const TrainingCertificateDeleteModal = ({
  open,
  applicationId,
  certificate,
  onClose,
}: TrainingCertificateDeleteModalProps) => {
  const deleteCertificate = useDeleteTrainingCertificate(
    applicationId,
    certificate?.id ?? "",
  );

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !deleteCertificate.isPending) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, deleteCertificate.isPending, onClose]);

  if (!open || !certificate) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteCertificate.mutateAsync();
      onClose();
    } catch {
      // Global mutation/error handling can handle the error.
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-training-certificate-title"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !deleteCertificate.isPending
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-blue-200/60 bg-white/85 shadow-2xl backdrop-blur-2xl dark:border-blue-400/20 dark:bg-slate-950/90">
        <div className="border-b border-blue-100/70 px-5 py-4 dark:border-blue-900/40">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2
                id="delete-training-certificate-title"
                className="text-base font-semibold text-slate-900 dark:text-white"
              >
                Delete Certificate
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-5">
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {certificate.certificateName}
            </span>
            ?
          </p>

          {certificate.certificateNumber && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Certificate number: {certificate.certificateNumber}
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-blue-100/70 px-5 py-4 sm:flex-row sm:justify-end dark:border-blue-900/40">
          <button
            type="button"
            disabled={deleteCertificate.isPending}
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white/60 px-4 text-sm font-medium text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={deleteCertificate.isPending}
            onClick={handleDelete}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleteCertificate.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Certificate
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TrainingCertificateDeleteModal;
