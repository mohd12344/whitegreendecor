import Image from "next/image";
import Link from "next/link";
import {
  Astroid,
  UserStar,
  Diamond,
  Clock3,
  Timer,
  Gem,
  Heart,
  BriefcaseBusiness,
  Grid2x2,
  Cake,
  Baby,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  LayoutGrid,
  Wrench,
  Smile,
  MoveRight,
} from "lucide-react";

const trust_badge = [
  {
    icon: UserStar,
    title: "500+",
    desc: "Event Completed",
  },
  {
    icon: Diamond,
    title: "100%",
    desc: "Customer Satisfaction",
  },
  {
    icon: Clock3,
    title: "24/7",
    desc: "Support",
  },
  {
    icon: Timer,
    title: "On-Time",
    desc: "Delivery & Setup",
  },
];

const event_type = [
  {
    title: "Weddings Event",
    icon: Heart,
  },
  {
    title: "Engagement",
    icon: Gem,
    pcOnly: true,
  },
  {
    title: "Baby Shower",
    icon: Baby,
  },
  {
    title: "Birthday",
    icon: Cake,
    pcOnly: true,
  },
  {
    title: "Anniversary",
    icon: Heart,
    pcOnly: true,
  },
  {
    title: "Corporate Events",
    icon: BriefcaseBusiness,
  },
  {
    title: "Other Events",
    icon: Grid2x2,
  },
];

const why_points = [
  "Customized Themes & Unique Designs",
  "Premium Quality Materials",
  "Experienced & Creative Team",
  "On-Time Delivery & Setup",
  "Affordable Packages",
  "100% Satisfaction Guaranteed",
];

const process_steps = [
  {
    num: "01",
    title: "Consultation",
    desc: "Share your ideas and requirements with our experts.",
    icon: MessageCircle,
  },
  {
    num: "02",
    title: "Planning & Design",
    desc: "We plan, design and create a perfect setup for you.",
    icon: LayoutGrid,
  },
  {
    num: "03",
    title: "Setup & Execution",
    desc: "Our team handles everything with precision.",
    icon: Wrench,
  },
  {
    num: "04",
    title: "Enjoy Your Event",
    desc: "Sit back and enjoy beautiful memories with your loved ones.",
    icon: Smile,
  },
];

const gallery_images = [
  "/cards-pic/room-show.png",
  "/cards-pic/houses-show.png",
  "/services/haldi-5.jpg",
  "/cards-pic/car-decor-show.png",
];

export default function ServicesShow({ services }) {
  return (
    <main className="flex flex-col gap-4">
      <section className="w-full overflow-hidden">
        <div className="relative w-full h-62 sm:h-58 md:h-90 lg:h-[22rem] overflow-hidden">
          <div className="flex h-full transition-transform duration-700 ease-in-out">
            <div className="relative flex-shrink-0 w-full h-full">
              <Image
                src={"/cards-pic/mehendi-show.png"}
                fill
                alt={"section"}
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a10] via-[#0e1a10]/80 to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex items-center px-4 sm:px-8 z-10">
            <div className="w-[80%] sm:w-[50%] md:max-w-[55%] space-y-2 md:space-y-3">
              <div className="flex items-center gap-2">
                <Astroid className="w-3 sm:w-4 h-3 sm:h-4 fill-amber-400 text-amber-400" />
                <span className="text-amber-300 text-[10px] sm:text-[11px] sm:text-xs tracking-widest italic leading-none uppercase">
                  What we offer
                </span>
              </div>

              <h1 className="font-['Playfair_Display'] mt-2 sm:mt-0 text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-xs sm:max-w-sm md:max-w-md">
                Our Services
              </h1>

              <p className="mt-2.5 sm:mt-0 text-xs sm:text-sm leading-relaxed max-w-fit sm:max-w-xs md:max-w-xs text-white/90">
                From intimate gathering to grand celebration, we create magical
                experience with elegance and performance
              </p>

              <div className="flex items-center gap-6 sm:gap-3 mt-3.5 sm:mt-4">
                {trust_badge.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex flex-col items-center justify-center rounded-xl sm:px-3 sm:py-2 sm:min-w-[90px]"
                    >
                      <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500 mb-1" />

                      <h3 className="text-white font-semibold text-[10px] sm:text-sm">
                        {item.title}
                      </h3>

                      <p className="text-[8px] sm:text-[10px] mt-0.5 text-white text-center leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-10 pb-4">
        <div className="mb-8 flex items-center gap-3 md:mb-10">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
          <h2 className="whitespace-nowrap font-[Jost,sans-serif] text-xs font-medium uppercase tracking-[0.25em] text-gray-700 select-none md:text-sm">
            Explore by Celebration
          </h2>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        </div>

        <div className="flex gap-4 sm:gap-8 justify-center">
          {event_type.map((event) => (
            <button
              key={event.title}
              className={`group ${event.pcOnly ? "hidden sm:flex" : "flex"} flex-col items-center gap-2.5 rounded-xl border border-transparent bg-transparent sm:py-4 px-1 sm:px-2 transition-all duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500`}
            >
              <div className="flex size-12 md:size-14 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-amber-600 transition-all duration-200 group-hover:border-amber-400 group-hover:bg-amber-100">
                <event.icon className="size-6 md:size-7" />
              </div>
              <span className="text-center text-[10px] font-medium leading-tight text-gray-600 md:text-xs">
                {event.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="py-4 pt-2 md:py-8 md:pt-4 md:pb-4 bg-white">
        <div className="max-w-5xl mx-auto px-5 mb-10 flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
          <h2 className="whitespace-nowrap font-[Jost,sans-serif] text-xs font-medium uppercase tracking-[0.25em] text-gray-700 select-none md:text-sm">
            Our Popular Services
          </h2>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {services.map((service, i) => {
              return (
                <Link
                  key={i}
                  href={`/services/${service.href}`}
                  className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden bg-white transition-all duration-300 hover:shadow-xl hover:shadow-black/8"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-amber-50">
                    <Image
                      src={service.image ?? "/logo.jpg"}
                      fill
                      alt={service.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105 overflow-hidden"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-1.5 p-3.5 md:p-4">
                    <h3 className="font-['Playfair_Display'] text-sm font-bold text-gray-900 leading-snug md:text-base">
                      {service.title}
                    </h3>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-400 transition-all duration-200 group-hover:gap-2.5 md:text-xs">
                      View Details
                      <MoveRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto flex flex-col gap-4 sm:gap-6 max-w-7xl px-5 py-8 md:py-12">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-100 md:grid-cols-[1fr_1.6fr]">
          <div className="relative flex flex-col gap-4 overflow-hidden bg-green-950 px-7 py-10">
            <span className="pointer-events-none absolute -bottom-5 -right-5 text-[96px] text-green-900 opacity-40 rotate-[-15deg] select-none">
              🌿
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber-400 md:text-[11px]">
              Why Choose
            </span>

            <h2 className="font-['Playfair_Display'] text-2xl font-bold leading-snug text-white md:text-3xl">
              White Green
              <br />
              Decors?
            </h2>

            <p className="max-w-[240px] text-xs leading-relaxed text-white/60">
              We blend creativity, passion and perfection to turn your dreams
              into unforgettable memories.
            </p>

            <ul className="flex flex-col gap-2">
              {why_points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-xs text-white/85"
                >
                  <CheckCircle2 className="size-4 shrink-0 fill-amber-400 text-green-950" />
                  {point}
                </li>
              ))}
            </ul>

            <Link
              href="https://wa.me/919876543210"
              target="_blank"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-xs font-semibold text-green-950 transition-colors hover:bg-amber-500"
            >
              Get Free Consultation <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-8 border-t border-gray-100 bg-white px-7 py-10 md:border-l md:border-t-0">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/55 to-transparent" />
              <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.22em] text-gray-500 md:text-[11px]">
                Our Simple Process
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/55 to-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
              {process_steps.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === process_steps.length - 1;
                return (
                  <div
                    key={step.num}
                    className="relative flex flex-col items-center gap-2.5 px-2 text-center"
                  >
                    {!isLast && (
                      <span className="absolute left-1/2 top-7 hidden h-px w-full border-t border-dashed border-amber-300/60 md:block" />
                    )}
                    {/* Icon circle */}
                    <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-amber-300/50 bg-amber-50">
                      <Icon className="size-6 text-amber-600" />
                    </div>
                    <span className="text-lg font-bold leading-none text-amber-600">
                      {step.num}
                    </span>
                    <p className="font-['Playfair_Display'] text-sm font-bold leading-snug text-gray-900">
                      {step.title}
                    </p>
                    <p className="text-[11px] leading-relaxed text-gray-500">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative hidden sm:grid grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-[1fr_1.5fr]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/cards-pic/wedding-hall.png"
              fill
              alt=""
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-950/80 to-green-950/20" />
          </div>

          <div className="relative z-10 flex flex-col justify-center gap-2 px-8 py-6">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold leading-[34px] text-white md:text-3xl">
              See Our Work
              <br />
              in Action
            </h2>
            <p className="max-w-[220px] text-xs leading-relaxed text-white/85">
              From dreamy setups to memorable celebrations, explore our recent
              work.
            </p>
          </div>

          <div className="relative z-10 hidden items-center justify-end gap-2.5 px-5 py-5 md:flex md:pr-6">
            {gallery_images.map((src, i) => (
              <div
                key={i}
                className="relative min-w-0 flex-1 overflow-hidden rounded-xl border-2 border-white/20 transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 hover:border-amber-400/70"
                style={{ aspectRatio: "4/4" }}
              >
                <Image
                  src={src}
                  fill
                  alt={`Gallery image ${i + 1}`}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
