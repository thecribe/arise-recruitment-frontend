import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, ShieldCheck, X } from "lucide-react";

import { useAssignableRoles, useUpdateUserRole } from "../../hooks/useUsers";

import type { User } from "../../types/user.types";

interface UserRoleModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

const formatRole = (role: string) => role.replaceAll("_", " ").toLowerCase();

const UserRoleModal = ({ open, user, onClose }: UserRoleModalProps) => {
  const [roleId, setRoleId] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const {
    data: roles = [],
    isPending: rolesLoading,
    isError: rolesError,
    refetch: refetchRoles,
  } = useAssignableRoles();

  const updateRole = useUpdateUserRole();
  const isSaving = updateRole.isPending;

  useEffect(() => {
    if (!open || !user) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRoleId(user.role_id);
    setFeedback(null);
  }, [open, user]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSaving) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, isSaving, onClose]);

  if (!open || !user) return null;

  const hasChanged = roleId !== user.role_id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasChanged || !roleId || isSaving) return;

    setFeedback(null);

    try {
      await updateRole.mutateAsync({
        id: user.id,
        values: { roleId },
      });

      onClose();
    } catch {
      setFeedback("Unable to update the user's role. Please try again.");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-role-modal-title"
        className="my-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/60 bg-white/95 shadow-2xl shadow-blue-950/15 backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/95"
      >
        <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h2
                id="user-role-modal-title"
                className="text-base font-semibold text-slate-900 dark:text-white"
              >
                Change user role
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Update access for {user.first_name} {user.last_name}.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-5 py-5 sm:px-6">
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 dark:border-blue-900/50 dark:bg-blue-950/30">
              <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
                User
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                {user.first_name} {user.last_name}
              </p>

              <p className="mt-0.5 break-all text-xs text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            </div>

            <div>
              <label
                htmlFor="user-role"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Assigned role
              </label>

              <select
                id="user-role"
                value={roleId}
                onChange={(event) => {
                  setRoleId(event.target.value);
                  setFeedback(null);
                }}
                disabled={rolesLoading || rolesError || isSaving}
                required
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-900/40"
              >
                <option value="" disabled>
                  Select a role
                </option>

                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {formatRole(role.name)}
                  </option>
                ))}
              </select>

              {rolesLoading && (
                <p className="mt-2 text-xs text-slate-500">
                  Loading available roles...
                </p>
              )}

              {rolesError && (
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-red-600 dark:text-red-400">
                    Unable to load available roles.
                  </p>

                  <button
                    type="button"
                    onClick={() => void refetchRoles()}
                    className="text-xs font-medium text-blue-700 hover:underline dark:text-blue-400"
                  >
                    Try again
                  </button>
                </div>
              )}

              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Changing a role may change the user's access to application
                features and settings.
              </p>
            </div>

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
              disabled={
                !hasChanged || !roleId || rolesLoading || rolesError || isSaving
              }
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving && <Loader2 size={16} className="animate-spin" />}
              {isSaving ? "Saving..." : "Save role"}
            </button>
          </footer>
        </form>
      </section>
    </div>,
    document.body,
  );
};

export default UserRoleModal;
