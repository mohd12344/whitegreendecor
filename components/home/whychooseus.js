import {
  Users,
  Smile,
  Star,
  Clock,
  Headphones,
  Settings,
  Gem,
  Award,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { icon: Users, value: "500+", label: "Events Completed" },
  { icon: Smile, value: "450+", label: "Happy Clients" },
  { icon: Star, value: "4.9/5", label: "Google Rating" },
  { icon: Clock, value: "100%", label: "On Time Delivery", destop: true },
  { icon: Headphones, value: "24/7", label: "Customer Support", destop: true },
];

const features = [
  {
    icon: Settings,
    title: "End to End Management",
    desc: "From planning to execution, we handle it all seamlessly.",
  },
  {
    icon: Gem,
    title: "Premium Quality Materials",
    desc: "We use the finest materials for a royal & elegant look.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    desc: "Skilled professionals ensuring perfection in every detail.",
  },
  {
    icon: Clock,
    title: "Timely Setup & Execution",
    desc: "On-time delivery & flawless execution guaranteed.",
  },
  {
    icon: CheckCircle,
    title: "100% Satisfaction Guarantee",
    desc: "Your happiness is our top priority.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="overflow-hidden py-9 flex flex-col gap-10">
      <div className="bg-[#0d2818] rounded-xl px-4 sm:px-8 py-4 sm:py-5 my-1.5 sm:my-3">
        <div className="flex items-center justify-center gap-1 text-amber-400 text-xs tracking-widest uppercase mb-4">
          <span className="w-8 h-px bg-amber-400" />
          Why Choose Us
          <span className="w-8 h-px bg-amber-400" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 sm:grid-rows-1 gap-2 flex-wrap">
          {stats.map((item) => (
            <div
              key={item.label}
              className={`${item.destop ? "hidden sm:flex" : "flex"} items-center gap-2 sm:gap-3`}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-amber-400/40 flex items-center justify-center shrink-0">
                <item.icon className="w-3 h-3 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm sm:text-xl leading-none">
                  {item.value}
                </p>
                <p className="text-white/50 text-[10px] mt-0.5">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-stone-50 border border-amber-100 rounded-2xl flex flex-col md:flex-row gap-5 md:gap-0 sm:py-7 my-1.5 sm:my-3 sm:px-6">
        <div className="bg-[#0d2818] rounded-xl sm:rounded-l-xl px-5 py-6 flex flex-col gap-3 md:w-75 shrink-0">
          <p className="text-amber-400 text-xs tracking-widest uppercase">
            Why hire us for your big day?
          </p>
          <h3 className="text-white font-['Playfair_Display'] font-bold text-xl sm:text-2xl leading-snug">
            We Handle Everything From Start to Finish
          </h3>
          <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
            Sit back & relax! Our expert team takes care of every detail so you
            can enjoy your special moments.
          </p>
          <Link href="/contact" className="mt-auto">
            <button className="w-full bg-amber-400 hover:bg-amber-300 font-semibold text-sm py-2.5 rounded-lg transition-colors duration-200">
              Get Free Consultation
            </button>
          </Link>
        </div>

        <div className="hidden md:block w-px bg-gray-100 mx-5" />

        <div
          className="flex gap-3 overflow-x-auto pb-2 scroll-smooth flex-1 px-4  sm:p-0"
          style={{ scrollbarWidth: "none" }}
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-2 min-w-36 sm:min-w-44"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-amber-400/30 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0d2818]" />
              </div>
              <h4 className="text-[#0d2818] font-semibold text-sm sm:text-base leading-snug">
                {title}
              </h4>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed w-fit sm:w-[70%]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
