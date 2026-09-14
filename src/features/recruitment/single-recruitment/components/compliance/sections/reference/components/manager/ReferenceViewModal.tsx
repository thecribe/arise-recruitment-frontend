import { CalendarDays, Mail, Phone, UserRound, X } from "lucide-react";

import { ReferenceMailStatusBadge } from "./ReferenceMailStatusBadge";
import { ReferenceStatusBadge } from "./ReferenceStatusBadge";

import { formatReferenceDate } from "../../utils/reference.utils";
import type { ManagerReference } from "@/features/recruitment/types/reference.types";

interface ReferenceViewModalProps {
  reference: ManagerReference;
  open: boolean;
  onClose: () => void;
}

export function ReferenceViewModal({
  reference,
  open,
  onClose,
}: ReferenceViewModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reference-view-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close reference details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-slate-950/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-blue-200/50 bg-white/90 shadow-2xl shadow-blue-950/20 backdrop-blur-2xl dark:border-blue-400/20 dark:bg-slate-900/95">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-blue-100/70 px-5 py-4 sm:px-6 dark:border-blue-400/10">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
              <UserRound className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2
                id="reference-view-modal-title"
                className="text-base font-semibold text-slate-900 dark:text-white"
              >
                Reference Details
              </h2>

              <p className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">
                {reference.refereeName || "Reference"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-blue-500/10 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/40 dark:text-slate-400 dark:hover:text-blue-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <div className="space-y-6">
            {/* Status */}
            <div>
              <SectionLabel>Status</SectionLabel>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <ReferenceStatusBadge status={reference.status} />

                <ReferenceMailStatusBadge status={reference.mailStatus} />
              </div>
            </div>

            {/* Organisation */}
            <div>
              <SectionLabel>Organisation</SectionLabel>

              <div className="mt-3 rounded-xl border border-blue-100/70 bg-blue-50/30 px-4 py-3 dark:border-blue-400/10 dark:bg-blue-500/5">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {reference.companyName || "Not provided"}
                </p>
              </div>
            </div>

            {/* Employment period */}
            <div>
              <SectionLabel>Employment Period</SectionLabel>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoItem
                  icon={CalendarDays}
                  label="From"
                  value={formatReferenceDate(reference.fromDate)}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="To"
                  value={formatReferenceDate(reference.toDate)}
                />
              </div>
            </div>

            {/* Referee */}
            <div>
              <SectionLabel>Referee Information</SectionLabel>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoItem
                  icon={UserRound}
                  label="Name"
                  value={reference.refereeName || "Not provided"}
                />

                <InfoItem
                  icon={UserRound}
                  label="Relationship"
                  value={reference.refereeRelationship || "Not provided"}
                />

                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={reference.refereeEmail || "Not provided"}
                />

                <InfoItem
                  icon={Phone}
                  label="Phone"
                  value={reference.refereePhone || "Not provided"}
                />
              </div>
            </div>

            {/* Response indicator */}
            <div className="rounded-xl border border-blue-100/70 bg-blue-50/30 px-4 py-3 dark:border-blue-400/10 dark:bg-blue-500/5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                    Reference Response
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {reference.hasResponse
                      ? "A completed response is available."
                      : "No response has been submitted yet."}
                  </p>
                </div>

                <span
                  className={[
                    "shrink-0 rounded-full px-2.5 py-1",
                    "text-xs font-medium",
                    reference.hasResponse
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "bg-slate-500/10 text-slate-600 dark:text-slate-400",
                  ].join(" ")}
                >
                  {reference.hasResponse ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-blue-100/70 px-5 py-4 dark:border-blue-400/10 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * ---------------------------------------------------------------------------
 * Section Label
 * ---------------------------------------------------------------------------
 */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {children}
    </h3>
  );
}

/**
 * ---------------------------------------------------------------------------
 * Info Item
 * ---------------------------------------------------------------------------
 */

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="rounded-xl border border-blue-100/70 bg-white/40 px-4 py-3 dark:border-blue-400/10 dark:bg-slate-800/20">
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Icon className="h-3.5 w-3.5" />

        <span>{label}</span>
      </div>

      <p className="mt-1.5 break-words text-sm font-medium text-slate-800 dark:text-slate-100">
        {value}
      </p>
    </div>
  );
}
