import { KeyRound, LockKeyhole, Pencil, ShieldCheck, Trash2, Users } from "lucide-react";
import type { Role } from "../../types/role.types";

interface RoleListItemProps {
  role: Role;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export default function RoleListItem({ role, onEdit, onDelete }: RoleListItemProps) {
  return (
    <article className="grid gap-3 px-4 py-4 transition hover:bg-blue-50/30 sm:px-5 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_100px_100px] md:items-center md:gap-4">
      <div className="flex min-w-0 items-start gap-3">
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
          role.is_system ? "bg-slate-100 text-slate-600" : "bg-blue-100/80 text-blue-700"
        }`}>
          {role.is_system ? <LockKeyhole size={17} /> : <ShieldCheck size={18} />}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words text-sm font-semibold text-slate-900">{role.name}</h3>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              role.is_system ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-blue-700"
            }`}>
              {role.is_system ? "System" : "Custom"}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
            {role.description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
        <KeyRound size={14} className="text-blue-500" />
        <span>{role.permissions?.length ?? 0} permissions assigned</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-600">
        <Users size={14} className="text-slate-400" />
        <span className="font-medium tabular-nums">{role.user_count ?? 0}</span>
        <span>users</span>
      </div>

      <div className="flex items-center gap-2 md:justify-end">
        {role.is_system ? (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-2 text-xs text-slate-500">
            <LockKeyhole size={13} />
            Protected
          </span>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onEdit(role)}
              title={`Edit ${role.name}`}
              aria-label={`Edit ${role.name}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <Pencil size={14} />
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(role)}
              title={`Delete ${role.name}`}
              aria-label={`Delete ${role.name}`}
              className="rounded-lg border border-red-100 bg-white p-2 text-red-600 transition hover:border-red-200 hover:bg-red-50"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </article>
  );
}
