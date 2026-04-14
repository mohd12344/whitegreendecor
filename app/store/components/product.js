"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductStructure({ item, similarProducts }) {
  const [activeTab, setActiveTab] = useState("description");
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const params = useParams();

  const tabsData = {
    description: item.description || "No description available.",
    inclusions: item.inclusion
      ? item.inclusion.split(",").map((i) => i.trim())
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
    <div className="min-h-screen bg-gray-50 border-t border-t-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* ── Main Section ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT — Image */}
          <div className="w-full lg:w-1/2">
            <div
              ref={containerRef}
              className="relative rounded-2xl select-none"
              style={{
                aspectRatio: "1 / 1",
                overflow: "hidden",
                cursor: zoomed ? "zoom-out" : "zoom-in",
              }}
              onMouseMove={(e) => {
                if (!imgRef.current || !containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                imgRef.current.style.transformOrigin = `${x}% ${y}%`;
              }}
              onMouseEnter={() => {
                if (imgRef.current) imgRef.current.style.transform = "scale(2)";
                setZoomed(true);
              }}
              onMouseLeave={() => {
                if (imgRef.current) {
                  imgRef.current.style.transform = "scale(1)";
                  imgRef.current.style.transformOrigin = "center center";
                }
                setZoomed(false);
              }}
              onClick={() => {
                if (imgRef.current) {
                  const isZoomed =
                    imgRef.current.style.transform === "scale(2)";
                  imgRef.current.style.transform = isZoomed
                    ? "scale(1)"
                    : "scale(2)";
                  setZoomed(!isZoomed);
                }
              }}
            >
              <img
                ref={imgRef}
                src={item.image || "/sections/"}
                alt={item.title}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transformOrigin: "center center",
                  transition: "transform 0.1s ease",
                  willChange: "transform",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-gray-400">
              <span className="hover:text-[#1a4d2e] transition-colors">
                Home
              </span>
              <span>/</span>
              <span className="hover:text-[#1a4d2e] transition-colors">
                Store
              </span>
              <span>/</span>
              <span className="text-gray-700">{item.type}</span>
            </nav>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <Image
                src="/svg-icons/5star.svg"
                width={100}
                height={20}
                alt="5 stars"
              />
              <span className="text-sm text-gray-500">(128 reviews)</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {item.title}
            </h1>

            {/* Type badge */}
            <span className="inline-block w-fit text-sm font-medium text-[#1a4d2e] bg-[#1a4d2e]/10 px-3 py-1 rounded-full">
              {item.type}
            </span>

            {/* Price */}
            <div className="flex items-baseline gap-2">
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
                className="flex items-center justify-center gap-3 w-full py-3 sm:py-4 bg-[#25D366] text-white font-semibold rounded-full hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Image
                  src={"/svg-icons/whatsapp.svg"}
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
                booking recommended to secure your date.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="flex border-b border-gray-200">
            {["description", "inclusions", "faqs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 sm:px-7 py-3 text-sm font-medium capitalize transition-colors ${
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
              <p className="text-gray-600 leading-relaxed max-w-3xl text-sm sm:text-base">
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

        <div className="mt-12 md:mt-16 pb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Similar Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {similarProducts.map((item) => (
              <Link
                key={item._id}
                href={`/store/${params.type}/${item.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image || "/services/"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={item.title}
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-gray-900 text-sm truncate">
                    {item.title}
                  </h3>
                  <p className="text-[#1a4d2e] font-semibold text-sm mt-1">
                    ₹{item.price?.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
