import { getHomePage } from "@/lib/strapi";
import { HeroSection } from "@/components/hero-section";

export async function generateMetadata() {
  const strapiData = await getHomePage();
  const { title, description } = strapiData;
  return {
    title,
    description,
  };
}

export default async function Home() {
  const strapiData = await getHomePage();

  const { title, description, sections } = strapiData;
  const heroSectionData = sections.find(
    (section: { __component: string }) =>
      section.__component === "layout.hero-section"
  );

  return (
    <main className="bg-background min-h-screen pb-20">
      {title && (
        <h1 className="py-12 text-center text-5xl font-bold tracking-tight">
          {title}
        </h1>
      )}
      {description && (
        <p className="text-muted-foreground mx-auto max-w-2xl px-4 pb-12 text-center text-lg">
          {description}
        </p>
      )}
      <HeroSection data={heroSectionData} />
    </main>
  );
}
