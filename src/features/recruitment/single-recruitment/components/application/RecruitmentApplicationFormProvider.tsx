/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentApplicationFormProvider.tsx
 *
 * Description:
 * Creates React Hook Form state for a selected Recruitment application section.
 *
 * Responsibilities:
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
   * Ensure fields always have a safe value.
   *
   * This protects against the brief loading/render state that may occur
   * during client-side navigation.
   */
  const fields = section.fields ?? [];

  /**
   * Build validation schema.
   */
  const schema = useMemo(
    () =>
      buildFormSchema({
        fields: section.fields ?? [],
        repeatable: section.repeatable,
        sectionId: section.repeatable ? section.id : undefined,
      }),
    [section.fields, section.repeatable, section.id],
  );

  /**
   * Build fallback default values from the section definition.
   */
  const defaultValues = useMemo(() => {
    return buildDefaultValues(fields);
  }, [fields]);

  /**
   * Create RHF instance.
   */
  const methods = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),

    mode: "onBlur",

    reValidateMode: "onChange",

    defaultValues,
  });

  const { reset } = methods;

  /**
   * Populate the form whenever the selected section changes.
   */
  useEffect(() => {
    /**
     * Repeatable section.
     */
    if (section.repeatable) {
      const values = Array.isArray(section.values) ? section.values : [];

      reset({
        [section.id]: values.length > 0 ? values : defaultValues[section.id],
      });

      return;
    }

    /**
     * Non-repeatable section.
     */
    const values =
      !Array.isArray(section.values) &&
      section.values &&
      Object.keys(section.values).length > 0
        ? section.values
        : defaultValues;

    reset(values);
  }, [section.id, section.repeatable, section.values, defaultValues, reset]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}
