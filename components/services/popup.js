"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LivePopup() {
  const [popup, setPopup] = useState(null);
  const [visible, setVisible] = useState(false);

  const names = [
    "Arjun Mehta",
    "Karan Singh",
    "Vikas Sharma",
    "Rahul Yadav",
    "Deepak Verma",
    "Suresh Kumar",
    "Nitin Gupta",
    "Ankit Jain",
    "Pooja Sharma",
    "Neha Verma",
    "Priya Singh",
    "Sneha Patel",
    "Ritika Gupta",
    "Anjali Mehta",
    "Kavita Yadav",
    "Manish Kumar",
    "Harsh Agarwal",
    "Abhishek Singh",
    "Tarun Bansal",
    "Ravi Mishra",
  ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/items/popup");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!products.length) return;

    let timeout;

    const interval = setInterval(() => {
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];

      const randomName = names[Math.floor(Math.random() * names.length)];

      setPopup({
        name: randomName,
        product: randomProduct,
      });

      setVisible(true);

      timeout = setTimeout(() => {
        setVisible(false);
      }, 5000);
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [products]);

  return (
    <div className="flex">
      {popup && (
        <div
          className={`fixed bottom-6 left-4 sm:left-6 z-50 bg-white shadow-2xl rounded-2xl px-4 py-3 flex items-center gap-4 w-[280px] sm:w-[320px]
  transition-all duration-500 ease-out
  ${
    visible
      ? "opacity-100 translate-y-0 scale-100"
      : "opacity-0 translate-y-6 scale-95 pointer-events-none"
  }`}
        >
          <div className="relative w-14 h-14 flex-shrink-0">
            <Image
              src={popup.product.image}
              alt=""
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-col text-sm overflow-hidden">
            <p className="font-semibold text-gray-800 truncate">{popup.name}</p>

            <p className="text-gray-500 text-xs truncate">
              just viewed {popup.product.title}
            </p>

            <Link
              href={`/store/${popup.product.type}/${popup.product.slug}`}
              className="text-amber-500 self-start text-start text-xs font-medium mt-1 hover:underline"
            >
              View →
            </Link>
          </div>
        </div>
      )}
      <div className="fixed bottom-34 sm:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-center gap-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/916398484419"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          <Image
            src="/svg-icons/whatsapp-green.svg"
            width={26}
            height={26}
            alt="WhatsApp"
            className="relative z-10 brightness-0 invert"
          />
          {/* Tooltip */}
          <span className="absolute right-full mr-3 whitespace-nowrap bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            Chat with us
          </span>
        </a>

        {/* Phone Button */}
        <a
          href="tel:+916398484419"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 bg-amber-500 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Call us"
        >
          <Image
            src="/svg-icons/phone.svg"
            width={22}
            height={22}
            alt="Phone"
            className="relative z-10 brightness-0 invert"
          />
          {/* Tooltip */}
          <span className="absolute right-full mr-3 whitespace-nowrap bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            Call us
          </span>
        </a>
      </div>
    </div>
  );
}
