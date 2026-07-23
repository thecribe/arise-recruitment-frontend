/**
 * -----------------------------------------------------------------------------
 * File: ApplicationFooter.tsx
 *
 * Description:
 * Handles saving drafts and submitting the current application section.
 *
 * Responsibilities:
 * - Reads the current form values.
 * - Saves the section as a draft.
 * - Submits the section.
 * - Respects permissions exposed by the ApplicationContext.
 *
 * Notes:
 * - Business rules are handled by ApplicationShell.
 * - Validation is handled by React Hook Form.
 * -----------------------------------------------------------------------------
 */

import { Save, Send } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useApplicationContext } from "../../context/ApplicationContext";
import { useSaveDraft } from "../../hooks/useSaveDraft";
import { useSubmitSection } from "../../hooks/useSubmitSection";

export default function ApplicationFooter() {
  /**
   * ---------------------------------------------------------------------------
   * React Hook Form.
   * ---------------------------------------------------------------------------
   */
  const { handleSubmit } = useFormContext();

  /**
   * ---------------------------------------------------------------------------
   * Application context.
   * ---------------------------------------------------------------------------
   */
  const { activeSection, activeApplicantSection, canEdit, canSubmit } =
    useApplicationContext();

  /**
   * ---------------------------------------------------------------------------
   * Mutations.
   * ---------------------------------------------------------------------------
   */
  const saveDraft = useSaveDraft();

  const submitSection = useSubmitSection();

  /**
   * ---------------------------------------------------------------------------
   * Saves the current section as a draft.
   * ---------------------------------------------------------------------------
   */
  function handleSaveDraft(values: unknown) {
    saveDraft.mutate({
      sectionId: activeSection.id,

      // TODO:
      // Replace `unknown` with your final form value type.
      values: values as Record<string, unknown>[],
    });
  }

  /**
   * ---------------------------------------------------------------------------
   * Submits the current section.
   * ---------------------------------------------------------------------------
   */
  function handleSectionSubmit(values: unknown) {
    submitSection.mutate({
      sectionId: activeSection.id,

      // TODO:
      // Replace `unknown` with your final form value type.
      values: values as Record<string, unknown>[],
    });
  }

  return (
    <footer
      className="
        mt-8
        rounded-3xl
        border
        border-white/20
        bg-white/10
        backdrop-blur-xl
        shadow-lg
        p-6
      "
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* ------------------------------------------------------------------ */}
        {/* Section Status                                                     */}
        {/* ------------------------------------------------------------------ */}
        <div>
          <p className="text-sm text-slate-500">Current Status</p>

          <p className="mt-1 font-semibold text-slate-800">
            {activeApplicantSection.status}
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Action Buttons                                                     */}
        {/* ------------------------------------------------------------------ */}
        <div className="flex flex-wrap gap-3">
          {canEdit && (
            <button
              type="button"
              onClick={handleSubmit(handleSaveDraft)}
              disabled={saveDraft.isPending}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-blue-300
                bg-white/70
                px-5
                py-3
                text-sm
                font-medium
                text-blue-700
                transition-all
                hover:bg-blue-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Save className="h-4 w-4" />

              {saveDraft.isPending ? "Saving..." : "Save Draft"}
            </button>
          )}

          {canSubmit && (
            <button
              type="button"
              onClick={handleSubmit(handleSectionSubmit)}
              disabled={submitSection.isPending}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
                font-medium
                text-white
                transition-all
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Send className="h-4 w-4" />

              {submitSection.isPending ? "Submitting..." : "Submit Section"}
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
