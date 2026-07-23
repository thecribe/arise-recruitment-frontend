/**
 * -----------------------------------------------------------------------------
 * File: useApplicationDefinition.ts
 *
 * Description:
 * Retrieves the static application definition.
 *
 * This hook loads only the application phases.
 * Sections and fields are loaded lazily.
 * -----------------------------------------------------------------------------
 */

import { useQuery } from "@tanstack/react-query";

import { getApplicationPhases, applicationDefinitionKeys } from "../api";

/**
 * Retrieves the list of application phases.
 */
export function useApplicationDefinition() {
  return useQuery({
    queryKey: applicationDefinitionKeys.phases(),

    queryFn: getApplicationPhases,

    staleTime: Infinity,
  });
}
