import { instance } from "@/api/client";
import type { FormField } from "@/components/forms/types/field";

export interface InterviewDefinitionSection {
  id: string;
  phaseId: string;
  title: string;
  description?: string;
  order: number;
  repeatable: boolean;
  fields: FormField[];
}

export interface InterviewDefinition {
  id: string;
  title: string;
  description?: string;
  order: number;
  sections: InterviewDefinitionSection[];
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Get the complete interview definition.
 */
export const getInterviewDefinition =
  async (): Promise<InterviewDefinition> => {
    const response = await instance.get<ApiResponse<InterviewDefinition>>(
      "/interview/definition",
    );

    return response.data.data;
  };

/**
 * Get all interview sections.
 */
export const getInterviewSections = async (): Promise<
  InterviewDefinitionSection[]
> => {
  const response = await instance.get<
    ApiResponse<InterviewDefinitionSection[]>
  >("/interview/definition/sections");

  return response.data.data;
};

/**
 * Get fields for a specific interview section.
 */
export const getInterviewSectionFields = async (
  sectionId: string,
): Promise<FormField[]> => {
  const response = await instance.get<ApiResponse<FormField[]>>(
    `/interview/definition/sections/${sectionId}/fields`,
  );

  return response.data.data;
};
