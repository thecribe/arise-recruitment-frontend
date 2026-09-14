import { Mail, Phone, UserRound } from "lucide-react";

import { ReferenceMailStatusBadge } from "./ReferenceMailStatusBadge";
import { ReferenceStatusBadge } from "./ReferenceStatusBadge";

import type {
  ManagerReference,
  ManagerReferenceAction,
} from "@/features/recruitment/types/reference.types";

import { formatReferencePeriod } from "../../utils/reference.utils";
import ManagerReferenceActions from "./ManagerReferenceActions";

interface ManagerReferenceTableProps {
  references: ManagerReference[];

  onAction: (
    action: ManagerReferenceAction,
    reference: ManagerReference,
  ) => void;
}

export function ManagerReferenceTable({
  references,
  onAction,
}: ManagerReferenceTableProps) {
  if (references.length === 0) {
    return <EmptyReferencesState />;
  }

  return (
    <div className="w-full rounded-2xl border border-blue-200/50 bg-white/40 shadow-sm shadow-blue-900/5 backdrop-blur-xl dark:border-blue-400/20 dark:bg-slate-900/30">
      <table className="w-full min-w-[1050px] border-collapse">
        <thead>
          <tr className="border-b border-blue-100/70 bg-blue-50/40 dark:border-blue-400/10 dark:bg-blue-500/5">
            <TableHeader>Organisation</TableHeader>

            <TableHeader>Referee</TableHeader>

            <TableHeader className="hidden md:table-cell">
              Relationship
            </TableHeader>

            <TableHeader className="hidden lg:table-cell">
              Employment Period
            </TableHeader>

            <TableHeader className="hidden md:table-cell">
              Reference Status
            </TableHeader>

            <TableHeader>Mail Status</TableHeader>

            <TableHeader className="w-16 text-right">Actions</TableHeader>
          </tr>
        </thead>

        <tbody>
          {references.map((reference) => (
            <ReferenceTableRow
              key={reference.id}
              reference={reference}
              onAction={onAction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * ---------------------------------------------------------------------------
 * Table Row
 * ---------------------------------------------------------------------------
 */

interface ReferenceTableRowProps {
  reference: ManagerReference;

  onAction: (
    action: ManagerReferenceAction,
    reference: ManagerReference,
  ) => void;
}

function ReferenceTableRow({ reference, onAction }: ReferenceTableRowProps) {
  return (
    <tr className="border-b border-blue-100/60 transition-colors last:border-b-0 hover:bg-blue-50/30 dark:border-blue-400/10 dark:hover:bg-blue-500/5">
      {/* Organisation */}
      <TableCell>
        <div className="min-w-[180px]">
          <p className="font-medium text-slate-800 dark:text-slate-100">
            {reference.companyName || "—"}
          </p>
        </div>
      </TableCell>

      {/* Referee */}
      <TableCell>
        <div className="flex min-w-[210px] items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200/50 bg-blue-500/10 text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
            <UserRound className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium text-slate-800 dark:text-slate-100">
              {reference.refereeName || "—"}
            </p>

            {reference.refereeEmail && (
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Mail className="h-3 w-3 shrink-0" />

                <span className="truncate">{reference.refereeEmail}</span>
              </div>
            )}

            {reference.refereePhone && (
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Phone className="h-3 w-3 shrink-0" />

                <span>{reference.refereePhone}</span>
              </div>
            )}
          </div>
        </div>
      </TableCell>

      {/* Relationship */}
      <TableCell className="hidden md:table-cell">
        <TableText>{reference.refereeRelationship || "—"}</TableText>
      </TableCell>

      {/* Employment Period */}
      <TableCell className="hidden lg:table-cell">
        <TableText>
          {formatReferencePeriod(reference.fromDate, reference.toDate)}
        </TableText>
      </TableCell>

      {/* Reference Status */}
      <TableCell className="hidden md:table-cell">
        <ReferenceStatusBadge status={reference.status} />
      </TableCell>

      {/* Mail Status */}
      <TableCell>
        <ReferenceMailStatusBadge status={reference.mailStatus} />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <ManagerReferenceActions reference={reference} onAction={onAction} />
      </TableCell>
    </tr>
  );
}

/**
 * ---------------------------------------------------------------------------
 * Table Header
 * ---------------------------------------------------------------------------
 */

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function TableHeader({ children, className = "" }: TableHeaderProps) {
  return (
    <th
      scope="col"
      className={[
        "px-4 py-3.5",
        "text-left",
        "text-xs font-semibold uppercase tracking-wide",
        "text-slate-500",
        "dark:text-slate-400",
        className,
      ].join(" ")}
    >
      {children}
    </th>
  );
}

/**
 * ---------------------------------------------------------------------------
 * Table Cell
 * ---------------------------------------------------------------------------
 */

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

function TableCell({ children, className = "" }: TableCellProps) {
  return (
    <td className={["px-4 py-4", "align-middle", className].join(" ")}>
      {children}
    </td>
  );
}

/**
 * ---------------------------------------------------------------------------
 * Table Text
 * ---------------------------------------------------------------------------
 */

interface TableTextProps {
  children: React.ReactNode;
}

function TableText({ children }: TableTextProps) {
  return (
    <span className="text-sm text-slate-600 dark:text-slate-300">
      {children}
    </span>
  );
}

/**
 * ---------------------------------------------------------------------------
 * Empty State
 * ---------------------------------------------------------------------------
 */

function EmptyReferencesState() {
  return (
    <div className="rounded-2xl border border-dashed border-blue-200/60 bg-white/30 px-6 py-12 text-center backdrop-blur-xl dark:border-blue-400/20 dark:bg-slate-900/20">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
        <UserRound className="h-5 w-5" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-100">
        No references found
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        No references have been added for this applicant yet.
      </p>
    </div>
  );
}
