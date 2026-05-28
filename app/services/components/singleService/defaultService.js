"use client"
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Phone,
  Heart,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowUpDown,
} from "lucide-react";
import ContactPage from "../contactShow";

const TRUST_BADGES_LOWCOST_PRODUCTS = [
  { icon: "🎨", label: "Custom Haldi Setups" },
  { icon: "🌸", label: "Fresh Flowers & Premium Quality" },
  { icon: "⏰", label: "On-Time Delivery & Setup" },
  { icon: "🛡️", label: "Safe & Secure Installation", pcOnly: true },
  { icon: "👥", label: "Experienced Team", pcOnly: true },
];

const TRUST_BADGES_PRODUCTS = [
  { label: "Best Value", color: "bg-green-600" },
  { label: "Most Popular", color: "bg-pink-500" },
  { label: "Premium", color: "bg-amber-500" },
];

function sortProducts(arr, order) {
  if (!order) return arr;
  return [...arr].sort((a, b) =>
    order === "lth" ? a.price - b.price : b.price - a.price,
  );
}

function SortBar({ value, onChange }) {
  return (
    <div className="flex items-center justify-end px-4 sm:px-8 md:px-12 mb-3">
      <div className="flex items-center gap-1.5 border border-amber-200 rounded-lg px-2.5 py-1.5 bg-white shadow-sm">
        <ArrowUpDown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs text-[#0d2818] font-medium bg-transparent outline-none cursor-pointer"
        >
          <option value="">Sort By</option>
          <option value="lth">Price: Low to High</option>
          <option value="htl">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default function ShowDecorService({ products, slug, lowPriceProducts }) {
  const lowScrollRef = useRef(null);
  const scrollRef = useRef(null);

  const [lowArrows, setLowArrows] = useState({ left: false, right: false });
  const [prodArrows, setProdArrows] = useState({ left: false, right: false });

  const [lowSort, setLowSort] = useState("");
  const [prodSort, setProdSort] = useState("");

  const sortedLowProducts = sortProducts(lowPriceProducts, lowSort);
  const sortedProducts = sortProducts(products.products, prodSort);

  useEffect(() => {
    setLowArrows(getScrollState(lowScrollRef.current));
    setProdArrows(getScrollState(scrollRef.current));
  }, []);

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

  const HIDE_PACKAGE_KEYWORDS = [
    "car decoration",
    "first night room decoration",
    "birthday decoration",
    "anniversary decoration",
    "puja decoration",
  ];

  const shouldHidePackages = HIDE_PACKAGE_KEYWORDS.some((keyword) =>
    products.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  const HIDE_QUOTATION_FORM_KEYWORDS = [
    "car decoration",
    "first night room decoration",
  ];

  const shouldHideQuotationForm = HIDE_QUOTATION_FORM_KEYWORDS.some((keyword) =>
    products.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <main className="bg-stone-50">
      {/* ── Hero Banner ── unchanged ── */}
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
              <h1 className="font-['Playfair_Display'] sm:mt-2 sm:mt-0 text-2xl sm:text-4xl md:text-5xl font-bold text-white/90 leading-[50px] max-w-xs sm:max-w-sm md:max-w-md">
                {products.title}
              </h1>
              <div className="hidden sm:flex items-center gap-0.5">
                <span className="w-12 sm:w-16 md:w-20 h-px bg-amber-400" />
                <Heart size={20} className="shrink-0 fill-amber-400" />
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
                      "https://wa.me/916398484419",
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
        {/* ── Budget Friendly Section ── unchanged ── */}
        <div className="w-full flex flex-col gap-10 sm:gap-10 py-10 pb-4 sm:pb-8 sm:py-14">
          <div className="low-budget-section">
            <div className="flex items-center justify-center gap-3 mb-4 px-4">
              <span className="h-px w-10 sm:w-16 bg-amber-400" />
              <h2
                className="text-center text-sm sm:text-base md:text-lg font-semibold tracking-widest text-[#0d2818] uppercase"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Budget Friendly {products.title.split(" ")[0]}{" "}
                {lowPriceProducts.length > 1 ? "Decorations" : "Decoration"}
              </h2>
              <span className="h-px w-10 sm:w-16 bg-amber-400" />
            </div>

            <SortBar value={lowSort} onChange={setLowSort} />

            <div className="relative px-4 sm:px-8 md:px-12">
              {lowArrows.left && (
                <button
                  onClick={() => scroll("left", lowScrollRef)}
                  aria-label="Scroll left"
                  className="absolute left-1 sm:left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 hidden sm:flex items-center justify-center bg-white border border-amber-200 rounded-full shadow-md hover:bg-amber-400 hover:border-amber-400 hover:text-white text-[#0d2818] transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <div
                ref={lowScrollRef}
                onScroll={handleLowScroll}
                className="grid grid-cols-2 gap-3 sm:flex sm:gap-4 sm:overflow-x-auto sm:scroll-smooth sm:pb-2 sm:mx-10"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {sortedLowProducts.map((product) => (
                  <Link
                    key={product._id}
                    href={`/store/${product.type}/${product.slug}`}
                    className="w-full sm:shrink-0 sm:w-56 md:w-60 bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col group"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image || "/services/placeholder.jpg"}
                        fill
                        alt={product.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col gap-2 pt-1.5 sm:pt-3 p-3 flex-1">
                      <span className="text-sm text-amber-500 font-semibold">
                        ₹{product.price?.toLocaleString("en-IN")}
                      </span>
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
                  className="absolute hidden sm:flex right-1 sm:right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 items-center justify-center bg-white border border-amber-200 rounded-full shadow-md hover:bg-amber-400 hover:border-amber-400 hover:text-white text-[#0d2818] transition-all duration-200"
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

        {/* ══════════════════════════════════════════
            ── OUR PACKAGES SECTION — REDESIGNED ──
            ══════════════════════════════════════════ */}
        {!shouldHidePackages && (
          <section className="w-full py-10 pt-8 sm:py-12 px-4 sm:px-8 md:px-12">
            {/* Heading */}
            <div className="flex flex-col items-center gap-1.5 mb-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 sm:w-16 bg-amber-400" />
                <h2
                  className="text-center text-sm sm:text-base md:text-lg font-semibold tracking-widest text-[#0d2818] uppercase"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Our {products.title} Packages
                </h2>
                <span className="h-px w-10 sm:w-16 bg-amber-400" />
              </div>
              <p className="text-zinc-500 text-xs sm:text-sm text-center">
                Choose from our curated packages or customize as per your needs.
              </p>
            </div>

            <SortBar value={prodSort} onChange={setProdSort} />

            {/* ── Package Cards Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedProducts.map((product, i) => (
                <Link
                  key={product._id}
                  href={`/store/${product.type}/${product.slug}`}
                  className="group bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col no-underline"
                >
                  {/* Image with badge */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={product.image || "/services/placeholder.jpg"}
                      fill
                      alt={product.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="block w-full py-2 bg-white text-[#0d2818] font-semibold rounded-full text-xs text-center">
                        View Details
                      </span>
                    </div>
                    {/* Badge */}
                    {TRUST_BADGES_PRODUCTS[i] && (
                      <span
                        className={`absolute top-2 left-2 z-10 ${TRUST_BADGES_PRODUCTS[i].color} text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full`}
                      >
                        {TRUST_BADGES_PRODUCTS[i].label}
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col gap-3 p-4 flex-1">
                    {/* Title + price range */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#0d2818] leading-snug">
                        {product.title}
                      </h3>
                      {product.description && (
                        <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                          {product.description}
                        </p>
                      )}
                      <div className="mt-1.5">
                        <p className="text-[11px] text-zinc-400">
                          Starting from
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-amber-600 leading-tight">
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-amber-50" />

                    {/* Inclusions */}
                    {product.inclusion && (
                      <ul className="flex flex-col gap-1.5">
                        {product.inclusion
                          .split(",")
                          .map((item) => item.trim())
                          .slice(0, 5)
                          .map((feat) => (
                            <li
                              key={feat}
                              className="flex items-start gap-2 text-xs sm:text-[13px] text-zinc-600"
                            >
                              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              {feat}
                            </li>
                          ))}
                      </ul>
                    )}

                    {/* Book button */}
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
                      className="mt-auto cursor-pointer flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-800 text-white text-xs sm:text-sm font-medium py-2.5 rounded-xl transition-colors duration-200"
                    >
                      <Image
                        src="/svg-icons/whatsapp.svg"
                        width={15}
                        height={15}
                        alt="whatsapp"
                      />
                      Book Now
                    </button>
                  </div>
                </Link>
              ))}

              {/* ── Custom Decor CTA Card ── */}
              <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm flex flex-col">
                {/* Top decorative band */}
                <div className="bg-[#0d2818] px-5 py-6 flex flex-col items-center gap-2 text-center">
                  <span className="text-2xl">🎨</span>
                  <h3
                    className="text-white text-base sm:text-lg font-semibold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Need Custom Decor?
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="h-px w-8 bg-amber-400" />
                    <span className="text-amber-400 text-[10px] tracking-widest uppercase">
                      Personalized for you
                    </span>
                    <span className="h-px w-8 bg-amber-400" />
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-5 p-6 flex-1 text-center">
                  <ul className="flex flex-col gap-2 w-full">
                    {[
                      "Theme as per your style",
                      "Custom floral & lighting",
                      "On-site consultation",
                      "Luxury wedding stage setups",
                      "Haldi & Mehendi decoration",
                      "Birthday & surprise room decor",
                    ].map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-xs text-zinc-600"
                      >
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      window.open(
                        "https://wa.me/916398484419",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    className="w-full flex items-center justify-center gap-2 bg-[#0d2818] hover:bg-[#1a3d28] text-white text-sm font-medium py-2.5 rounded-xl transition-colors duration-200"
                  >
                    <Image
                      src="/svg-icons/whatsapp.svg"
                      width={15}
                      height={15}
                      alt="whatsapp"
                    />
                    Chat with Us
                  </button>

                  <a
                    href="tel:+916398484419"
                    className="text-xs text-zinc-400 hover:text-[#0d2818] transition-colors duration-200 underline underline-offset-2"
                  >
                    or call +91 63984 84419
                  </a>
                </div>
              </div>
            </div>

            {products.products.length === 0 && (
              <p className="text-center text-gray-400 py-20">
                No packages available yet.
              </p>
            )}
          </section>
        )}
        {!shouldHideQuotationForm && <ContactPage title={products.title} />}
      </section>
    </main>
  );
}
