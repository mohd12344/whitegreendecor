// app/not-found.jsx
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Page Not Found | White Green Decors",
};

export default function NotFound() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-5 py-16 bg-white">
      {/* Decorative top */}
      <span className="text-[#d4af37] text-3xl mb-6">✦</span>

      {/* 404 big text */}
      <h1 className="font-['Playfair_Display'] text-[120px] sm:text-[160px] font-bold text-[#0d2818]/8 leading-none select-none">
        404
      </h1>

      {/* Content */}
      <div className="text-center -mt-6 sm:-mt-10">
        <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d2818] mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
          Looks like this page took the day off for a celebration. Let's get you
          back to something beautiful.
        </p>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-5 py-2.5 text-sm font-medium rounded-full border border-gray-200 text-[#0d2818] hover:bg-[#1a4d2e] hover:text-white hover:border-[#1a4d2e] transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Main CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-7 py-3.5 bg-[#1a4d2e] text-white text-sm font-semibold rounded-full hover:-translate-y-0.5 hover:bg-[#0d2818] transition-all shadow-sm"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>

          <Link
            href="https://wa.me/6398484419?text=Hi! I need help finding something on your website."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white text-sm font-semibold rounded-full hover:-translate-y-0.5 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Need Help?
          </Link>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="flex items-center gap-3 mt-16 text-gray-200">
        <span className="text-[#d4af37]/30 text-xl">✦</span>
        <span className="text-xs tracking-widest uppercase text-gray-300">
          White Green Decors
        </span>
        <span className="text-[#d4af37]/30 text-xl">✦</span>
      </div>
    </main>
  );
}
