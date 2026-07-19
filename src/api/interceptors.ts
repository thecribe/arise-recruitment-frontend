import type { InternalAxiosRequestConfig } from "axios";
import type { AxiosError } from "axios";

export function attachRequestInterceptor(
  client: typeof import("./client").apiClient,
) {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    /**
     * Later:
     *
     * const token = authStore.getState().token;
     */

    return config;
  });
}


export function attachResponseInterceptor(
  client: typeof import("./client").apiClient,
) {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Session expired or unauthenticated.
        // We'll let the auth layer handle redirecting
        // after confirming the session state.
      }

      return Promise.reject(error);
    },
  );
}