import { AlertCircle, LoaderCircle, Search } from "lucide-react";
import type { Role } from "../../types/role.types";
import RoleListItem from "./RoleListItem";
import RoleSearchBar from "./RoleSearchBar";

interface RoleListProps {
  roles: Role[];
  filteredRoles: Role[];
  search: string;
  onSearchChange: (value: string) => void;
  showSystemRoles: boolean;
  onToggleSystemRoles: () => void;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

export default function RoleList({
  roles,
  filteredRoles,
  search,
  onSearchChange,
  showSystemRoles,
  onToggleSystemRoles,
  isLoading,
  isError,
  onRetry,
  onEdit,
  onDelete,
}: RoleListProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-sm backdrop-blur-xl">
      <RoleSearchBar
        search={search}
        onSearchChange={onSearchChange}
        showSystemRoles={showSystemRoles}
        onToggleSystemRoles={onToggleSystemRoles}
        resultCount={filteredRoles.length}
        totalCount={roles.length}
      />

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 px-4 py-16 text-sm text-slate-500">
          <LoaderCircle size={18} className="animate-spin text-blue-600" />
          Loading roles...
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center px-5 py-12 text-center">
          <AlertCircle size={28} className="text-red-500" />
          <p className="mt-3 font-medium text-slate-800">Unable to load roles</p>
          <p className="mt-1 text-sm text-slate-500">Please check your connection and try again.</p>
          <button
            type="button"
            onClick={onRetry}
            className={`${buttonClass} mt-4 border border-blue-200 text-blue-700 hover:bg-blue-50`}
          >
            Try again
          </button>
        </div>
      ) : filteredRoles.length === 0 ? (
        <div className="px-5 py-14 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Search size={21} />
          </div>
          <p className="mt-3 font-medium text-slate-800">No roles found</p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different search or create a new custom role.
          </p>
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="mt-3 text-sm font-medium text-blue-700 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="hidden grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_100px_100px] gap-4 border-y border-slate-100 bg-slate-50/70 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 md:grid">
            <span>Role</span>
            <span>Access</span>
            <span>Users</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="divide-y divide-slate-100/90">
            {filteredRoles.map((role) => (
              <RoleListItem key={role.id} role={role} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
