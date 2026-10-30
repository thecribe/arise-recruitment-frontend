import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Save, UserRound } from "lucide-react";
import { userUpdateSchema } from "../../schemas/user.schema";
import { getUserFields } from "../../forms/user.fields";
import { useAssignableRoles, useUpdateUser } from "../../hooks/useUsers";
import type { User } from "../../types/user.types";
import FormRenderer from "@/components/forms/FormRenderer";

type UserProfileFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  postcode: string;
};

interface UserProfileDetailsProps {
  user: User;
}

export default function UserProfileDetails({ user }: UserProfileDetailsProps) {
  const { data: roles = [] } = useAssignableRoles();
  const updateUser = useUpdateUser();

  const defaultValues = useMemo<UserProfileFormValues>(
    () => ({
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      email: user.email ?? "",
      phone_number: user.phone_number ?? "",
      address: user.address ?? "",
      postcode: user.postcode ?? "",
    }),
    [
      user.first_name,
      user.last_name,
      user.email,
      user.phone_number,
      user.address,
      user.postcode,
    ],
  );

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues,
    mode: "onChange",
  });

  const { reset, handleSubmit, formState } = form;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const fields = useMemo(() => {
    const profileFieldNames = new Set([
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "address",
      "postcode",
    ]);

    return getUserFields(roles).filter(
      (field) => field.name !== undefined && profileFieldNames.has(field.name),
    );
  }, [roles]);

  const onSubmit = (values: UserProfileFormValues) => {
    updateUser.mutate(
      {
        id: user.id,
        values: {
          first_name: values.first_name.trim(),
          last_name: values.last_name.trim(),
          email: values.email.trim(),
          phone_number: values.phone_number.trim() || null,
          address: values.address.trim() || null,
          postcode: values.postcode.trim() || null,
        },
      },
      {
        onSuccess: () => reset(values),
      },
    );
  };

  return (
    <section className="rounded-2xl border border-blue-100/80 bg-white/70 p-4 shadow-sm backdrop-blur-xl dark:border-blue-950/70 dark:bg-slate-950/50 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          <UserRound size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Profile details
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update the user's name and contact information.
          </p>
        </div>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <FormRenderer fields={fields} config={{ mode: "edit" }} />

          <div className="flex flex-col-reverse gap-3 border-t border-blue-100 pt-4 dark:border-blue-950 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={!formState.isDirty || updateUser.isPending}
              onClick={() => reset(defaultValues)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Discard changes
            </button>

            <button
              type="submit"
              disabled={
                !formState.isDirty || !formState.isValid || updateUser.isPending
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={17} />
              {updateUser.isPending ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
