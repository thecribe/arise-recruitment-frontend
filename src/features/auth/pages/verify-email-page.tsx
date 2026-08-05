/**
 * -----------------------------------------------------------------------------
 * File: VerifyEmailPage.tsx
 *
 * Description:
 * Email verification page.
 *
 * Responsibilities:
 * - Verify email verification token.
 * - Allow applicant to create their password.
 * - Complete account activation.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";

import { LoaderCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { ROUTES } from "@/constants/routes";

import AuthHeader from "../components/AuthHeader";

import { notification } from "@/components/feedback/notification";

import type { AxiosError } from "axios";
import { LockKeyhole } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { FormPassword } from "@/components/forms";

import { LoadingButton } from "@/components/ui/loading-button";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/reset-password.schema";
import { useResetPassword, useVerifyEmail } from "../hooks/use-auth";



  export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  

  const verificationToken = searchParams.get("token");

  const verifyEmailMutation = useVerifyEmail();

  const setPasswordMutation = useResetPassword("setPassword");

 const [passwordCreated, setPasswordCreated] =   useState(false);

    

const form = useForm<ResetPasswordFormValues>({
  resolver: zodResolver(resetPasswordSchema),

  defaultValues: {
    password: "",
    confirmPassword: "",
  },
});

  /**
   * Returned from verify-email endpoint.
   * Used when creating the account password.
   */
  const [setPasswordToken, setSetPasswordToken] =
    useState("");

const hasVerified = useRef(false);

    const onSubmit = (values: ResetPasswordFormValues) => {
  setPasswordMutation.mutate(
    {
      token: setPasswordToken,
      password: values.password,
            confirmPassword: values.confirmPassword

    },
    {
      onSuccess: () => {
        notification.success(
          "Password created successfully.",
        );
        setPasswordCreated(true)
       
      },

      onError: (error) => {
        const axiosError = error as AxiosError<{
          message: string;
        }>;

        notification.error(
          axiosError.response?.data.message ??
            "Unable to create password.",
        );
      },
    },
  );
};

  useEffect(() => {
    
  //     if (hasVerified.current) return;

  // hasVerified.current = true;

    if (!verificationToken) {
            notification.error(
        "Verification token is missing.",
      );
      return;
    }

    verifyEmailMutation.mutate(verificationToken, {
      onSuccess: (data ) => {
       
        console.log(data,"data")
        setSetPasswordToken(data.setPasswordToken);
         notification.success(
          "Email verified successfully. Please create your password to activate your account.",
        );
      },

      onError: (error) => {
   
        const axiosError = error as AxiosError<{
          message: string;
          errors?: string[];
        }>;

        console.log(axiosError.response?.data.message,"error")
        notification.error(
          axiosError.response?.data.message ??
            "Unable to verify email.",
        );

       
      },
    });
  }, [verificationToken]);



if (verifyEmailMutation.isError) {
  return (
    <Card className="w-full max-w-xl">
      <CardContent className="p-8 md:p-10">
        <div className="space-y-8">
          <AuthHeader
            title="Verification Failed"
            description="
              This verification link is invalid or has expired.
            "
          />

          <div className="space-y-6 text-center">
            <p className="text-sm text-slate-600">
              Please request a new verification email or contact support if you
              believe this is an error.
            </p>

            <Link
              to={ROUTES.AUTH.LOGIN}
              className="
                inline-flex
                font-semibold
                text-blue-600
                hover:text-blue-700
              "
            >
              Back to Login
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

if (passwordCreated) {
  return (
    <Card className="w-full max-w-xl">
      <CardContent className="p-8 md:p-10">
        <div className="space-y-8">
          <AuthHeader
            title="Password Created"
            description="
              Your account has been activated successfully.
            "
          />

          <div className="space-y-6 text-center">
            <p className="text-sm text-slate-600">
              You can now sign in using your email address and newly created
              password.
            </p>

            <Link
              to={ROUTES.AUTH.LOGIN}
              className="
                inline-flex
                font-semibold
                text-blue-600
                hover:text-blue-700
              "
            >
              Continue to Login
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



if (verifyEmailMutation.isPending){
return (
  <Card className="w-full max-w-xl">
    <CardContent className="p-8 md:p-10">
      <div className="space-y-8">
        <AuthHeader
          title="Verifying Email"
          description="
            Please wait while we verify your email address.
          "
        />

        <div className="flex justify-center">
          <LoaderCircle
            className="
              h-10
              w-10
              animate-spin
              text-blue-600
            "
          />
        </div>
      </div>
    </CardContent>
  </Card>
);
}

return (
    <Card className="w-full max-w-xl">
      <CardContent className="p-8 md:p-10">
        <div className="space-y-8">
          <AuthHeader
            title="Create Password"
            description="
              Your email has been verified.
              Create a password to activate your account.
            "
          />

          {/* Password form goes here */}
          <form
  onSubmit={form.handleSubmit(onSubmit)}
  className="space-y-5"
>
  <FormPassword
    control={form.control}
    name="password"
    label="Password"
    placeholder="Create your password"
    required
    icon={<LockKeyhole className="h-5 w-5" />}
  />

  <FormPassword
    control={form.control}
    name="confirmPassword"
    label="Confirm Password"
    placeholder="Confirm your password"
    required
    icon={<LockKeyhole className="h-5 w-5" />}
  />

  <LoadingButton
    type="submit"
    loading={setPasswordMutation.isPending}
    loadingText="Creating password..."
    disabled={!verificationToken && !setPasswordToken}
  >
    Create Password
  </LoadingButton>
</form>
        </div>
      </CardContent>
    </Card>
  );
  }
