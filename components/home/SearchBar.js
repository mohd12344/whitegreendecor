"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, Package } from "lucide-react";

export default function SearchBar({ className = "", inputClassName = "" }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sections, setSections] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const wrapperRef = useRef(null);

  const hasResults = sections.length > 0 || products.length > 0;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        setShowDropdown(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Debounced fetch
  useEffect(() => {
    if (!showDropdown) return;

    const timer = setTimeout(
      () => fetchResults(query),
      query.length >= 2 ? 350 : 0,
    );
    return () => clearTimeout(timer);
  }, [query, showDropdown]);

  async function fetchResults(q) {
    setSearching(true);
    try {
      const url =
        q.length >= 2
          ? `/api/search?q=${encodeURIComponent(q)}`
          : "/api/search";
      const res = await fetch(url);
      const data = await res.json();
      setSections(data.sections || []);
      setProducts(data.products || []);
    } catch {
      setSections([]);
      setProducts([]);
    } finally {
      setSearching(false);
    }
  }

  function handleFocus() {
    setShowDropdown(true);
    if (!hasResults) fetchResults("");
  }

  function closeDropdown() {
    setShowDropdown(false);
    setQuery("");
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* ── Input ── */}
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

      {/* ── Dropdown ── */}
      {showDropdown && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[300px] md:min-w-[360px] bg-white border border-stone-200 rounded-2xl shadow-lg py-3 z-50 max-h-[70vh] overflow-y-auto">
          {searching ? (
            <p className="text-center py-6 text-sm text-stone-400">
              Searching...
            </p>
          ) : !hasResults ? (
            <p className="text-center py-6 text-sm text-stone-400">
              No results found
            </p>
          ) : (
            <>
              {/* ── Services section ── */}
              {sections.length > 0 && (
                <div className="mb-1">
                  <div className="flex items-center gap-1.5 px-3 pb-1.5">
                    <LayoutGrid className="w-3 h-3 text-amber-500" />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                      Services
                    </p>
                  </div>

                  {sections.map((section) => (
                    <Link
                      key={section._id}
                      href={`/services/${section.slug}`}
                      onClick={closeDropdown}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-stone-50 cursor-pointer rounded-xl mx-1 transition-colors"
                    >
                      {/* Banner image if available, else colored icon */}
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-amber-50 flex items-center justify-center">
                        {section.bannerImage ? (
                          <Image
                            src={section.bannerImage}
                            fill
                            alt={section.title}
                            className="object-cover"
                          />
                        ) : (
                          <LayoutGrid className="w-4 h-4 text-amber-400" />
                        )}
                      </div>

                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm font-semibold text-stone-800 truncate">
                          {section.title}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          View all packages
                        </span>
                      </div>

                      <span className="text-[10px] text-amber-500 font-medium whitespace-nowrap">
                        Category →
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Divider between sections and products */}
              {sections.length > 0 && products.length > 0 && (
                <div className="mx-3 my-1 border-t border-stone-100" />
              )}

              {/* ── Products section ── */}
              {products.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-3 pb-1.5 pt-1">
                    <Package className="w-3 h-3 text-amber-500" />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                      Packages
                    </p>
                  </div>

                  {products.map((product) => (
                    <Link
                      key={product._id}
                      href={`/store/${product.type}/${product.slug}`}
                      onClick={closeDropdown}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-stone-50 cursor-pointer rounded-xl mx-1 transition-colors"
                    >
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
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
                        <span className="text-[10px] text-stone-400 truncate capitalize">
                          {product.type}
                        </span>
                      </div>

                      <span className="text-xs font-semibold text-[#1a4d2e] whitespace-nowrap">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
