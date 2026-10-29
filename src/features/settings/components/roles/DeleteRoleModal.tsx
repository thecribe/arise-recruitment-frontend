import { LoaderCircle, Trash2 } from "lucide-react";
import type { Role } from "../../types/role.types";
import { roleButtonClass } from "./role-ui";

interface DeleteRoleModalProps {
  role: Role;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export default function DeleteRoleModal({
  role,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteRoleModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isDeleting) onClose();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-role-title"
        className="w-full max-w-md rounded-t-3xl border border-white/70 bg-white/95 p-5 shadow-2xl sm:rounded-3xl sm:p-6"
      >
        <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <Trash2 size={21} />
        </div>
        <h2 id="delete-role-title" className="text-lg font-semibold text-slate-900">
          Delete {role.name}?
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This removes the custom role and its permission assignments. The server
          will reject deletion if the role is still assigned to users.
        </p>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className={`${roleButtonClass} border border-slate-200 bg-white text-slate-700 hover:bg-slate-50`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className={`${roleButtonClass} bg-red-600 text-white hover:bg-red-700`}
          >
            {isDeleting && <LoaderCircle size={16} className="animate-spin" />}
            {isDeleting ? "Deleting..." : "Delete role"}
          </button>
        </div>
      </section>
    </div>
  );
}
