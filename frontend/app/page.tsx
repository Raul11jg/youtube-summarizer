import { getHomePage } from "@/lib/strapi";

export default async function Home() {
  const strapiData = await getHomePage();
  console.log(strapiData);
  const { title, description } = strapiData;

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}
