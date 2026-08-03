import { jobTypeApi } from "@/features/job-type/api/job-type.api";
import { jobTypeKeys } from "@/features/job-type/api/job-type.keys";
import { useQueries } from "@tanstack/react-query";

export function useBootstrapData() {
  const results = useQueries({
    queries: [
      {
        queryKey: jobTypeKeys.all,
        queryFn: jobTypeApi.getAll,
        staleTime: Infinity,
      },
      //   {
      //     queryKey: siteKeys.details(),
      //     queryFn: siteApi.getDetails,
      //     staleTime: Infinity,
      //   },
      //   {
      //     queryKey: settingsKeys.applicationStages(),
      //     queryFn: settingsApi.getApplicationStages,
      //     staleTime: Infinity,
      //   },
    ],
  });

  const [jobTypesQuery] = results;

  return {
    jobTypes: { ...jobTypesQuery.data },
    isLoading: results.some((result) => result.isLoading),
    isError: results.some((result) => result.isError),
  };
}
