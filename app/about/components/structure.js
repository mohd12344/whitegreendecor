"use client";

import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  const stats = [
    { number: "500+", label: "Events Completed" },
    { number: "450+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "15+", label: "Team Members" },
  ];
  const features = [
    "100% Customized Designs",
    "On-Time Setup Guarantee",
    "Budget-Friendly Packages",
    "Serving Entire NCR Delhi",
  ];

  const services = [
    { icon: "🌸", title: "Mehndi Decor", desc: "Traditional & modern themes" },
    { icon: "💛", title: "Haldi Decor", desc: "Vibrant yellow setups" },
    { icon: "💍", title: "Ring Ceremony", desc: "Elegant arrangements" },
    { icon: "🎊", title: "Wedding Decor", desc: "Grand celebrations" },
  ];

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] md:h-[50vh] md:min-h-[400px]">
        <Image
          src="/banner/weds7.png"
          fill
          alt="About WhiteGreen Decoration"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2818]/95 to-[#0d2818]/70" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-5">
          <span className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full px-4 py-2 mb-4">
            <span className="text-[#d4af37]">✦</span>
            <span className="text-white/90 text-sm">Know Our Story</span>{" "}
          </span>
          <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            About <span className="text-[#d4af37]">Us</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl">
            Creating magical moments for your special celebrations since 2019
          </p>
        </div>
      </section>
      {/* Stats Strip */}
      <section className="bg-[#1a4d2e] py-8 md:py-10">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4af37] mb-1">
                  {stat.number}
                </span>
                <span className="text-white/70 text-xs sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Main About Section */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="flex justify-center items-center">
            {" "}
            {/* Left - Image Grid */}
            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <span className="inline-block text-[#d4af37] text-sm font-semibold tracking-wider uppercase mb-4">
                ✦ Who We Are
              </span>
              <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d2818] mb-4 leading-tight">
                Turning Your Dreams Into{" "}
                <span className="text-[#1a4d2e]">Beautiful Reality</span>
              </h2>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
                Welcome to{" "}
                <strong className="text-[#0d2818]">
                  WhiteGreen Decoration
                </strong>{" "}
                White Green Decors offers premium flower decoration services
                across Delhi NCR, including Delhi, Rohini, Gurugram, and Noida,
                transforming every celebration into a memorable experience. We
                specialize in Haldi decoration, Mehndi decoration, and complete
                wedding decoration including elegant wedding stage décor, entry
                gate décor, and stylish table arrangements & centerpieces. From
                grand wedding reception decoration, mandap decoration, and
                vibrant sangeet decoration to luxurious cocktail party and
                destination wedding décor, we cover it all.
              </p>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
                We also design beautiful setups for ring ceremony decoration,
                roka ceremony decoration, engagement (sagai) decoration, and
                personalized wedding house decoration. Our services extend to
                wedding car decoration, romantic first night room decoration,
                and elegant bed decoration. Beyond weddings, we create stunning
                décor for birthday party decoration, pooja decoration, and grah
                pravesh decoration. Celebrate festivals with our creative Ganesh
                Chaturthi decoration, Ganpati decoration, Janmashtami
                decoration, and dazzling Diwali/Deepavali decoration. At White
                Green Decors, we bring creativity, elegance, and freshness to
                every occasion across Delhi NCR with our expert floral and event
                decoration services.
              </p>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                From intimate Mehndi nights to grand wedding celebrations, our
                creative team brings your vision to life with elegant floral
                arrangements, breathtaking backdrops, and personalized themes
                that leave lasting impressions.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <div className="w-6 h-6 bg-[#1a4d2e] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      >
                        {" "}
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-[#0d2818] text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a4d2e] text-white font-semibold rounded-full hover:bg-[#0d2818] hover:shadow-lg transition-all"
                >
                  Our Services{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="https://wa.me/+916398484419"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20bd5a] hover:shadow-lg transition-all"
                >
                  <Image
                    src={"/svg-icons/whatsapp.svg"}
                    width={20}
                    height={20}
                    alt="log"
                  />
                  WhatsApp Us
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What We Offer */}
      <section className="py-14 md:py-20 bg-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block text-[#d4af37] text-sm font-semibold tracking-wider uppercase mb-3">
              ✦ What We Offer
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d2818]">
              Our Decoration Services{" "}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 bg-[#1a4d2e]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl group-hover:bg-[#1a4d2e] group-hover:scale-110 transition-all">
                  <span className="group-hover:scale-110 transition-transform">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-[#0d2818] font-semibold text-base md:text-lg mb-1">
                  {service.title}
                </h3>{" "}
                <p className="text-gray-500 text-xs md:text-sm">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-14 md:py-20 bg-[#0d2818] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-[200px]">✦</div>
          <div className="absolute bottom-10 right-10 text-[200px]">✦</div>
        </div>{" "}
        <div className="max-w-[1400px] mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-[#d4af37] text-sm font-semibold tracking-wider uppercase mb-3">
              ✦ Why Choose Us
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              What Makes Us Different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:bg-white/10 transition-all">
              <div className="w-14 h-14 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0d2818"
                  strokeWidth="2"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />{" "}
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Premium Quality
              </h3>
              <p className="text-white/60 text-sm">
                We use only the finest materials and fresh flowers for every
                decoration
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:bg-white/10 transition-all">
              <div className="w-14 h-14 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0d2818"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                On-Time Delivery
              </h3>{" "}
              <p className="text-white/60 text-sm">
                We guarantee timely setup so you can enjoy your event
                stress-free
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:bg-white/10 transition-all">
              <div className="w-14 h-14 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0d2818"
                  strokeWidth="2"
                >
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Best Prices
              </h3>
              <p className="text-white/60 text-sm">
                Affordable packages without compromising on quality or design
              </p>{" "}
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-5 text-center">
          <span className="inline-block text-[#d4af37] text-sm font-semibold tracking-wider uppercase mb-3">
            ✦ Ready to Start?
          </span>
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d2818] mb-5">
            Let's Create Something Beautiful Together
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-8 max-w-xl mx-auto">
            {" "}
            Contact us today to discuss your event and get a free quote. We're
            here to make your celebration unforgettable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+916398484419"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a4d2e] text-white font-semibold rounded-full hover:bg-[#0d2818] hover:shadow-xl transition-all"
            >
              <Image
                src={"/svg-icons/phone.svg"}
                width={20}
                height={20}
                alt="log"
              />
              Call Now
            </a>
            <a
              href="https://wa.me/+916398484419"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20bd5a] hover:shadow-xl transition-all"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#1a4d2e] text-[#1a4d2e] font-semibold rounded-full hover:bg-[#1a4d2e] hover:text-white transition-all"
            >
              Contact Page
            </Link>
          </div>
        </div>
      </section>{" "}
    </main>
  );
};

export default AboutPage;
