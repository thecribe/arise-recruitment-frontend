/**
 * -----------------------------------------------------------------------------
 * File: LoginPage.tsx
 * Description:
 * Authentication login page.
 *
 * Responsibilities:
 * - Render login form.
 * - Validate user credentials.
 * - Submit login request.
 * - Navigate to registration and password recovery.
 * -----------------------------------------------------------------------------
 */

import { ArrowRight, LockKeyhole, Mail } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { FormCheckbox, FormInput, FormPassword } from "@/components/forms";

import { ROUTES } from "@/constants/routes";

import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

import AuthHeader from "../components/AuthHeader";
import { LoadingButton } from "@/components/ui/loading-button";
import { useLogin } from "../hooks/use-auth";
import { notification } from "@/components/feedback/notification";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    console.log("Login payload:", values);

    loginMutation.mutate(values, {
      onSuccess: (data) => {
        console.log("Login successful:", data);
        navigate("/dashboard");
      },

      onError: (error) => {
        console.error("Login failed:", error);
        notification.error("Invalid email or password");
      },
    });
    /**

    /**
     * TODO:
     * - Call login API
     * - Store access token
     * - Update auth store
     * - Redirect user dashboard
     */
  };

  return (
    <Card className="w-full max-w-lg">
      <CardContent className="p-8 md:p-12">
        <div className="space-y-8">
          <AuthHeader
            title="Welcome Back 👋"
            description="Sign in to continue to your Airse recruitment portal."
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

            <FormPassword
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              required
              icon={<LockKeyhole className="h-5 w-5" />}
            />

            <div className="flex items-center justify-between">
              <FormCheckbox
                control={form.control}
                name="rememberMe"
                label="Remember me"
              />

              <Link
                to={ROUTES.AUTH.FORGOT_PASSWORD}
                className="
                  text-sm
                  font-medium
                  text-blue-600
                  transition-colors
                  hover:text-blue-700
                "
              >
                Forgot Password?
              </Link>
            </div>

            <LoadingButton
              type="submit"
              loading={loginMutation.isPending}
              loadingText="Signing in..."
            >
              Login
            </LoadingButton>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span
                className="
                bg-white
                px-4
                text-slate-500
              "
              >
                New to Airse?
              </span>
            </div>
          </div>

          <Link to={ROUTES.AUTH.REGISTER}>
            <Button variant="secondary" fullWidth type="button">
              Create an Account
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
