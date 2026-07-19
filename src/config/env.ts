// env placeholder
export const isProduction = false;

function getEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  appName: import.meta.env.VITE_APP_NAME,
  apiUrl: getEnv("VITE_API_BASE_URL"),
  environment: import.meta.env.VITE_ENV,
};
