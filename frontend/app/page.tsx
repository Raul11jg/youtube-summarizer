import { getHomePage } from "@/lib/strapi";
import { HeroSection } from "@/components/hero-section";

export default async function Home() {
  const strapiData = await getHomePage();
  console.log(strapiData);

  const { sections } = strapiData;
  const heroSectionData = sections.find((section: { __component: string }) => section.__component === "layout.hero-section");

  return (
    <main>
      <HeroSection data={heroSectionData} />
    </main>
  );
}
