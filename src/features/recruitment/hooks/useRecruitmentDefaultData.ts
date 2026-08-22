import { useQuery } from "@tanstack/react-query";
import { recruitmentKeys } from "../api/recruitment.keys";
import { recruitmentApi } from "../api/recruitment.api";

export function useRecruitmentDefaultData() {
  return useQuery({
    queryKey: recruitmentKeys.all,
    queryFn: recruitmentApi.getRecruitmentDefaultData,
    staleTime: 10 * 60 * 1000,
  });
}
