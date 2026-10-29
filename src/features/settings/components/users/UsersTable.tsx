import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  ShieldCheck,
  UserRoundCheck,
  UserRoundX,
  Users,
} from "lucide-react";

import type { User, UserPagination } from "../../types/user.types";

interface UsersTableProps {
  users: User[];
  pagination?: UserPagination;
  isLoading: boolean;
  onEdit: (user: User) => void;
  onChangeRole: (user: User) => void;
  onChangeStatus: (user: User) => void;
  onPageChange: (page: number) => void;
}

const UsersTable = ({
  users,
  pagination,
  isLoading,
  onEdit,
  onChangeRole,
  onChangeStatus,
  onPageChange,
}: UsersTableProps) => {
  const currentPage = pagination?.page ?? 1;
  const totalPages = Math.max(1, pagination?.totalPages ?? 1);
  const totalUsers = pagination?.total ?? users.length;

  const getFullName = (user: User) =>
    `${user.first_name} ${user.last_name}`.trim();

  const getInitials = (user: User) =>
    `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase();

  const formatRole = (role?: string) =>
    role?.replaceAll("_", " ").toLowerCase() ?? "Unassigned";

  const formatDate = (date?: string | null) => {
    if (!date) return "Never";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(parsedDate);
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-slate-200/80 bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400">
            <tr>
              <th className="px-5 py-4 font-semibold">User</th>
              <th className="px-5 py-4 font-semibold">Role</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Last login</th>
              <th className="px-5 py-4 font-semibold">Joined</th>
              <th className="px-5 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center">
                  <div className="flex items-center justify-center gap-2 text-slate-500">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    Loading users...
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-14 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <Users size={22} />
                    </div>
                    <p className="font-medium text-slate-700 dark:text-slate-200">
                      No users found
                    </p>
                    <p className="text-xs text-slate-500">
                      Try changing your search or filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-500/5"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {user.profile_img ? (
                        <img
                          src={user.profile_img}
                          alt={getFullName(user)}
                          className="h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                          {getInitials(user)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-800 dark:text-slate-100">
                          {getFullName(user)}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
                      {formatRole(user.role?.name)}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        user.is_active
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          user.is_active ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                      />
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {formatDate(user.last_login_at)}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {formatDate(user.createdAt)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(user)}
                        aria-label={`Edit ${getFullName(user)}`}
                        title="Edit user"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-2.5 text-xs font-medium text-blue-700 transition hover:bg-blue-50 dark:border-blue-400/20 dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-blue-500/10"
                      >
                        <Pencil size={14} />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onChangeRole(user)}
                        aria-label={`Change role for ${getFullName(user)}`}
                        title="Change role"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-indigo-200 bg-white px-2.5 text-xs font-medium text-indigo-700 transition hover:bg-indigo-50 dark:border-indigo-400/20 dark:bg-slate-800 dark:text-indigo-300 dark:hover:bg-indigo-500/10"
                      >
                        <ShieldCheck size={14} />
                        <span>Role</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onChangeStatus(user)}
                        aria-label={`${user.is_active ? "Deactivate" : "Activate"} ${getFullName(user)}`}
                        title={
                          user.is_active
                            ? "Deactivate account"
                            : "Activate account"
                        }
                        className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition ${
                          user.is_active
                            ? "border-amber-200 bg-white text-amber-700 hover:bg-amber-50 dark:border-amber-400/20 dark:bg-slate-800 dark:text-amber-300 dark:hover:bg-amber-500/10"
                            : "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50 dark:border-emerald-400/20 dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
                        }`}
                      >
                        {user.is_active ? (
                          <UserRoundX size={14} />
                        ) : (
                          <UserRoundCheck size={14} />
                        )}
                        <span>
                          {user.is_active ? "Deactivate" : "Activate"}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && !isLoading && (
        <div className="flex flex-col gap-3 border-t border-slate-200/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-slate-700">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {users.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {totalUsers}
            </span>{" "}
            users
          </p>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span className="text-xs text-slate-500">
              Page {currentPage} of {totalPages}
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ChevronLeft size={17} />
              </button>

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
