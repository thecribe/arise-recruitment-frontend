import { useQuery } from "@tanstack/react-query";

import { recruitmentApi } from "../api/recruitment.api";
import { recruitmentKeys } from "../api/recruitment.keys";

export function useRecruitmentApplicantSection(
  applicationId?: string,
  sectionId?: string | null,
) {
  const enabled = Boolean(applicationId) && Boolean(sectionId);

  return useQuery({
    queryKey:
      enabled && applicationId && sectionId
        ? recruitmentKeys.applicantSection(applicationId, sectionId)
        : recruitmentKeys.applicantSection(
            applicationId ?? "",
            sectionId ?? "",
          ),

    queryFn: () =>
      recruitmentApi.getRecruitmentApplicantSection(applicationId!, sectionId!),

    enabled: Boolean(applicationId && sectionId),

    /**
     * Keep previously loaded section data visible while the next section
     * is being requested.
     *
     * If your TanStack Query version supports `placeholderData`, this is
     * preferable to the old `keepPreviousData` option.
     */
    placeholderData: (previousData) => previousData,
  });
}
