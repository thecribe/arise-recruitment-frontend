import { useEffect, useState } from "react";
import { BriefcaseBusiness, LoaderCircle, ShieldCheck } from "lucide-react";

import { useAssignableRoles, useUpdateUserRole } from "../../hooks/useUsers";
import type { User } from "../../types/user.types";

interface UserAccessRoleProps {
  user: User;
}

export default function UserAccessRole({ user }: UserAccessRoleProps) {
  const { data: roles = [], isLoading: rolesLoading } = useAssignableRoles();

  const updateRole = useUpdateUserRole();
  const [roleId, setRoleId] = useState(user.role_id);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRoleId(user.role_id);
  }, [user.role_id]);

  const selectedRole = roles.find((role) => role.id === roleId);
  const currentRoleName = user.role?.name ?? "Unknown role";
  const hasChanged = roleId !== user.role_id;

  const handleSave = () => {
    if (!hasChanged || updateRole.isPending) return;

    updateRole.mutate(
      {
        id: user.id,
        values: { roleId },
      },
      {
        onSuccess: () => setConfirmOpen(false),
      },
    );
  };

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-blue-100/80 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-blue-950/70 dark:bg-slate-950/50 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Access & role
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage this user's assigned role.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-950 dark:bg-blue-950/20">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Current role
          </p>
          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {currentRoleName}
          </p>
        </div>

        <div className="mt-5 max-w-xl">
          <label
            htmlFor="user-role"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Assign a new role
          </label>

          <select
            id="user-role"
            value={roleId}
            onChange={(event) => setRoleId(event.target.value)}
            disabled={rolesLoading || updateRole.isPending}
            className="w-full rounded-xl border border-blue-200 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-blue-900 dark:bg-slate-900 dark:text-slate-100"
          >
            {!roles.some((role) => role.id === user.role_id) && (
              <option value={user.role_id}>{currentRoleName}</option>
            )}

            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>

          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Only roles available for assignment are shown. The backend remains
            responsible for enforcing role permissions.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-blue-100 pt-4 dark:border-blue-950 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={!hasChanged || updateRole.isPending}
            onClick={() => setRoleId(user.role_id)}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            Discard changes
          </button>

          <button
            type="button"
            disabled={!hasChanged || rolesLoading || updateRole.isPending}
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShieldCheck size={17} />
            Update role
          </button>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-confirm-title"
            className="w-full max-w-md rounded-2xl border border-blue-100 bg-white/95 p-5 shadow-2xl dark:border-blue-950 dark:bg-slate-950/95 sm:p-6"
          >
            <h3
              id="role-confirm-title"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Confirm role change
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Change {user.first_name} {user.last_name}'s role from{" "}
              <strong>{currentRoleName}</strong> to{" "}
              <strong>{selectedRole?.name ?? "the selected role"}</strong>? This
              may change the user's permissions.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={updateRole.isPending}
                onClick={() => setConfirmOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={updateRole.isPending}
                onClick={handleSave}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {updateRole.isPending && (
                  <LoaderCircle size={16} className="animate-spin" />
                )}
                Confirm change
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
