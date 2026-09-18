import { MoreVertical, Pencil, Power } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { TrainingCertificateRequirement } from "../../types/training-certificate-requirement.types";

interface TrainingCertificateRequirementCardProps {
  requirement: TrainingCertificateRequirement;
  onEdit: (requirement: TrainingCertificateRequirement) => void;
  onToggleStatus: (requirement: TrainingCertificateRequirement) => void;
}

const TrainingCertificateRequirementCard = ({
  requirement,
  onEdit,
  onToggleStatus,
}: TrainingCertificateRequirementCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setMenuOpen(false);
    onEdit(requirement);
  };

  const handleToggleStatus = () => {
    setMenuOpen(false);
    onToggleStatus(requirement);
  };

  return (
    <article
      className="
        relative
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
      <div className="flex items-start gap-4">
        {/* Sort order */}
        <div
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl
            border border-blue-200/70
            bg-blue-50/70
            text-sm font-semibold text-blue-700
            dark:border-blue-400/20
            dark:bg-blue-500/10
            dark:text-blue-300
          "
        >
          {requirement.sortOrder}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 pr-8">
            <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {requirement.name}
            </h3>

            <span
              className={`
                inline-flex shrink-0 items-center gap-1.5
                rounded-full
                border
                px-2.5 py-1
                text-[11px] font-medium
                ${
                  requirement.active
                    ? `
                      border-emerald-200/70
                      bg-emerald-50/70
                      text-emerald-700
                      dark:border-emerald-400/20
                      dark:bg-emerald-500/10
                      dark:text-emerald-300
                    `
                    : `
                      border-slate-200/70
                      bg-slate-50/70
                      text-slate-500
                      dark:border-slate-400/20
                      dark:bg-slate-500/10
                      dark:text-slate-400
                    `
                }
              `}
            >
              <span
                className={`
                  h-1.5 w-1.5 rounded-full
                  ${requirement.active ? "bg-emerald-500" : "bg-slate-400"}
                `}
              />

              {requirement.active ? "Active" : "Inactive"}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {requirement.description || "No description provided."}
          </p>
        </div>

        {/* Actions */}
        <div ref={menuRef} className="absolute right-4 top-4">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={`Actions for ${requirement.name}`}
            aria-expanded={menuOpen}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl
              text-slate-500
              transition
              hover:bg-blue-50
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
                absolute right-0 top-full z-50 mt-2
                w-44
                rounded-xl
                border border-blue-200/70
                bg-white/95
                p-1
                shadow-xl shadow-blue-950/10
                backdrop-blur-xl
                dark:border-blue-400/20
                dark:bg-slate-900/95
              "
            >
              <button
                type="button"
                onClick={handleEdit}
                className="
                  flex w-full items-center gap-2.5
                  rounded-lg
                  px-3 py-2.5
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

              <button
                type="button"
                onClick={handleToggleStatus}
                className="
                  flex w-full items-center gap-2.5
                  rounded-lg
                  px-3 py-2.5
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
                <Power className="h-4 w-4" />
                {requirement.active ? "Deactivate" : "Activate"}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default TrainingCertificateRequirementCard;
