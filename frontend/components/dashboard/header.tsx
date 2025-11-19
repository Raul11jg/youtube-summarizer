"use client";

import { Button } from "@/components/ui/button";
import { actions } from "@/app/actions";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-neutral-950">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => actions.auth.signOut()}
        >
          Sign out
        </Button>
        <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </header>
  );
}
