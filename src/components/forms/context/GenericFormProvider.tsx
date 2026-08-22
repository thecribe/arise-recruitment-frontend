/**
 * -----------------------------------------------------------------------------
 * File: GenericFormProvider.tsx
 *
 * Description:
 * Generic React Hook Form provider for dynamic forms.
 *
 * This provider is feature-agnostic.
 * -----------------------------------------------------------------------------
 */

import { useEffect, type PropsWithChildren } from "react";

import { FormProvider } from "react-hook-form";
import {
  useGenericForm,
  type UseGenericFormOptions,
} from "../hooks/useGenericForm";

interface GenericFormProviderProps
  extends PropsWithChildren, UseGenericFormOptions {}

export default function GenericFormProvider({
  children,
  fields,
  values,
  mode,
  formOptions,
}: GenericFormProviderProps) {
  const methods = useGenericForm({
    fields,
    values,
    mode,
    formOptions,
  });

  /**
   * ---------------------------------------------------------------------------
   * Lazy-loaded backend values.
   *
   * Recruitment may mount the form before the section request finishes.
   *
   * When `values` changes, reset the form using the new backend values.
   * ---------------------------------------------------------------------------
   */

  useEffect(() => {
    methods.resetWithValues(values);
  }, [values, methods.resetWithValues]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}
