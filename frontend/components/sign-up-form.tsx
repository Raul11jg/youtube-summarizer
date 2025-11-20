"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import SocialLoginButton from "@/components/ui/social-login-button";
import FormDivider from "@/components/ui/form-divider";
import FormInput from "@/components/ui/form-input";
import PasswordInput from "@/components/ui/password-input";
import SubmitButton from "@/components/ui/submit-button";
import { actions } from "@/app/actions";
import { FormState } from "@/validations/auth";
import { FormError } from "./ui/form-error";

const INITIAL_STATE: FormState = {
  success: false,
  message: "",
  strapiError: null,
  isLoading: false,
  zodError: null,
  data: {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <SubmitButton isLoading={pending} loadingText="Creating account...">
      Create account
    </SubmitButton>
  );
}

export default function SignUpForm() {
  const [formState, formAction] = useActionState(
    actions.auth.signUp,
    INITIAL_STATE
  );

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Sign up with ${provider}`);
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

      {/* Registration Form */}
      <form action={formAction} className="space-y-4">
        <FormInput
          id="fullName"
          type="text"
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          required
          autoComplete="name"
          defaultValue={formState.data.fullName ?? ""}
        />
        <FormError error={formState.zodError?.fullName} />

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
          placeholder="Create a password"
          required
          autoComplete="new-password"
          defaultValue={formState.data.password ?? ""}
        />
        <FormError error={formState.zodError?.password} />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          required
          autoComplete="new-password"
          defaultValue={formState.data.confirmPassword ?? ""}
        />
        <FormError error={formState.zodError?.confirmPassword} />

        <SignUpButton />

        {formState.strapiError && (
          <p className="text-red-500">{formState.strapiError}</p>
        )}
      </form>
    </div>
  );
}
