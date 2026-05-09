"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { Phone, Heart, ChevronLeft, ChevronRight, Check } from "lucide-react";
import ContactPage from "./contactShow";

const TRUST_BADGES_LOWCOST_PRODUCTS = [
  { icon: "🎨", label: "Custom Haldi Setups" },
  { icon: "🌸", label: "Fresh Flowers & Premium Quality" },
  { icon: "⏰", label: "On-Time Delivery & Setup" },
  { icon: "🛡️", label: "Safe & Secure Installation", pcOnly: true },
  { icon: "👥", label: "Experienced Team", pcOnly: true },
];

const TRUST_BADGES_PRODUCTS = [
  { label: "Most popular", color: "bg-pink-400" },
  { no_show: true },
  { label: "Best for small system", color: "bg-yellow-400" },
];

export default function ShowDecorService({ products, slug, lowPriceProducts }) {
  const lowScrollRef = useRef(null);
  const scrollRef = useRef(null);

  const [lowArrows, setLowArrows] = useState({ left: false, right: false });
  const [prodArrows, setProdArrows] = useState({ left: false, right: false });

  // Init arrow state after mount (check if content overflows at all)
  useEffect(() => {
    setLowArrows(getScrollState(lowScrollRef.current));
    setProdArrows(getScrollState(scrollRef.current));
  }, []);

  function getStar(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash += str.charCodeAt(i);
    return hash % 10 < 8 ? "5star" : "4star";
  }

  const handleLowScroll = useCallback(() => {
    setLowArrows(getScrollState(lowScrollRef.current));
  }, []);

  const handleProdScroll = useCallback(() => {
    setProdArrows(getScrollState(scrollRef.current));
  }, []);

  const scroll = (direction, ref) => {
    ref.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  function getScrollState(el) {
    if (!el) return { left: false, right: false };
    return {
      left: el.scrollLeft > 0,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    };
  }

  return (
    <main className="bg-stone-50 ">
      <section className="w-full overflow-hidden">
        <div className="relative w-full h-62 sm:h-58 md:h-90 lg:h-[22rem] overflow-hidden">
          <div className="flex h-full transition-transform duration-700 ease-in-out">
            <div className="relative flex-shrink-0 w-full h-full">
              <Image
                src={products.bannerImage || "/logo.png"}
                fill
                alt={slug}
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a10] via-[#0e1a10]/80 to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex items-center px-4 sm:px-8 z-10">
            <div className="title flex flex-col sm:gap-3">
              <div className="flex items-center gap-2 sm:mb-2">
                <span className="w-4 h-px bg-amber-500 shrink-0" />
                <span className="text-amber-400 text-[10px] sm:text-[11px] sm:text-xs tracking-widest italic leading-none">
                  Celebrate Tradition, Create Beautiful Memories
                </span>
                <span className="w-4 h-px bg-amber-500 shrink-0" />
              </div>

              <h1 className="font-['Playfair_Display'] mt-2 sm:mt-0 text-2xl sm:text-4xl md:text-5xl font-bold text-white/90 leading-[50px] max-w-xs sm:max-w-sm md:max-w-md">
                {`${products.title}`}
              </h1>

              <div className="hidden sm:flex items-center gap-0.5">
                <span className="w-12 sm:w-16 md:w-20 h-px bg-amber-400" />
                <Heart size={20} className=" shrink-0 fill-amber-400" />
                <span className="w-12 sm:w-16 md:w-20 h-px bg-amber-400" />
              </div>

              <p className="text-white/75 sm:mt-0 text-xs sm:text-sm leading-relaxed max-w-[260px] sm:max-w-xs md:max-w-sm">
                {`Vibrant ${products.title} that bring happiness, positivity and unforgettable memories to life.`}
              </p>

              <div className="flex flex-wrap mt-4 items-center gap-2 sm:gap-3 sm:mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(
                      `https://wa.me/916398484419`,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="flex items-center gap-1.5 bg-green-600 hover:bg-green-800 text-white text-xs sm:text-sm font-medium px-4 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
                >
                  <Image
                    src="/svg-icons/whatsapp.svg"
                    width={16}
                    height={16}
                    alt="whatsapp"
                  />
                  Book on WhatsApp
                </button>
                <a
                  href="tel:+916398484419"
                  className="flex items-center gap-1.5 border border-zinc-500 bg-white text-[#0d2818] hover:bg-amber-400 hover:text-white hover:border-amber-500 text-xs sm:text-sm font-medium px-4 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full sm:max-w-7xl mx-auto">
        <div className="w-full flex flex-col gap-10 sm:gap-10 py-10 pb-4 sm:pb-8 sm:py-14">
          <div className="low-budget-section">
            <div className="flex items-center justify-center gap-3 mb-8 px-4">
              <span className="h-px w-10 sm:w-16 bg-amber-400" />
              <h2
                className="text-center text-sm sm:text-base md:text-lg font-semibold tracking-widest text-[#0d2818] uppercase"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Low Ticket Size {`${products.title.split(" ")[0]}`} Decoration
              </h2>
              <span className="h-px w-10 sm:w-16 bg-amber-400" />
            </div>

            <div className="relative px-4 sm:px-8 md:px-12">
              {lowArrows.left && (
                <button
                  onClick={() => scroll("left", lowScrollRef)}
                  aria-label="Scroll left"
                  className="absolute left-1 sm:left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white border border-amber-200 rounded-full shadow-md hover:bg-amber-400 hover:border-amber-400 hover:text-white text-[#0d2818] transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <div
                ref={lowScrollRef}
                onScroll={handleLowScroll}
                className="flex gap-4 overflow-x-auto scroll-smooth pb-2 mx-1 sm:mx-10"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {lowPriceProducts.map((product, i) => (
                  <Link
                    key={product._id}
                    href={`/store/${product.type}/${product.slug}`}
                    className="shrink-0 w-48 sm:w-56 md:w-60 bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col group"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image || "/services/placeholder.jpg"}
                        fill
                        alt={product.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <span className="absolute top-2 right-2 bg-amber-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
                        ₹{product.price?.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 p-3 flex-1">
                      <h3 className="text-sm font-semibold text-[#0d2818] leading-snug line-clamp-2">
                        {product.title}
                      </h3>

                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {["Quick Setup", "Budget Friendly"].map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-600"
                          >
                            <Check className="w-3 h-3 shrink-0 text-amber-400" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          window.open(
                            `https://wa.me/916398484419?text=Hi! I'm interested in booking the ${process.env.NEXT_PUBLIC_BASE_URL}/store/${product.type}/${product.slug}`,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        className="mt-auto cursor-pointer flex items-center justify-center gap-1.5 w-full bg-green-600 hover:bg-green-800 text-white text-xs font-medium py-2 rounded-lg transition-colors duration-200"
                      >
                        <Image
                          src="/svg-icons/whatsapp.svg"
                          width={14}
                          height={14}
                          alt="whatsapp"
                        />
                        Book on WhatsApp
                      </button>
                    </div>
                  </Link>
                ))}
              </div>

              {lowArrows.right && (
                <button
                  onClick={() => scroll("right", lowScrollRef)}
                  aria-label="Scroll right"
                  className="absolute right-1 sm:right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white border border-amber-200 rounded-full shadow-md hover:bg-amber-400 hover:border-amber-400 hover:text-white text-[#0d2818] transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          <div className="mx-4 sm:mx-8 md:mx-12 border border-amber-100 rounded-2xl bg-white py-5 px-4 sm:px-8">
            <div className="flex flex-wrap justify-around gap-y-5 gap-x-4">
              {TRUST_BADGES_LOWCOST_PRODUCTS.map((item) => (
                <div
                  key={item.label}
                  className={`${item.pcOnly ? "hidden sm:flex" : "flex"} flex-col items-center gap-1 sm:gap-1.5 text-center sm:min-w-[80px]`}
                >
                  <span className="text-lg sm:text-2xl">{item.icon}</span>
                  <span className="text-[8px] sm:text-xs text-zinc-600 leading-snug max-w-[90px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="w-full py-10 sm:py-2">
          <div className="flex flex-col items-center gap-1.5 mb-8 px-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 sm:w-16 bg-amber-400" />
              <h2
                className="text-center text-sm sm:text-base md:text-lg font-semibold tracking-widest text-[#0d2818] uppercase"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {`Our ${products.title} Packages`}
              </h2>
              <span className="h-px w-10 sm:w-16 bg-amber-400" />
            </div>

            <p className="text-zinc-500 text-xs sm:text-sm text-center">
              Choose from our best-selling setups or get a custom design.
            </p>
          </div>

          <div className="relative px-4 sm:px-8 md:px-12">
            {prodArrows.left && (
              <button
                onClick={() => scroll("left", scrollRef)}
                aria-label="Scroll left"
                className="absolute left-1 sm:left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white border border-amber-200 rounded-full shadow-md hover:bg-amber-400 hover:border-amber-400 hover:text-white text-[#0d2818] transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div
              ref={scrollRef}
              onScroll={handleProdScroll}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2 mx-1 sm:mx-6"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.products.map((product, i) => (
                <Link
                  key={product._id}
                  href={`/store/${product.type}/${product.slug}`}
                  className="group shrink-0 w-56 sm:w-64 md:w-72 rounded-2xl border border-gray-50 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col no-underline"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image || "/services/placeholder.jpg"}
                      fill
                      alt={product.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                      <span className="block w-full py-2 bg-white text-[#0d2818] font-semibold rounded-full text-xs text-center">
                        View Details
                      </span>
                    </div>
                    {TRUST_BADGES_PRODUCTS[i] && (
                      <span
                        className={`absolute top-1 z-20 left-1 ${TRUST_BADGES_PRODUCTS[i].color} text-white text-[10px] font-medium uppercase tracking-wide px-2.5 py-1 rounded-full`}
                      >
                        {TRUST_BADGES_PRODUCTS[i].label}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 p-4 flex-1">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-[#0d2818] leading-snug">
                        {product.title}
                      </h3>
                      <div className="py-1.5">
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          Starting from
                        </p>
                        <p className="text-base sm:text-lg font-bold text-amber-600 leading-tight">
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {product.inclusion && (
                      <ul className="flex flex-col gap-1 mb-1.5">
                        {product.inclusion
                          .split(",")
                          .map((i) => i.trim())
                          .slice(0, 4)
                          .map((feat) => (
                            <li
                              key={feat}
                              className="flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-600"
                            >
                              <Check className="w-3 h-3 text-amber-400 shrink-0" />
                              {feat}
                            </li>
                          ))}
                      </ul>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        window.open(
                          `https://wa.me/916398484419?text=Hi! I'm interested in booking the ${process.env.NEXT_PUBLIC_BASE_URL}/store/${product.type}/${product.slug}`,
                          "_blank",
                          "noopener,noreferrer",
                        );
                      }}
                      className="mt-auto cursor-pointer flex items-center justify-center gap-1.5 w-full bg-green-600 hover:bg-green-800 text-white text-xs font-medium py-2.5 rounded-lg transition-colors duration-200"
                    >
                      <Image
                        src="/svg-icons/whatsapp.svg"
                        width={14}
                        height={14}
                        alt="whatsapp"
                      />
                      Book on WhatsApp
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {prodArrows.right && (
              <button
                onClick={() => scroll("right", scrollRef)}
                aria-label="Scroll right"
                className="absolute right-1 sm:right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white border border-amber-200 rounded-full shadow-md hover:bg-amber-400 hover:border-amber-400 hover:text-white text-[#0d2818] transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {products.products.length === 0 && (
            <p className="text-center text-gray-400 py-20">
              No packages available yet.
            </p>
          )}
          <ContactPage title={products.title} />
        </section>
      </section>
    </main>
  );
}
