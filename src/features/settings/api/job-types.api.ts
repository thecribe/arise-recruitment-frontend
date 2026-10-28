import { instance } from "@/api/client";

import type { JobType, JobTypeApiResponse } from "../types/job-type.types";
import type { JobTypeFormValues } from "../schemas/job-type.schema";

const BASE_URL = "/job-types";

const getAll = async (): Promise<JobType[]> => {
  const response =
    await instance.get<JobTypeApiResponse<{ jobTypes: JobType[] }>>(BASE_URL);

  return response.data.data.jobTypes;
};

const create = async (values: JobTypeFormValues): Promise<JobType> => {
  const response = await instance.post<
    JobTypeApiResponse<{ jobType: JobType }>
  >(BASE_URL, values);

  return response.data.data.jobType;
};

const update = async (
  id: string,
  values: JobTypeFormValues,
): Promise<JobType> => {
  const response = await instance.patch<
    JobTypeApiResponse<{ jobType: JobType }>
  >(`${BASE_URL}/${id}`, values);

  return response.data.data.jobType;
};

const setDefault = async (id: string): Promise<JobType> => {
  const response = await instance.patch<
    JobTypeApiResponse<{ jobType: JobType }>
  >(`${BASE_URL}/${id}/default`);

  return response.data.data.jobType;
};

const remove = async (id: string): Promise<void> => {
  await instance.delete(`${BASE_URL}/${id}`);
};

export const jobTypesApi = {
  getAll,
  create,
  update,
  setDefault,
  remove,
};
