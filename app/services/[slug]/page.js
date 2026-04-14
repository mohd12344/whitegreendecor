import ShowDecorService from "../components/singleServiceShow";
import { DecorsSkeleton } from "@/components/services/skeletons/SectionSkeleton";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const serviceName = slug
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${serviceName} Decoration Services | White Green Decors`,
    description: `Explore premium ${serviceName} decoration services by White Green Decors. We offer customized setups, creative designs, and high-quality decor for your special events.`,

    alternates: {
      canonical: `https://whitegreendecors.com/services/${slug}`,
    },

    openGraph: {
      title: `${serviceName} Decoration Services`,
      description: `Beautiful and customized ${serviceName} decoration services for your special occasions.`,
      url: `https://whitegreendecors.com/services/${slug}`,
      siteName: "White Green Decors",
      type: "website",
    },
  };
}

export default async function Decors({ params }) {
  const { slug } = await params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/groupSection/${slug}`,
  );
  const products = await data.json();

  if (!data) {
    notFound();
  }

  return (
    <Suspense fallback={<DecorsSkeleton />}>
      <ShowDecorService products={products} slug={slug} />
    </Suspense>
  );
}
