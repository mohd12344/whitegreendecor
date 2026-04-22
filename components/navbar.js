"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./home/SearchBar";

const staticNavLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", dropdown: [] },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

const contactInfo = {
  phone: "+91 6398484419",
  whatsapp: "+91 6398484419",
  location: "Delhi NCR, India",
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(staticNavLinks);
  const [OpenServiceLink, setOpenServiceLink] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  useEffect(() => {
    fetch("/api/sections/nav")
      .then((r) => r.json())
      .then((sections) => {
        setNavLinks((prev) =>
          prev.map((link) =>
            link.name === "Services"
              ? {
                  ...link,
                  dropdown: sections.map((s) => ({
                    name: s.title,
                    href: `/services/${s.slug}`,
                  })),
                }
              : link,
          ),
        );
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="bg-white border-t-4 border-t-green-900 sm:border-b-[1px] sm:border-b-zinc-300">
        <div className="px-2 sm:px-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="flex lg:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer hover:bg-gray-100 pt-1.5 rounded-lg transition-colors"
            >
              <span
                className={`w-[22px] h-0.5 bg-[#1a4d2e] rounded transition-all ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
              />
              <span
                className={`w-[22px] h-0.5 bg-[#1a4d2e] rounded transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-[22px] h-0.5 bg-[#1a4d2e] rounded transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
              />
            </button>

            <Link
              href="/"
              className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0"
            >
              <Image
                src="/logo.jpg"
                fill
                alt="Logo"
                className="object-contain"
              />
            </Link>

            <div className="hidden md:flex">
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href="/contact"
              className="hidden sm:flex items-center gap-1.5 text-[13px] hover:text-[#d4af37] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="hidden lg:inline">Help</span>
            </Link>
            <div className="flex items-center gap-1.5 text-[13px]">
              <Image
                src="/svg-icons/location.svg"
                width={14}
                height={14}
                alt="location"
                className="invert"
              />
              <span>Delhi NCR</span>
            </div>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="hidden sm:flex items-center gap-1.5 text-[13px] hover:text-[#d4af37] transition-colors"
            >
              <Image
                src="/svg-icons/phone.svg"
                width={14}
                height={14}
                alt="phone"
                className="invert"
              />
              <span>{contactInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="z-20 py-1.5 pb-3.5 sm:py-2">
        <div className="px-5 flex justify-center sm:justify-between items-center">
          <ul className="hidden md:flex list-none gap-1">
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

                {link.dropdown && link.dropdown.length > 0 && (
                  <ul className="absolute top-full left-0 min-w-[220px] bg-white rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.15)] list-none py-2.5 opacity-0 invisible translate-y-2.5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all border border-gray-200 z-50">
                    {link.dropdown.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="block px-6 py-3 text-[#0d2818] text-sm border-l-[3px] border-transparent hover:bg-[#1a4d2e]/5 hover:text-[#1a4d2e] hover:border-[#d4af37] hover:pl-7 transition-all"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-5">
            <Link
              href="tel:+916398484419"
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#1a4d2e] to-[#0d2818] text-white text-[13px] font-semibold tracking-wide rounded-full shadow-[0_4px_15px_rgba(26,77,46,0.3)] hover:-translate-y-0.5 transition-all"
            >
              <Image
                src="/svg-icons/phone.svg"
                width={16}
                height={16}
                alt="phone"
              />
              Book Now
            </Link>
          </div>

          <div className="flex md:hidden">
            <SearchBar />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[70px] left-0 right-0 bottom-0 bg-white z-[999] overflow-y-auto transition-all duration-300 lg:hidden ${mobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"}`}
      >
        <div className="p-5 pt-6">
          <ul className="list-none">
            {navLinks.map((link) => (
              <li key={link.name} className="border-b border-gray-100">
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 text-[#0d2818] text-[15px] font-medium hover:text-[#1a4d2e] transition-colors"
                >
                  {link.name}
                  {link.dropdown && (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenServiceLink(!OpenServiceLink);
                      }}
                      className=""
                    >
                      <ChevronIcon
                        className={`w-5 h-4 ${OpenServiceLink ? "rotate-180" : "rotate-0"} text-gray-500 transition-transform`}
                      />
                    </div>
                  )}
                </Link>
                {OpenServiceLink &&
                  link.dropdown &&
                  link.dropdown.length > 0 && (
                    <ul className="list-none pb-3 pl-4 border-l-2 border-[#d4af37]/30 ml-2">
                      {link.dropdown.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2.5 text-gray-600 text-sm hover:text-[#1a4d2e] transition-colors"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>

          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
            className="flex items-center justify-center gap-2 w-full mt-6 py-4 bg-gradient-to-r from-[#1a4d2e] to-[#0d2818] text-white text-sm font-semibold rounded-full shadow-lg"
          >
            <Image
              src="/svg-icons/phone.svg"
              width={16}
              height={16}
              alt="phone"
            />
            Book Now
          </a>

          <div className="flex flex-col gap-3 mt-6 p-4 bg-gray-50 rounded-xl">
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-[#0d2818] text-sm"
            >
              <span className="w-9 h-9 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center">
                <Image
                  src="/svg-icons/phone.svg"
                  width={14}
                  height={14}
                  alt="phone"
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
              <span className="w-9 h-9 bg-[#25D366] text-white rounded-full flex items-center justify-center">
                <Image
                  src="/svg-icons/whatsapp.svg"
                  width={14}
                  height={14}
                  alt="whatsapp"
                />
              </span>
              WhatsApp
            </a>
            <div className="flex items-center gap-3 text-[#0d2818] text-sm">
              <span className="w-9 h-9 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center">
                <Image
                  src="/svg-icons/location.svg"
                  width={14}
                  height={14}
                  alt="location"
                />
              </span>
              {contactInfo.location}
            </div>
          </div>
        </div>
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
