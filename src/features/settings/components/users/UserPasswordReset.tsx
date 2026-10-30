import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, KeyRound, LoaderCircle, ShieldAlert } from "lucide-react";

import { useResetUserPassword } from "../../hooks/useUsers";
import type { User } from "../../types/user.types";

const passwordResetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm the password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type PasswordResetValues = z.infer<typeof passwordResetSchema>;

interface UserPasswordResetProps {
  user: User;
}

const inputClassName =
  "w-full rounded-xl border border-blue-200/70 bg-white/70 px-4 py-3 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-blue-900/60 dark:bg-slate-900/60 dark:text-slate-100";

export default function UserPasswordReset({ user }: UserPasswordResetProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const resetPassword = useResetUserPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PasswordResetValues>({
    resolver: zodResolver(passwordResetSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: PasswordResetValues) => {
    resetPassword.mutate(
      {
        id: user.id,
        password: values.password,
      },
      {
        onSuccess: () => {
          reset();
          setShowConfirmation(false);
          setShowPassword(false);
        },
      },
    );
  };

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-blue-100/80 bg-white/70 p-4 shadow-sm backdrop-blur-xl dark:border-blue-950/70 dark:bg-slate-950/50 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <KeyRound size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Reset password
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Set a new password for {user.first_name} {user.last_name}. Their
              existing sessions will be revoked.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(() => setShowConfirmation(true))}
          className="mt-6 max-w-xl space-y-5"
        >
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              New password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter a new password"
                {...register("password")}
                className={inputClassName}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : "password-hint"
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-800"
                aria-label={showPassword ? "Hide passwords" : "Show passwords"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password ? (
              <p
                id="password-error"
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors.password.message}
              </p>
            ) : (
              <p
                id="password-hint"
                className="mt-2 text-xs text-slate-500 dark:text-slate-400"
              >
                Use at least 8 characters.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Confirm new password
            </label>

            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter the new password"
              {...register("confirmPassword")}
              className={inputClassName}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? "confirm-password-error" : undefined
              }
            />

            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 dark:border-amber-900/60 dark:bg-amber-950/20">
            <div className="flex items-start gap-2.5">
              <ShieldAlert
                size={19}
                className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-400"
              />
              <p className="text-sm leading-5 text-amber-800 dark:text-amber-200">
                Resetting the password signs the user out of their existing
                sessions. They will need to sign in again with the new password.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || resetPassword.isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <KeyRound size={17} />
            Continue to confirmation
          </button>
        </form>
      </div>

      {showConfirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-password-title"
            className="w-full max-w-md rounded-2xl border border-blue-100 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl dark:border-blue-950 dark:bg-slate-950/95 sm:p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <ShieldAlert size={23} />
            </div>

            <h3
              id="reset-password-title"
              className="mt-4 text-lg font-semibold text-slate-900 dark:text-white"
            >
              Confirm password reset
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Are you sure you want to reset the password for{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                {user.first_name} {user.last_name}
              </span>
              ? Their existing sessions will be revoked.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={resetPassword.isPending}
                onClick={() => setShowConfirmation(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={resetPassword.isPending}
                onClick={handleSubmit(onSubmit)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resetPassword.isPending && (
                  <LoaderCircle size={17} className="animate-spin" />
                )}
                {resetPassword.isPending
                  ? "Resetting password..."
                  : "Confirm reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
