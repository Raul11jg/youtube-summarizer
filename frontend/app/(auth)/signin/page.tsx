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
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="mb-2 text-center text-2xl font-bold">Sign In</h1>
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
