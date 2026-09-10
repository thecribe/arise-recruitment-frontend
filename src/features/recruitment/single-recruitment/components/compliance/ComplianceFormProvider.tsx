/**
 * -----------------------------------------------------------------------------
 * File: ComplianceFormProvider.tsx
 *
 * Description:
 *
 * Provides React Hook Form state for a compliance form.
 *
 * Responsibilities:
 *
 * - Build the form schema from dynamic fields.
 * - Build default values.
 * - Initialize the form with backend values.
 * - Provide React Hook Form context to child components.
 *
 * -----------------------------------------------------------------------------
 */

import type { PropsWithChildren } from "react";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { buildDefaultValues } from "@/components/forms/utils/buildDefaultValues";
import { buildComplianceFormSchema } from "@/components/forms/utils/buildComplianceFormSchema";
import type { FormField } from "@/components/forms/types/field";
import type { ComplianceFormValues } from "@/features/recruitment/types/compliance.types";

interface ComplianceFormProviderProps extends PropsWithChildren {
  formId: string;
  fields: FormField[];
  values?: ComplianceFormValues;
}

export default function ComplianceFormProvider({
  formId,
  fields,
  values,
  children,
}: ComplianceFormProviderProps) {
  /**
   * ---------------------------------------------------------------------------
   * Build validation schema.
   * ---------------------------------------------------------------------------
   */
  const schema = useMemo(() => {
    return buildComplianceFormSchema(fields);
  }, [fields]);

  /**
   * ---------------------------------------------------------------------------
   * Build default values from the dynamic field definitions.
   * ---------------------------------------------------------------------------
   */
  const defaultValues = useMemo(() => {
    return buildDefaultValues(fields);
  }, [fields]);

  /**
   * ---------------------------------------------------------------------------
   * Combine defaults with backend values.
   *
   * Backend values take precedence over field defaults.
   * ---------------------------------------------------------------------------
   */
  const formValues = useMemo<ComplianceFormValues>(() => {
    return {
      ...defaultValues,
      ...(values ?? {}),
    };
  }, [defaultValues, values]);

  /**
   * ---------------------------------------------------------------------------
   * React Hook Form.
   * ---------------------------------------------------------------------------
   */
  const methods = useForm<ComplianceFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: formValues,
  });

  const {
    reset,
    formState: { isDirty },
  } = methods;

  /**
   * ---------------------------------------------------------------------------
   * Synchronize backend values with the form.
   *
   * We only reset when the form has not been modified.
   *
   * This prevents an asynchronous query update from overwriting values while
   * the user is actively editing the form.
   * ---------------------------------------------------------------------------
   */
  useEffect(() => {
    if (isDirty) {
      return;
    }

    reset(formValues);
  }, [formId, formValues, isDirty, reset]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}
