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
  Ruler,
  Palette,
  Clock,
  Star,
  MapPin,
  Users,
  Sparkles,
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

// specific page trust badges (House Decoration style)
const SPECIFIC_TRUST_BADGES = [
  { icon: "🪡", label: "Tailor Made Decor" },
  { icon: "👥", label: "Team of Experts" },
  { icon: "⏰", label: "On Time Delivery" },
  { icon: "😊", label: "100% Client Satisfaction" },
  { icon: "🛡️", label: "Safe & Secure Installation" },
];

// custom page trust badges (Wedding style)
const CUSTOM_TRUST_BADGES = [
  { icon: "🎨", label: "Custom Designs" },
  { icon: "🌸", label: "Premium Quality" },
  { icon: "⏰", label: "On-Time Delivery" },
  { icon: "💰", label: "Affordable Pricing" },
];

// How We Work steps (custom/wedding only)
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

// Why Choose Us (custom/wedding only)
const WHY_CHOOSE_US = [
  "500+ Successful Weddings",
  "Experienced & Creative Team",
  "Premium Quality Materials",
  "On-Time Setup & Delivery",
  "Personalized & Unique Designs",
  "Affordable Pricing",
];

// Venue types for "We Decorate Every Venue" (custom only, uses bannerImage as fallback)
const VENUE_TYPES = [
  { label: "Farmhouse Wedding", desc: "Outdoor luxury setups with nature" },
  { label: "Banquet Hall Decoration", desc: "Elegant decor for indoor venues" },
  { label: "Destination Wedding", desc: "Beach, Resort, Palace & more" },
];

// Price factors (specific only)
const PRICE_FACTORS = [
  "Size of the House / Area",
  "Height of the Building",
  "Type of Decoration & Theme",
  "Materials & Flowers Used",
  "Lighting & Additional Setup",
];

// Size tiers for specific (House Decoration style)
const SIZE_OPTIONS = [
  {
    icon: <Home className="w-5 h-5" />,
    key: "small",
    label: "Small House",
    sub: "(1BHK / Flat)",
    badge: "Best for small setups",
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    key: "medium",
    label: "Medium House",
    sub: "(2 – 3 BHK)",
    badge: "Most Popular",
  },
  {
    icon: <Castle className="w-5 h-5" />,
    key: "large",
    label: "Large House",
    sub: "(Villa / Full Building)",
    badge: "Premium Experience",
  },
];

const HIDE_PACKAGE_KEYWORDS = [
  "car decoration",
  "first night room decoration",
  "birthday decoration",
  "anniversary decoration",
  "puja decoration",
];

const HIDE_QUOTATION_FORM_KEYWORDS = [
  "car decoration",
  "first night room decoration",
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

// Package card — shared between all modes
function PackageCard({ product, i, processEnv }) {
  return (
    <Link
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
          <div className="mt-1.5">
            <p className="text-[11px] text-zinc-400">Starting from</p>
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
  );
}

// Custom decor CTA card
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
  const lowScrollRef = useRef(null);
  const scrollRef = useRef(null);

  const [lowArrows, setLowArrows] = useState({ left: false, right: false });
  const [prodArrows, setProdArrows] = useState({ left: false, right: false });
  const [lowSort, setLowSort] = useState("");
  const [prodSort, setProdSort] = useState("");

  // ── Flags ──
  // product.custom => also implies specific
  const isCustom = !!products.custom;
  const isSpecific = !!products.specific || isCustom;

  const shouldHidePackages = HIDE_PACKAGE_KEYWORDS.some((k) =>
    products.title.toLowerCase().includes(k.toLowerCase()),
  );
  const shouldHideQuotationForm = HIDE_QUOTATION_FORM_KEYWORDS.some((k) =>
    products.title.toLowerCase().includes(k.toLowerCase()),
  );

  const sortedLowProducts = sortProducts(lowPriceProducts, lowSort);
  const sortedProducts = sortProducts(products.products, prodSort);

  // ✅ custom page ke liye: venue mein sirf wo cards jo lowPriceProducts mein NAHI hain
  const lowPriceIds = new Set(lowPriceProducts.map((p) => p._id?.toString()));
  const venueProducts = isCustom
    ? sortedProducts.filter((p) => !lowPriceIds.has(p._id?.toString()))
    : sortedProducts;

  // min price for hero badge
  const minPrice = products.products?.length
    ? Math.min(...products.products.map((p) => Number(p.price)))
    : null;

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

  // trust badges for hero strip
  const heroTrustBadges = isCustom
    ? CUSTOM_TRUST_BADGES
    : isSpecific
      ? SPECIFIC_TRUST_BADGES
      : null;

  return (
    <main className="bg-stone-50">
      {/* ══════════════════════════════════════
          HERO BANNER
          ══════════════════════════════════════ */}
      <section className="w-full overflow-hidden">
        <div className="relative w-full h-62 sm:h-58 md:h-90 lg:h-[22rem] overflow-hidden">
          <div className="relative flex-shrink-0 w-full h-full">
            <Image
              src={products.bannerImage || "/logo.png"}
              fill
              alt={slug}
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a10] via-[#0e1a10]/80 to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex items-center px-4 sm:px-8 z-10">
            <div className="flex flex-col sm:gap-3">
              <div className="flex items-center gap-2 sm:mb-2">
                <span className="w-4 h-px bg-amber-500 shrink-0" />
                <span className="text-amber-400 text-[10px] sm:text-xs tracking-widest italic leading-none">
                  {isCustom
                    ? "We Design. You Celebrate."
                    : "Celebrate Tradition, Create Beautiful Memories"}
                </span>
                <span className="w-4 h-px bg-amber-500 shrink-0" />
              </div>

              <h1
                className="mt-2 sm:mt-0 text-2xl sm:text-4xl md:text-5xl font-bold text-white/90 leading-tight max-w-xs sm:max-w-sm md:max-w-md"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {products.title}
              </h1>

              <div className="hidden sm:flex items-center gap-0.5 mt-1">
                <span className="w-12 sm:w-16 md:w-20 h-px bg-amber-400" />
                <Heart size={20} className="shrink-0 fill-amber-400" />
                <span className="w-12 sm:w-16 md:w-20 h-px bg-amber-400" />
              </div>

              <p className="text-white/75 sm:mt-0 text-xs sm:text-sm leading-relaxed max-w-[260px] sm:max-w-xs md:max-w-sm mt-1">
                {isCustom
                  ? `From Haldi to Grand Wedding, We Decorate Every Moment Beautifully.`
                  : `We decorate your home with love, creativity & perfection.`}
              </p>

              <div className="flex flex-wrap mt-4 items-center gap-2 sm:gap-3 sm:mt-3">
                <button
                  onClick={() =>
                    window.open(
                      "https://wa.me/916398484419",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  className="flex items-center gap-1.5 bg-green-600 hover:bg-green-800 text-white text-xs sm:text-sm font-medium px-4 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
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

      {/* ══════════════════════════════════════
          TRUST BADGES STRIP (specific/custom)
          ══════════════════════════════════════ */}
      {heroTrustBadges && (
        <div className="w-full bg-white border-b border-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3">
            <div className="flex flex-wrap justify-around gap-y-3 gap-x-2">
              {heroTrustBadges.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-[10px] sm:text-xs text-zinc-600 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="w-full py-8 pt-0 md:py-10 md:pt-0 sm:max-w-7xl mx-auto">
        {/* ══════════════════════════════════════
            BUDGET FRIENDLY SECTION
            (for custom/wedding: shown as "Our Services" horizontal scroll)
            ══════════════════════════════════════ */}
        <div className="w-full flex flex-col gap-10 py-10 pb-4 sm:pb-8 sm:py-14 sm:pt-0">
          {/* Trust badge strip (default mode only) */}
          {!isSpecific && (
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
          )}
        </div>

        {/* ══════════════════════════════════════
            WE DECORATE EVERY VENUE (custom only)
            ══════════════════════════════════════ */}
        {/* ══════════════════════════════════════
    WE DECORATE EVERY VENUE
    ══════════════════════════════════════ */}
        {!shouldHidePackages && (
          <section className="w-full py-8 pt-0 md:py-10 md:pt-0  px-4 sm:px-8 md:px-12 pb-12">
            <SectionHeading
              title={
                isCustom
                  ? "We Decorate Every Venue"
                  : `Our ${products.title} Packages`
              }
              subtitle={
                isCustom
                  ? "From intimate gatherings to grand celebrations."
                  : "Choose from our curated packages or customize as per your needs in the form."
              }
            />
            <SortBar value={lowSort} onChange={setLowSort} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {venueProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/store/${product.type}/${product.slug}`}
                  className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer"
                >
                  <Image
                    src={
                      product.image ||
                      products.bannerImage ||
                      "/services/placeholder.jpg"
                    }
                    fill
                    alt={product.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/80 via-[#0d2818]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3
                      className="text-white font-semibold text-sm sm:text-base"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-white/70 text-xs mt-0.5">
                      ₹{Number(product.price).toLocaleString("en-IN")}+
                    </p>
                  </div>
                </Link>
              ))}
            </div>
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

        {/* ══════════════════════════════════════
            HOW WE WORK + CONTACT FORM (custom only)
            ══════════════════════════════════════ */}
        {isCustom && (
          <section className="w-full py-8 md:py-10 px-4 sm:px-8 md:px-12 pb-12">
            <div className="flex flex-col gap-5 max-w-4xl mx-auto">
              {/* ── Left: How We Work + Why Choose Us ── */}
              <div className="flex flex-col gap-5">
                <SectionHeading
                  title="How We Work"
                  subtitle="Simple process to make your dream wedding a reality"
                />

                <div className="flex flex-col gap-3">
                  {HOW_WE_WORK_STEPS.map((step, i) => (
                    <div
                      key={step.label}
                      className="flex items-center gap-3 bg-white rounded-xl border border-amber-100 px-4 py-3"
                    >
                      <div className="w-8 h-8 shrink-0 rounded-full bg-[#0d2818] text-amber-400 flex items-center justify-center font-bold text-xs">
                        {i + 1}
                      </div>
                      <p className="text-sm font-medium text-[#0d2818]">
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl border border-amber-100 p-5">
                  <h3
                    className="text-sm font-semibold text-[#0d2818] mb-3 tracking-wide uppercase"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Why Choose White Green Decors?
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {WHY_CHOOSE_US.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-xs text-zinc-600"
                      >
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════
            SPECIFIC MODE BOTTOM SECTION
            (House Decoration style quote + price factors)
            ══════════════════════════════════════ */}
        <ContactPage title={products.title} />
      </section>
    </main>
  );
}
