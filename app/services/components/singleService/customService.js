"use client";
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
  Home,
  Building2,
  Castle,
  MessageSquare,
  Palette,
  Clock,
  Star,
  Sparkles,
  ShieldCheck,
  BadgeIndianRupee,
  Smile,
  Users,
  Biohazard,
} from "lucide-react";
import ContactPage from "../contactShow";

// ─── Constants ───────────────────────────────────────────────────────────────

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

// specific page trust badges
const SPECIFIC_TRUST_BADGES = [
  { icon: <Biohazard />, label: "Tailor Made Decor" },
  { icon: <Users />, label: "Team of Experts" },
  { icon: <Clock />, label: "On Time Delivery" },
  { icon: <Smile />, label: "100% Client Satisfaction" },
  { icon: <ShieldCheck />, label: "Safe & Secure Installation" },
];

const HOW_WE_WORK_STEPS = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    label: "Share Your Requirements",
  },
  { icon: <Palette className="w-5 h-5" />, label: "We Plan & Design" },
  { icon: <Check className="w-5 h-5" />, label: "You Approve the Design" },
  { icon: <Sparkles className="w-5 h-5" />, label: "We Decorate Beautifully" },
  { icon: <Star className="w-5 h-5" />, label: "You Enjoy Stress-Free" },
];

const WHY_CHOOSE_US = [
  "500+ Successful Weddings",
  "Experienced & Creative Team",
  "Premium Quality Materials",
  "On-Time Setup & Delivery",
  "Personalized & Unique Designs",
  "Affordable Pricing",
];

const PRICE_FACTORS = [
  "Size of the House / Area",
  "Height of the Building",
  "Type of Decoration & Theme",
  "Materials & Flowers Used",
  "Lighting & Additional Setup",
];

const SIZE_OPTIONS = [
  {
    icon: <Home className="w-5 h-5" />,
    key: "small",
    label: "Small House",
    sub: "(1BHK / Flat)",
    badge: "Best for small setups",
    range: "₹5,000 – ₹10,000",
    features: [
      "Basic Entrance Decor",
      "Balcony / Gate Decor",
      "Lights & Drapes",
    ],
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    key: "medium",
    label: "Medium House",
    sub: "(2 – 3 BHK)",
    badge: "Most Popular",
    range: "₹10,000 – ₹25,000",
    features: [
      "Entrance + Balcony Decor",
      "Lights, Drapes & Flowers",
      "Custom Theme Setup",
    ],
  },
  {
    icon: <Castle className="w-5 h-5" />,
    key: "large",
    label: "Large House",
    sub: "(Villa / Full Building)",
    badge: "Premium Experience",
    range: "₹25,000+",
    features: [
      "Full Building Decoration",
      "Premium Flowers & Drapes",
      "Custom Lighting Design",
    ],
  },
];

const HIDE_PACKAGE_KEYWORDS = [
  "car decoration",
  "first night room decoration",
  "birthday decoration",
  "anniversary decoration",
  "puja decoration",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sortProducts(arr, order) {
  if (!order) return arr;
  return [...arr].sort((a, b) =>
    order === "lth" ? a.price - b.price : b.price - a.price,
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SortBar({ value, onChange }) {
  return (
    <div className="flex items-center justify-end mb-3">
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

function SectionHeading({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center gap-1.5 mb-6 px-4">
      <div className="flex items-center gap-3">
        <span className="h-px w-10 sm:w-16 bg-amber-400" />
        <h2
          className="text-center text-sm sm:text-base md:text-lg font-semibold tracking-widest text-[#0d2818] uppercase"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {title}
        </h2>
        <span className="h-px w-10 sm:w-16 bg-amber-400" />
      </div>
      {subtitle && (
        <p className="text-zinc-500 text-xs sm:text-sm text-center">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Wedding Decor Services Grid (custom pages only) ──
function WeddingServicesSection({ services }) {
  if (!services?.length) return null;
  return (
    <section className="w-full px-4 sm:px-8 md:px-12 py-10">
      <SectionHeading
        title="Our Wedding Decor Services"
        subtitle="We handle everything, so you can enjoy every moment stress-free."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {services.slice(0, 6).map((section) => (
          <Link
            key={section._id}
            href={`/services/${section.href}`}
            className="group flex flex-col items-center gap-2"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-amber-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <Image
                src={section.image || "/placeholder.png"}
                fill
                alt={section.title}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#0d2818]/0 group-hover:bg-[#0d2818]/20 transition-colors duration-300" />
            </div>
            <div className="flex flex-col items-center gap-0.5 text-center">
              <span className="text-xs sm:text-sm font-semibold text-[#0d2818] leading-snug group-hover:text-amber-600 transition-colors duration-200">
                {section.title}
              </span>
              {section.description && (
                <span className="text-[10px] text-zinc-400 leading-snug line-clamp-2 hidden sm:block">
                  {section.description}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link
          href="/services"
          className="flex items-center gap-2 border border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-white text-xs sm:text-sm font-medium px-6 py-2.5 rounded-xl transition-colors duration-200"
        >
          Explore All Services →
        </Link>
      </div>
    </section>
  );
}

// ── Specific page: trust strip ──
function SpecificTrustStrip() {
  return (
    <div className="mx-4 sm:mx-8 md:mx-12 border border-amber-100 rounded-2xl bg-white py-4 sm:px-8 mt-6">
      <div className="flex flex-wrap justify-around gap-y-4 sm:gap-x-3">
        {SPECIFIC_TRUST_BADGES.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1 text-center h-[50px] sm:min-w-[60px]"
          >
            <span className="text-xl sm:text-2xl">{item.icon}</span>
            <span className="text-[7px] sm:text-xs text-zinc-600 leading-snug max-w-[40px] sm:max-w-[80px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Custom decor CTA card ──
function CustomDecorCard() {
  return (
    <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm flex flex-col">
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
      <div className="flex flex-col gap-5 p-6 flex-1">
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
          className="text-xs text-zinc-400 hover:text-[#0d2818] transition-colors duration-200 underline underline-offset-2 text-center"
        >
          or call +91 63984 84419
        </a>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ShowCustomService({
  products,
  slug,
  lowPriceProducts,
}) {
  const scrollRef = useRef(null);
  const [prodSort, setProdSort] = useState("");
  const [weddingServices, setWeddingServices] = useState([]);

  const isCustom = !!products.custom;
  const isSpecific = !!products.specific || isCustom;

  const shouldHidePackages = HIDE_PACKAGE_KEYWORDS.some((keyword) =>
    (products?.title ?? "").toLowerCase().includes(keyword.toLowerCase()),
  );

  const sortedProducts = sortProducts(products.products, prodSort);

  const minPrice = products.products?.length
    ? Math.min(...products.products.map((p) => Number(p.price)))
    : null;

  useEffect(() => {
    if (!isCustom) return;
    fetch("/api/groupSection")
      .then((res) => res.json())
      .then(({ result }) => {
        setWeddingServices(result.filter((s) => !s.custom && !s.specific));
      })
      .catch(() => {});
  }, [isCustom]);

  return (
    <main className="bg-stone-50">
      {/* ══════════ HERO BANNER ══════════ */}
      <section className="w-full overflow-hidden">
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-[22rem] overflow-hidden">
          <Image
            src={products.bannerImage || "/logo.png"}
            fill
            alt={slug}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a10] via-[#0e1a10]/80 to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex items-center px-4 sm:px-8 z-10">
            <div className="flex flex-col gap-1.5 w-[60%] md:w-1/2 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-4 h-px bg-amber-500 shrink-0" />
                <span className="text-amber-400 text-[10px] sm:text-xs tracking-widest italic leading-none truncate">
                  {isCustom
                    ? "We Design. You Celebrate."
                    : "Celebrate Tradition, Create Beautiful Memories"}
                </span>
                <span className="w-4 h-px bg-amber-500 shrink-0" />
              </div>
              <h1
                className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 leading-tight break-words"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {products.title}
              </h1>
              <div className="hidden sm:flex items-center gap-0.5">
                <span className="w-12 sm:w-16 h-px bg-amber-400" />
                <Heart size={18} className="shrink-0 fill-amber-400" />
                <span className="w-12 sm:w-16 h-px bg-amber-400" />
              </div>
              <p className="text-white/75 text-xs sm:text-sm leading-relaxed line-clamp-2">
                {isCustom
                  ? "From Haldi to Grand Wedding, We Decorate Every Moment Beautifully."
                  : "We decorate your home with love, creativity & perfection."}
              </p>
              <div className="flex items-center gap-2 sm:gap-3 my-1.5 sm:mb-2">
                <button
                  onClick={() =>
                    window.open(
                      "https://wa.me/916398484419",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  className="flex items-center gap-1.5 bg-green-600 hover:bg-green-800 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
                >
                  <Image
                    src="/svg-icons/whatsapp.svg"
                    width={16}
                    height={16}
                    alt="whatsapp"
                  />
                  WhatsApp
                </button>
                <a
                  href="tel:+916398484419"
                  className="flex items-center gap-1.5 border border-zinc-500 bg-white text-[#0d2818] hover:bg-amber-400 hover:text-white hover:border-amber-500 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  Call Now
                </a>
              </div>

              {/* Custom trust badges under buttons on hero */}

              <div className="flex gap-1 sm:gap-8 mt-0.5 sm:mt-2">
                {[
                  { icon: Palette, label: "Custom Designs" },
                  { icon: Sparkles, label: "Premium Quality" },
                  { icon: Clock, label: "On-Time Delivery" },
                  { icon: BadgeIndianRupee, label: "Affordable Pricing" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex flex-col sm:flex-row items-center gap-0.5"
                  >
                    <b.icon className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400" />
                    <span className="text-white/70 text-[9px] font-medium text-center leading-snug min-w-[57px] sm:max-w-[50px]">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price badge */}
          {isSpecific && minPrice && (
            <div className="absolute hidden md:block sm:bottom-4 sm:right-4 bg-amber-300 rounded-xl px-2 sm:px-4 py-3 shadow-md text-right z-10 w-28 sm:w-fit">
              <p className="text-[10px] font-medium uppercase tracking-wide">
                Packages Starting From
              </p>
              <p className="text-lg sm:text-2xl font-bold leading-tight">
                {isCustom ? "₹50,000*" : "₹7,999*"}
              </p>
              <p className="text-[9px] font-medium">Onwards</p>
            </div>
          )}
        </div>
      </section>

      <section className="w-full py-8 pt-0 md:py-10 md:pt-0 sm:max-w-7xl mx-auto">
        <div className="block md:hidden mx-4 mt-4 mb-1">
          <div className="flex items-center justify-between bg-[#0d2818] rounded-2xl px-5 py-3.5 shadow-sm">
            <div className="flex flex-col">
              <span className="text-amber-400 text-[9px] uppercase tracking-widest font-medium">
                Packages Starting From
              </span>
              <span
                className="text-white text-2xl font-bold leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {isCustom ? "₹50,000" : "₹7,999"}
                <span className="text-sm text-white/50 font-normal">*</span>
              </span>
              <span className="text-white/40 text-[9px]">
                Onwards · Customizable
              </span>
            </div>
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/916398484419",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-[#0d2818] text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors duration-200 shrink-0"
            >
              <Image
                src="/svg-icons/whatsapp.svg"
                width={14}
                height={14}
                alt="wa"
                className="brightness-0"
              />
              Book Now
            </button>
          </div>
        </div>
        {/* ══════════ OUR WEDDING DECOR SERVICES (custom only) ══════════ */}
        {isCustom && <WeddingServicesSection services={weddingServices} />}

        {/* ══════════ SPECIFIC: trust strip ══════════ */}
        {isSpecific && !isCustom && <SpecificTrustStrip />}

        {/* ══════════ TRUST BADGES (default non-specific pages) ══════════ */}
        {!isSpecific && (
          <div className="mx-4 sm:mx-8 md:mx-12 border border-amber-100 rounded-2xl bg-white py-5 px-4 sm:px-8 mt-6">
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
        )}

        {/* ══════════ PACKAGES / VENUE CARDS ══════════ */}
        {!shouldHidePackages && (
          <section className="w-full py-8 pt-8 md:py-10 md:pt-10 px-4 sm:px-8 md:px-12 pb-12">
            <SectionHeading
              title={
                isCustom
                  ? "We Decorate Every Venue"
                  : `Our ${products.title} Packages`
              }
              subtitle={
                isCustom
                  ? "From intimate gatherings to grand celebrations."
                  : "Choose from our curated packages or customize as per your needs."
              }
            />
            <SortBar value={prodSort} onChange={setProdSort} />

            {/* CUSTOM: full image overlay cards */}
            {isCustom && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {sortedProducts.map((product, i) => (
                  <Link
                    key={product._id}
                    href={`/store/${product.type}/${product.slug}`}
                    className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 no-underline"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <Image
                      src={product.image || "/services/placeholder.jpg"}
                      fill
                      alt={product.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/90 via-[#0d2818]/30 to-transparent" />
                    {TRUST_BADGES_PRODUCTS[i] && (
                      <span
                        className={`absolute top-3 left-3 z-10 ${TRUST_BADGES_PRODUCTS[i].color} text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full`}
                      >
                        {TRUST_BADGES_PRODUCTS[i].label}
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <h3
                        className="text-white font-bold text-base sm:text-lg leading-snug"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {product.title}
                      </h3>
                      {product.description && (
                        <p className="text-white/70 text-xs mt-1 line-clamp-1">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-amber-400 font-bold text-sm">
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            window.open(
                              `https://wa.me/916398484419?text=${encodeURIComponent(
                                `Hi! I'm interested in booking ${product.title} link: ${process.env.NEXT_PUBLIC_BASE_URL}/store/${product.type
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}/${product.slug}`,
                              )}`,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          }}
                          className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
                        >
                          <Image
                            src="/svg-icons/whatsapp.svg"
                            width={12}
                            height={12}
                            alt="wa"
                          />
                          Book Now
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* SPECIFIC: package cards */}
            {!isCustom && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product, i) => (
                  <Link
                    key={product._id}
                    href={`/store/${product.type}/${product.slug}`}
                    className="group bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col no-underline"
                  >
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={product.image || "/services/placeholder.jpg"}
                        fill
                        alt={product.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="block w-full py-2 bg-white text-[#0d2818] font-semibold rounded-full text-xs text-center">
                          View Details
                        </span>
                      </div>
                      {TRUST_BADGES_PRODUCTS[i] && (
                        <span
                          className={`absolute top-2 left-2 z-10 ${TRUST_BADGES_PRODUCTS[i].color} text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full`}
                        >
                          {TRUST_BADGES_PRODUCTS[i].label}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 p-4 flex-1">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-[#0d2818] leading-snug">
                          {product.title}
                        </h3>
                        {product.description && (
                          <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                            {product.description}
                          </p>
                        )}
                        <div className="mt-2">
                          <p className="text-[11px] text-zinc-500">
                            Starting from
                          </p>
                          <p className="text-lg sm:text-xl font-bold text-amber-600 leading-tight">
                            ₹{Number(product.price).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-amber-50" />
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          window.open(
                            `https://wa.me/916398484419?text=${encodeURIComponent(
                              `Hi! I'm interested in booking ${product.title} link: ${process.env.NEXT_PUBLIC_BASE_URL}/store/${product.type
                                .toLowerCase()
                                .replace(/\s+/g, "-")}/${product.slug}`,
                            )}`,
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
              </div>
            )}

            <div className="flex justify-center mt-5">
              <button
                onClick={() =>
                  window.open(
                    "https://wa.me/916398484419",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="flex items-center gap-2 border border-[#0d2818] text-[#0d2818] hover:bg-[#0d2818] hover:text-white text-xs sm:text-sm font-medium px-6 py-2.5 rounded-xl transition-colors duration-200"
              >
                {isCustom ? "View Venue More →" : "Book on WhatsApp →"}
              </button>
            </div>
          </section>
        )}

        {/* ══════════ SPECIFIC: What Affects Price ══════════ */}
        {isSpecific && !isCustom && (
          <section className="px-4 sm:px-8 md:px-12 pb-10">
            <div className="bg-white border border-amber-100 rounded-2xl p-5 sm:p-7">
              <h3
                className="font-bold text-[#0d2818] text-sm sm:text-base mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                What Affects the Price?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRICE_FACTORS.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600 bg-stone-50 rounded-xl px-3 py-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════ CONTACT FORM ══════════ */}
        <ContactPage title={products.title} />
      </section>
    </main>
  );
}
