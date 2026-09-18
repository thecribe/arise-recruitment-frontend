import {
  CalendarDays,
  CheckCircle2,
  FileText,
  MoreVertical,
  Pencil,
  Trash2,
  UserRound,
  XCircle,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import type { TrainingCertificate } from "../types/training-certificate.types";

interface TrainingCertificateCardProps {
  certificate: TrainingCertificate;
  requirementName?: string;
  isMandatory?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  onView: (certificate: TrainingCertificate) => void;
  onEdit?: (certificate: TrainingCertificate) => void;
  onDelete?: (certificate: TrainingCertificate) => void;
}

const TrainingCertificateCard = ({
  certificate,
  requirementName,
  isMandatory = false,
  canEdit = false,
  canDelete = false,
  onView,
  onEdit,
  onDelete,
}: TrainingCertificateCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleAction = (action: () => void) => {
    setMenuOpen(false);
    action();
  };

  const formatDate = (date: string | null) => {
    if (!date || date === "0000-00-00") return "Not provided";

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const isExpired =
    Boolean(certificate.expiryDate) &&
    new Date(certificate.expiryDate!) < new Date();

  const hasExpiry = Boolean(certificate.expiryDate);

  return (
    <article
      className="
        relative
        flex
        min-w-0
        flex-col
        rounded-2xl
        border border-blue-200/60
        bg-white/50
        p-5
        shadow-sm
        backdrop-blur-xl
        transition
        hover:border-blue-300/70
        hover:shadow-md
        dark:border-blue-400/20
        dark:bg-slate-900/30
        dark:hover:border-blue-400/30
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              bg-blue-100/70
              text-blue-700
              dark:bg-blue-500/10
              dark:text-blue-300
            "
          >
            <FileText className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {certificate.certificateName}
            </h3>

            {isMandatory && (
              <span
                className="
                  mt-1
                  inline-flex
                  rounded-full
                  bg-blue-100/70
                  px-2 py-0.5
                  text-[11px]
                  font-medium
                  text-blue-700
                  dark:bg-blue-500/10
                  dark:text-blue-300
                "
              >
                Mandatory
              </span>
            )}
          </div>
        </div>

        {(canEdit || canDelete) && (
          <div ref={menuRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Certificate actions"
              aria-expanded={menuOpen}
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-xl
                text-slate-500
                transition
                hover:bg-blue-100/70
                hover:text-blue-700
                dark:text-slate-400
                dark:hover:bg-blue-500/10
                dark:hover:text-blue-300
              "
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            {menuOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  z-50
                  mt-2
                  w-44
                  rounded-xl
                  border border-blue-200/60
                  bg-white/95
                  p-1
                  shadow-xl
                  backdrop-blur-xl
                  dark:border-blue-400/20
                  dark:bg-slate-900/95
                "
              >
                {canEdit && onEdit && (
                  <button
                    type="button"
                    onClick={() => handleAction(() => onEdit(certificate))}
                    className="
                      flex w-full items-center gap-2
                      rounded-lg
                      px-3 py-2
                      text-left text-sm
                      text-slate-700
                      transition
                      hover:bg-blue-50
                      hover:text-blue-700
                      dark:text-slate-200
                      dark:hover:bg-blue-500/10
                      dark:hover:text-blue-300
                    "
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                )}

                {canDelete && onDelete && (
                  <button
                    type="button"
                    onClick={() => handleAction(() => onDelete(certificate))}
                    className="
                      flex w-full items-center gap-2
                      rounded-lg
                      px-3 py-2
                      text-left text-sm
                      text-red-600
                      transition
                      hover:bg-red-50
                      dark:text-red-400
                      dark:hover:bg-red-500/10
                    "
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Requirement */}
      {requirementName && (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Requirement
          </p>

          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
            {requirementName}
          </p>
        </div>
      )}

      {/* Details */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Certificate Number
          </p>

          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
            {certificate.certificateNumber || "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Issue Date
          </p>

          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
            <CalendarDays className="h-3.5 w-3.5 text-blue-500" />
            {formatDate(certificate.issueDate)}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Expiry Date
          </p>

          <div className="mt-1 flex items-center gap-1.5 text-sm">
            {hasExpiry ? (
              <>
                {isExpired ? (
                  <XCircle className="h-3.5 w-3.5 text-red-500" />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                )}

                <span
                  className={
                    isExpired
                      ? "text-red-600 dark:text-red-400"
                      : "text-slate-700 dark:text-slate-300"
                  }
                >
                  {formatDate(certificate.expiryDate)}
                </span>
              </>
            ) : (
              <span className="text-slate-500 dark:text-slate-400">
                No expiry
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Uploaded By
          </p>

          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
            <UserRound className="h-3.5 w-3.5 text-blue-500" />
            {certificate.uploadedBy || "Applicant"}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-blue-100/70 pt-4 dark:border-blue-400/10">
        <button
          type="button"
          onClick={() => onView(certificate)}
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            border border-blue-200/60
            bg-blue-50/50
            px-4 py-2
            text-sm
            font-medium
            text-blue-700
            transition
            hover:bg-blue-100/70
            dark:border-blue-400/20
            dark:bg-blue-500/10
            dark:text-blue-300
            dark:hover:bg-blue-500/20
          "
        >
          View Certificate
        </button>
      </div>
    </article>
  );
};

export default TrainingCertificateCard;
