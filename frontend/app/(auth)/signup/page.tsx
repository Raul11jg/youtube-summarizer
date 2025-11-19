import SignUpForm from "@/components/sign-up-form";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create a new account to get started and explore all available features.",
};

export default function SignUp() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your email below to create your account
        </p>
      </div>
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
