import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const needHelpLinks = [
    { name: "WhatsApp Us", href: "https://wa.me/916398484419" },
    { name: "Contact Us", href: "/contact" },
    { name: "Terms and Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Refund Policy", href: "/refund" },
    { name: "Call Us", href: "tel:+916398484419" },
    { name: "Email Us", href: "mailto:info@elegancedecorations.com" },
  ];

  const importantLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/p/White-Green-Decors-61562226630588/",
      icon: "/svg-icons/facebook.svg",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/whitegreendecors/",
      icon: "/svg-icons/instagram.svg",
    },
    {
      name: "Pinterest",
      href: "https://in.pinterest.com/whitegreendecors/",
      icon: "/svg-icons/pintrest.svg",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/916398484419",
      icon: "/svg-icons/whatsapp.svg",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#0d2818] to-[#071510]">
      <div className="relative h-36 sm:h-44 md:h-52 flex justify-center items-center text-white border-b border-b-gray-700">
        <Image
          src="/banner/footer-cta.png"
          className="object-cover opacity-15"
          priority
          fill
          alt="banner"
        />
        <div className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2 px-4 text-center">
          <h1 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold">
            Planning Your Special Event?
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80">
            Let's make it unforgettable together!
          </p>
          <div className="flex items-center gap-2 sm:gap-3 mt-2">
            <Link
              href="https://wa.me/916398484419"
              target="_blank"
              className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-colors"
            >
              <Image
                src="/svg-icons/whatsapp.svg"
                width={20}
                height={20}
                alt="whatsapp"
              />
              <span className="hidden sm:inline">Get Free Quote</span>
              <span className="sm:hidden">WhatsApp</span>
            </Link>
            <Link
              href="tel:+916398484419"
              className="flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-400 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-colors"
            >
              <Image
                src="/svg-icons/phone.svg"
                width={20}
                height={20}
                alt="phone"
              />
              Call Now
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-5 py-2 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <Image
                src={"/logo.png"}
                width={120}
                className="rounded-lg invert"
                height={60}
                alt="logo"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
              Creating unforgettable moments with premium Mehndi, Ring, and
              Haldi decorations. We bring your dream celebrations to life with
              elegance and creativity.
            </p>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <Image
                src="/svg-icons/location.svg"
                width={16}
                height={16}
                alt="location"
                className="opacity-70"
              />{" "}
              Delhi NCR, India
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="text-white font-semibold text-base mb-5 relative inline-block">
                Need Help
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#d4af37]"></span>
              </h3>
              <ul className="space-y-3">
                {needHelpLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 text-sm hover:text-[#d4af37] hover:pl-1 transition-all inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-base mb-5 relative inline-block">
                Important Links
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#d4af37]"></span>
              </h3>{" "}
              <ul className="space-y-3">
                {importantLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 text-sm hover:text-[#d4af37] hover:pl-1 transition-all inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} White Green Decors. All rights
              reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#d4af37] hover:border-[#d4af37] hover:-translate-y-1 transition-all group"
                  aria-label={social.name}
                >
                  <Image
                    src={social.icon}
                    width={16}
                    height={16}
                    alt={social.name}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}{" "}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
