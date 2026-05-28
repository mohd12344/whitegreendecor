"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const reviews = [
  {
    text: "White Green Decors made our Haldi ceremony so beautiful. Everything was perfect!",
    name: "Priya Sharma",
    location: "Delhi",
    picture: "/people/priya.jpg",
  },
  {
    text: "The team is very professional and creative. Our wedding decor was beyond our expectations.",
    name: "Ankit & Neha",
    location: "Gurugram",
    picture: "/people/ankit.jpg",
  },
  {
    text: "Amazing work for our bedroom decoration. Highly recommended!",
    name: "Rohit Verma",
    location: "Noida",
    picture: "/people/rohit.jpg",
  },
];

const recentImages = [
  "/cards-pic/car-decor-show.png",
  "/cards-pic/room-show.png",
  "/cards-pic/houses-show.png",
  "/cards-pic/haldi-mehendi-shows.png",
  "/cards-pic/ring-show.png",
  "/cards-pic/haldi-show.png",
  "/cards-pic/decor-background.png",
];

// Lightbox expects { src } format
const slides = recentImages.map((src) => ({ src }));

/* ── Section heading ── */
function SectionHeading({ label }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
      <span className="h-px w-7 sm:w-16 bg-amber-400" />
      <p className="text-xs sm:text-sm tracking-widest uppercase text-zinc-600 font-bold">
        {label}
      </p>
      <span className="h-px w-7 sm:w-16 bg-amber-400" />
    </div>
  );
}

/* ── Star row ── */
function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

/* ── Single review card ── */
function ReviewCard({ review }) {
  return (
    <div className="bg-stone-50 rounded-2xl border border-amber-100 shadow-sm px-5 py-6 flex flex-col gap-3 flex-1 min-w-0">
      <span className="text-amber-400 font-serif text-4xl leading-none">"</span>
      <StarRow />
      <p className="text-zinc-600 text-sm leading-relaxed">{review.text}</p>
      <div className="flex gap-2 mt-auto pt-2">
        <div className="">
          <Image
            src={review.picture}
            width={44}
            height={44}
            className="rounded-full"
            alt="people"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-[#0d2818] font-semibold text-sm">{review.name}</p>
          <p className="text-zinc-400 text-xs">{review.location}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Gallery ── */
function Gallery() {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  return (
    <div className="relative">
      <SectionHeading label="Our Recent Work" />

      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className={`${showLeft ? "flex" : "hidden"} absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full border border-amber-400/40 bg-white text-amber-400 items-center justify-center hover:border-amber-400 hover:bg-amber-400/10 transition-all shadow-md`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Scroll row */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {recentImages.map((src, i) => (
          <button
            key={src}
            onClick={() => setLightboxIndex(i)}
            className="relative flex-shrink-0 w-24 sm:w-40 h-24 sm:h-40 rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
          >
            <Image
              src={src}
              fill
              alt={`Recent work ${i + 1}`}
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className={`${showRight ? "flex" : "hidden"} absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full border border-amber-400/40 bg-white text-amber-400 items-center justify-center hover:border-amber-400 hover:bg-amber-400/10 transition-all shadow-md`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Lightbox with zoom */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom]}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
      />
    </div>
  );
}

/* ── Reviews ── */
/* ── Reviews + Trust Section ── */
function ReviewsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % reviews.length),
      4000,
    );

    return () => clearInterval(t);
  }, []);

  return (
    <>
      <div className="mt-10 sm:mt-14 bg-stone-50 border border-amber-100 rounded-[2rem] overflow-hidden">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT CONTENT */}
          <div className="p-5 sm:p-8 lg:p-12 flex flex-col gap-3 sm:gap-5">
            <SectionHeading label="Why Choose us" />

            <h2 className="text-lg sm:text-4xl leading-tight font-bold text-[#0d2818]">
              Hire Professional Wedding & Event Decorators in NCR Delhi
            </h2>

            <h3 className="text-[0.9rem] leading-snug sm:text-xl font-semibold text-zinc-800 sm:leading-relaxed">
              Trusted decoration experts for weddings, haldi, birthdays,
              anniversaries & luxury celebrations.
            </h3>

            <p className="text-zinc-600 leading-7 sm:leading-8 text-[15px] sm:text-base">
              <span className="text-[#0d2818] font-semibold">
                White Green Decors
              </span>{" "}
              is one of the trusted event decoration companies in NCR Delhi,
              providing elegant and premium decoration services for weddings,
              haldi ceremonies, mehendi functions, birthdays, anniversary
              surprises, room decorations, proposal setups, baby showers and
              many more special occasions.
            </p>

            <p className="text-zinc-600 leading-7 sm:leading-8 text-[15px] sm:text-base">
              Our creative decorators and event planners focus on beautiful
              themes, luxury floral arrangements, modern balloon setups and
              aesthetic stage decoration that make your celebration memorable.
              We proudly serve Delhi, Noida, Gurugram, Ghaziabad and nearby NCR
              areas with professional execution and on-time setup.
            </p>
          </div>

          {/* RIGHT VISUAL SIDE */}
          <div className="relative min-h-[280px] sm:min-h-[420px]">
            <Image
              src="/cards-pic/decor-background.png"
              fill
              alt="White Green Decors"
              className="object-cover"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            {/* floating badge */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[#0d2818] font-bold text-lg">
                    Premium NCR Decor Services
                  </p>

                  <p className="text-zinc-600 text-sm mt-1">
                    Weddings • Haldi • Birthdays • Surprise Decor
                  </p>
                </div>

                <div className="bg-amber-400 text-[#0d2818] font-bold rounded-xl px-3 py-2 text-sm shrink-0">
                  5★ Rated
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* WHAT OUR CLIENT SAY */}
      <div className="flex flex-col gap-2">
        <SectionHeading label="What Our Clients Say" />

        {/* Desktop */}
        <div className="hidden sm:grid grid-cols-2 xl:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="sm:hidden">
          <ReviewCard review={reviews[current]} />

          <div className="flex justify-center gap-1.5 mt-4">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-5 bg-amber-400" : "w-1.5 bg-zinc-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SEO / TRUST SECTION */}
    </>
  );
}

/* ── Main export ── */
export default function Reviews() {
  return (
    <section className="py-0 sm:py-4 px-4 sm:px-6 flex flex-col gap-9 sm:gap-14">
      <Gallery />
      <ReviewsSection />
    </section>
  );
}
