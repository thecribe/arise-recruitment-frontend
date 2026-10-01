import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtSign,
  LockKeyhole,
  Save,
  Loader2,
  RefreshCw,
  Copy,
  Check,
  CheckCircle2,
} from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";
import { FIELD_WIDTH, type FormField } from "@/components/forms/types/field";

import {
  updateEmailSchema,
  updatePasswordSchema,
  type UpdateEmailFormValues,
  type UpdatePasswordFormValues,
} from "../schema/profile.schema";

import {
  useProfile,
  useUpdateProfileEmail,
  useUpdateProfilePassword,
} from "../hooks/useProfile";

interface ProfileSecurityProps {
  applicantId: string;
}

const generatePassword = (length = 16) => {
  const lowercase = "abcdefghijkmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numbers = "23456789";
  const symbols = "!@#$%^&*()-_=+";
  const allCharacters = lowercase + uppercase + numbers + symbols;

  // Use the browser's cryptographically secure random generator.
  const randomIndex = (max: number) => {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0] % max;
  };

  const passwordCharacters = [
    lowercase[randomIndex(lowercase.length)],
    uppercase[randomIndex(uppercase.length)],
    numbers[randomIndex(numbers.length)],
    symbols[randomIndex(symbols.length)],
  ];

  while (passwordCharacters.length < length) {
    passwordCharacters.push(allCharacters[randomIndex(allCharacters.length)]);
  }

  // Shuffle to avoid predictable character positions.
  for (let i = passwordCharacters.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [passwordCharacters[i], passwordCharacters[j]] = [
      passwordCharacters[j],
      passwordCharacters[i],
    ];
  }

  return passwordCharacters.join("");
};

export default function ProfileSecurity({ applicantId }: ProfileSecurityProps) {
  const { data, isLoading, isError, refetch } = useProfile(applicantId);

  const user = data?.user;

  const [copied, setCopied] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const emailMethods = useForm<UpdateEmailFormValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const passwordMethods = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const emailMutation = useUpdateProfileEmail(applicantId);
  const passwordMutation = useUpdateProfilePassword(applicantId);

  useEffect(() => {
    if (!user) return;

    emailMethods.reset({
      email: user.email ?? "",
    });
  }, [user?.email, emailMethods.reset]);

  const emailFields: FormField[] = [
    {
      id: "email",
      name: "email",
      label: "Email address",
      type: "email",
      placeholder: "Enter email address",
      required: true,
      order: 1,
      width: FIELD_WIDTH.FULL,
    },
  ];

  const passwordFields: FormField[] = [
    {
      id: "password",
      name: "password",
      label: "New password",
      type: "password",
      placeholder: "Enter new password",
      required: true,
      order: 1,
      width: FIELD_WIDTH.HALF,
    },
    {
      id: "confirm-password",
      name: "confirmPassword",
      label: "Confirm password",
      type: "password",
      placeholder: "Confirm new password",
      required: true,
      order: 2,
      width: FIELD_WIDTH.HALF,
    },
  ];

  const onEmailSubmit = async (values: UpdateEmailFormValues) => {
    setEmailSuccess(false);

    await emailMutation.mutateAsync({
      email: values.email,
    });

    setEmailSuccess(true);
  };

  const onPasswordSubmit = async (values: UpdatePasswordFormValues) => {
    await passwordMutation.mutateAsync({
      password: values.password,
    });

    passwordMethods.reset({
      password: "",
      confirmPassword: "",
    });
    setCopied(false);
  };

  const handleGeneratePassword = () => {
    const password = generatePassword();

    passwordMethods.setValue("password", password, {
      shouldDirty: true,
      shouldValidate: true,
    });

    passwordMethods.setValue("confirmPassword", password, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setCopied(false);
  };

  const handleCopyPassword = async () => {
    const password = passwordMethods.getValues("password");

    if (!password) return;

    await navigator.clipboard.writeText(password);
    setCopied(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-3xl border border-blue-100/70 bg-white/70 p-6 shadow-sm backdrop-blur-xl">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        <span className="ml-2 text-sm text-slate-500">
          Loading security settings...
        </span>
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
    <div className="space-y-5">
      {/* Email settings */}
      <section className="rounded-3xl border border-white/20 bg-white/75 p-4 shadow-lg backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <AtSign size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Email address
            </h2>
            <p className="text-sm text-slate-500">
              Update the applicant's login email.
            </p>
          </div>
        </div>

        <FormProvider {...emailMethods}>
          <form
            onSubmit={emailMethods.handleSubmit(onEmailSubmit)}
            className="space-y-5"
          >
            <FormRenderer
              fields={emailFields}
              config={{
                mode: "edit",
                canEdit: true,
              }}
            />

            <div className="flex justify-end border-t border-slate-200/70 pt-4">
              <button
                type="submit"
                disabled={
                  emailMutation.isPending || !emailMethods.formState.isDirty
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {emailMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {emailMutation.isPending ? "Updating..." : "Update email"}
              </button>
            </div>
          </form>
        </FormProvider>
        {emailSuccess && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800 mt-5"
          >
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-green-600"
            />

            <div>
              <p className="font-semibold">Verification email sent</p>
              <p className="mt-1 text-green-700">
                A verification email has been sent to the applicant's new email
                address. The applicant must verify it to complete the email
                change.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Password settings */}
      <section className="rounded-3xl border border-white/20 bg-white/75 p-4 shadow-lg backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <LockKeyhole size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Change password
            </h2>
            <p className="text-sm text-slate-500">
              Set a new password or generate one automatically.
            </p>
          </div>
        </div>

        <FormProvider {...passwordMethods}>
          <form
            onSubmit={passwordMethods.handleSubmit(onPasswordSubmit)}
            className="space-y-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleGeneratePassword}
                disabled={passwordMutation.isPending}
                className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw size={16} />
                Generate password
              </button>

              {passwordMethods.watch("password") && (
                <button
                  type="button"
                  onClick={handleCopyPassword}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  {copied ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} />
                  )}
                  {copied ? "Copied" : "Copy password"}
                </button>
              )}
            </div>

            <FormRenderer
              fields={passwordFields}
              config={{
                mode: "edit",
                canEdit: true,
              }}
            />

            <div className="flex justify-end border-t border-slate-200/70 pt-4">
              <button
                type="submit"
                disabled={
                  passwordMutation.isPending ||
                  !passwordMethods.formState.isDirty
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {passwordMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {passwordMutation.isPending ? "Updating..." : "Change password"}
              </button>
            </div>
          </form>
        </FormProvider>
      </section>
    </div>
  );
}
