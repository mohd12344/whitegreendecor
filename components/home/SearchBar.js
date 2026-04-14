"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SearchBar({ className = "", inputClassName = "" }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query || query.length === 0) {
      fetchPopular();
      return;
    }
    if (query.length < 2) return;

    setSearching(true);
    setNoResult(false);

    const timer = setTimeout(() => fetchSearch(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  async function fetchPopular() {
    setSearching(true);
    setNoResult(false);
    const res = await fetch("/api/search");
    const data = await res.json();
    setResults(data);
    setSearching(false);
  }

  async function fetchSearch(q) {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setResults(data);
    setSearching(false);
    if (data.length === 0) setNoResult(true);
  }

  function handleFocus() {
    setShowDropdown(true);
    if (results.length === 0) fetchPopular();
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Input */}
      <div
        className={`flex items-center border border-gray-300 py-1.5 px-3 rounded-sm bg-gray-50 focus-within:border-[#989998] focus-within:bg-white transition-all ${inputClassName}`}
      >
        <input
          type="text"
          placeholder="What are you celebrating?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          className="outline-none w-48 lg:w-56 text-[13px] text-[#0d2818] placeholder:text-zinc-600 bg-transparent"
        />
        <button
          type="button"
          className="w-7 h-7 bg-[#d4af37] text-[#0d2818] rounded-full flex items-center justify-center hover:bg-[#e5c458] hover:scale-105 transition-all cursor-pointer ml-2 flex-shrink-0"
        >
          <Image
            src="/svg-icons/search.svg"
            width={14}
            height={14}
            alt="search"
          />
        </button>
      </div>

      {showDropdown && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[300px] md:min-w-[340px] bg-white border border-stone-200 rounded-2xl shadow-lg py-2 z-50">
          <p className="text-xs font-medium px-3 pb-2 text-stone-400 uppercase tracking-wider">
            {query ? "Results" : "Popular"}
          </p>

          {searching ? (
            <p className="text-center py-6 text-sm text-stone-400">
              Searching...
            </p>
          ) : noResult ? (
            <p className="text-center py-6 text-sm text-stone-400">
              No results found
            </p>
          ) : (
            results.map((product) => (
              <Link
                key={product._id}
                href={`/store/${product.type}/${product.slug}`}
                onClick={() => {
                  setShowDropdown(false);
                  setQuery("");
                }}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-stone-50 cursor-pointer rounded-xl mx-1 transition-colors"
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image || "/services/placeholder.jpg"}
                    fill
                    alt={product.title}
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-semibold text-stone-800 truncate">
                    {product.title}
                  </span>
                  <span className="text-xs text-stone-400 truncate">
                    {product.type}
                  </span>
                </div>

                {/* Price */}
                <span className="text-xs font-semibold text-[#1a4d2e] whitespace-nowrap">
                  ₹{Number(product.price).toLocaleString()}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
