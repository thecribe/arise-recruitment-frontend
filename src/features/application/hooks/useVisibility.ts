import { useWatch } from "react-hook-form";

import { useApplicationForm } from "../hooks/useApplicationForm";

import { evaluateVisibility } from "../utils/evaluateVisibility";
import type { VisibilityCondition } from "../types/visibility";

export function useVisibility(visibility?: VisibilityCondition): boolean {
  const { control } = useApplicationForm();

  const values = useWatch({ control });

  return evaluateVisibility(visibility, values as Record<string, unknown>);
}
