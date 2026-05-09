import Hero from "@/components/home/hero";
import ProductCards from "@/components/home/ServiceCardShowing";

const Home = () => {
  return (
    <main className="flex gap-4 sm:gap-0 flex-col pb-12">
      <Hero />
      <div className="px-3 sm:px-0">
        <ProductCards />
      </div>
    </main>
  );
};

export default Home;
