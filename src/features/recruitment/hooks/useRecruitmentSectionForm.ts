/**
 * -----------------------------------------------------------------------------
 * File: useRecruitmentSectionForm.ts
 *
 * Description:
 * Creates a React Hook Form instance for viewing/editing a Recruitment
 * application section.
 *
 * Important:
 *
 * We do NOT modify the existing Application FieldRenderer.
 *
 * The Recruitment feature provides the RHF context expected by the existing
 * field components and populates it with the applicant's saved values.
 * -----------------------------------------------------------------------------
 */

import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";

interface UseRecruitmentSectionFormProps {
  values: Record<string, unknown>;
}

/**
 * -----------------------------------------------------------------------------
 * Recruitment section form.
 * -----------------------------------------------------------------------------
 */
export function useRecruitmentSectionForm({
  values,
}: UseRecruitmentSectionFormProps) {
  const form = useForm<FieldValues>({
    defaultValues: values,
    mode: "onChange",
  });

  /**
   * ---------------------------------------------------------------------------
   * Update RHF values whenever a different section is loaded.
   *
   * React Query will return a new `values` object when the manager changes
   * sections.
   * ---------------------------------------------------------------------------
   */
  useEffect(() => {
    form.reset(values);
  }, [form, values]);

  return form;
}
