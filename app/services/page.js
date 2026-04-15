import { Suspense } from "react";
import { ServicesShowSkeleton } from "@/components/services/skeletons/SectionSkeleton";
import { fetchAllSections } from "@/lib/db/queries";
import ServicesShow from "./components/sectionShow";

export const metadata = {
  title: "Our Services | White Green Decors - Haldi, Mehndi & Event Decoration",
  description:
    "Explore all services by White Green Decors including Haldi decor, Mehndi decor, ring ceremony decoration, car decoration, and customized event setups. Trusted for premium quality and creative designs.",
  alternates: {
    canonical: "https://whitegreendecors.com/services",
  },
  openGraph: {
    title: "White Green Decors Services",
    description:
      "Discover our wide range of decoration services including Haldi, Mehndi, ring ceremony, and more. Premium event styling by White Green Decors.",
    url: "https://whitegreendecors.com/services",
    siteName: "White Green Decors",
    type: "website",
  },
};

const Services = async () => {
  const services = await fetchAllSections();

  return (
    <Suspense fallback={<ServicesShowSkeleton />}>
      <ServicesShow services={services.result} />
    </Suspense>
  );
};

export default Services;
