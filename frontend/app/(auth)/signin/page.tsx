import SignInForm from "@/components/sign-in-form";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your account to access exclusive features and content.",
};

export default function SignIn() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email below to sign in to your account
        </p>
      </div>
      <p className="text-muted-foreground mb-6 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-primary font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
      <SignInForm />
    </div>
  );
}
