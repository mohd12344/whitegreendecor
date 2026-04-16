import Image from "next/image";
import Link from "next/link";

export default function ServicesShow({ services }) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d2818] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 text-center">
          <span className="text-[#d4af37] text-sm tracking-widest uppercase mb-4 block">
            ✦ What We Offer
          </span>
          <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Our Services
          </h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 md:py-20 bg-white">
        {" "}
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, i) => (
              <Link
                key={i}
                href={`/services/${service.href}`}
                className="group relative h-[280px] sm:h-[320px] md:h-[400px] rounded-3xl overflow-hidden"
              >
                <Image
<<<<<<< HEAD
                  src={service.image ?? "/logo.jpg"}
=======
                  src={service.image ?? "/section/"}
>>>>>>> 570b9dcc8d1b65b159a1e6f71ed8cf542190d5e6
                  fill
                  alt={service.title}
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/90 via-[#0d2818]/20 to-transparent" />{" "}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                    {service.title}
                  </h2>
                  <span className="inline-flex items-center gap-2 text-[#d4af37] text-sm font-medium group-hover:gap-3 transition-all">
                    View More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>{" "}
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-[#f8f9fa]">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#0d2818] mb-4">
            Need Something Custom?
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-6">
            We create personalized decoration packages for your special day
          </p>
          <Link
            href="https://wa.me/919876543210?text=Hi! I need a custom decoration package."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a4d2e] text-white font-semibold rounded-full hover:bg-[#0d2818] transition-all"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
