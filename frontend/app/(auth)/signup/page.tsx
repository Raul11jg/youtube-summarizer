import SignUpForm from "@/components/sign-up-form";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create a new account to get started and explore all available features.",
};

import { AuthIcon } from "@/components/auth-icon";

export default function SignUp() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <AuthIcon />
      <h1 className="mb-2 text-center text-2xl font-bold">Sign Up</h1>
      <p className="text-muted-foreground mb-6 text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="text-primary font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
      <SignUpForm />
    </div>
  );
}
