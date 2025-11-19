import { FileText, Clock, MoreVertical } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your summaries today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Mock Data Cards TODO: Replace with real data */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-neutral-950"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                <FileText className="h-5 w-5" />
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            <h3 className="mb-2 leading-none font-semibold tracking-tight">
              How to Build a SaaS
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              A comprehensive guide on building software as a service...
            </p>
            <div className="text-muted-foreground flex items-center text-xs">
              <Clock className="mr-1 h-3 w-3" />
              <span>2 mins ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
