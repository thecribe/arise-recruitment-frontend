import type { FormField } from "@/components/forms/types/field";

import type {
  ReferenceResponse,
  ReferenceResponseApiPayload,
  ReferenceResponseFormValues,
} from "@/features/recruitment/types/reference.types";

const RATING_GROUP = "ratings";

export const referenceResponseFormToApi = (
  values: ReferenceResponseFormValues,
  fields: FormField[],
): ReferenceResponseApiPayload => {
  const ratings: Record<string, unknown> = {};

  for (const field of fields) {
    if (field.metadata?.group !== RATING_GROUP || !field.name) {
      continue;
    }

    ratings[field.name] =
      values[field.name as keyof ReferenceResponseFormValues];
  }

  return {
    reEmploy: values.reEmploy,
    ratings,
    detailReference: values.detailReference,
    refererName: values.refererName,
    refererSignature: values.refererSignature,
    signatureDate: values.signatureDate,
  };
};

export const referenceResponseApiToForm = (
  response: ReferenceResponse,
  fields: FormField[],
): Partial<ReferenceResponseFormValues> => {
  const result: Record<string, unknown> = {
    reEmploy: response.reEmploy,
    detailReference: response.detailReference ?? "",
    refererName: response.refererName ?? "",
    refererSignature: response.refererSignature ?? null,
    signatureDate: response.signatureDate ?? "",
  };

  const ratings = response.ratings ?? {};

  for (const field of fields) {
    if (field.metadata?.group !== RATING_GROUP || !field.name) {
      continue;
    }

    result[field.name] = ratings[field.name as keyof typeof ratings] ?? "";
  }

  return result as Partial<ReferenceResponseFormValues>;
};
