/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentApplicationFormProvider.tsx
 *
 * Description:
 *
 * Creates React Hook Form state for a selected Recruitment application section.
 *
 * Responsibilities:
 *
 * - Build validation schema from section fields.
 * - Build default values.
 * - Populate the form with applicant submitted values.
 *
 * The generic FormRenderer is responsible only for rendering fields.
 * -----------------------------------------------------------------------------
 */

import type { PropsWithChildren } from "react";

import { useEffect, useMemo } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type { RecruitmentApplicationSectionDetails } from "@/features/recruitment/types/recruitment.types";

import { buildFormSchema } from "@/components/forms/utils/buildFormSchema";

import { buildDefaultValues } from "@/components/forms/utils/buildDefaultValues";

interface RecruitmentApplicationFormProviderProps extends PropsWithChildren {
  section: RecruitmentApplicationSectionDetails;
}

export default function RecruitmentApplicationFormProvider({
  section,
  children,
}: RecruitmentApplicationFormProviderProps) {
  /**
   * ---------------------------------------------------------------------------
   * Normalize fields.
   *
   * Avoid using `section.fields ?? []` directly inside dependency arrays because
   * an empty array literal would create a new reference on every render.
   * ---------------------------------------------------------------------------
   */

  const fields = useMemo(() => section.fields ?? [], [section.fields]);

  /**
   * ---------------------------------------------------------------------------
   * Build validation schema.
   * ---------------------------------------------------------------------------
   */

  const schema = useMemo(
    () =>
      buildFormSchema({
        fields,
        repeatable: section.repeatable,
        sectionId: section.repeatable ? section.id : undefined,
      }),
    [fields, section.repeatable, section.id],
  );

  /**
   * ---------------------------------------------------------------------------
   * Build fallback default values.
   * ---------------------------------------------------------------------------
   */

  const defaultValues = useMemo(() => {
    return buildDefaultValues(fields);
  }, [fields]);

  /**
   * ---------------------------------------------------------------------------
   * Build the values used to initialize/reset the form.
   *
   * Keeping this in one memoized value prevents the effect from rebuilding
   * a new object unnecessarily.
   * ---------------------------------------------------------------------------
   */

  const formValues = useMemo(() => {
    /**
     * Repeatable section.
     */

    if (section.repeatable) {
      const values = Array.isArray(section.values) ? section.values : [];

      return {
        [section.id]:
          values.length > 0 ? values : (defaultValues[section.id] ?? []),
      };
    }

    /**
     * Non-repeatable section.
     */

    if (
      !Array.isArray(section.values) &&
      section.values &&
      Object.keys(section.values).length > 0
    ) {
      return section.values;
    }

    return defaultValues;
  }, [section.id, section.repeatable, section.values, defaultValues]);

  /**
   * ---------------------------------------------------------------------------
   * Create RHF instance.
   * ---------------------------------------------------------------------------
   */

  const methods = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),

    mode: "onBlur",

    reValidateMode: "onChange",

    defaultValues: formValues,
  });

  const { reset } = methods;

  /**
   * ---------------------------------------------------------------------------
   * Reset only when the selected section changes.
   *
   * `section.id` is the important identity here.
   *
   * The parent already uses:
   *
   * key={section.id}
   *
   * so changing sections will remount this provider anyway. We therefore do not
   * need to continuously reset based on object references such as
   * `section.values` or `defaultValues`.
   * ---------------------------------------------------------------------------
   */

  useEffect(() => {
    reset(formValues);
  }, [section.id, reset]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}
