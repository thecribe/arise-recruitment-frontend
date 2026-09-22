import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useMemo } from "react";

import FormRenderer from "@/components/forms/FormRenderer";

import { useInterviewDefinition } from "../hooks/useInterviewDefinition";

import {
  useCreateInterview,
  useInterview,
  useUpdateInterview,
} from "../hooks/useInterview";

import { interviewSchema } from "../schemas/interview.schema";

import type { InterviewFormValues } from "../types/interview.types";

interface InterviewScoresheetFormProps {
  applicationId: string;
  interviewerName?: string;
  onSuccess?: () => void;
}

const defaultValues: InterviewFormValues = {
  interviewerName: "",
  interviewDate: "",

  scores: {
    understandingPersonalCare: 0,
    handlingMobilityIssues: 0,
    healthSafetyAwareness: 0,
    knowledgeOfSafeguarding: 0,
    nutritionMealPreparation: 0,

    spokenEnglishCompetency: 0,
    listeningSkills: 0,
    abilityToExplainInstructions: 0,
    empathyProfessionalLanguage: 0,

    timeManagementAwareness: 0,
    attitudeWillingnessToLearn: 0,
    adaptability: 0,
  },

  interviewerSignature: null,
};

export default function InterviewScoresheetForm({
  applicationId,
  interviewerName = "",
  onSuccess,
}: InterviewScoresheetFormProps) {
  const methods = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      ...defaultValues,
      interviewerName,
    },
    mode: "onBlur",
  });

  const {
    data: definition,
    isLoading: isDefinitionLoading,
    isError: isDefinitionError,
  } = useInterviewDefinition();

  const { data: existingInterview, isLoading: isInterviewLoading } =
    useInterview(applicationId);

  const createMutation = useCreateInterview();
  const updateMutation = useUpdateInterview();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const isEditing = Boolean(existingInterview);

  useEffect(() => {
    if (!existingInterview) {
      methods.reset({
        ...defaultValues,
        interviewerName,
      });

      return;
    }

    methods.reset({
      interviewerName: existingInterview.interviewer_name ?? "",

      interviewDate: existingInterview.interview_date ?? "",

      scores: {
        ...defaultValues.scores,
        ...existingInterview.scores,
      },

      interviewerSignature: existingInterview.interviewer_signature ?? null,
    });
  }, [existingInterview, interviewerName, methods]);

  const orderedSections = useMemo(() => {
    if (!definition?.sections) {
      return [];
    }

    return [...definition.sections].sort(
      (firstSection, secondSection) => firstSection.order - secondSection.order,
    );
  }, [definition]);

  const onSubmit = async (values: InterviewFormValues) => {
    if (isEditing) {
      await updateMutation.mutateAsync({
        applicationId,
        data: values,
      });
    } else {
      await createMutation.mutateAsync({
        applicationId,
        data: values,
      });
    }

    onSuccess?.();
  };

  if (isDefinitionLoading || isInterviewLoading) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/70 p-6 text-sm text-slate-600 shadow-lg backdrop-blur-xl">
        Loading interview scoresheet...
      </div>
    );
  }

  if (isDefinitionError || !definition) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50/70 p-6 text-sm text-red-700">
        Unable to load the interview scoresheet.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/20 bg-white/75 p-5 shadow-lg backdrop-blur-xl sm:p-6">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            {definition.title}
          </h2>

          <span
            className={[
              "inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold",
              isEditing
                ? "bg-emerald-100 text-emerald-700"
                : "bg-blue-100 text-blue-700",
            ].join(" ")}
          >
            {isEditing ? "Saved interview" : "New interview"}
          </span>
        </div>

        {definition.description && (
          <p className="mt-1 text-sm text-slate-500">
            {definition.description}
          </p>
        )}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {orderedSections.map((section) => (
            <section
              key={section.id}
              className="rounded-2xl border border-blue-100/80 bg-blue-50/30 p-4 sm:p-5"
            >
              <div className="mb-5">
                <h3 className="text-base font-semibold text-slate-900">
                  {section.title}
                </h3>

                {section.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {section.description}
                  </p>
                )}
              </div>

              <FormRenderer
                fields={section.fields}
                config={{
                  mode: "edit",
                  canEdit: true,
                }}
              />
            </section>
          ))}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200/70 pt-5 sm:flex-row sm:justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Update interview"
                  : "Save interview"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
