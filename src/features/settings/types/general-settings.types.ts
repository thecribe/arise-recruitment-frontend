export interface SettingsFile {
  document_url: string;
  name: string;
  mimeType?: string;
  size?: number;
}

export interface GeneralSettings {
  id?: string;
  organisation_name: string;
  site_name: string;
  description: string | null;
  website_url: string | null;
  organisation_email: string;
  recruitment_email: string | null;
  telephone: string | null;
  address: string | null;
  country: string | null;
  postcode: string | null;
  logo: SettingsFile | null;
  favicon: SettingsFile | null;
  created_at?: string;
  updated_at?: string;
}

// export type GeneralSettingsFormValues = Omit<
//   GeneralSettings,
//   "id" | "created_at" | "updated_at"
// >;

export interface GeneralSettingsApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface GeneralSettingsFormValues {
  organisation_name: string;
  site_name: string;
  description: string;
  website_url: string;
  organisation_email: string;
  recruitment_email: string;
  telephone: string;
  address: string;
  country: string;
  postcode: string;
  logo?: unknown;
  favicon?: unknown;
}
