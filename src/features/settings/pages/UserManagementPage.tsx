import { useState } from "react";
import { Plus, RefreshCw, Search, Users, X } from "lucide-react";

import UsersTable from "../components/users/UsersTable";
import UserFormModal from "../components/users/UserFormModal";
import UserRoleModal from "../components/users/UserRoleModal";
import UserStatusModal from "../components/users/UserStatusModal";

import { useAssignableRoles, useUsers } from "../hooks/useUsers";

import type { User, UserListParams } from "../types/user.types";

const PAGE_SIZE = 10;

const UserManagementPage = () => {
  const [search, setSearch] = useState("");
  const [roleId, setRoleId] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleUser, setRoleUser] = useState<User | null>(null);
  const [statusUser, setStatusUser] = useState<User | null>(null);

  const params: UserListParams = {
    page,
    limit: PAGE_SIZE,
    ...(search.trim() ? { search: search.trim() } : {}),
    ...(roleId ? { roleId } : {}),
    ...(status !== "" ? { isActive: status === "active" } : {}),
  };

  const { data, isPending, isError, error, refetch, isFetching } =
    useUsers(params);

  const { data: roles = [], isPending: rolesLoading } = useAssignableRoles();

  const users = data?.users ?? [];
  const pagination = data?.pagination;

  const hasFilters = Boolean(search.trim() || roleId || status);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleRoleChange = (value: string) => {
    setRoleId(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setRoleId("");
    setStatus("");
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    const totalPages = Math.max(1, pagination?.totalPages ?? 1);
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  const openCreateModal = () => {
    setSelectedUser(null);
    setIsCreateModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setIsCreateModalOpen(false);
    setSelectedUser(user);
  };

  const closeUserModal = () => {
    setIsCreateModalOpen(false);
    setSelectedUser(null);
  };

  const errorMessage =
    error instanceof Error
      ? error.message
      : "Unable to load users. Please try again.";

  return (
    <div className="min-w-0 space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-400">
            <Users size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              User Management
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage internal users and their access.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-3.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RefreshCw size={15} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <Plus size={16} />
            Create user
          </button>
        </div>
      </header>

      <section className="rounded-2xl border border-blue-100/80 bg-gradient-to-br from-blue-50/90 via-white/80 to-sky-50/70 p-4 dark:border-blue-900/50 dark:from-blue-950/40 dark:via-slate-900/80 dark:to-slate-900/60 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {hasFilters ? "Matching users" : "Total users"}
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {isPending
                ? "—"
                : (pagination?.total ?? users.length).toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Internal accounts available in Settings
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-white/80 text-blue-600 shadow-sm dark:border-blue-900/60 dark:bg-slate-900/60 dark:text-blue-400">
            <Users size={23} />
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200/80 bg-white/70 p-3 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/50 sm:p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search name, email, postcode..."
              aria-label="Search users"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-900/40"
            />
          </div>

          <select
            value={roleId}
            onChange={(event) => handleRoleChange(event.target.value)}
            aria-label="Filter by role"
            disabled={rolesLoading}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-200 dark:focus:ring-blue-900/40"
          >
            <option value="">All roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name.replaceAll("_", " ")}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) => handleStatusChange(event.target.value)}
            aria-label="Filter by account status"
            className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-200 dark:focus:ring-blue-900/40"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {hasFilters && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 transition hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <X size={14} />
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3 px-1">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Users
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {pagination
                ? `Showing ${
                    pagination.total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
                  }–${Math.min(page * PAGE_SIZE, pagination.total)} of ${
                    pagination.total
                  }`
                : "Loading user records"}
            </p>
          </div>

          {isFetching && !isPending && (
            <span className="text-xs text-blue-600 dark:text-blue-400">
              Updating…
            </span>
          )}
        </div>

        {isError ? (
          <div className="rounded-2xl border border-red-200 bg-white/80 px-4 py-12 text-center dark:border-red-900/50 dark:bg-slate-900/60 sm:px-6">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Could not load users
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        ) : (
          <UsersTable
            users={users}
            pagination={pagination}
            isLoading={isPending}
            onEdit={openEditModal}
            onChangeRole={setRoleUser}
            onChangeStatus={setStatusUser}
            onPageChange={handlePageChange}
          />
        )}
      </section>

      <UserFormModal
        open={isCreateModalOpen || Boolean(selectedUser)}
        onClose={closeUserModal}
        user={selectedUser}
      />

      <UserRoleModal
        open={Boolean(roleUser)}
        user={roleUser}
        onClose={() => setRoleUser(null)}
      />

      <UserStatusModal
        open={Boolean(statusUser)}
        user={statusUser}
        onClose={() => setStatusUser(null)}
      />
    </div>
  );
};

export default UserManagementPage;
