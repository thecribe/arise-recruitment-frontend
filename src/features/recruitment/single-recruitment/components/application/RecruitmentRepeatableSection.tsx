/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentRepeatableSection.tsx
 *
 * Description:
 *
 * Displays and edits a repeatable recruitment application section.
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
 * -----------------------------------------------------------------------------
 */

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import FormRenderer from "@/components/forms/FormRenderer";

import type { ApplicationField } from "@/features/application/types";

import { useFormContext } from "react-hook-form";

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
   * Whether the manager is currently editing.
   */
  isEditing: boolean;

  /**
   * Repeatable section limits.
   */
  minItems?: number;
  maxItems?: number;
}

/**
 * -----------------------------------------------------------------------------
 * Create an empty repeatable row.
 * -----------------------------------------------------------------------------
 */

function createEmptyRow(fields: ApplicationField[]) {
  const row: Record<string, unknown> = {};

  fields.forEach((field) => {
    if (!field.name) return;

    switch (field.type) {
      case "checkbox":
        row[field.name] = false;
        break;

      case "file":
      case "signature":
        row[field.name] = null;
        break;

      default:
        row[field.name] = "";
    }
  });

  return row;
}
type RecruitmentRepeatableFormValues = Record<
  string,
  Record<string, unknown>[]
>;
export default function RecruitmentRepeatableSection({
  sectionId,
  sectionTitle,
  fields = [],
  isEditing,
  minItems = 1,
  maxItems = Number.MAX_SAFE_INTEGER,
}: RecruitmentRepeatableSectionProps) {
  const { control } = useFormContext<RecruitmentRepeatableFormValues>();

  /**
   * ---------------------------------------------------------------------------
   * Manage repeatable entries through React Hook Form.
   * ---------------------------------------------------------------------------
   */

  const {
    fields: entries,
    append,
    remove,
  } = useFieldArray({
    control,
    name: sectionId,
  });

  const canAdd = isEditing && entries.length < maxItems;

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
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {sectionTitle} #{index + 1}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {isEditing ? "Editing entry" : "Submitted entry"}
              </p>
            </div>

            {isEditing && entries.length > minItems && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="
                  rounded-xl
                  p-2
                  text-red-500
                  transition
                  hover:bg-red-50
                  hover:text-red-600
                "
                aria-label={`Remove ${sectionTitle} ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

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

      {entries.length === 0 && !isEditing && (
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
      )}

      {canAdd && (
        <button
          type="button"
          onClick={() => append(createEmptyRow(fields))}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-dashed
            border-blue-300
            bg-blue-50/60
            px-5
            py-3
            text-sm
            font-medium
            text-blue-700
            transition
            hover:bg-blue-100
          "
        >
          <Plus className="h-4 w-4" />
          Add another {sectionTitle}
        </button>
      )}
    </div>
  );
}
