export interface GeneralSettingsLogo {
  id?: string;
  document_url: string;
  name?: string;
  mimetype?: string;
  size?: number;
}

export interface GeneralSettings {
  id: string;
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
  logo: GeneralSettingsLogo | null;
  favicon: GeneralSettingsLogo | null;
}
