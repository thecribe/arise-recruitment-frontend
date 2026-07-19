import axios from "axios";

import { env } from "@/config/env";
import {
  attachRequestInterceptor,
  attachResponseInterceptor,
} from "./interceptors";

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 30000,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

attachRequestInterceptor(apiClient);
attachResponseInterceptor(apiClient);
