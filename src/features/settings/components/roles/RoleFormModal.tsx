import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, LoaderCircle, X } from "lucide-react";

import {
  useCreateRole,
  useUpdateRole,
  useUpdateRolePermissions,
} from "../../hooks/useRoles";
import {
  roleSchema,
  type RoleFormInput,
  type RoleFormValues,
} from "../../schemas/role.schema";
import type { Role } from "../../types/role.types";
import RolePermissionSelector from "./RolePermissionSelector";
import { roleButtonClass, roleInputClass } from "./role-ui";

interface RoleFormModalProps {
  role: Role | null;
  onClose: () => void;
}

export default function RoleFormModal({ role, onClose }: RoleFormModalProps) {
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const updatePermissions = useUpdateRolePermissions();
  const isEditing = Boolean(role);
  const isSaving =
    createRole.isPending || updateRole.isPending || updatePermissions.isPending;

  const {
    register,
    handleSubmit,
    // reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RoleFormInput, unknown, RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissionIds: [],
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSaving) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSaving, onClose]);

  const onSubmit = async (values: RoleFormValues) => {
    if (role) {
      await updateRole.mutateAsync({
        id: role.id,
        values: { name: values.name, description: values.description },
      });
      await updatePermissions.mutateAsync({
        id: role.id,
        permissionIds: values.permissionIds,
      });
    } else {
      await createRole.mutateAsync(values);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-modal-title"
        className="max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border border-white/70 bg-white/95 p-5 shadow-2xl sm:rounded-3xl sm:p-6 lg:w-2/3 lg:max-w-none lg:p-7"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              Roles & access
            </p>
            <h2
              id="role-modal-title"
              className="mt-1 text-xl font-semibold text-slate-900"
            >
              {isEditing ? "Edit role" : "Create role"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? "Update the role details and permissions."
                : "Create a custom role and choose its permissions."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="role-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Role name
              </label>
              <input
                id="role-name"
                {...register("name")}
                placeholder="e.g. Compliance Officer"
                className={roleInputClass}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="role-description"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Description{" "}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea
                id="role-description"
                {...register("description")}
                rows={2}
                placeholder="Describe this role's responsibilities..."
                className={`${roleInputClass} resize-y`}
                aria-invalid={Boolean(errors.description)}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <RolePermissionSelector
            selectedIds={watch("permissionIds") ?? []}
            onChange={(permissionIds) =>
              setValue("permissionIds", permissionIds, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            disabled={isSaving}
          />

          {errors.permissionIds && (
            <p className="text-xs text-red-600">
              {errors.permissionIds.message}
            </p>
          )}

          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className={`${roleButtonClass} border border-slate-200 bg-white text-slate-700 hover:bg-slate-50`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`${roleButtonClass} bg-blue-600 text-white shadow-sm hover:bg-blue-700`}
            >
              {isSaving ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Check size={16} />
              )}
              {isSaving
                ? "Saving..."
                : isEditing
                  ? "Save changes"
                  : "Create role"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
