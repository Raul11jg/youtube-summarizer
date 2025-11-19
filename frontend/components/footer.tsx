import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white py-12 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
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
            <span className="text-lg font-bold">Summarize Youtube</span>
          </div>
          <p className="text-muted-foreground text-center text-xs leading-5 md:text-left">
            &copy; 2025 Summarize Youtube. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm leading-6"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm leading-6"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
