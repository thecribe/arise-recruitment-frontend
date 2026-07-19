/**
 * -----------------------------------------------------------------------------
 * File: ForgotPasswordPage.tsx
 * Description:
 * Forgot password request page.
 *
 * Responsibilities:
 * - Capture user email.
 * - Request password reset email.
 * - Navigate back to login.
 * -----------------------------------------------------------------------------
 */

import { ArrowLeft, ArrowRight, Mail } from "lucide-react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { FormInput } from "@/components/forms";

import { ROUTES } from "@/constants/routes";

import AuthHeader from "../components/AuthHeader";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/forgot-password.schema";
import { useState } from "react";
import { useForgotPassword } from "../hooks/use-auth";
import { LoadingButton } from "@/components/ui/loading-button";

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const forgotPasswordMutation = useForgotPassword();
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),

    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    console.log("Forgot password request:", values);

    forgotPasswordMutation.mutate(values.email, {
      /**
       * TODO:
       * - Call forgot password API
       * - Show success notification
       * - Redirect user if required
       */
      onSuccess: () => {
        /**
         * TODO:
         * Replace with notification system
         */

        onSuccess: () => {
          setEmailSent(true);
        };
      },

      onError: (error) => {
        console.error(error);
      },
    });
  };

  if (emailSent) {
    return (
      <Card className="w-full max-w-3xl">
        <CardContent className="p-8 md:p-10">
          <div className="space-y-8 text-center">
            <AuthHeader
              title="Check your email"
              description="
                      If an account exists with this email, a password reset link has been sent."
            />
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="w-full max-w-lg">
      <CardContent className="p-8 md:p-12">
        <div className="space-y-8">
          <AuthHeader
            title="Forgot Password?"
            description="
              Enter your email and we will send you
              instructions to reset your password.
            "
          />

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              required
              icon={<Mail className="h-5 w-5" />}
            />

            <LoadingButton
              type="submit"
              loading={forgotPasswordMutation.isPending}
              loadingText="Sending email..."
            >
              Send reset link
            </LoadingButton>
          </form>

          <Link
            to={ROUTES.AUTH.LOGIN}
            className="
              flex
              items-center
              justify-center
              gap-2
              text-sm
              font-medium
              text-blue-600
              hover:text-blue-700
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
