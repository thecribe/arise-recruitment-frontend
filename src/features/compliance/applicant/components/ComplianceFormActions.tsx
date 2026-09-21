import { Loader2, Save, Send } from "lucide-react";

import type { RecruitmentApplicationSectionStatus } from "../types/compliance.types";

interface ComplianceFormActionsProps {
  status: RecruitmentApplicationSectionStatus;
  isSaving?: boolean;
  isSubmitting?: boolean;
  onSaveDraft: () => void;
  onSubmit: () => void;
}

const isReadOnlyStatus = (
  status: RecruitmentApplicationSectionStatus,
): boolean => {
  return status === "locked" || status === "submitted" || status === "approved";
};

export default function ComplianceFormActions({
  status,
  isSaving = false,
  isSubmitting = false,
  onSaveDraft,
  onSubmit,
}: ComplianceFormActionsProps) {
  const isReadOnly = isReadOnlyStatus(status);
  const isBusy = isSaving || isSubmitting;

  if (isReadOnly) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
        <p className="text-sm leading-6 text-slate-600">
          {status === "approved"
            ? "This section has been approved and can no longer be edited."
            : status === "submitted"
              ? "This section has been submitted and is awaiting review."
              : "This section is currently locked."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-3 border-t border-slate-200/80 pt-5 sm:flex-row sm:items-center sm:justify-end">
      <button
        type="button"
        disabled={isBusy}
        onClick={onSaveDraft}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}

        {isSaving ? "Saving..." : "Save Draft"}
      </button>

      <button
        type="button"
        disabled={isBusy}
        onClick={onSubmit}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}

        {isSubmitting ? "Submitting..." : "Submit Section"}
      </button>
    </div>
  );
}
