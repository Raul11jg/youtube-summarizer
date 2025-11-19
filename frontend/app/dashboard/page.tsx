"use client";
import { Button } from "@/components/ui/button";
import { actions } from "../actions";

export default function DashboardPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-neutral-50">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="text-muted-foreground mt-2">
        Welcome to your dashboard. You can manage your account and settings
        here.
      </p>
      <Button className="mt-4" onClick={() => actions.auth.signOut()}>
        Sign out
      </Button>
    </div>
  );
}
