/**
 * -----------------------------------------------------------------------------
 * File: RepeatableSectionRenderer.tsx
 *
 * Description:
 * Renders repeatable application sections.
 * -----------------------------------------------------------------------------
 */

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import { useApplicationContext } from "../context/ApplicationContext";
import { useApplicationForm } from "../hooks/useApplicationForm";

import type { ApplicationField } from "../types";

import FieldRenderer from "./FieldRenderer";

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

export default function RepeatableSectionRenderer() {
  const { activeSection } = useApplicationContext();

  const { control } = useApplicationForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: activeSection.key,
  });

  const minItems = activeSection.minItems ?? 1;
  const maxItems = activeSection.maxItems ?? Number.MAX_SAFE_INTEGER;

  return (
    <div className="space-y-8">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white/60
            p-6
            backdrop-blur-xl
          "
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-700">
              {activeSection.title} #{index + 1}
            </h3>

            {fields.length > minItems && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="
                  rounded-lg
                  p-2
                  text-red-500
                  transition
                  hover:bg-red-50
                "
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-12 gap-6">
            {activeSection.fields.map((field) => (
              <FieldRenderer
                key={field.id}
                field={field}
                prefix={`${activeSection.key}.${index}`}
              />
            ))}
          </div>
        </div>
      ))}

      {fields.length < maxItems && (
        <button
          type="button"
          onClick={() => append(createEmptyRow(activeSection.fields))}
          className="
            flex
            items-center
            gap-2
            rounded-xl
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
          <Plus size={18} />
          Add another {activeSection.title}
        </button>
      )}
    </div>
  );
}
