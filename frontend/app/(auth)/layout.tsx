import Link from "next/link";
import { YoutubeSummary3D } from "@/components/icons/youtube-summary-3d";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Panel - Branding */}
      <div className="hidden flex-col justify-between bg-neutral-100 p-10 lg:flex dark:bg-neutral-900">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-lg">Summarize Youtube</span>
        </Link>
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-8 size-64">
            <YoutubeSummary3D className="h-full w-full" />
          </div>
          <blockquote className="space-y-2 text-center">
            <p className="text-lg leading-relaxed font-medium">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-muted-foreground text-sm">Jose Luis</footer>
          </blockquote>
        </div>
        <div className="text-muted-foreground text-sm">
          &copy; 2025 Summarize Youtube. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="bg-background flex items-center justify-center p-8">
        <Link
          href="/"
          className="absolute top-4 right-4 md:top-8 md:right-8 lg:hidden"
        >
          Home
        </Link>
        {children}
      </div>
    </div>
  );
}
