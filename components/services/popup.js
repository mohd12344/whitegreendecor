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

  if (!popup) return null;

  return (
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
  );
}
