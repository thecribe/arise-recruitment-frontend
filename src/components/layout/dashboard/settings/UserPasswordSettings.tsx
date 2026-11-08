import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Loader2,
  Save,
  RotateCcw,
} from "lucide-react";
import { useUpdateOwnPassword } from "@/features/recruitment/single-recruitment/components/settings/hooks/useProfile";

import {
  updateOwnPasswordSchema,
  type UpdateOwnPasswordFormValues,
} from "@/features/recruitment/single-recruitment/components/settings/schema/profile.schema";

const UserPasswordSettings = () => {
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const updateMutation = useUpdateOwnPassword();
  const isSubmitting = updateMutation.isPending;

  const methods = useForm<UpdateOwnPasswordFormValues>({
    resolver: zodResolver(updateOwnPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = methods;

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const onSubmit = async (values: UpdateOwnPasswordFormValues) => {
    try {
      await updateMutation.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      reset();
      setShowPasswords({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
    } catch {
      // The mutation hook handles error notifications.
    }
  };

  const handleReset = () => {
    reset();
    setShowPasswords({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
  };

  const passwordFields = [
    {
      name: "currentPassword" as const,
      label: "Current password",
      placeholder: "Enter your current password",
    },
    {
      name: "newPassword" as const,
      label: "New password",
      placeholder: "Enter your new password",
    },
    {
      name: "confirmPassword" as const,
      label: "Confirm new password",
      placeholder: "Re-enter your new password",
    },
  ];

  return (
    <div className="rounded-2xl border border-white/20 bg-white/75 p-4 shadow-lg backdrop-blur-xl sm:p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
          <LockKeyhole size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Change password
          </h2>
          <p className="text-sm text-slate-500">
            Update your password to keep your account secure.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          {passwordFields.map((field) => {
            const isVisible = showPasswords[field.name];
            const error = errors[field.name];

            return (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  {field.label}
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    id={field.name}
                    type={isVisible ? "text" : "password"}
                    placeholder={field.placeholder}
                    autoComplete={
                      field.name === "currentPassword"
                        ? "current-password"
                        : "new-password"
                    }
                    {...register(field.name)}
                    className={`w-full rounded-xl border bg-white/80 px-4 py-3 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 ${
                      error ? "border-red-300" : "border-slate-200"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(field.name)}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                  >
                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {error && (
                  <p className="mt-1.5 text-xs text-red-600">{error.message}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3">
          <p className="text-xs font-medium text-blue-800">
            Password requirements
          </p>
          <p className="mt-1 text-xs leading-relaxed text-blue-700">
            Your new password must contain at least 8 characters and cannot
            exceed 128 characters.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200/70 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting || !isDirty}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}

            {isSubmitting ? "Updating..." : "Update password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserPasswordSettings;
