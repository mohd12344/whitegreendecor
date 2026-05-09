"use client";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export default function ServiceCards({ cards }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  return (
    <section>
      <button
        onClick={() => scroll("left")}
        className={`absolute ${showLeft ? "flex" : "hidden"} left-2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-400/40 bg-white text-amber-400 md:hidden flex items-center justify-center hover:border-amber-400 hover:bg-amber-400/10 transition-all shadow-md`}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {cards.map((card) => (
          <Link
            key={card._id}
            href={`/store/${card.type}/${card.slug}`}
            className="flex-shrink-0 bg-white border border-gray-200 shadow-sm rounded-2xl w-55 sm:w-64 md:w-72 group cursor-pointer"
          >
            {/* Image */}
            <div className="relative w-full h-28 sm:h-40 md:h-50 rounded-t-2xl overflow-hidden mb-2 md:mb-2.5">
              <Image
                src={card.image || "/section/"}
                fill
                alt={card.title}
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Book on WhatsApp */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.open(
                    `https://wa.me/916398484419?text=Hi! I'm interested in booking the ${process.env.NEXT_PUBLIC_BASE_URL}/store/${card.type}/${card.slug}`,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
                className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300"
              >
                <button className="flex justify-center items-center gap-2 w-full py-2.5 bg-white text-[#0d2818] font-semibold rounded-full text-sm hover:bg-amber-300 transition-colors duration-300">
                  <Image
                    src="/svg-icons/whatsapp.svg"
                    width={16}
                    height={16}
                    className="invert"
                    alt="WhatsApp"
                  />
                  Book now
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3 sm:gap-3.5 md:gap-5 px-3">
              <div className="firstShow flex justify-between items-center">
                <h4 className="text-[#0d2818] font-bold text-sm md:text-base group-hover:text-[#1a4d2e] transition-colors truncate w-full">
                  {card.title}
                </h4>
                <p className="text-sm sm:text-lg text-green-800 font-semibold">
                  ₹{card.price?.toLocaleString("en-IN")}
                </p>
              </div>
              <ul className="flex flex-col gap-1">
                {[
                  "Beautiful Flower Backdrop",
                  "Complete Seating Setup",
                  "Customized Themes",
                  "Lighting & Drapes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                    <span className="text-xs font-medium sm:text-sm text-zinc-600">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="bg-green-800 flex gap-1 mt-3 md:mt-5 gap-2 text-white items-center justify-center py-1.5 sm:py-2 rounded-xl">
                <Image
                  src={"/svg-icons/whatsapp.svg"}
                  width={20}
                  height={20}
                  alt="whatsap"
                />
                <span className="hidden sm:inline">Book on Whatsapp</span>{" "}
                <span className="inline sm:hidden">Book Now</span>
              </button>
            </div>
          </Link>
        ))}
        <div className="flex-shrink-0 w-55 sm:w-64 md:w-72 bg-[#0d2818] rounded-2xl overflow-hidden">
          {/* Image */}
          <div className="relative w-full h-28 sm:h-40 md:h-50">
            <Image
              src="/cards-pic/wedding-hall.png"
              fill
              className="object-cover"
              alt="Wedding Hall"
            />
          </div>

          {/* Content */}
          <div className="px-3 sm:px-4 py-3 flex flex-col gap-2 sm:gap-3">
            <h2 className="text-base sm:text-xl text-white font-bold font-serif leading-snug">
              Complete Wedding Decoration
            </h2>

            <ul className="flex flex-col gap-1 sm:gap-1.5">
              {[
                "Farm House Weddings",
                "Destination Weddings",
                "Banquet Decoration",
                "Stage & Mandap Setup",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="bg-amber-400 w-3 sm:w-4 h-3 sm:h-4 rounded-full p-0.5 shrink-0" />
                  <span className="text-white/80 text-xs sm:text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(
                  `https://wa.me/916398484419?text=Hi!%20I%20want%20a%20free%20consultation. `,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
              className="w-full mt-1 bg-amber-400 hover:bg-amber-300 text-[#0d2818] font-semibold text-xs sm:text-sm py-2 sm:py-2.5 rounded-lg transition-colors duration-200"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => scroll("right")}
        className={`absolute ${showRight ? "flex" : "hidden"} right-2 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-400/40 bg-white text-amber-400 md:hidden flex items-center justify-center hover:border-amber-400 hover:bg-amber-400/10 transition-all shadow-md`}
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </section>
  );
}
