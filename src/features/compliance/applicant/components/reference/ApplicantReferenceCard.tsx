import { CheckCircle2, Edit3, Mail, Trash2 } from "lucide-react";

import ReferenceStatusBadge from "./ReferenceStatusBadge";
import type { ApplicantReference } from "@/features/recruitment/types/reference.types";

interface ApplicantReferenceCardProps {
  reference: ApplicantReference;
  onEdit: (reference: ApplicantReference) => void;
  onDelete: (reference: ApplicantReference) => void;
  isDeleting?: boolean;
}

const editableStatuses = ["in_progress", "rejected"];

export default function ApplicantReferenceCard({
  reference,
  onEdit,
  onDelete,
  isDeleting = false,
}: ApplicantReferenceCardProps) {
  const isEditable = editableStatuses.includes(reference.status);

  return (
    <div className="rounded-2xl border border-white/20 bg-white/70 p-5 shadow-lg backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="break-words text-base font-semibold text-slate-900">
            {reference.refereeName || "Unnamed referee"}
          </h3>

          <p className="mt-1 break-words text-sm text-slate-500">
            {reference.companyName || "Company not provided"}
          </p>
        </div>

        <ReferenceStatusBadge status={reference.status} />
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase text-slate-400">Email</p>
          <p className="mt-1 break-words">
            {reference.refereeEmail || "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase text-slate-400">Phone</p>
          <p className="mt-1">{reference.refereePhone || "Not provided"}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase text-slate-400">
            Relationship
          </p>
          <p className="mt-1">
            {reference.refereeRelationship || "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase text-slate-400">
            Employment period
          </p>
          <p className="mt-1">
            {reference.fromDate || "—"} to {reference.toDate || "—"}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200/70 pt-4">
        {reference.status === "approved" && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            Reference approved
          </div>
        )}

        {!isEditable && reference.status !== "approved" && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Mail className="h-4 w-4" />
            Editing unavailable
          </div>
        )}

        <div className="flex w-full gap-2 sm:ml-auto sm:w-auto">
          {isEditable && (
            <>
              <button
                type="button"
                onClick={() => onEdit(reference)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 sm:flex-none"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={() => onDelete(reference)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
