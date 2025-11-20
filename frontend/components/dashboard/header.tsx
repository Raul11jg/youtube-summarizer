"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { actions } from "@/app/actions";

function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="ghost" size="sm" disabled={pending} type="submit">
      {pending ? (
        <div className="flex items-center gap-2">
          <Spinner size="sm" />
          <span>Signing out...</span>
        </div>
      ) : (
        "Sign out"
      )}
    </Button>
  );
}

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-neutral-950">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <form action={actions.auth.signOut} aria-label="Sign out form">
          <SignOutButton />
        </form>
        <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </header>
  );
}
