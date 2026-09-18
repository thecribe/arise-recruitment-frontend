import { Power, X } from "lucide-react";

import type { TrainingCertificateRequirement } from "../../types/training-certificate-requirement.types";
import { createPortal } from "react-dom";
interface TrainingCertificateRequirementStatusModalProps {
  open: boolean;
  requirement: TrainingCertificateRequirement | null;
  isPending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const TrainingCertificateRequirementStatusModal = ({
  open,
  requirement,
  isPending = false,
  onConfirm,
  onClose,
}: TrainingCertificateRequirementStatusModalProps) => {
  if (!open || !requirement) {
    return null;
  }

  const activating = !requirement.active;

  return createPortal(
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-blue-950/30
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl
          border border-blue-200/60
          bg-white/85
          shadow-2xl shadow-blue-900/10
          backdrop-blur-2xl
          dark:border-blue-400/20
          dark:bg-slate-900/85
        "
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between gap-4
            border-b border-blue-100/70
            px-5 py-4
            dark:border-blue-400/20
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl
                border border-blue-200/70
                bg-blue-50/70
                text-blue-600
                dark:border-blue-400/20
                dark:bg-blue-500/10
                dark:text-blue-300
              "
            >
              <Power className="h-5 w-5" />
            </div>

            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {activating ? "Activate Certificate" : "Deactivate Certificate"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="Close"
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-xl
              bg-blue-50/50
              text-slate-500
              transition
              hover:bg-blue-100/70
              hover:text-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:bg-blue-500/10
              dark:text-slate-400
              dark:hover:bg-blue-500/20
              dark:hover:text-blue-300
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Are you sure you want to{" "}
            <span className="font-semibold">
              {activating ? "activate" : "deactivate"}
            </span>{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {requirement.name}
            </span>
            ?
          </p>

          {!activating && (
            <div
              className="
                mt-4
                rounded-xl
                border border-amber-200/70
                bg-amber-50/60
                px-4 py-3
                text-sm leading-5
                text-amber-700
                dark:border-amber-400/20
                dark:bg-amber-500/10
                dark:text-amber-300
              "
            >
              Deactivating this requirement will prevent it from being treated
              as an active mandatory training requirement for new recruitment
              activity.
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="
            flex flex-col-reverse gap-2
            border-t border-blue-100/70
            bg-blue-50/20
            px-5 py-4
            sm:flex-row
            sm:justify-end
            dark:border-blue-400/20
            dark:bg-blue-500/5
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="
              w-full
              rounded-xl
              border border-blue-200/60
              bg-white/50
              px-4 py-2.5
              text-sm font-medium
              text-slate-700
              transition
              hover:bg-blue-50/70
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
              dark:border-blue-400/20
              dark:bg-slate-900/30
              dark:text-slate-200
              dark:hover:bg-blue-500/10
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="
              inline-flex w-full items-center justify-center gap-2
              rounded-xl
              bg-blue-600
              px-4 py-2.5
              text-sm font-medium
              text-white
              shadow-lg shadow-blue-950/20
              transition
              hover:bg-blue-500
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
            "
          >
            <Power className="h-4 w-4" />

            {isPending ? "Updating..." : activating ? "Activate" : "Deactivate"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TrainingCertificateRequirementStatusModal;
