import { buildFormData } from "@/utils/buildFormData";
import { apiClient } from "./client";

export const http = {
  async get<T>(url: string, params?: unknown): Promise<T> {
    const { data } = await apiClient.get<T>(url, {
      params,
    });

    return data;
  },

  async post<T>(url: string, payload?: unknown): Promise<T> {
    const { data } = await apiClient.post<T>(url, payload);

    return data;
  },

  async put<T>(url: string, payload?: unknown): Promise<T> {
    const { data } = await apiClient.put<T>(url, payload);

    return data;
  },

  async patch<T>(url: string, payload?: unknown): Promise<T> {
    const { data } = await apiClient.patch<T>(url, payload);

    return data;
  },

  async delete<T>(url: string): Promise<T> {
    const { data } = await apiClient.delete<T>(url);

    return data;
  },

  async postMultipart<T>(
    url: string,
    values: Record<string, unknown>,
  ): Promise<T> {
    const { data } = await apiClient.post<T>(url, buildFormData(values));

    return data;
  },

  async putMultipart<T>(
    url: string,
    values: Record<string, unknown>,
  ): Promise<T> {
    const { data } = await apiClient.put<T>(url, buildFormData(values));

    return data;
  },

  async patchMultipart<T>(
    url: string,
    values: Record<string, unknown>,
  ): Promise<T> {
    const { data } = await apiClient.patch<T>(url, buildFormData(values));

    return data;
  },
};
