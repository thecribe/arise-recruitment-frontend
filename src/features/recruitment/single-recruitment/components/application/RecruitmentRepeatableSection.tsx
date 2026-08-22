/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentRepeatableSection.tsx
 *
 * Description:
 * Displays submitted entries belonging to a repeatable application section.
 *
 * Each entry is rendered through the generic FormRenderer.
 *
 * RHF structure:
 *
 * {
 *   [sectionId]: [
 *     {
 *       fieldOne: "...",
 *       fieldTwo: "...",
 *     },
 *   ],
 * }
 *
 * Each entry receives a prefix:
 *
 * sectionId.0
 * sectionId.1
 * sectionId.2
 * -----------------------------------------------------------------------------
 */

import FormRenderer from "@/components/forms/FormRenderer";

import type { ApplicationField } from "@/features/application/types";

import type { RecruitmentRepeatableSectionEntry } from "@/features/recruitment/types/recruitment.types";

interface RecruitmentRepeatableSectionProps {
  /**
   * ID used as the RHF root for repeatable entries.
   */
  sectionId: string;

  /**
   * Display title.
   */
  sectionTitle: string;

  /**
   * Field definitions.
   */
  fields?: ApplicationField[];

  /**
   * Submitted entries.
   */
  entries: RecruitmentRepeatableSectionEntry[];
  isEditing: boolean;
}

export default function RecruitmentRepeatableSection({
  sectionId,
  sectionTitle,
  fields = [],
  entries,
  isEditing,
}: RecruitmentRepeatableSectionProps) {
  /**
   * No submitted entries.
   */
  if (!entries.length) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-slate-200
          bg-slate-50/50
          p-8
          text-center
        "
      >
        <p className="text-sm font-medium text-slate-600">
          No entries have been submitted.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <div
          key={entry.id}
          className="
            rounded-2xl
            border
            border-slate-200/80
            bg-white/60
            p-5
            shadow-sm
            sm:p-6
          "
        >
          {/* Entry heading */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {sectionTitle} #{index + 1}
              </p>

              <p className="mt-1 text-xs text-slate-400">Submitted entry</p>
            </div>
          </div>

          {/* Entry fields */}
          <FormRenderer
            fields={fields}
            prefix={`${sectionId}.${index}`}
            config={{
              mode: isEditing ? "edit" : "view",
              canEdit: isEditing,
              readOnly: !isEditing,
            }}
          />
        </div>
      ))}
    </div>
  );
}
