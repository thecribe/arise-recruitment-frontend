import { useEffect, useState } from "react";
import { useApplicantDeclarations } from "../../hooks/useApplicantDeclarations";
import { useApplicantDeclarationValues } from "../../hooks/useApplicantDeclarationValues";
import { useUpdateApplicantDeclaration } from "../../hooks/useUpdateApplicantDeclaration";
import DeclarationSection from "@/features/recruitment/single-recruitment/components/declarations/components/DeclarationSection";
import { useApplicantApplicationSectionStatus } from "../../hooks/useApplicantApplicationSectionStatus";
import {
  APPLICATION_SECTION_STATUS,
  canEditApplicationSection,
} from "./application-section-status";
import { CheckCircle2, Lock, RotateCcw } from "lucide-react";

const DECLARATION_SECTION_ID = "declarations";

const getSectionTitle = (sectionId: string) =>
  sectionId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const DeclarationsTab = () => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const {
    data: sections,
    isLoading: isLoadingSections,
    isError: isSectionsError,
  } = useApplicantDeclarations();

  const {
    data: values,
    isLoading: isLoadingValues,
    isError: isValuesError,
  } = useApplicantDeclarationValues();

  const {
    data: sectionStatus,
    isLoading: isLoadingStatus,
    isError: isStatusError,
  } = useApplicantApplicationSectionStatus(DECLARATION_SECTION_ID);

  const updateDeclaration = useUpdateApplicantDeclaration();

  const sectionList = sections ? Object.values(sections) : [];

  useEffect(() => {
    if (!sectionList.length) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveSectionId((current) => {
      if (current && sectionList.some((section) => section.id === current)) {
        return current;
      }

      return sectionList[0].id;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  const activeSection = activeSectionId
    ? sectionList.find((section) => section.id === activeSectionId)
    : undefined;

  const completedCount = sectionList.filter((section) => {
    const sectionValues = values?.[section.id];

    if (!sectionValues) {
      return false;
    }

    return Object.values(sectionValues).some((value) => {
      if (value === undefined || value === null) {
        return false;
      }

      if (typeof value === "string") {
        return value.trim().length > 0;
      }

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return true;
    });
  }).length;

  const status = sectionStatus?.status ?? APPLICATION_SECTION_STATUS.LOCKED;

  const canEdit = canEditApplicationSection(status);

  const handleSave = async (
    sectionId: string,
    sectionValues: Record<string, unknown>,
  ) => {
    await updateDeclaration.mutateAsync({
      sectionId,
      values: sectionValues,
    });
  };

  if (isLoadingSections || isLoadingValues || isLoadingStatus) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-blue-200/50
          bg-white/50
          p-6
          shadow-sm
          shadow-blue-900/5
          backdrop-blur-xl
        "
      >
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-48 rounded bg-slate-200" />
          <div className="h-3 w-72 rounded bg-slate-200" />
          <div className="h-32 rounded-2xl bg-slate-100" />
        </div>
      </div>
    );
  }

  if (isSectionsError || isValuesError || isStatusError) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-200/60
          bg-red-50/70
          p-5
          text-sm
          text-red-700
          backdrop-blur-xl
        "
      >
        Unable to load your declarations. Please refresh the page and try again.
      </div>
    );
  }

  if (!sectionList.length) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-blue-200/50
          bg-white/50
          p-6
          text-sm
          text-slate-500
          shadow-sm
          shadow-blue-900/5
          backdrop-blur-xl
        "
      >
        No declarations are currently available.
      </div>
    );
  }

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
      {/* Declaration navigation */}
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
        "
      >
        <div className="mb-3 px-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Declarations
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {completedCount} of {sectionList.length} completed
          </p>
        </div>

        <nav className="flex w-full min-w-0 flex-col gap-1">
          {sectionList.map((section) => {
            const isActive = section.id === activeSectionId;

            const isCompleted = !!values?.[section.id];

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSectionId(section.id)}
                className={[
                  "flex w-full min-w-0 items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition",
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-900/10"
                    : "text-slate-600 hover:bg-blue-50/70 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-500/10 dark:hover:text-blue-300",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9 sm:rounded-xl",
                    isActive ? "bg-white/15" : "bg-blue-50 text-blue-600",
                  ].join(" ")}
                >
                  {isCompleted ? (
                    <CheckCircle2
                      size={17}
                      className={isActive ? "text-white" : "text-blue-600"}
                    />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-current" />
                  )}
                </span>

                <span className="min-w-0 truncate text-sm font-medium">
                  {getSectionTitle(section.id)}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Active declaration */}
      <div className="min-w-0">
        {activeSection && (
          <>
            {!canEdit && (
              <div
                className={[
                  "mb-4 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm backdrop-blur-xl",
                  status === APPLICATION_SECTION_STATUS.APPROVED
                    ? "border-emerald-200/70 bg-emerald-50/70 text-emerald-700"
                    : status === APPLICATION_SECTION_STATUS.REJECTED
                      ? "border-amber-200/70 bg-amber-50/70 text-amber-700"
                      : "border-blue-200/70 bg-blue-50/70 text-blue-700",
                ].join(" ")}
              >
                <Lock className="mt-0.5 h-4 w-4 shrink-0" />

                <div>
                  <p className="font-medium">
                    Declaration is {status.replace("_", " ")}.
                  </p>

                  <p className="mt-0.5 text-xs opacity-80">
                    {status === APPLICATION_SECTION_STATUS.SUBMITTED
                      ? "Your declaration is awaiting recruitment review."
                      : status === APPLICATION_SECTION_STATUS.APPROVED
                        ? "This declaration has been approved and can no longer be edited."
                        : "This declaration is currently locked."}
                  </p>
                </div>
              </div>
            )}

            {status === APPLICATION_SECTION_STATUS.REJECTED && (
              <div className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-200/70 bg-amber-50/70 px-4 py-3 text-sm text-amber-700 backdrop-blur-xl">
                <RotateCcw className="mt-0.5 h-4 w-4 shrink-0" />

                <div>
                  <p className="font-medium">Changes are required.</p>

                  <p className="mt-0.5 text-xs opacity-80">
                    Please update your declaration and submit it again for
                    review.
                  </p>
                </div>
              </div>
            )}

            <DeclarationSection
              section={activeSection}
              values={values?.[activeSection.id]}
              isSaving={
                updateDeclaration.isPending &&
                updateDeclaration.variables?.sectionId === activeSection.id
              }
              onSave={handleSave}
              canEdit={canEdit}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DeclarationsTab;
