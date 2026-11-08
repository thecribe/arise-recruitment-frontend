import { useEffect } from "react";
import { createPortal } from "react-dom";
import { UserPlus, X, Users } from "lucide-react";

import AddApplicantForm from "./AddApplicantForm";

import type { AddApplicantFormValues } from "../../schemas/add-applicant.schema";

interface AddApplicantModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: AddApplicantFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

const AddApplicantModal = ({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
}: AddApplicantModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose, isSubmitting]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-applicant-title"
        className="relative my-auto flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/95 shadow-2xl shadow-blue-950/20 backdrop-blur-2xl sm:rounded-3xl"
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden border-b border-blue-100/80 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 px-5 py-5 text-white sm:px-7 sm:py-6">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-blue-300/20 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-md">
                <UserPlus size={21} />
              </div>

              <div className="min-w-0">
                <h2
                  id="add-applicant-title"
                  className="text-lg font-semibold sm:text-xl"
                >
                  Add new applicant
                </h2>

                <p className="mt-1 text-xs text-blue-100 sm:text-sm">
                  Create an applicant account and send an email verification
                  link.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="Close modal"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Form content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-7">
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
            <Users size={18} className="mt-0.5 shrink-0 text-blue-600" />

            <p className="text-xs leading-relaxed text-blue-800">
              Complete the applicant's details below. Their account will be
              created with applicant access, and a verification email will be
              sent to their registered email address.
            </p>
          </div>

          <AddApplicantForm
            onSubmit={onSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AddApplicantModal;
