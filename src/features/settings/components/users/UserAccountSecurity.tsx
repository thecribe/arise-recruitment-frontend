import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";

import { useUpdateUserStatus } from "../../hooks/useUsers";
import type { User } from "../../types/user.types";

interface UserAccountSecurityProps {
  user: User;
}

export default function UserAccountSecurity({
  user,
}: UserAccountSecurityProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const updateStatus = useUpdateUserStatus();

  const nextStatus = !user.is_active;
  const actionLabel = nextStatus ? "Activate account" : "Deactivate account";

  const handleStatusChange = () => {
    updateStatus.mutate(
      {
        id: user.id,
        values: { isActive: nextStatus },
      },
      {
        onSuccess: () => setConfirmOpen(false),
      },
    );
  };

  const formatDate = (value: string | null | undefined) => {
    if (!value) return "No recorded activity";

    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? "Unavailable" : date.toLocaleString();
  };

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-blue-100/80 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-blue-950/70 dark:bg-slate-950/50 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Account security
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Review account status and recent account activity.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200/80 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              {user.is_active ? (
                <CheckCircle2 size={17} className="text-emerald-600" />
              ) : (
                <ShieldOff size={17} className="text-slate-500" />
              )}
              <span className="text-sm">Account status</span>
            </div>

            <p className="mt-2 font-semibold text-slate-900 dark:text-white">
              {user.is_active ? "Active" : "Inactive"}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <CheckCircle2 size={17} />
              <span className="text-sm">Email verification</span>
            </div>

            <p className="mt-2 font-semibold text-slate-900 dark:text-white">
              {user.is_email_verified ? "Verified" : "Not verified"}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Clock3 size={17} />
              <span className="text-sm">Last login</span>
            </div>

            <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
              {formatDate(user.last_login_at)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Clock3 size={17} />
              <span className="text-sm">Account created</span>
            </div>

            <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
              {formatDate(user.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100/80 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-blue-950/70 dark:bg-slate-950/50 sm:p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          Account actions
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {user.is_active
            ? "Deactivating this account prevents the user from accessing the application, subject to your backend authentication rules."
            : "Activating this account restores access, subject to your backend authentication rules."}
        </p>

        <button
          type="button"
          disabled={updateStatus.isPending}
          onClick={() => setConfirmOpen(true)}
          className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${
            user.is_active
              ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {user.is_active ? <ShieldOff size={17} /> : <ShieldCheck size={17} />}
          {user.is_active ? "Deactivate account" : "Activate account"}
        </button>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-status-title"
            className="w-full max-w-md rounded-2xl border border-blue-100 bg-white/95 p-5 shadow-2xl dark:border-blue-950 dark:bg-slate-950/95 sm:p-6"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                user.is_active
                  ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
              }`}
            >
              <AlertTriangle size={21} />
            </div>

            <h3
              id="account-status-title"
              className="mt-4 text-lg font-semibold text-slate-900 dark:text-white"
            >
              Confirm account status change
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Are you sure you want to{" "}
              {user.is_active ? "deactivate" : "activate"}{" "}
              <strong>
                {user.first_name} {user.last_name}
              </strong>
              's account?
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={updateStatus.isPending}
                onClick={() => setConfirmOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={updateStatus.isPending}
                onClick={handleStatusChange}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60 ${
                  user.is_active
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {updateStatus.isPending && (
                  <LoaderCircle size={16} className="animate-spin" />
                )}
                {updateStatus.isPending ? "Updating..." : actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
