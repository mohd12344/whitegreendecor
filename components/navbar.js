"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "Mehndi Decor", href: "/services/mehndi-decor" },
      { name: "Ring Decor", href: "/services/ring-decor" },
      { name: "Haldi Decor", href: "/services/haldi-decor" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

const contactInfo = {
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  location: "Mumbai, Maharashtra",
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setopenDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) console.log("Searching:", searchQuery);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#0d2818] to-[#1a4d2e] py-2.5 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 flex flex-row justify-between items-center gap-2.5 md:gap-0">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="text-white/90 text-[13px] flex items-center gap-1 hover:text-[#d4af37] transition-colors"
            >
              <Image
                src={"/svg-icons/phone.svg"}
                className=""
                width={18}
                height={18}
                alt="phone"
              />{" "}
              {contactInfo.phone}
            </a>
            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 text-[13px] flex items-center gap-2 hover:text-[#d4af37] transition-colors"
            >
              <Image
                src={"/svg-icons/whatsapp.svg"}
                className=""
                width={16}
                height={16}
                alt="whtaspp"
              />{" "}
              {contactInfo.whatsapp}{" "}
            </a>
            <a
              href="#"
              className="text-white/90 text-[13px] flex items-center gap-2 hover:text-[#d4af37] transition-colors"
            >
              <Image
                src={"/svg-icons/location.svg"}
                className=""
                width={16}
                height={16}
                alt="location"
              />{" "}
              {contactInfo.location}
            </a>
          </div>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-[30px] h-[30px] border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#d4af37] hover:border-[#d4af37] hover:-translate-y-0.5 transition-all"
            >
              <Image
                src={"/svg-icons/facebook.svg"}
                className=""
                width={16}
                height={16}
                alt="location"
              />
            </a>
            <a
              href="#"
              className="w-[30px] h-[30px] border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#d4af37] hover:border-[#d4af37] hover:-translate-y-0.5 transition-all"
            >
              <Image
                src={"/svg-icons/instagram.svg"}
                className=""
                width={16}
                height={16}
                alt="location"
              />
            </a>
            <a
              href="#"
              className="w-[30px] h-[30px] border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#d4af37] hover:border-[#d4af37] hover:-translate-y-0.5 transition-all"
            >
              <Image
                src={"/svg-icons/pintrest.svg"}
                className=""
                width={16}
                height={16}
                alt="location"
              />
            </a>{" "}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`bg-white sticky top-0 z-[1000] transition-shadow ${scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.12)]" : "shadow-[0_4px_30px_rgba(0,0,0,0.08)]"}`}
      >
        <div className="max-w-[1400px] mx-auto px-5 flex justify-between items-center h-[70px] md:h-[85px]">
          {/* Logo */}
          <Link
            href="/"
            className="relative w-16 md:w-20 h-16 md:h-20 flex items-center gap-3"
          >
            <Image src={"/logo.jpg"} fill alt="logo" />
          </Link>{" "}
          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex list-none gap-1">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1.5 px-5 py-3 text-[#0d2818] text-sm font-medium tracking-wide rounded hover:text-[#1a4d2e] hover:bg-[#1a4d2e]/5 transition-all"
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronIcon className="group-hover:rotate-180 transition-transform" />
                  )}
                </Link>
                {link.dropdown && (
                  <ul
                    className={`absolute top-full left-0 min-w-[220px] bg-white rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.15)] list-none py-2.5 ${openDropdown ? "visible opacity-100 translate-y-0" : "opacity-0 invisible translate-y-2.5"}  group-hover:opacity-100  group-hover:visible  group-hover:translate-y-0 transition-all border border-gray-200`}
                  >
                    {link.dropdown.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="block px-6 py-3 text-[#0d2818] text-sm border-l-[3px] border-transparent hover:bg-[#1a4d2e]/5 hover:text-[#1a4d2e] hover:border-[#d4af37] hover:pl-7 transition-all"
                        >
                          {item.name}{" "}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-50 border border-gray-200 rounded-full pl-4 pr-1 py-1 focus-within:border-[#2d6a4f] focus-within:shadow-[0_0_0_3px_rgba(45,106,79,0.1)] transition-all"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none bg-transparent outline-none w-32 xl:w-40 text-[13px] text-[#0d2818] placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="w-9 h-9 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center hover:bg-[#0d2818] hover:scale-105 transition-all cursor-pointer"
              >
                <Image
                  src={"/svg-icons/search.svg"}
                  className=""
                  width={16}
                  height={16}
                  alt="location"
                />
              </button>
            </form>
            <Link
              href="tel:+919876543210"
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#1a4d2e] to-[#0d2818] text-white text-[13px] font-semibold tracking-wide rounded-full shadow-[0_4px_15px_rgba(26,77,46,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(26,77,46,0.4)] transition-all"
            >
              <Image
                src={"/svg-icons/phone.svg"}
                className=""
                width={16}
                height={16}
                alt="location"
              />{" "}
              Book Now
            </Link>
          </div>
          {/* Mobile Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex lg:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2.5"
          >
            <span
              className={`w-[25px] h-0.5 bg-[#1a4d2e] rounded transition-all ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`w-[25px] h-0.5 bg-[#1a4d2e] rounded transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-[25px] h-0.5 bg-[#1a4d2e] rounded transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[140px] pt-24 pb-12 md:top-[125px] left-0 right-0 bottom-0 bg-white p-5 md:p-8 z-[999] overflow-y-auto transition-transform lg:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <form
          onSubmit={handleSearch}
          className="flex bg-gray-50 border border-gray-200 rounded-full pl-5 pr-1 py-1 mb-8"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-none bg-transparent outline-none text-[15px]"
          />
          <button
            type="submit"
            className="w-11 h-11 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center cursor-pointer"
          >
            <Image
              src={"/svg-icons/search.svg"}
              className=""
              width={16}
              height={16}
              alt="location"
            />
          </button>
        </form>
        <ul className="list-none">
          {navLinks.map((link) => (
            <li key={link.name} className="border-b border-gray-200">
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-[18px] text-[#0d2818] text-base font-medium"
              >
                {link.name}{" "}
              </Link>
              {link.dropdown && (
                <ul className="list-none pb-4 pl-5">
                  {link.dropdown.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2.5 text-[#2d6a4f] text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>{" "}
        <div className="flex flex-col gap-4 p-5 bg-gray-50 rounded-xl">
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 text-[#0d2818] text-sm"
          >
            <span className="w-9 h-9 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center">
              <Image
                src={"/svg-icons/phone.svg"}
                className=""
                width={16}
                height={16}
                alt="location"
              />
            </span>
            {contactInfo.phone}
          </a>
          <a
            href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#0d2818] text-sm"
          >
            <span className="w-9 h-9 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center">
              <Image
                src={"/svg-icons/whatsapp.svg"}
                className=""
                width={16}
                height={16}
                alt="location"
              />
            </span>
            WhatsApp
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-[#0d2818] text-sm"
          >
            <span className="w-9 h-9 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center">
              <Image
                src={"/svg-icons/location.svg"}
                className=""
                width={16}
                height={16}
                alt="location"
              />
            </span>
            {contactInfo.location}
          </a>
        </div>{" "}
      </div>
    </>
  );
}

function ChevronIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
