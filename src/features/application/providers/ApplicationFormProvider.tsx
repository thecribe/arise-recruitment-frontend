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

import { buildDefaultValues } from "../utils/buildDefaultValues";
import { buildFormSchema } from "../utils/buildFormSchema";

export default function ApplicationFormProvider({
  children,
}: PropsWithChildren) {
  const { activeSection } = useApplicationContext();

  /**
   * Build validation schema.
   */
  const schema = useMemo(() => buildFormSchema(activeSection), [activeSection]);

  /**
   * Build default values.
   */
  const defaultValues = useMemo(
    () => buildDefaultValues(activeSection),
    [activeSection],
  );

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

  /**
   * Reset whenever:
   * - active section changes
   * - backend values change
   */
  useEffect(() => {
    if (sectionValues?.values?.length) {
      methods.reset({
        [activeSection.key]: sectionValues.values,
      });

      return;
    }

    methods.reset(defaultValues);
  }, [
    activeSection.id,
    activeSection.key,
    sectionValues,
    defaultValues,
    methods,
  ]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}
