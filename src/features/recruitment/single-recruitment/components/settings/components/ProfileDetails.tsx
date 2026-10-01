import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { UserRound, RotateCcw, Save, Loader2 } from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";
import type { FormField } from "@/components/forms/types/field";
import { FIELD_WIDTH } from "@/features/application/types";

import { profileSchema } from "../schema/profile.schema";
import { useProfile, useUpdateProfile } from "../hooks/useProfile";
import type { ProfileFormValues } from "../types/profile.types";

interface ProfileDetailsProps {
  applicantId: string;
}

const getProfileFormValues = (
  user: Partial<ProfileFormValues> | null | undefined,
): ProfileFormValues => ({
  first_name: user?.first_name ?? "",
  last_name: user?.last_name ?? "",
  phone_number: user?.phone_number ?? "",
  address: user?.address ?? "",
  postcode: user?.postcode ?? "",
  profile_img: user?.profile_img ?? null,
});

const ProfileDetails = ({ applicantId }: ProfileDetailsProps) => {
  const { data, isLoading, isError, refetch } = useProfile(applicantId);

  const user = data?.user;

  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: getProfileFormValues(user),
    mode: "onBlur",
  });

  const updateMutation = useUpdateProfile(applicantId);
  const isSubmitting = updateMutation.isPending;

  // Initialize the form when the applicant data becomes available.
  useEffect(() => {
    if (!user) return;

    methods.reset(getProfileFormValues(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, methods.reset]);

  const fields = useMemo<FormField[]>(
    () => [
      {
        id: "first-name",
        name: "first_name",
        label: "First name",
        type: "text",
        placeholder: "Enter first name",
        required: true,
        order: 1,
        width: FIELD_WIDTH.HALF,
      },
      {
        id: "last-name",
        name: "last_name",
        label: "Last name",
        type: "text",
        placeholder: "Enter last name",
        required: true,
        order: 2,
        width: FIELD_WIDTH.HALF,
      },
      {
        id: "phone-number",
        name: "phone_number",
        label: "Phone number",
        type: "tel",
        placeholder: "Enter phone number",
        required: true,
        order: 3,
        width: FIELD_WIDTH.HALF,
      },
      {
        id: "postcode",
        name: "postcode",
        label: "Postcode",
        type: "text",
        placeholder: "Enter postcode",
        required: true,
        order: 4,
        width: FIELD_WIDTH.HALF,
      },
      {
        id: "address",
        name: "address",
        label: "Address",
        type: "textarea",
        placeholder: "Enter full address",
        required: true,
        order: 5,
        width: FIELD_WIDTH.FULL,
        rows: 3,
      },
      {
        id: "profile-image",
        name: "profile_img",
        label: "Profile image",
        type: "file",
        helpText: "Upload a profile image. JPG, PNG or WEBP.",
        order: 6,
        width: FIELD_WIDTH.FULL,
        file: {
          accept: ["image/jpeg", "image/png", "image/webp"],
          maxSizeMB: 5,
          multiple: false,
        },
      },
    ],
    [],
  );

  const onSubmit = async (values: ProfileFormValues) => {
    await updateMutation.mutateAsync(values);
  };

  const handleReset = () => {
    if (!user) return;

    methods.reset(getProfileFormValues(user));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-3xl border border-blue-100/70 bg-white/70 p-6 shadow-sm backdrop-blur-xl">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        <span className="ml-2 text-sm text-slate-500">Loading profile...</span>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="rounded-3xl border border-red-200 bg-white/75 p-5 shadow-sm">
        <p className="text-sm font-medium text-red-700">
          Unable to load applicant profile.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/20 bg-white/75 p-4 shadow-lg backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
          <UserRound size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Personal details
          </h2>
          <p className="text-sm text-slate-500">
            Update the applicant's contact and profile information.
          </p>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FormRenderer
            fields={fields}
            config={{
              mode: "edit",
              canEdit: true,
            }}
          />

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200/70 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting || !methods.formState.isDirty}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !methods.formState.isDirty}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProfileDetails;
