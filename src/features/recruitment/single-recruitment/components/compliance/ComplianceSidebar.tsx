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
        shrink-0
        rounded-2xl
        border
        border-white/60
        bg-white/50
        p-3
        shadow-sm
        backdrop-blur-xl
        lg:w-64
      "
    >
      <div className="mb-3 px-2 pt-1">
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-slate-400
          "
        >
          Compliance
        </p>
      </div>

      {/*
       * -----------------------------------------------------------------------
       * Mobile:
       *
       * Horizontal navigation prevents the sidebar from consuming the entire
       * viewport height.
       *
       * Desktop:
       *
       * Vertical navigation behaves as a traditional sidebar.
       * -----------------------------------------------------------------------
       */}

      <div
        className="
          flex
          gap-2
          overflow-x-auto
          pb-1
          lg:flex-col
          lg:overflow-visible
        "
      >
        {complianceSections.map((section) => {
          const Icon = sectionIcons[section.id];

          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
              className="
                group
                flex
                min-w-max
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-left
                transition-all
                lg:min-w-0
                lg:w-full
              "
            >
              <span
                className={[
                  `
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    transition-all
                  `,
                  isActive
                    ? `
                      bg-blue-600
                      text-white
                      shadow-sm
                    `
                    : `
                      bg-blue-50/70
                      text-blue-600
                      group-hover:bg-blue-100
                    `,
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
              </span>

              <span
                className={[
                  `
                    whitespace-nowrap
                    text-sm
                    font-medium
                    transition-colors
                  `,
                  isActive
                    ? "text-blue-700"
                    : "text-slate-600 group-hover:text-blue-700",
                ].join(" ")}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
