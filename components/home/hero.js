"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const banners = [
  "/banner/wedsm3.png",
  "/banner/wedsm4.png",
  "/banner/wedsm1.png",
  "/banner/wedsm2.png",
];

const serviceShow = [
  { src: "/cards-pic/haldi-show.png", label: "Haldi/Mehndi" },
  { src: "/cards-pic/birthday-show.png", label: "Birthday" },
  { src: "/cards-pic/wedding-show.png", label: "Wedding" },
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
      <div className="relative w-full h-54 sm:h-66 md:h-106 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((src, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <Image
                src={src}
                fill
                alt={`banner ${index + 1}`}
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="absolute pl-3 sm:pl-5 bottom-0 sm:bottom-1 left-1/2 -translate-x-1/2 flex gap-2.5 sm:gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-blue-500 w-3 sm:w-4 md:w-5"
                  : "bg-zinc-400 hover:bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:gap-6 show-case py-6 pb-2 md:py-10 px-4 md:px-0">
        <h1 className="font-outfit text-center text-xl sm:text-2xl md:text-4xl text-red-950 font-bold">
          Make Every Occasion Extra Special
        </h1>

        <div className="flex flex-row justify-center items-center gap-4 md:gap-6 cards">
          {serviceShow.map((item, index) => (
            <div key={item.label} className="flex flex-col items-center">
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  width: "clamp(100px, 24vw, 288px)",
                  height: "clamp(010px, 24vw, 288px)",
                }}
              >
                <Image
                  src={item.src}
                  fill
                  className="object-cover"
                  alt={item.label}
                />
              </div>
              <span
                className="font-medium text-zinc-600 mt-2 text-center"
                style={{ fontSize: "clamp(11px, 1.8vw, 20px)" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
