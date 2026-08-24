/**
 * -----------------------------------------------------------------------------
 * File: ApplicationFormProvider.tsx
 *
 * Description:
 * Creates and provides the React Hook Form instance for the current
 * application section.
 *
 * Responsibilities:
 * - Build the validation schema dynamically.
 * - Build default values dynamically.
 * - Load applicant section values.
 * - Reset the form whenever the active section changes.
 * -----------------------------------------------------------------------------
 */

import type { PropsWithChildren } from "react";
import { useEffect, useMemo } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useApplicationContext } from "../context/ApplicationContext";

import { useApplicantSection } from "../hooks/useApplicantSection";

import { buildFormSchema } from "@/components/forms/utils/buildFormSchema";
import { buildDefaultValues } from "@/components/forms/utils/buildDefaultValues";

export default function ApplicationFormProvider({
  children,
}: PropsWithChildren) {
  const { activeSection } = useApplicationContext();

  const fields = useMemo(
    () => activeSection.fields ?? [],
    [activeSection.fields],
  );

  /**
   * Build validation schema.
   */
  // const schema = useMemo(() => buildFormSchema(activeSection), [activeSection]);
  const schema = useMemo(
    () =>
      buildFormSchema({
        fields: fields,
        repeatable: activeSection.repeatable,
        sectionId: activeSection.repeatable ? activeSection.id : undefined,
      }),
    [fields, activeSection.repeatable, activeSection.id],
  );

  /**
   * Build default values.
   */
  const defaultValues = useMemo(() => buildDefaultValues(fields), [fields]);

  /**
   * Load saved applicant values.
   */
  const { data: sectionValues } = useApplicantSection(activeSection.id);

  /**
   * Create form.
   */
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues,
  });

  const { reset } = methods;
  /**
   * Reset whenever:
   * - active section changes
   * - backend values change
   */
  // useEffect(() => {
  //   if (!sectionValues) {
  //     methods.reset(defaultValues);
  //     return;
  //   }

  //   if (activeSection.repeatable) {
  //     methods.reset({
  //       [activeSection.id]: sectionValues.values?.length
  //         ? sectionValues.values
  //         : defaultValues[activeSection.id],
  //     });

  //     return;
  //   }

  //   methods.reset(
  //     sectionValues.values && Object.keys(sectionValues.values).length
  //       ? (sectionValues.values as Record<string, unknown>)
  //       : defaultValues,
  //   );
  // }, [activeSection, sectionValues, defaultValues, methods]);

  useEffect(() => {
    /**
     * Repeatable section.
     */
    if (activeSection.repeatable) {
      const values = Array.isArray(sectionValues?.values)
        ? sectionValues.values
        : [];

      reset({
        [activeSection.id]:
          values.length > 0 ? values : defaultValues[activeSection.id],
      });

      return;
    }

    /**
     * Non-repeatable section.
     */
    const values =
      !Array.isArray(sectionValues?.values) &&
      sectionValues?.values &&
      Object.keys(sectionValues.values).length > 0
        ? sectionValues.values
        : defaultValues;

    reset(values);
  }, [
    activeSection.id,
    activeSection.repeatable,
    sectionValues?.values,
    defaultValues,
    reset,
  ]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}
