// import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home, Mail, Phone, User } from "lucide-react";
import type { AxiosError } from "axios";

import { FormInput } from "@/components/forms/publicforms/FormInput";
import { FormSelect } from "@/components/forms/publicforms/FormSelect";
import { LoadingButton } from "@/components/ui/loading-button";
import { useBootstrapData } from "@/hooks/useBootstrapData";
import { notification } from "@/components/feedback/notification";

import {
  addApplicantSchema,
  type AddApplicantFormValues,
} from "../../schemas/add-applicant.schema";

interface AddApplicantFormProps {
  onSubmit: (values: AddApplicantFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const AddApplicantForm = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: AddApplicantFormProps) => {
  const { jobTypes, isLoading, isError } = useBootstrapData();

  const form = useForm<AddApplicantFormValues>({
    resolver: zodResolver(addApplicantSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      postcode: "",
      jobTypeId: "",
    },
  });

  // const jobOptions = useMemo(
  //   () =>
  //     jobTypes?.data?.jobTypes?.map(
  //       ({ id, name }: { id: string; name: string }) => ({
  //         label: name,
  //         value: id,
  //       }),
  //     ) ?? [],
  //   [jobTypes],
  // );
  const jobOptions = jobTypes?.data?.jobTypes.map(
    ({ id, name }: { id: string; name: string }) => ({
      label: name,
      value: id,
    }),
  );
  console.log(jobOptions);
  const handleSubmit = async (values: AddApplicantFormValues) => {
    try {
      await onSubmit(values);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      notification.error(
        axiosError.response?.data?.message ??
          "Unable to create applicant. Please try again.",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <span className="text-sm text-slate-500">Loading job types...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-700">
          Unable to load job types. Please try again.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput
          control={form.control}
          name="firstName"
          label="First name"
          placeholder="John"
          required
          icon={<User className="h-5 w-5" />}
        />

        <FormInput
          control={form.control}
          name="lastName"
          label="Last name"
          placeholder="Smith"
          required
          icon={<User className="h-5 w-5" />}
        />
      </div>

      <FormInput
        control={form.control}
        name="email"
        label="Email address"
        placeholder="john@example.com"
        type="email"
        required
        icon={<Mail className="h-5 w-5" />}
      />

      <FormInput
        control={form.control}
        name="phoneNumber"
        label="Phone number"
        placeholder="+44..."
        required
        icon={<Phone className="h-5 w-5" />}
      />

      <FormInput
        control={form.control}
        name="address"
        label="Address"
        placeholder="Enter full address"
        required
        icon={<Home className="h-5 w-5" />}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput
          control={form.control}
          name="postcode"
          label="Postcode"
          placeholder="SW1A 1AA"
          required
        />

        <FormSelect
          control={form.control}
          name="jobTypeId"
          label="Job type"
          placeholder="Select job type"
          options={jobOptions}
          required
        />
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3">
        <p className="text-xs leading-relaxed text-blue-800">
          An email verification link will be sent to the applicant after their
          account has been created.
        </p>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <LoadingButton
          type="submit"
          loading={isSubmitting}
          loadingText="Creating applicant..."
        >
          Create applicant
        </LoadingButton>
      </div>
    </form>
  );
};

export default AddApplicantForm;
