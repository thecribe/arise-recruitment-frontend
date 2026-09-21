import { CheckCircle2, ChevronRight, LockKeyhole } from "lucide-react";

import { useApplicantComplianceForm } from "../providers/ApplicantComplianceFormContext";

import { APPLICANT_COMPLIANCE_SECTIONS } from "../config/compliance-sections";

import type { RecruitmentApplicationSectionStatus } from "../types/compliance.types";
import ComplianceStatusBadge from "./ComplianceStatusBadge";

const getSectionStatus = (
  status?: RecruitmentApplicationSectionStatus,
): RecruitmentApplicationSectionStatus => {
  return status ?? "in_progress";
};

export default function ComplianceFormsSidebar() {
  const { sections, activeSectionId, selectSection, isLoading } =
    useApplicantComplianceForm();

  if (isLoading) {
    return (
      <aside className="rounded-3xl border border-white/20 bg-white/70 p-4 shadow-lg backdrop-blur-xl">
        <div className="mb-4 h-5 w-40 animate-pulse rounded bg-slate-200" />

        <div className="space-y-3">
          {APPLICANT_COMPLIANCE_SECTIONS.map((section) => (
            <div
              key={section.key}
              className="h-16 animate-pulse rounded-2xl bg-slate-200/70"
            />
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="rounded-3xl border border-white/20 bg-white/70 p-3 shadow-lg backdrop-blur-xl sm:p-4">
      <div className="mb-4 px-2">
        <h2 className="text-sm font-bold text-slate-800">Compliance Forms</h2>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Select a form to complete or review your information.
        </p>
      </div>

      <nav
        aria-label="Compliance form navigation"
        className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2"
      >
        {APPLICANT_COMPLIANCE_SECTIONS.map((section, index) => {
          const currentSection = sections.find(
            (item) => item.section_id === section.key,
          );

          const status = getSectionStatus(currentSection?.status);
          const disabled = status === "locked";
          const isActive = activeSectionId === section.key;

          return (
            <button
              key={section.key}
              type="button"
              disabled={disabled}
              onClick={() => selectSection(section.key)}
              className={[
                "group min-w-[240px] rounded-2xl border p-3 text-left transition-all duration-200",
                "lg:w-full lg:min-w-0",
                disabled
                  ? "cursor-not-allowed border-slate-200/70 bg-slate-100/60 opacity-60"
                  : isActive
                    ? "border-blue-300 bg-blue-50 shadow-sm"
                    : "border-transparent bg-white/40 hover:border-blue-200 hover:bg-blue-50/60",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={[
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-600",
                  ].join(" ")}
                >
                  {disabled ? (
                    <LockKeyhole size={15} />
                  ) : status === "approved" ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-800">
                      {section.title}
                    </p>

                    <ChevronRight
                      size={16}
                      className={[
                        "mt-0.5 shrink-0",
                        isActive
                          ? "translate-x-0.5 text-blue-600"
                          : "text-slate-400",
                      ].join(" ")}
                    />
                  </div>

                  <div className="mt-2">
                    <ComplianceStatusBadge status={status} />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
