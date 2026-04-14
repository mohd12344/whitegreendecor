import Image from "next/image";
import Link from "next/link";

export default async function ShowDecorService({ products, slug }) {
  function getStar(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash += str.charCodeAt(i);
    return hash % 10 < 8 ? "5star" : "4star";
  }
  return (
    <main>
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src={products[0]?.image || "/services/placeholder.jpg"}
          fill
          alt={slug}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0d2818]/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5">
          <span className="text-[#d4af37] text-sm tracking-widest uppercase mb-4">
            ✦ Our Services
          </span>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {slug}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-lg">
            {products.length} packages available
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-14 pb-20 md:py-20 md:pb-34 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d2818]">
              Choose Your Package
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              All packages include setup & cleanup
            </p>
          </div>

          <div className="max-w-lg mx-auto md:max-w-full sm:flex sm:justify-start">
            {" "}
            <div className="flex justify-center md:justify-start flex-wrap gap-3 md:gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/store/${product.type}/${product.slug}`}
                  className="group cursor-pointer w-[calc(50%-6px)] sm:w-fit"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/5] sm:w-full sm:h-[260px] md:h-[300px] rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-3">
                    <Image
                      src={product.image || "/services/placeholder.jpg"}
                      fill
                      alt={product.title}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span className="block w-full py-2 bg-white text-[#0d2818] font-semibold rounded-full text-xs sm:text-sm text-center">
                        View Details
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <Image
                      src={`/svg-icons/${getStar(product.title)}.svg`}
                      width={70}
                      height={14}
                      alt="stars"
                    />
                    <h4 className="text-[#0d2818] font-semibold text-xs sm:text-sm group-hover:text-[#1a4d2e] transition-colors leading-tight line-clamp-2">
                      {product.title}
                    </h4>
                    <div className="text-xs sm:text-sm text-[#6e6f6f] font-semibold">
                      ₹{Number(product.price).toLocaleString()}{" "}
                      <span>&bull;</span> {product.type}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {products.length === 0 && (
            <p className="text-center text-gray-400 py-20">
              No packages available yet.
            </p>
          )}
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#0d2818]">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Interested?
          </h2>
          <p className="text-white/70 mb-8">
            Get in touch for pricing and availability
          </p>
          <Link
            href={`https://wa.me/916398484419?text=Hi! I'm interested in ${slug}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4af37] text-[#0d2818] font-semibold rounded-full hover:bg-[#c4a030] transition-all"
          >
            Get Quote on WhatsApp
          </Link>
        </div>
      </section>
    </main>
  );
}
