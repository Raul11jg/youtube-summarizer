import { YoutubeSummary3D } from "@/components/icons/youtube-summary-3d";

export function AuthIcon() {
  return (
    <div className="mb-6 flex justify-center">
      <div className="relative size-32 transition-transform hover:scale-105">
        <YoutubeSummary3D className="h-full w-full" />
      </div>
    </div>
  );
}
