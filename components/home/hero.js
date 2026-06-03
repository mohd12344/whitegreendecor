"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LayoutGrid, MoveRight } from "lucide-react";
import Link from "next/link";

const banners = [
  "/banner/banners1.png",
  "/banner/banners2.png",
  "/banner/banners3.png",
  "/banner/banners4.png",
];

const showCase = [
  { src: "/svg-icons/custom.svg", title: "Custom Designs" },
  { src: "/svg-icons/premium.svg", title: "Premium Quality" },
  { src: "/svg-icons/ontime.svg", title: "On-site Setup" },
  { src: "/svg-icons/complete.svg", title: "Complete Solution" },
];

const serviceShow = [
  {
    src: "/cards-pic/haldi-mehendi-shows.png",
    label: "Haldi/Mehndi Decoration",
    link: "/services/haldi-mehndi-combo",
  },
  {
    src: "/cards-pic/mehendi-show.png",
    label: "Mehendi Decor",
    link: "/services/mehendi-decoration",
  },
  {
    src: "/cards-pic/car-decor-show.png",
    label: "Car Decoration",
    link: "/services/car-decoration",
  },
  {
    src: "/cards-pic/houses-show.png",
    label: "House Decor",
    link: "/services/wedding-house-decoration",
  },
  {
    src: "/cards-pic/room-show.png",
    label: "Room Decor",
    link: "/services/first-night-room-decoration",
  },
  {
    src: "/cards-pic/ring-show.png",
    label: "Ring ceremony Decor",
    link: "/services/ring-ceremony-decoration",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col gap-2 sm:gap-4 relative w-full sm:min-h-screen">
      <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-[28rem] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((src, i) => (
            <div key={i} className="relative flex-shrink-0 w-full h-full">
              <Image
                src={src}
                fill
                alt={`banner ${i + 1}`}
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a10] via-[#0e1a10]/80 to-transparent pointer-events-none" />

        <div className="absolute inset-0 flex items-center px-4 sm:px-8 z-10">
          <div className="w-[65%] sm:w-[50%] md:max-w-[55%] space-y-2.5 md:space-y-3">
            <p className="text-sm hidden tracking-[0.2em] text-amber-400 uppercase sm:flex items-center gap-2 before:content-[''] before:w-3 before:h-px before:bg-amber-400 after:content-[''] after:w-3 after:h-px after:bg-amber-400">
              We Decorate Your Dreams
            </p>
            <h2 className="font-serif text-lg sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              Make Every
              <br />
              Moment <span className="text-amber-400 italic">Special</span>
            </h2>
            <p className="text-[9px] sm:text-sm md:text-base sm:w-[80%] md:w-[70%] text-white/90 sm:leading-relaxed sm:font-medium">
              From Haldi to Grand Weddings, we create unforgettable memories
              with perfection & passion.
            </p>
            <div className="flex gap-2 sm:gap-3 flex-wrap md:mt-5">
              <Link
                href="https://wa.me/916398484419"
                target="_blank"
                className="flex gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-3 rounded-sm bg-green-700 hover:bg-green-600 cursor-pointer text-white transition-colors duration-200 font-medium"
              >
                <Image
                  src={"/svg-icons/whatsapp.svg"}
                  width={16}
                  height={16}
                  alt="whatsapp"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="hidden sm:inline">Chat on WhatsApp</span>{" "}
                <span className="inline sm:hidden">Whatsapp</span>
              </Link>
              <Link
                href="/services"
                className="text-[9px] flex items-center sm:text-[10px] md:text-xs tracking-widest uppercase px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-3 rounded-sm border border-amber-400 cursor-pointer text-white hover:bg-amber-400 hover:text-[#0e1a10] transition-colors duration-200"
              >
                View Packages
              </Link>
            </div>
            <div className="flex gap-4 sm:gap-6 flex-wrap mt-3 md:mt-8">
              {showCase.map((i) => (
                <div
                  key={i.title}
                  className="flex items-center gap-1.5 sm:gap-2"
                >
                  <Image
                    src={i.src}
                    height={20}
                    width={20}
                    alt={i.title}
                    className="invert w-4 h-4 sm:w-5 sm:h-5 opacity-80"
                  />
                  <p className="text-xs hidden md:inline w-[60%] md:w-full text-white/70 font-medium tracking-wide">
                    {i.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-4 sm:w-5 bg-amber-400" : "w-1.5 bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
      <div className="py-6 md:py-10 md:pb-0">
        <div className="grid grid-cols-2 md:flex md:items-start md:justify-center gap-4 sm:gap-5 md:gap-6 px-4 sm:px-8 md:px-12">
          {serviceShow.map((item) => (
            <Link
              href={item.link}
              key={item.label}
              className={`
        flex
        flex-col items-center gap-2
        w-full md:w-24 lg:w-28 xl:w-32
      `}
            >
              <div className="relative rounded-2xl overflow-hidden w-full aspect-square shadow-sm">
                <Image
                  src={item.src}
                  fill
                  className="object-cover"
                  alt={item.label}
                />
              </div>

              <span className="font-medium text-zinc-700 text-center text-xs sm:text-sm leading-snug">
                {item.label}
              </span>
            </Link>
          ))}

          {/* View All */}
          <div className="col-span-2 flex justify-center mt-2 md:mt-0">
            <Link
              href="/services"
              className="w-full sm:w-[220px] md:w-24 lg:w-28 xl:w-32"
            >
              <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-1.5 px-4 py-3 md:p-0 w-full md:aspect-square bg-stone-50 border border-amber-400 rounded-2xl group hover:bg-amber-50 transition-all duration-200">
                <LayoutGrid className="text-yellow-500 w-5 h-5 md:w-6 md:h-6 shrink-0" />

                <span className="font-medium text-xs sm:text-sm text-center leading-snug">
                  View All Services
                </span>

                <MoveRight className="text-yellow-500 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
