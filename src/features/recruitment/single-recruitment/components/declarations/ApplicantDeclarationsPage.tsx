import { useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  FileSignature,
  Loader2,
} from "lucide-react";

import {
  useApplicantDeclarations,
  useApplicationSectionStatus,
} from "./hooks/useApplicantDeclarations";
import { useApplicantDeclarationValues } from "./hooks/useApplicantDeclarationValues";
import { useUpdateApplicantDeclaration } from "./hooks/useUpdateApplicantDeclaration";

import DeclarationSection from "./components/DeclarationSection";
import { canEditApplicationSection } from "@/features/compliance/applicant/components/declarations/application-section-status";
import DeclarationSectionReview from "./components/DeclarationSectionReview";

interface ApplicantDeclarationsPageProps {
  applicationId: string;
}

const getSectionTitle = (id: string) =>
  id
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

export default function ApplicantDeclarationsPage({
  applicationId,
}: ApplicantDeclarationsPageProps) {
  const [savingSectionId, setSavingSectionId] = useState<string | null>(null);

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const {
    data: declarations,
    isLoading: isLoadingDefinitions,
    isError: isDefinitionsError,
    refetch: refetchDefinitions,
  } = useApplicantDeclarations(applicationId);

  const {
    data: values,
    isLoading: isLoadingValues,
    isError: isValuesError,
    refetch: refetchValues,
  } = useApplicantDeclarationValues(applicationId);

  const DECLARATIONS_SECTION_ID = "declarations";

  const { data: sectionStatus } = useApplicationSectionStatus(
    applicationId,
    DECLARATIONS_SECTION_ID,
  );

  const updateDeclaration = useUpdateApplicantDeclaration();

  const sections = useMemo(() => {
    if (!declarations) {
      return [];
    }

    return Object.values(declarations);
  }, [declarations]);

  const isLoading = isLoadingDefinitions || isLoadingValues;

  const isError = isDefinitionsError || isValuesError;

  const hasSectionValues = (sectionId: string) => {
    const sectionValues = values?.[sectionId];

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
  };

  useEffect(() => {
    if (!sections.length) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveSectionId((current) => {
      if (current && sections.some((section) => section.id === current)) {
        return current;
      }

      const firstIncomplete = sections.find(
        (section) => !hasSectionValues(section.id),
      );

      return firstIncomplete?.id ?? sections[0].id;
    });
  }, [sections, values]);

  const activeSection = useMemo(() => {
    if (!activeSectionId) {
      return null;
    }

    return sections.find((section) => section.id === activeSectionId) ?? null;
  }, [activeSectionId, sections]);

  const handleSave = async (
    sectionId: string,
    sectionValues: Record<string, unknown>,
  ) => {
    setSavingSectionId(sectionId);

    try {
      await updateDeclaration.mutateAsync({
        applicationId,
        sectionId,
        values: sectionValues,
      });
    } finally {
      setSavingSectionId(null);
    }
  };

  const handleRetry = () => {
    refetchDefinitions();
    refetchValues();
  };
  const canEdit = canEditApplicationSection(sectionStatus?.status ?? "locked");
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Loader2 size={18} className="animate-spin text-blue-600" />
          Loading declarations...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200/70 bg-white/60 p-6 text-center shadow-sm backdrop-blur-xl dark:border-red-900/40 dark:bg-slate-900/50">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle size={20} />
        </div>

        <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
          Unable to load declarations
        </h3>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Something went wrong while loading the applicant&apos;s declarations.
        </p>

        <button
          type="button"
          onClick={handleRetry}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-8 text-center shadow-sm backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/50">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          <FileSignature size={21} />
        </div>

        <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
          No declarations available
        </h3>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          There are currently no declarations configured for this application.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* --------------------------------------------------------------------- */}
      {/* Header */}
      {/* --------------------------------------------------------------------- */}
      <div
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between  border
            border-blue-200/50
            bg-white/40
            p-2
            shadow-sm
            shadow-blue-900/5
            backdrop-blur-xl
            sm:p-3  rounded-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50/70 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
            <FileSignature size={18} />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
              Declarations
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Review and complete the applicant&apos;s declarations.
            </p>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* Two-column workspace */}
      {/* --------------------------------------------------------------------- */}
      <div className="flex min-w-0 flex-col gap-4 lg:flex-row">
        {/* ------------------------------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------------------------------- */}
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
          {/* Section title */}
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
              Declarations
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex w-full min-w-0 flex-col gap-1">
            {sections.map((section) => {
              const isActive = activeSectionId === section.id;

              const isComplete = hasSectionValues(section.id);

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSectionId(section.id)}
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
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <FileSignature className="h-4 w-4" />
                    )}
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
                    {getSectionTitle(section.id)}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ------------------------------------------------------------------- */}
        {/* Active declaration */}
        {/* ------------------------------------------------------------------- */}
        <main className="min-w-0 flex-1">
          <DeclarationSectionReview applicationId={applicationId}>
            {activeSection ? (
              <DeclarationSection
                key={activeSection.id}
                section={activeSection}
                values={values?.[activeSection.id]}
                isSaving={savingSectionId === activeSection.id}
                onSave={handleSave}
                canEdit={canEdit}
              />
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-blue-200/50 bg-white/40 p-6 shadow-sm shadow-blue-900/5 backdrop-blur-xl dark:border-blue-400/20 dark:bg-slate-900/30">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Select a declaration section.
                </p>
              </div>
            )}
          </DeclarationSectionReview>
        </main>
      </div>
    </div>
  );
}
