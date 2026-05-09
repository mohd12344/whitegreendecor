"use client";
import { useState, useEffect } from "react";
import ServiceCards from "./ServiceCards";
import { ServicesSkeleton } from "@/components/services/skeletons/SectionSkeleton";
import WhyChooseUs from "./whychooseus";
import Reviews from "./reviews";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function ProductCards() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    try {
      const res = await fetch("/api/search/product");
      const data = await res.json();
      console.log(data.res);
      setSections(data.res);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="relative bg-stone-50 border-2 rounded-2xl border-amber-100 px-3 sm:px-6 py-1 pt-6 sm:py-2 sm:pt-10">
        {/* Eyebrow label */}
        <div className="flex justify-center ">
          <span className="absolute -top-2.5 sm:-top-4 bg-stone-50 px-4 text-amber-400 text-xs sm:text-base font-medium tracking-widest uppercase">
            Our Handpicked Packages
          </span>
        </div>

        {/* Header row */}
        <div className="">
          <div className="flex items-center mb-6 sm:mb-10">
            <div className="flex-1 hidden sm:block" />
            <h2 className="font-['Playfair_Display'] pl-1 sm:pl-0 text-lg sm:text-3xl md:text-4xl font-bold text-[#0d2818]">
              Our Most Loved Packages
            </h2>
            <div className="flex-1 flex justify-end">
              <Link
                href="/services"
                className="flex items-center gap-1.5 text-xs sm:text-sm font-medium border border-zinc-300 rounded-lg px-2 sm:px-4 py-2 hover:border-amber-400 hover:text-amber-500 transition-colors shrink-0"
              >
                <span className="hidden sm:inline">View All Packages</span>{" "}
                <span className="inline sm:hidden">View All</span>{" "}
                <MoveRight className="w-3.5 h-3.5 hidden sm:inline" />
              </Link>
            </div>
          </div>
        </div>
        {/* Cards */}
        {isLoading ? <ServicesSkeleton /> : <ServiceCards cards={sections} />}

        <div className="why-choose-us ">
          <div className="title flex"></div>
        </div>
      </div>
      <WhyChooseUs />
      <Reviews />
    </section>
  );
}
