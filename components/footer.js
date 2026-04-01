import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const needHelpLinks = [
    { name: "WhatsApp Us", href: "https://wa.me/919876543210" },
    { name: "Contact Us", href: "/contact" },
    { name: "Terms and Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refund" },
  ];

  const importantLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Call Us", href: "tel:+919876543210" },
    { name: "Email Us", href: "mailto:info@elegancedecorations.com" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: "/svg-icons/facebook.svg" },
    { name: "Instagram", href: "#", icon: "/svg-icons/instagram.svg" },
    { name: "Pinterest", href: "#", icon: "/svg-icons/pintrest.svg" },
    {
      name: "WhatsApp",
      href: "https://wa.me/919876543210",
      icon: "/svg-icons/whatsapp.svg",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#0d2818] to-[#071510]">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-5 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo & About */}
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

          {/* Need Help */}
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

          {/* Important Links */}
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
      </div>{" "}
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Elegance Decorations. All rights
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
