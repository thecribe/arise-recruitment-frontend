/**
 * -----------------------------------------------------------------------------
 * File: ComplianceFormCard.tsx
 *
 * Description:
 *
 * Reusable Compliance form container.
 *
 * Responsibilities:
 *
 * - Display Compliance form information.
 * - Manage view/edit mode.
 * - Provide Edit, Cancel and Save actions.
 * - Render form content.
 *
 * Form state and validation are handled by the parent/provider.
 * -----------------------------------------------------------------------------
 */

import type { PropsWithChildren, ReactNode } from "react";

import { Pencil, Save, X } from "lucide-react";

interface ComplianceFormCardProps extends PropsWithChildren {
  title: string;

  description?: string;

  isEditing: boolean;

  isSaving?: boolean;

  onEdit: () => void;

  onCancel: () => void;

  onSave: () => void;

  actions?: ReactNode;
}

export default function ComplianceFormCard({
  title,
  description,
  isEditing,
  isSaving = false,
  onEdit,
  onCancel,
  onSave,
  actions,
  children,
}: ComplianceFormCardProps) {
  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-white/60
        bg-white/60
        shadow-sm
        backdrop-blur-xl
      "
    >
      {/* --------------------------------------------------------------- */}
      {/* Header */}
      {/* --------------------------------------------------------------- */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-slate-200/70
          p-5
          sm:flex-row
          sm:items-start
          sm:justify-between
          sm:p-6
        "
      >
        <div>
          <h3
            className="
              text-base
              font-semibold
              text-slate-800
            "
          >
            {title}
          </h3>

          {description && (
            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {actions}

          {!isEditing && (
            <button
              type="button"
              onClick={onEdit}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-blue-200
                bg-blue-50/80
                px-3
                py-2
                text-sm
                font-medium
                text-blue-700
                transition
                hover:bg-blue-100
              "
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Form content */}
      {/* --------------------------------------------------------------- */}

      <div className="p-5 sm:p-6">{children}</div>

      {/* --------------------------------------------------------------- */}
      {/* Editing actions */}
      {/* --------------------------------------------------------------- */}

      {isEditing && (
        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-slate-200/70
            p-5
            sm:flex-row
            sm:justify-end
            sm:p-6
          "
        >
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white/70
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-600
              transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <X className="h-4 w-4" />
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              shadow-sm
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Save className="h-4 w-4" />

            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      )}
    </section>
  );
}
