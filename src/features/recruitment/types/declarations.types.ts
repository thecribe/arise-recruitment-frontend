import type { FormField } from "@/components/forms/types/field";

export interface DeclarationSection {
  id: string;
  text: string;
  fields: FormField[];
}

export type DeclarationSections = DeclarationSection[];

export type DeclarationValues = Record<string, Record<string, unknown>>;
