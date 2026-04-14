import { Suspense } from "react";
import Hero from "@/components/home/hero";
import ProductCards from "@/components/home/ServiceCardShowing";
import { ServicesSkeleton } from "@/components/services/skeletons/SectionSkeleton";

const Home = () => {
  return (
    <main className="flex gap-12 flex-col pb-30">
      <Hero />

      <Suspense fallback={<ServicesSkeleton />}>
        <ProductCards />
      </Suspense>
    </main>
  );
};

export default Home;
