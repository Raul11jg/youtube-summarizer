import Link from "next/link";
import Image from "next/image";

interface ImageProps {
  id: number;
  url: string;
  alternativeText: string;
}

interface LinkProps {
  id: number;
  url: string;
  name: string;
  isExternal: boolean;
}

interface HeroSectionProps {
  data: {
    id: number;
    __component: string;
    title: string;
    description: string;
    image: ImageProps;
    headerLink: LinkProps;
  };
}

export function HeroSection({ data }: HeroSectionProps) {
  console.log(data);
  if (!data) return null;

  const { title, description, image, headerLink } = data;
  // TODO: Fix image URL for local development if needed (Strapi doesn't return full URL for local uploads usually)
  const imageUrl = image?.url ? "http://localhost:1337" + image.url : "";

  return (
    <header className="relative h-[600px] overflow-hidden">
      {imageUrl && <Image alt={image?.alternativeText ?? "no alternative text"} className="absolute inset-0 -z-10 object-cover" src={imageUrl} fill priority />}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white bg-black/20">
        <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-[600px]">{description}</p>
        {headerLink && (
          <Link className="mt-8 rounded-md bg-white px-6 py-3 text-base font-medium text-black hover:bg-gray-100" href={headerLink.url}>
            {headerLink.name}
          </Link>
        )}
      </div>
    </header>
  );
}
