import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, CheckCircle2, Loader2, X } from "lucide-react";

import { useUpdateUserStatus } from "../../hooks/useUsers";
import type { User } from "../../types/user.types";

interface UserStatusModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

const UserStatusModal = ({ open, user, onClose }: UserStatusModalProps) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const updateStatus = useUpdateUserStatus();

  const isSaving = updateStatus.isPending;
  const isDeactivating = user?.is_active ?? false;
  const nextStatus = !isDeactivating;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setFeedback(null);
  }, [open, user]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSaving) onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, isSaving, onClose]);

  if (!open || !user) return null;

  const fullName = `${user.first_name} ${user.last_name}`.trim();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSaving) return;

    setFeedback(null);

    try {
      await updateStatus.mutateAsync({
        id: user.id,
        values: { isActive: nextStatus },
      });

      onClose();
    } catch {
      setFeedback(
        `Unable to ${nextStatus ? "activate" : "deactivate"} this account. Please try again.`,
      );
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-status-title"
        className="my-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/60 bg-white/95 shadow-2xl shadow-blue-950/15 backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/95"
      >
        <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                isDeactivating
                  ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                  : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
              }`}
            >
              {isDeactivating ? (
                <AlertTriangle size={20} />
              ) : (
                <CheckCircle2 size={20} />
              )}
            </div>

            <div>
              <h2
                id="user-status-title"
                className="text-base font-semibold text-slate-900 dark:text-white"
              >
                {isDeactivating ? "Deactivate account" : "Activate account"}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Confirm this account status change.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-5 py-5 sm:px-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <p className="font-medium text-slate-900 dark:text-slate-100">
                {fullName}
              </p>
              <p className="mt-1 break-all text-sm text-slate-500 dark:text-slate-400">
                {user.email}
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                Current status:
                <span
                  className={`rounded-full px-2 py-1 font-medium ${
                    user.is_active
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                  }`}
                >
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              {isDeactivating
                ? "This will deactivate the account. The user may lose access to the application, depending on your backend's access-control rules."
                : "This will activate the account and allow the user to access the application, subject to their assigned role and your backend's access-control rules."}
            </p>

            {feedback && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
              >
                {feedback}
              </p>
            )}
          </div>

          <footer className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end dark:border-slate-800 dark:bg-slate-950/30 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isDeactivating
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isSaving && <Loader2 size={16} className="animate-spin" />}
              {isSaving
                ? "Saving..."
                : isDeactivating
                  ? "Deactivate account"
                  : "Activate account"}
            </button>
          </footer>
        </form>
      </section>
    </div>,
    document.body,
  );
};

export default UserStatusModal;
