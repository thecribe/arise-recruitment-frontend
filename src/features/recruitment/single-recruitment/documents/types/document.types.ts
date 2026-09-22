import type { FieldType } from "@/components/forms/types/field";

export interface ApplicationDocument {
  documentType: "application_form";

  application: {
    id: string;
    status: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  };

  applicant: Record<string, unknown> | null;

  sections: ApplicationDocumentSection[];

  references: ApplicationReference[];

  generatedAt: string;
}

export interface ApplicationDocumentSection {
  sectionId: string;
  status: string;
  recruiterComment: string | null;
  submittedAt: string | null;
  approvedAt: string | null;
  values: Record<string, unknown> | unknown[];
}

export interface ApplicationReference {
  id: string;
  [key: string]: unknown;
}

export interface ApplicationDefinitionField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: unknown;
  placeholder?: string | null;
  description?: string | null;
  file?: {
    multiple?: boolean;
  } | null;
}

export interface ApplicationDefinitionSection {
  id: string;
  title: string;
  description?: string | null;
  order?: number;
  repeatable?: boolean;
  minItems?: number;
  maxItems?: number;
  fields: ApplicationDefinitionField[];
}

export interface ApplicationDefinitionPhase {
  id: string;
  title: string;
  description?: string | null;
  order?: number;
  sections: ApplicationDefinitionSection[];
}
