import { Zap, Shield, Share2 } from "lucide-react";

const features = [
  {
    name: "Lightning Fast",
    description:
      "Get summaries of long videos in seconds. Save hours of watching time.",
    icon: Zap,
  },
  {
    name: "Accurate & Reliable",
    description:
      "Powered by advanced AI to ensure you get the most important points.",
    icon: Shield,
  },
  {
    name: "Easy Sharing",
    description:
      "Share summaries with your team or friends with a single click.",
    icon: Share2,
  },
];

export function FeaturesSection() {
  return (
    <div className="bg-neutral-50 py-24 sm:py-32 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-primary text-base leading-7 font-semibold">
            Summarize Faster
          </h2>
          <p className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to understand videos
          </p>
          <p className="text-muted-foreground mt-6 text-lg leading-8">
            Stop wasting time watching hour-long videos for 5 minutes of
            content. Our AI extracts the gold for you.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-foreground text-base leading-7 font-semibold">
                  <div className="bg-primary absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="text-muted-foreground mt-2 text-base leading-7">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
