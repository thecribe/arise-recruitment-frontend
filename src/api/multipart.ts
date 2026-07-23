import { buildFormData } from "@/utils/buildFormData";
import { http } from "./http";

type MultipartPayload = Record<string, unknown>;

export const multipart = {
  post<T>(url: string, values: MultipartPayload) {
    return http.post<T>(url, buildFormData(values));
  },

  put<T>(url: string, values: MultipartPayload) {
    return http.put<T>(url, buildFormData(values));
  },

  patch<T>(url: string, values: MultipartPayload) {
    return http.patch<T>(url, buildFormData(values));
  },
};
