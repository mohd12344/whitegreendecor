"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const features = [
    { icon: "✦", title: "Premium Quality", desc: "Finest decorations" },
    { icon: "₹", title: "Affordable Prices", desc: "Budget friendly" },
    { icon: "✓", title: "Price Guarantee", desc: "No hidden costs" },
    { icon: "♡", title: "Full Support", desc: "24/7 assistance" },
  ];
  const haldiDecorCards = [
    {
      id: 1,
      title: "Traditional Haldi Setup",
      price: "₹13,000",
      image: "/services/haldi-1.jpg",
    },
    {
      id: 2,
      title: "Floral Haldi Theme",
      price: "₹10,000",
      image: "/services/haldi-2.jpg",
    },
    {
      id: 3,
      title: "Marigold Paradise",
      price: "₹9,000",
      image: "/services/haldi-3.jpg",
    },
    {
      id: 4,
      title: "Royal Haldi Decor",
      price: "₹21,000",
      image: "/services/haldi-4.jpg",
    },
    {
      id: 5,
      title: "Rustic Haldi Setup",
      price: "₹12,000",
      image: "/services/haldi-5.jpg",
    },
    {
      id: 6,
      title: "Modern Haldi Theme",
      price: "₹14,000",
      image: "/services/haldi-6.jpg",
    },
  ];

  const mehndiDecorCards = [
    {
      id: 1,
      title: "Classic Mehndi Setup",
      price: "₹12,000",
      image: "/services/mehndi-1.jpg",
    },
    {
      id: 2,
      title: "Rajasthani Theme",
      price: "₹18,000",
      image: "/services/mehndi-2.jpg",
    },
    {
      id: 3,
      title: "Bohemian Mehndi",
      price: "₹21,000",
      image: "/services/mehndi-3.jpg",
    },
    {
      id: 4,
      title: "Garden Mehndi Decor",
      price: "₹19,000",
      image: "/services/mehndi-4.jpg",
    },
    {
      id: 5,
      title: "Royal Mehndi Setup",
      price: "₹15,000",
      image: "/services/mehndi-5.jpg",
    },
    {
      id: 6,
      title: "Moroccan Theme",
      price: "₹23,000",
      image: "/services/mehndi-6.jpg",
    },
  ];

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] max-h-[900px]">
        {/* Background Image */}
        <Image
          src="/hero-image.jpg"
          fill
          alt="Wedding Decoration Banner"
          className="object-cover"
          priority
        />{" "}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2818]/90 via-[#0d2818]/70 to-transparent" />
        {/* Content */}
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 flex flex-col justify-center">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full px-4 py-2 mb-6">
              <span className="text-[#d4af37] text-sm">✦</span>
              <span className="text-white/90 text-sm font-medium">
                #1 Decoration Service in Delhi
              </span>
            </div>{" "}
            {/* Heading */}
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Make Your Special Day{" "}
              <span className="text-[#d4af37]">Unforgettable</span>
            </h1>
            {/* Subtext */}
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Transform your celebrations with our stunning Mehndi, Haldi, and
              Ring ceremony decorations. Premium quality at affordable prices.
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4af37] text-[#0d2818] font-semibold rounded-full hover:bg-[#c4a030] hover:shadow-[0_8px_30px_rgba(212,175,55,0.4)] transition-all"
              >
                Explore Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>{" "}
              </Link>
              <Link
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all"
              >
                <Image
                  src={"/svg-icons/whatsapp.svg"}
                  width={18}
                  height={18}
                  alt="whatsapp"
                />
                WhatsApp Us
              </Link>{" "}
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-[#1a4d2e] sm:py-6 md:py-0">
        <div className="max-w-[1400px] mx-auto px-5">
          {" "}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-white/10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-4 md:py-8 md:px-8 first:md:pl-0 last:md:pr-0"
              >
                <div className="w-8 sm:w-12 h-8 sm:h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center text-[#d4af37] text-xl flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-[12px] sm:text-sm md:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-[10px] sm:text-xs md:text-sm">
                    {feature.desc}{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 bg-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-5">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-[#d4af37] text-sm font-medium tracking-wider uppercase mb-3">
              Our Services{" "}
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d2818] mb-4">
              Explore Our Decorations
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
              Choose from our wide range of stunning decoration packages for
              your special occasions
            </p>
          </div>

          {/* Services Cards Container */}
          <div className="flex flex-col gap-10 md:gap-14">
            {/* Haldi Decor Section */}
            <ServiceCardSection title="Haldi Decor" cards={haldiDecorCards} />
            {/* Mehndi Decor Section */}{" "}
            <ServiceCardSection title="Mehndi Decor" cards={mehndiDecorCards} />
          </div>
        </div>
      </section>
    </main>
  );
};

// Service Card Section Component
const ServiceCardSection = ({ title, cards }) => {
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

  return (
    <div className="flex flex-col gap-5">
      {/* Title + Arrows */}
      <div className="flex justify-between items-center">
        <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl md:text-3xl font-bold text-[#0d2818] flex items-center gap-2 sm:gap-3">
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
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0 w-[240px] sm:w-[270px] md:w-[300px] group cursor-pointer"
          >
            {/* Card Image */}
            <div className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] rounded-2xl overflow-hidden mb-3 md:mb-4">
              <Image
                src={card.image}
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
              <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-[#d4af37] text-[#0d2818] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-semibold">
                {card.price}
              </div>
            </div>

            {/* Card Title */}
            <h4 className="text-[#0d2818] font-semibold text-sm sm:text-base md:text-lg group-hover:text-[#1a4d2e] transition-colors">
              {card.title}{" "}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

// Icons
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

export default Home;
