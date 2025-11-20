"use client";

import { useActionState } from "react";
import SocialLoginButton from "@/components/ui/social-login-button";
import FormDivider from "@/components/ui/form-divider";
import FormInput from "@/components/ui/form-input";
import PasswordInput from "@/components/ui/password-input";
import SubmitButton from "@/components/ui/submit-button";
import { actions } from "@/app/actions";
import { SignInFormState } from "@/validations/auth";
import { FormError } from "./ui/form-error";

const INITIAL_STATE: SignInFormState = {
  success: false,
  message: "",
  strapiError: null,
  isLoading: false,
  zodError: null,
  data: {
    email: "",
    password: "",
  },
};

export default function SignInForm() {
  const [formState, formAction] = useActionState(
    actions.auth.signIn,
    INITIAL_STATE
  );

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Social Login Buttons */}
      <div className="space-y-3">
        <SocialLoginButton
          provider="google"
          onClick={() => handleSocialLogin("Google")}
        />
      </div>

      <FormDivider />

      {/* Email/Password Form */}
      <form action={formAction} className="space-y-4">
        <FormInput
          id="email"
          type="email"
          name="email"
          label="Email"
          placeholder="your@email.com"
          required
          autoComplete="email"
          defaultValue={formState.data.email ?? ""}
        />
        <FormError error={formState.zodError?.email} />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          required
          autoComplete="current-password"
          defaultValue={formState.data.password ?? ""}
        />
        <FormError error={formState.zodError?.password} />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="border-border text-primary focus:ring-primary h-4 w-4 rounded focus:ring-2 focus:ring-offset-2"
            />
            <span className="text-muted-foreground">Remember me</span>
          </label>
          <a
            href="#"
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <SubmitButton
          isLoading={formState.isLoading}
          loadingText="Signing in..."
        >
          Sign in
        </SubmitButton>

        {formState.strapiError && (
          <p className="text-red-500">{formState.strapiError}</p>
        )}
      </form>
    </div>
  );
}
