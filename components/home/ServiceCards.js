"use client";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export default function ServiceCards({ cards = [], categoryLabel, categorySlug }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  if (!cards.length) return null;

  return (
    <section>
      {categoryLabel && (
        <h3 className="font-['Playfair_Display'] text-[1.5rem] sm:text-xl md:text-3xl font-semibold text-[#0d2818] mb-3 sm:mb-4 pl-0.5">
          {categoryLabel}
        </h3>
      )}

      {/* ── MOBILE: 2×2 grid + View All below ── */}
      <div className="sm:hidden flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          {cards.slice(0, 4).map((card) => (
            <MobileCard key={card._id} card={card} />
          ))}
        </div>

        {/* View All — centered below the 2×2 grid */}
        <Link
          href={`/services/${categorySlug}`}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-zinc-200 hover:border-amber-400 hover:text-amber-500 transition-colors w-full"
        >
          <span className="font-medium text-xs text-[#0d2818]">
            View All {categoryLabel}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
        </Link>
      </div>

      {/* ── DESKTOP: horizontal scroll with arrows ── */}
      <div className="hidden sm:block relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className={`absolute ${showLeft ? "flex" : "hidden"} left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full border border-amber-400/40 bg-white text-amber-400 items-center justify-center hover:border-amber-400 hover:bg-amber-400/10 transition-all shadow-md`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {cards.map((card) => (
            <DesktopCard key={card._id} card={card} />
          ))}
          <CtaCard categorySlug={categorySlug} categoryLabel={categoryLabel} />
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className={`absolute ${showRight ? "flex" : "hidden"} right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 rounded-full border border-amber-400/40 bg-white text-amber-400 items-center justify-center hover:border-amber-400 hover:bg-amber-400/10 transition-all shadow-md`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

/* ─── Mobile card ─── */
function MobileCard({ card }) {
  return (
    <Link
  href={`/store/${card.type}/${card.slug}`}
  className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
>
  {/* Image */}
  <div className="relative w-full aspect-[4/3] overflow-hidden">
    <Image
      src={card.image || "/placeholder.png"}
      fill
      alt={card.title}
      className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 py-1.5 px-2">
    {/* Title */}
    <h3 className="text-sm font-semibold text-zinc-800 leading-snug">
      {card.title}
    </h3>

    {/* Bottom Section */}
    <div className="mt-auto pt-1.5 border-t border-gray-100">
  <div className="mb-3">
    <p className="text-[11px] text-gray-500">Starting From</p>
    <p className="text-lg sm:text-xl font-bold text-amber-600 leading-tight">
      ₹{card.price?.toLocaleString("en-IN")}
    </p>
  </div>

  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(
        `https://wa.me/916398484419?text=Hi! I'm interested in ${card.title}`,
        "_blank",
        "noopener,noreferrer"
      );
    }}
    className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold py-1.5 rounded-lg transition-colors"
  >
    <Image
      src="/svg-icons/whatsapp.svg"
      width={14}
      height={14}
      alt="WhatsApp"
    />
    Book Now
  </button>
</div>
  </div>
</Link>
  );
}

/* ─── Desktop card ─── */
function DesktopCard({ card }) {
  return (
    <Link
      href={`/store/${card.type}/${card.slug}`}
      className="flex-shrink-0 bg-white border border-gray-200 shadow-sm rounded-2xl w-64 md:w-72 group cursor-pointer"
    >
      <div className="relative w-full h-40 md:h-48 rounded-t-2xl overflow-hidden mb-2 md:mb-2.5">
        <Image
          src={card.image || "/placeholder.png"}
          fill
          alt={card.title}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            window.open(
              `https://wa.me/916398484419?text=Hi! I'm interested in booking the ${process.env.NEXT_PUBLIC_BASE_URL}/store/$${encodeURIComponent(card.type)}/${card.slug}`,
              "_blank",
              "noopener,noreferrer"
            );
          }}
          className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300"
        >
          <button className="flex justify-center items-center gap-2 w-full py-2.5 bg-white text-[#0d2818] font-semibold rounded-full text-sm hover:bg-amber-300 transition-colors duration-300">
            <Image src="/svg-icons/whatsapp.svg" width={16} height={16} className="invert" alt="WhatsApp" />
            Book now
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:gap-4 px-3 pb-3">
        <div className="flex justify-between items-center gap-2">
          <h4 className="text-[#0d2818] font-bold text-sm md:text-base group-hover:text-[#1a4d2e] transition-colors truncate">
            {card.title}
          </h4>
          <p className="text-sm md:text-base text-green-800 font-semibold shrink-0">
            ₹{card.price?.toLocaleString("en-IN")}
          </p>
        </div>
        <ul className="flex flex-col gap-1">
          {["Beautiful Flower Backdrop", "Complete Seating Setup", "Customized Themes", "Lighting & Drapes"].map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
              <span className="text-xs md:text-sm text-zinc-600 font-medium">{item}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(
              `https://wa.me/916398484419?text=Hi! I'm interested in ${card.title}`,
              "_blank",
              "noopener,noreferrer"
            );
          }}
          className="bg-green-800 flex gap-2 text-white items-center justify-center py-2 rounded-xl hover:bg-green-700 transition-colors mt-1"
        >
          <Image src="/svg-icons/whatsapp.svg" width={18} height={18} alt="whatsapp" />
          <span>Book on WhatsApp</span>
        </button>
      </div>
    </Link>
  );
}

/* ─── CTA card ─── */
function CtaCard({ categorySlug, categoryLabel }) {
  return (
    <div className="flex-shrink-0 w-64 md:w-72 bg-[#0d2818] rounded-2xl overflow-hidden">
      <div className="relative w-full h-40 md:h-48">
        <Image src="/cards-pic/wedding-hall.png" fill className="object-cover" alt="Wedding Hall" />
      </div>
      <div className="px-4 py-3 flex flex-col gap-2.5">
        <h2 className="text-base md:text-lg text-white font-bold font-serif leading-snug">
          Complete Wedding Decoration
        </h2>
        <ul className="flex flex-col gap-1.5">
          {["Farm House Weddings", "Destination Weddings", "Banquet Decoration", "Stage & Mandap Setup"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="bg-amber-400 w-3.5 h-3.5 rounded-full p-0.5 shrink-0" />
              <span className="text-white/80 text-xs md:text-sm">{item}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            window.open(
              "https://wa.me/916398484419?text=Hi!%20I%20want%20a%20free%20consultation.",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="w-full mt-1 bg-amber-400 hover:bg-amber-300 text-[#0d2818] font-semibold text-sm py-2.5 rounded-lg transition-colors duration-200"
        >
          Get Free Consultation
        </button>
      </div>
    </div>
  );
}