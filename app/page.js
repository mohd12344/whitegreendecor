import Hero from "@/components/home/hero";
import ProductCards from "@/components/home/ServiceCardShowing";

const Home = () => {
  return (
    <main className="flex gap-12 flex-col pb-30">
      <Hero />
      <ProductCards />
    </main>
  );
};

export default Home;
