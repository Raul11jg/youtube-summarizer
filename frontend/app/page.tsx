import { getHomePage } from "@/lib/strapi";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";

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

  const { sections } = strapiData;
  const heroSectionData = sections.find(
    (section: { __component: string }) =>
      section.__component === "layout.hero-section"
  );

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection data={heroSectionData} />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
