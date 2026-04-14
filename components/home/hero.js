"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const banners = [
  "/cards-pic/banner1.jpg",
  "/cards-pic/banner2.jpg",
  "/cards-pic/banner3.jpg",
];

const services = [
  { img: "provide3.png", label: "Birthday Decorations" },
  { img: "provide9.png", label: "Same day decorations" },
  { img: "provide8.png", label: "Personalised gifts" },
  { img: "provide2.png", label: "Kids birthday decors" },
  { img: "provide4.png", label: "Corporate events" },
  { img: "provide7.png", label: "Birthday balloon" },
  { img: "provide5.png", label: "Candle light dinner" },
  { img: "provide1.png", label: "Anniversary decorations" },
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
    <section className="flex flex-col gap-4 pt-2 relative w-full sm:min-h-screen">
      <div className="grid grid-rows-2 grid-flow-col md:flex md:justify-around gap-2 md:gap-2 px-2 md:px-0">
        {services.map((item) => (
          <div
            key={item.label}
            className="card flex flex-col items-center sm:p-3 shadow-sm"
          >
            <div className="w-14 h-14 sm:w-12 sm:h-12 lg:w-14 lg:h-14 relative mb-2">
              <Image
                src={`/cards-pic/${item.img}`}
                fill
                className="object-contain"
                alt={item.label}
              />
            </div>
            <span className="text-xs sm:text-sm text-center text-gray-700 font-medium leading-tight">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative w-full h-40 sm:h-60 md:h-90 overflow-hidden">
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

        <div className="absolute bottom-0 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-blue-500 w-4 md:w-5"
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
