import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Edit3, Save, X } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

import FormRenderer from "@/components/forms/FormRenderer";
import type { FormField } from "@/components/forms/types/field";
import type { DeclarationSection as DeclarationSectionType } from "@/features/recruitment/types/declarations.types";

interface DeclarationSectionProps {
  section: DeclarationSectionType;
  values?: Record<string, unknown>;
  isSaving?: boolean;
  onSave: (sectionId: string, values: Record<string, unknown>) => Promise<void>;
  canEdit: boolean;
}

const getDefaultValues = (
  fields: FormField[],
  values?: Record<string, unknown>,
): Record<string, unknown> => {
  return fields.reduce<Record<string, unknown>>((result, field) => {
    if (!field.name) {
      return result;
    }

    if (values && field.name in values) {
      result[field.name] = values[field.name];
    } else if (field.defaultValue !== undefined) {
      result[field.name] = field.defaultValue;
    } else {
      result[field.name] = "";
    }

    return result;
  }, {});
};

const hasSavedValues = (
  fields: FormField[],
  values?: Record<string, unknown>,
) => {
  if (!values) {
    return false;
  }

  return fields.some((field) => {
    if (!field.name) {
      return false;
    }

    const value = values[field.name];

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

const getSectionTitle = (id: string) =>
  id
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

export default function DeclarationSection({
  section,
  values,
  isSaving = false,
  onSave,
  canEdit,
}: DeclarationSectionProps) {
  const saved = useMemo(
    () => hasSavedValues(section.fields, values),
    [section.fields, values],
  );

  const [isEditing, setIsEditing] = useState(!saved);

  const defaultValues = useMemo(
    () => getDefaultValues(section.fields, values),
    [section.fields, values],
  );

  const form = useForm<Record<string, unknown>>({
    defaultValues,
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsEditing(!saved);
  }, [saved]);

  const handleEdit = () => {
    reset(defaultValues);
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset(defaultValues);
    setIsEditing(false);
  };

  const handleSave = async (formValues: Record<string, unknown>) => {
    try {
      await onSave(section.id, formValues);

      setIsEditing(false);
    } catch {
      // Keep the form in edit mode when saving fails.
    }
  };

  return (
    <FormProvider {...form}>
      <section className="overflow-hidden rounded-2xl border border-white/20 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-slate-200/70 bg-white/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700/60 dark:bg-slate-900/30">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {saved && !isEditing && (
                <CheckCircle2 size={17} className="shrink-0 text-blue-600" />
              )}

              <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
                {getSectionTitle(section.id)}
              </h3>
            </div>

            {saved && !isEditing && (
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Declaration completed.
              </p>
            )}
          </div>

          {saved && !isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100 sm:w-auto dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/50"
            >
              <Edit3 size={14} />
              Edit
            </button>
          )}
        </div>

        {/* Content */}
        <div className="space-y-5 p-4 sm:p-5">
          <div
            className="prose prose-sm max-w-none text-slate-600 dark:prose-invert dark:text-slate-300 flex gap-2 flex-col"
            dangerouslySetInnerHTML={{
              __html: section.text,
            }}
          />

          <FormRenderer
            fields={section.fields}
            config={{
              mode: isEditing ? "edit" : "view",
              canEdit: canEdit && isEditing,
              readOnly: !isEditing,
              disabled: !isEditing,
            }}
          />

          {isEditing && (
            <div className="flex flex-col-reverse gap-2 border-t border-slate-200/70 pt-4 sm:flex-row sm:justify-end dark:border-slate-700/60">
              {saved && (
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <X size={15} />
                  Cancel
                </button>
              )}

              <button
                type="button"
                disabled={isSaving}
                onClick={handleSubmit(handleSave)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <Save size={15} />

                {isSaving
                  ? "Submitting..."
                  : saved
                    ? "Update Declaration"
                    : "Submit Declaration"}
              </button>
            </div>
          )}
        </div>
      </section>
    </FormProvider>
  );
}
