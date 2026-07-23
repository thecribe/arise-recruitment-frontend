/**
 * -----------------------------------------------------------------------------
 * Retrieves sections for the selected phase.
 * -----------------------------------------------------------------------------
 */

import { useQuery } from "@tanstack/react-query";

import { applicationDefinitionKeys, getPhaseSections } from "../api";

export function usePhaseSections(phaseId?: string) {
  return useQuery({
    queryKey: applicationDefinitionKeys.sections(phaseId ?? ""),

    queryFn: () => getPhaseSections(phaseId!),

    enabled: !!phaseId,
  });
}
