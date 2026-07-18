// env placeholder
export const isProduction = false;

export const env = {
  appName: import.meta.env.VITE_APP_NAME,
  apiUrl: import.meta.env.VITE_API_URL,
  environment: import.meta.env.VITE_ENV,
};