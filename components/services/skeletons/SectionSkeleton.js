"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function ServicesSkeleton() {
  function CardSkeleton() {
    return (
      <div className="flex-shrink-0 w-[180px] sm:w-[270px] md:w-[300px]">
        <Skeleton
          height={0}
          style={{ paddingBottom: "120%", borderRadius: "16px" }}
        />

        <div className="mt-3">
          <Skeleton width={100} height={16} />
        </div>

        <Skeleton width="80%" height={20} className="mt-1" />

        <Skeleton width="60%" height={16} className="mt-1" />
      </div>
    );
  }

  function SectionSkeleton() {
    return (
      <div className="max-w-[1400px] mx-auto px-5 flex flex-col gap-4 sm:gap-5">
        {/* Title skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton width={200} height={32} borderRadius={8} />
          <div className="flex gap-2">
            <Skeleton circle width={44} height={44} />
            <Skeleton circle width={44} height={44} />
          </div>
        </div>

        {/* Cards row skeleton */}
        <div className="flex gap-4 md:gap-5 overflow-hidden">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <CardSkeleton key={i} />
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex mt-8 flex-col gap-10 md:gap-14">
      <SectionSkeleton />
      <SectionSkeleton />
    </div>
  );
}

export function ServicesShowSkeleton() {
  return (
    <main className="animate-pulse">
      {/* Hero Skeleton */}
      <section className="bg-[#0d2818] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 text-center">
          <div className="h-4 w-32 bg-[#d4af37]/30 mx-auto mb-4 rounded" />
          <div className="h-10 md:h-12 w-64 bg-white/20 mx-auto rounded" />
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="relative h-[280px] sm:h-[320px] md:h-[400px] rounded-3xl overflow-hidden bg-gray-200"
              >
                {/* Image placeholder */}
                <div className="absolute inset-0 bg-gray-300" />

                {/* Gradient overlay mimic */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Text skeleton */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-3">
                  <div className="h-6 w-3/4 bg-gray-400 rounded" />
                  <div className="h-4 w-24 bg-gray-400 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="py-14 md:py-20 bg-[#f8f9fa]">
        <div className="max-w-[600px] mx-auto px-5 text-center space-y-4">
          <div className="h-8 w-2/3 bg-gray-300 mx-auto rounded" />
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-5/6 bg-gray-300 mx-auto rounded" />
          <div className="h-12 w-40 bg-gray-400 mx-auto rounded-full" />
        </div>
      </section>
    </main>
  );
}

export function DecorsSkeleton() {
  function CardSkeleton() {
    return (
      <div className="w-[180px] sm:w-[220px] md:w-[260px] flex-shrink-0">
        <Skeleton
          height={0}
          style={{
            paddingBottom: "120%",
            borderRadius: "16px",
            display: "block",
          }}
        />
        <div className="mt-3">
          <Skeleton width={80} height={14} />
          <Skeleton width="85%" height={18} className="mt-1" />
          <Skeleton width="55%" height={14} className="mt-1" />
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Hero skeleton */}
      <div style={{ height: "60vh", minHeight: "400px" }}>
        <Skeleton height="100%" style={{ display: "block" }} />
      </div>

      {/* Cards skeleton */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-10">
            <Skeleton width={220} height={32} className="mx-auto" />
            <Skeleton width={160} height={16} className="mt-2 mx-auto" />
          </div>
          <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <CardSkeleton key={i} />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 border-t border-t-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* MAIN SECTION */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT IMAGE SKELETON */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <Skeleton height="100%" />
            </div>
          </div>

          {/* RIGHT INFO SKELETON */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Breadcrumb */}
            <Skeleton width={200} height={14} />

            {/* Stars */}
            <Skeleton width={120} height={20} />

            {/* Title */}
            <Skeleton width="90%" height={40} />

            {/* Type badge */}
            <Skeleton width={90} height={28} borderRadius={999} />

            {/* Price */}
            <Skeleton width={160} height={40} />

            {/* Button */}
            <Skeleton height={50} borderRadius={999} />

            <Skeleton width={220} height={14} />

            {/* Why choose us box */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
              <Skeleton width={120} height={18} />
              <Skeleton count={4} height={14} />
            </div>

            {/* Warning box */}
            <div className="p-4 rounded-xl border border-gray-200 space-y-2">
              <Skeleton width="80%" height={14} />
              <Skeleton width="60%" height={14} />
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-12 md:mt-16">
          <div className="flex gap-4 border-b border-gray-200 pb-3">
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
          </div>

          <div className="py-6 space-y-3">
            <Skeleton width="90%" height={14} />
            <Skeleton width="85%" height={14} />
            <Skeleton width="80%" height={14} />
          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        <div className="mt-12 md:mt-16 pb-10">
          <Skeleton width={200} height={28} className="mb-6" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="aspect-square">
                    <Skeleton height="100%" />
                  </div>
                  <Skeleton width="80%" height={14} />
                  <Skeleton width="50%" height={14} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
