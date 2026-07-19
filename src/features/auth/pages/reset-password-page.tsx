/**
 * -----------------------------------------------------------------------------
 * File: ResetPasswordPage.tsx
 * Description:
 * Password reset page.
 *
 * Responsibilities:
 * - Capture new password.
 * - Validate password confirmation.
 * - Submit password update request.
 * -----------------------------------------------------------------------------
 */

import { ArrowRight, LockKeyhole } from "lucide-react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { FormPassword } from "@/components/forms";

import { ROUTES } from "@/constants/routes";

import AuthHeader from "../components/AuthHeader";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/reset-password.schema";
import { LoadingButton } from "@/components/ui/loading-button";
import { useResetPassword } from "../hooks/use-auth";

export default function ResetPasswordPage() {
  const resetPasswordMutation = useResetPassword();
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    console.log("Reset password payload:", values);

    /**
     * TODO:
     * - Read reset token from URL
     * - Call reset password API
     * - Redirect to login
     */
  };

  return (
    <Card className="w-full max-w-lg">
      <CardContent className="p-8 md:p-12">
        <div className="space-y-8">
          <AuthHeader
            title="Create New Password"
            description="
              Choose a strong password for your Airse account.
            "
          />

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormPassword
              control={form.control}
              name="password"
              label="New Password"
              placeholder="Enter your new password"
              required
              icon={<LockKeyhole className="h-5 w-5" />}
            />

            <FormPassword
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your new password"
              required
              icon={<LockKeyhole className="h-5 w-5" />}
            />

            <LoadingButton
              type="submit"
              loading={resetPasswordMutation.isPending}
              loadingText="Updating password..."
            >
              Reset password
            </LoadingButton>
          </form>

          <Link
            to={ROUTES.AUTH.LOGIN}
            className="
              text-center
              block
              text-sm
              font-medium
              text-blue-600
              hover:text-blue-700
            "
          >
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
