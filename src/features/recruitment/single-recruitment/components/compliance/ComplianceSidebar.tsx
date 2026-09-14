/**
 * -----------------------------------------------------------------------------
 * File: ComplianceSidebar.tsx
 *
 * Description:
 * Navigation sidebar for the Recruitment Applicant Compliance workspace.
 *
 * Responsibilities:
 * - Render available compliance sections.
 * - Highlight the active compliance section.
 * - Notify the parent when a section is selected.
 * - Remain responsive across desktop and mobile views.
 * -----------------------------------------------------------------------------
 */

import {
  BadgeCheck,
  BookOpenCheck,
  FileCheck2,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import { complianceSections } from "@/features/recruitment/constants/compliance-sections";
import type { ComplianceSectionId } from "@/features/recruitment/types/compliance.types";

interface ComplianceSidebarProps {
  activeSection: ComplianceSectionId;
  onSectionChange: (section: ComplianceSectionId) => void;
}

const sectionIcons = {
  "right-to-work": ShieldCheck,
  dbs: BadgeCheck,
  "professional-memberships": UserRoundCheck,
  references: BookOpenCheck,
  certificates: FileCheck2,
  "identity-compliance": UserRoundCheck,
};

export default function ComplianceSidebar({
  activeSection,
  onSectionChange,
}: ComplianceSidebarProps) {
  return (
    <aside
      className="
        w-full
        min-w-0
        shrink-0
        rounded-2xl
        border
        border-blue-200/50
        bg-white/40
        p-2
        shadow-sm
        shadow-blue-900/5
        backdrop-blur-xl
        sm:p-3
        lg:w-64
        dark:border-blue-400/20
        dark:bg-slate-900/30
      "
    >
      {/* -----------------------------------------------------------------------
       * Section title
       * ----------------------------------------------------------------------- */}
      <div className="mb-2 px-2 pt-1">
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-slate-400
            dark:text-slate-500
          "
        >
          Compliance
        </p>
      </div>

      {/* -----------------------------------------------------------------------
       * Navigation
       *
       * Vertical navigation on all screen sizes.
       * ----------------------------------------------------------------------- */}
      <nav className="flex w-full min-w-0 flex-col gap-1">
        {complianceSections.map((section) => {
          const Icon = sectionIcons[section.id];
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
              aria-current={isActive ? "page" : undefined}
              className={[
                `
                  group
                  flex
                  w-full
                  min-w-0
                  items-center
                  gap-2.5
                  rounded-xl
                  px-2.5
                  py-2.5
                  text-left
                  transition-all
                  duration-200
                `,
                isActive
                  ? `
                    bg-blue-600
                    text-white
                    shadow-sm
                    shadow-blue-900/10
                  `
                  : `
                    text-slate-600
                    hover:bg-blue-50/70
                    hover:text-blue-700
                    dark:text-slate-300
                    dark:hover:bg-blue-500/10
                    dark:hover:text-blue-300
                  `,
              ].join(" ")}
            >
              <span
                className={[
                  `
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    transition-all
                    sm:h-9
                    sm:w-9
                    sm:rounded-xl
                  `,
                  isActive
                    ? `
                      bg-white/15
                      text-white
                    `
                    : `
                      bg-blue-50/70
                      text-blue-600
                      group-hover:bg-blue-100
                      dark:bg-blue-500/10
                      dark:text-blue-300
                      dark:group-hover:bg-blue-500/20
                    `,
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
              </span>

              <span
                className={[
                  `
                    min-w-0
                    truncate
                    text-sm
                    font-medium
                    transition-colors
                  `,
                  isActive
                    ? "text-white"
                    : "text-slate-600 group-hover:text-blue-700 dark:text-slate-300 dark:group-hover:text-blue-300",
                ].join(" ")}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
