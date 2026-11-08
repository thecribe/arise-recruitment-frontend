/**
 * -----------------------------------------------------------------------------
 * File: RegisterPage.tsx
 * Description:
 * Applicant registration page.
 *
 * Responsibilities:
 * - Capture applicant registration details.
 * - Validate form using Zod.
 * - Submit registration request.
 * -----------------------------------------------------------------------------
 */

import {
  // ArrowRight,
  Home,
  Mail,
  Phone,
  User,
  // Briefcase,
  // LockKeyhole,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";

// import { JOB_TYPES } from "@/constants/job-types";

import { ROUTES } from "@/constants/routes";

import AuthHeader from "../components/AuthHeader";

import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register.schema";
import { useRegister } from "../hooks/use-auth";
import { useState } from "react";
import { notification } from "@/components/feedback/notification";
import { LoadingButton } from "@/components/ui/loading-button";
import { useBootstrapData } from "@/hooks/useBootstrapData";
import PageLoader from "@/components/feedback/page-loader";
import type { AxiosError } from "axios";
import { FormInput } from "@/components/forms/publicforms/FormInput";
import { FormSelect } from "@/components/forms/publicforms/FormSelect";
import { FormCheckbox } from "@/components/forms/publicforms/FormCheckbox";

export default function RegisterPage() {
  const [registrationComplete, setRegistrationComplete] = useState(false);
  // const navigate = useNavigate();

  const registerMutation = useRegister();
  const { jobTypes, isLoading, isError } = useBootstrapData();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: "",

      lastName: "",

      email: "",

      phoneNumber: "",

      address: "",

      postcode: "",

      jobTypeId: "",

      // password: "",

      // confirmPassword: "",

      acceptTerms: false,
    },
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Error loading bootstrap data.</p>
      </div>
    );
  }

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(values, {
      onSuccess: async () => {
        /**
         * TODO:
         * Replace with notification system
         */

        setRegistrationComplete(true);
        notification.success(
          "Account created successfully. Please check your email for verification.",
        );
      },

      onError: (error) => {
        const axiosError = error as AxiosError<{
          message: string;
          errors?: string[];
        }>;
        notification.error(
          axiosError.response?.data.message ||
            "Unable to create account. Please try again.",
        );
      },
    });
  };

  if (registrationComplete) {
    return (
      <Card className="w-full max-w-3xl">
        <CardContent className="p-8 md:p-10">
          <div className="space-y-8">
            <AuthHeader
              title="Check your email"
              description="
                We have sent a verification link to your email. Please verify your email before logging in.
            "
            />
            <div className="text-center flex flex-col gap-5">
              <p>
                Your account has been created. We have sent a verification link
                to your email. Please verify your email before logging in.
              </p>
              <Link
                to={ROUTES.AUTH.LOGIN}
                className="
                ml-1
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

  const job_options = jobTypes?.data?.jobTypes.map(
    ({ id, name }: { id: string; name: string }) => ({
      label: name,
      value: id,
    }),
  );

  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="p-8 md:p-10">
        <div className="space-y-8">
          <AuthHeader
            title="Create Account"
            description="
              Register to start your Airse healthcare journey.
            "
          />

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-6 md:grid-cols-2">
              <FormInput
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="John"
                required
                icon={<User className="h-5 w-5" />}
              />

              <FormInput
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Smith"
                required
                icon={<User className="h-5 w-5" />}
              />
            </div>

            <FormInput
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="john@example.com"
              type="email"
              required
              icon={<Mail className="h-5 w-5" />}
            />

            <FormInput
              control={form.control}
              name="phoneNumber"
              label="Phone Number"
              placeholder="+44..."
              required
              icon={<Phone className="h-5 w-5" />}
            />

            <FormInput
              control={form.control}
              name="address"
              label="Address"
              placeholder="Enter your address"
              required
              icon={<Home className="h-5 w-5" />}
            />

            <div className="grid gap-5 md:grid-cols-2">
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
                label="Job Type"
                placeholder="Select job type"
                options={job_options}
                required
              />
            </div>

            {/* <FormPassword
              control={form.control}
              name="password"
              label="Password"
              placeholder="Create password"
              required
              icon={<LockKeyhole className="h-5 w-5" />}
            />

            <FormPassword
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
              required
              icon={<LockKeyhole className="h-5 w-5" />}
            /> */}

            <FormCheckbox
              control={form.control}
              name="acceptTerms"
              label="
                I agree to the terms and conditions
              "
              required
            />

            <LoadingButton
              type="submit"
              loading={registerMutation.isPending}
              loadingText="Creating account..."
            >
              Register
            </LoadingButton>
          </form>

          <div
            className="
            text-center
            text-sm
            text-slate-500
          "
          >
            Already have an account?
            <Link
              to={ROUTES.AUTH.LOGIN}
              className="
                ml-1
                font-semibold
                text-blue-600
                hover:text-blue-700
              "
            >
              Sign In
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
