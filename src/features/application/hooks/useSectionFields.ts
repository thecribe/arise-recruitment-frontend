import { useQuery } from "@tanstack/react-query";
import { applicationDefinitionKeys, getSectionFields } from "../api";

export function useSectionFields(sectionId?: string) {
  return useQuery({
    queryKey: applicationDefinitionKeys.fields(sectionId ?? ""),

    queryFn: () => getSectionFields(sectionId!),

    enabled: !!sectionId,
  });
}
