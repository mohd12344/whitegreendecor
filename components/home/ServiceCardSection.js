"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ({ title, cards }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  function getStar(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }

    return hash % 10 < 8 ? "5star" : "4star";
  }

  return (
    <section className="flex flex-col  sm:gap-5">
      {/* Title + Arrows */}
      <div className="flex justify-between items-center pb-2.5 sm:pb-0">
        <h3 className="font-['Playfair_Display'] text-2xl sm:text-2xl md:text-3xl font-bold text-[#0d2818] flex items-center gap-2 sm:gap-3">
          <span className="text-[#d4af37]">✦</span>
          {title}
        </h3>{" "}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#1a4d2e] hover:text-white hover:border-[#1a4d2e] transition-all shadow-sm cursor-pointer"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center hover:bg-[#0d2818] transition-all shadow-sm cursor-pointer"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>{" "}
      {/* Cards Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-5 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {cards.map((card, index) => (
          <Link
            key={card._id}
            href={`/store/${title}/${card.slug}`}
            className="flex-shrink-0 w-[180px] sm:w-[270px] md:w-[300px] group cursor-pointer"
          >
            {/* Card Image */}
            <div className="relative w-full h-[200px] sm:h-[280px] md:h-[360px] rounded-2xl overflow-hidden mb-3 md:mb-4">
              <Image
                src={card.image || "/section/"}
                fill
                alt={card.title}
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Quick View Button */}{" "}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <button className="w-full py-2.5 md:py-3 bg-white text-[#0d2818] font-semibold rounded-full text-sm hover:bg-[#d4af37] transition-colors">
                  View Details
                </button>
              </div>
              {/* Price Tag */}
            </div>
            <div className="info flex flex-col">
              <Image
                src={`/svg-icons/${getStar(card.title)}.svg`}
                width={100}
                height={100}
                alt="5star"
              />
              <h4 className="text-[#0d2818] font-semibold text-sm md:text-lg group-hover:text-[#1a4d2e] transition-colors">
                {card.title}{" "}
              </h4>
              <div className="text-sm sm:text-base text-[#6e6f6f] font-semibold">
                ₹{card.price?.toLocaleString("en-IN")} <span>&bull;</span>{" "}
                {card.type}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
