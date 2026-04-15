"use client";
import { useState, useEffect } from "react";
import ServiceCardSection from "@/components/home/ServiceCardSection";
import { ServicesSkeleton } from "@/components/services/skeletons/SectionSkeleton";

export default function ProductCards() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    try {
      const res = await fetch("/api/items");
      const data = await res.json();
      setSections(data);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5 flex flex-col sm:gap-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-[#d4af37] text-sm font-medium tracking-wider uppercase mb-3">
            Our Services{" "}
          </span>
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d2818] mb-2 sm:mb-4">
            Explore Our Decorations
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            Choose from our wide range of stunning decoration packages for your
            special occasions
          </p>
        </div>

        {/* Services Cards Container */}
        <div className="flex flex-col gap-10 md:gap-14">
          {/* Haldi Decor Section */}
          {isLoading ? (
            <ServicesSkeleton />
          ) : (
            sections.map((section) => (
              <ServiceCardSection
                key={section._id}
                title={`${section.title}`}
                cards={section.cards}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
