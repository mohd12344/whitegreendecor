"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { generateSlug } from "@/components/services/generateSlug";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function ProductStructure({ item, similarProducts }) {
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const params = useParams();

  const allImages = item.images?.length
    ? item.images
    : item.image
      ? [item.image]
      : ["/services/placeholder.jpg"];

  const lightboxSlides = allImages.map((src) => ({ src }));

  const tabsData = {
    description: item.description || "No description available.",
    inclusions: item.inclusion
      ? item.inclusion.split(",").map((i) => i.trim())
      : [],
    exclusions: item.exclusion
      ? item.exclusion.split(",").map((i) => i.trim())
      : [],
    faqs: [
      {
        q: "How early should I book?",
        a: "We recommend booking at least 2-3 weeks in advance.",
      },
      {
        q: "Do you provide customization?",
        a: "Yes! We can customize colors, themes, and more.",
      },
      {
        q: "What areas do you serve?",
        a: "Delhi NCR — Delhi, Noida, Gurgaon, Faridabad, Ghaziabad.",
      },
      {
        q: "How long does setup take?",
        a: "Typically 2-3 hours depending on the package.",
      },
    ],
  };

  const whyChooseUs = [
    "500+ successful events decorated",
    "Professional & trained team",
    "Premium quality materials",
    "On-time setup guaranteed",
    "Customizable themes available",
  ];

  return (
    <div className="min-h-screen bg-gray-50 border-t border-t-zinc-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT — Images */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3 min-w-0">
            {/* Main image */}
            <div
              className="relative w-full rounded-2xl overflow-hidden cursor-zoom-in"
              style={{ aspectRatio: "1/1" }}
              onClick={() => {
                setLightboxIndex(activeImg);
                setLightboxOpen(true);
              }}
            >
              <Image
                src={allImages[activeImg]}
                fill
                alt={item.title}
                className="object-cover"
                priority
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImg(
                        (p) => (p - 1 + allImages.length) % allImages.length,
                      );
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-all z-10"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImg((p) => (p + 1) % allImages.length);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-all z-10"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full z-10">
                    {activeImg + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div
                className="flex gap-2 overflow-x-auto pb-1 w-full"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === i
                        ? "border-[#1a4d2e]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} fill alt="" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 min-w-0">
            <nav className="flex items-center gap-1.5 text-sm text-gray-400 flex-wrap">
              <span>Home</span>
              <span>/</span>
              <Link
                href={`/services/${generateSlug(item.type)}`}
                className="hover:text-[#1a4d2e]"
              >
                Services
              </Link>
              <span>/</span>
              <span className="text-gray-700 truncate max-w-[150px]">
                {item.type}
              </span>
            </nav>

            <div className="flex items-center gap-2 flex-wrap">
              <Image
                src="/svg-icons/5star.svg"
                width={100}
                height={20}
                alt="5 stars"
              />
              <span className="text-sm text-gray-500">
                ({item.reviews || "128 reviews"})
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight break-words">
              {item.title}
            </h1>

            <span className="inline-block w-fit text-sm font-medium text-[#1a4d2e] bg-[#1a4d2e]/10 px-3 py-1 rounded-full">
              {item.type}
            </span>

            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-3xl sm:text-4xl font-bold text-zinc-800">
                ₹{item.price?.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-gray-400">onwards</span>
            </div>

            <div className="flex flex-col gap-1">
              <a
                href={`https://wa.me/916398484419?text=Hi! I'm interested in booking the ${item.title} link: ${process.env.NEXT_PUBLIC_BASE_URL}/store/${params.type}/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-3 sm:py-4 bg-[#045112] text-white font-semibold rounded-full hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Image
                  src="/svg-icons/whatsapp.svg"
                  width={40}
                  height={40}
                  alt="whatsapp"
                />
                Book Now on WhatsApp
              </a>
              <p className="text-center text-xs text-gray-400">
                We typically reply within 10–15 minutes
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                Why Choose Us
              </h3>
              <ul className="space-y-2">
                {whyChooseUs.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-gray-600 text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-[#d4af37] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <svg
                className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-sm text-amber-800">
                <strong>Limited bookings during wedding season.</strong> Early
                booking recommended.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 md:mt-16">
          <div
            className="flex border-b border-gray-200 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {["description", "inclusions", "exclusions", "faqs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-7 py-3 text-sm font-medium capitalize transition-colors whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab
                    ? "text-[#1a4d2e] border-b-2 border-[#1a4d2e]"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="py-6">
            {activeTab === "description" && (
              <p className="text-gray-600 leading-relaxed max-w-3xl text-sm sm:text-base break-words">
                {tabsData.description}
              </p>
            )}
            {activeTab === "inclusions" && (
              <ul className="grid sm:grid-cols-2 gap-3 max-w-2xl">
                {tabsData.inclusions.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-gray-600 text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-[#1a4d2e] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === "exclusions" && (
              <ul className="grid sm:grid-cols-2 gap-3 max-w-2xl">
                {tabsData.exclusions.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-gray-600 text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-red-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === "faqs" && (
              <div className="space-y-3 max-w-3xl">
                {tabsData.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-xl border border-gray-100"
                  >
                    <h4 className="font-medium text-gray-900 text-sm">
                      {faq.q}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-12 md:mt-16 pb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Similar Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {similarProducts.map((prod) => (
              <Link
                key={prod._id}
                href={`/store/${params.type}/${prod.slug}`}
                onClick={() => setLoading(true)}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all min-w-0"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={
                      prod.images?.[0] ||
                      prod.image ||
                      "/services/placeholder.jpg"
                    }
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={prod.title}
                  />
                </div>
                <div className="p-2 sm:p-3 md:p-4">
                  <h3 className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                    {prod.title}
                  </h3>
                  <p className="text-[#1a4d2e] font-semibold text-xs sm:text-sm mt-1">
                    ₹{prod.price?.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        plugins={[Zoom]}
      />

      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/5 backdrop-blur-[2px]">
          <div className="h-5 w-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
