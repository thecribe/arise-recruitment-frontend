import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useSearchParams } from "react-router-dom";

import type { ReferenceResponseFormValues } from "@/features/recruitment/types/reference.types";

import {
  useRefereeForm,
  useSubmitRefereeForm,
} from "../hooks/referee-form.hooks";

import RefereeDetailsCard from "../components/RefereeDetailsCard";
import RefereeFormContent from "../components/RefereeFormContent";
import RefereeFormLoading from "../components/RefereeFormLoading";
import RefereeFormError from "../components/RefereeFormError";
import RefereeFormSuccess from "../components/RefereeFormSuccess";

import { referenceResponseSchema } from "@/features/recruitment/single-recruitment/components/compliance/sections/reference/schemas/reference-response.schema";

import { referenceResponseFormToApi } from "@/features/recruitment/single-recruitment/components/compliance/sections/reference/utils/reference-response.utils";

import { referenceResponseFields } from "@/features/recruitment/single-recruitment/components/compliance/sections/reference/forms/reference-response.fields";

const RefereeFormPage = () => {
  /**
   * ---------------------------------------------------------------------------
   * URL Parameters
   * ---------------------------------------------------------------------------
   */

  const { referenceId = "" } = useParams<{
    referenceId: string;
  }>();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") ?? "";

  /**
   * ---------------------------------------------------------------------------
   * Reference Details Query
   * ---------------------------------------------------------------------------
   */

  const { data, isLoading, isError, refetch } = useRefereeForm(
    referenceId,
    token,
  );

  /**
   * ---------------------------------------------------------------------------
   * Submission Mutation
   * ---------------------------------------------------------------------------
   */

  const submitReference = useSubmitRefereeForm(referenceId, token);

  /**
   * ---------------------------------------------------------------------------
   * Form Setup
   * ---------------------------------------------------------------------------
   *
   * Always start with empty values.
   * Existing reference responses are never fetched or populated.
   *
   * ---------------------------------------------------------------------------
   */

  const methods = useForm<ReferenceResponseFormValues>({
    resolver: zodResolver(referenceResponseSchema),

    defaultValues: {
      reEmploy: "Yes",

      suitabilityToRole: undefined,
      knowledge: undefined,
      abilityToWorkUnderPressure: undefined,
      interpersonalSkills: undefined,
      timeKeeping: undefined,
      consultationSkills: undefined,
      cooperationWithOtherStaff: undefined,
      presentation: undefined,
      trustworthiness: undefined,
      reliability: undefined,
      computerSkills: undefined,

      detailReference: "",
      refererName: "",
      refererSignature: null,
      signatureDate: "",
    },
  });

  /**
   * ---------------------------------------------------------------------------
   * Form Submission
   * ---------------------------------------------------------------------------
   */

  const handleFormSubmit = async (values: ReferenceResponseFormValues) => {
    const payload = referenceResponseFormToApi(values, referenceResponseFields);

    await submitReference.mutateAsync(payload);
  };

  /**
   * ---------------------------------------------------------------------------
   * Page States
   * ---------------------------------------------------------------------------
   */

  // Invalid URL parameters

  if (!referenceId || !token) {
    return <RefereeFormError />;
  }

  // Loading reference details

  if (isLoading) {
    return <RefereeFormLoading />;
  }

  // Successful submission
  // Check before query error because the mutation removes the detail query.

  if (submitReference.isSuccess) {
    return <RefereeFormSuccess />;
  }

  // Invalid, expired or already-used reference link

  if (isError || !data) {
    return <RefereeFormError onRetry={() => refetch()} />;
  }

  /**
   * ---------------------------------------------------------------------------
   * Page Content
   * ---------------------------------------------------------------------------
   */

  return (
    <div className="w-full space-y-6">
      {/* Applicant and Referee Details */}

      <RefereeDetailsCard details={data} />

      {/* Reference Assessment Form */}

      <RefereeFormContent
        form={methods}
        onSubmit={handleFormSubmit}
        isSubmitting={submitReference.isPending}
        isError={submitReference.isError}
      />
    </div>
  );
};

export default RefereeFormPage;
