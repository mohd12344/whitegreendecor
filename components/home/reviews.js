import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    text: "White Green Decors made our Haldi ceremony so beautiful. Everything was perfect!",
    name: "Priya Sharma",
    location: "Delhi",
  },
  {
    text: "The team is very professional and creative. Our wedding decor was beyond our expectations.",
    name: "Ankit & Neha",
    location: "Gurugram",
  },
  {
    text: "Amazing work for our bedroom decoration. Highly recommended!",
    name: "Rohit Verma",
    location: "Noida",
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

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-stone-50 rounded-2xl border border-amber-100 shadow-sm px-5 py-6 flex flex-col gap-3 flex-1 min-w-0">
      <span className="text-amber-400 font-serif text-4xl leading-none">"</span>
      <StarRow />
      <p className="text-zinc-600 text-sm leading-relaxed">{review.text}</p>
      <div className="flex items-center gap-3 mt-auto pt-2">
        <div>
          <p className="text-[#0d2818] font-semibold text-sm">{review.name}</p>
          <p className="text-zinc-400 text-xs">{review.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % reviews.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-0 sm:py-4 px-4 sm:px-6 flex flex-col gap-9 sm:gap-14">
      <div className="recent-work relative flex flex-col sm:items-center">
        <button
          onClick={() => scroll("left")}
          className={`absolute ${showLeft ? "flex" : "hidden"} top-1/2 left-0 mt-4 -translate-y-1/2 -translate-x-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-400/40 bg-white text-amber-400 md:hidden flex items-center justify-center hover:border-amber-400 hover:bg-amber-400/10 transition-all shadow-md`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <span className="h-px w-8 sm:w-16 bg-amber-400" />
          <p className="text-xs sm:text-sm tracking-widest uppercase text-zinc-600 font-bold">
            Our Recent Work
          </p>
          <span className="h-px w-8 sm:w-16 bg-amber-400" />
        </div>
        <div
          ref={scrollRef}
          style={{ scrollbarWidth: "none" }}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-3 w-full overflow-x-auto md:overflow-hidden"
        >
          {recentImages.map((item) => (
            <div
              key={item}
              className="relative flex-shrink-0 w-24 sm:w-40 h-24 sm:h-40 "
            >
              <Image
                src={item}
                fill
                className="object-cover rounded-2xl"
                alt="image"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className={`absolute ${showRight ? "flex" : "hidden"} right-0 mt-4 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-400/40 bg-white text-amber-400 md:hidden flex items-center justify-center hover:border-amber-400 hover:bg-amber-400/10 transition-all shadow-md`}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      <div className="reviews flex flex-col gap-2">
        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <span className="h-px w-8 sm:w-16 bg-amber-400" />
          <p className="text-xs sm:text-sm tracking-widest uppercase text-zinc-600 font-bold">
            What Our Clients Say
          </p>
          <span className="h-px w-8 sm:w-16 bg-amber-400" />
        </div>

        <div className="hidden sm:flex gap-4 md:gap-6">
          {reviews.map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </div>

        <div className="sm:hidden">
          <ReviewCard review={reviews[current]} />
          <div className="flex justify-center gap-1.5 mt-4">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-amber-400" : "w-1.5 bg-zinc-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
