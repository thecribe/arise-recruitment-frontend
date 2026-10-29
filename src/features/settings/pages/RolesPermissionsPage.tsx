import { useMemo, useState } from "react";
import { Plus, ShieldCheck } from "lucide-react";

import { useDeleteRole, useRoles } from "../hooks/useRoles";
import type { Role } from "../types/role.types";
import RoleFormModal from "../components/roles/RoleFormModal";
import DeleteRoleModal from "../components/roles/DeleteRoleModal";
import RoleStats from "../components/roles/RoleStats";
import RoleList from "../components/roles/RoleList";

const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

export default function RolesPermissionsPage() {
  const { data: roles = [], isLoading, isError, refetch } = useRoles();
  const deleteRole = useDeleteRole();

  const [search, setSearch] = useState("");
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [showSystemRoles, setShowSystemRoles] = useState(true);

  const filteredRoles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return roles.filter((role) => {
      const matchesSearch =
        !query ||
        role.name.toLowerCase().includes(query) ||
        (role.description ?? "").toLowerCase().includes(query);

      return matchesSearch && (showSystemRoles || !role.is_system);
    });
  }, [roles, search, showSystemRoles]);

  const confirmDelete = async () => {
    if (!roleToDelete) return;
    await deleteRole.mutateAsync(roleToDelete.id);
    setRoleToDelete(null);
  };

  return (
    <main className="min-w-0 space-y-5 pb-8">
      <header className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-blue-50 via-white/85 to-sky-100/80 p-5 shadow-sm backdrop-blur-xl sm:p-7">
        <div className="pointer-events-none absolute -right-12 -top-16 size-48 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              <ShieldCheck size={15} />
              Access management
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Roles & Permissions
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              Manage access across recruitment, compliance, staff, and settings.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className={`${buttonClass} w-full shrink-0 bg-blue-600 text-white shadow-lg shadow-blue-600/15 hover:bg-blue-700 sm:w-auto`}
          >
            <Plus size={17} />
            Create role
          </button>
        </div>
      </header>

      <RoleStats roles={roles} />

      <RoleList
        roles={roles}
        filteredRoles={filteredRoles}
        search={search}
        onSearchChange={setSearch}
        showSystemRoles={showSystemRoles}
        onToggleSystemRoles={() => setShowSystemRoles((current) => !current)}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        onEdit={setRoleToEdit}
        onDelete={setRoleToDelete}
      />

      <p className="px-1 text-xs leading-5 text-slate-500">
        Role permissions determine what users can access. Server-side
        authorization remains the source of truth for all protected actions.
      </p>

      {showCreateModal && (
        <RoleFormModal role={null} onClose={() => setShowCreateModal(false)} />
      )}

      {roleToEdit && !roleToEdit.is_system && (
        <RoleFormModal
          key={roleToEdit.id}
          role={roleToEdit}
          onClose={() => setRoleToEdit(null)}
        />
      )}

      {roleToDelete && !roleToDelete.is_system && (
        <DeleteRoleModal
          role={roleToDelete}
          onClose={() => setRoleToDelete(null)}
          onConfirm={() => void confirmDelete()}
          isDeleting={deleteRole.isPending}
        />
      )}
    </main>
  );
}
