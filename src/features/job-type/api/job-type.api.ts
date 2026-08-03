import { instance } from "@/api/client";

export const jobTypeApi = {
  getAll: async () => {
    const response = await instance.get("/job-types");
    return response.data;
  },
};
