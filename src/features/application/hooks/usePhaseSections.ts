/**
 * -----------------------------------------------------------------------------
 * Retrieves sections for the selected phase.
 * -----------------------------------------------------------------------------
 */

import { useQuery } from "@tanstack/react-query";

import { applicationApi, applicationDefinitionKeys } from "../api";

export function usePhaseSections(phaseId?: string) {
  return useQuery({
    queryKey: applicationDefinitionKeys.sections(phaseId ?? ""),

    queryFn: () => applicationApi.getPhaseSections(phaseId!),
    // queryFn: () => [],

    enabled: !!phaseId,
  });
}
