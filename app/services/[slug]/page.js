import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

const decorData = {
  "mehndi-decor": {
    title: "Mehndi Decor",
    subtitle: "Elegant setups for your mehndi ceremony",
    banner: "/services/mehndi-1.jpg",
    images: [
      "/services/mehndi-1.jpg",
      "/services/mehndi-2.jpg",
      "/services/mehndi-3.jpg",
      "/services/mehndi-4.jpg",
      "/services/mehndi-5.jpg",
      "/services/mehndi-6.jpg",
    ],
  },
  "haldi-decor": {
    title: "Haldi Decor",
    subtitle: "Vibrant yellow themes for your haldi ceremony",
    banner: "/services/haldi-1.jpg",
    images: [
      "/services/haldi-1.jpg",
      "/services/haldi-2.jpg",
      "/services/haldi-3.jpg",
      "/services/haldi-4.jpg",
      "/services/haldi-5.jpg",
      "/services/haldi-6.jpg",
    ],
  },
  "ring-decor": {
    title: "Ring Ceremony",
    subtitle: "Beautiful arrangements for your engagement",
    banner: "/services/mehndi-2.jpg",
    images: [
      "/services/mehndi-1.jpg",
      "/services/mehndi-2.jpg",
      "/services/mehndi-3.jpg",
      "/services/mehndi-4.jpg",
      "/services/mehndi-5.jpg",
      "/services/mehndi-6.jpg",
    ],
  },
  "wedding-decor": {
    title: "Wedding Decor",
    subtitle: "Grand setups for your special day",
    banner: "/services/haldi-3.jpg",
    images: [
      "/services/haldi-1.jpg",
      "/services/haldi-2.jpg",
      "/services/haldi-3.jpg",
      "/services/haldi-4.jpg",
      "/services/haldi-5.jpg",
      "/services/haldi-6.jpg",
    ],
  },
};
export default async function Decors({ params }) {
  const { slug } = await params;
  const data = decorData[slug];

  if (!data) {
    notFound();
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src={data.banner}
          fill
          alt={data.title}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0d2818]/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5">
          <span className="text-[#d4af37] text-sm tracking-widest uppercase mb-4">
            ✦ Our Services
          </span>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {data.title}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-lg">
            {data.subtitle}
          </p>{" "}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {data.images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden group"
              >
                <Image
                  src={img}
                  fill
                  alt={`${data.title} ${i + 1}`}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-[#0d2818]">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Interested?
          </h2>{" "}
          <p className="text-white/70 mb-8">
            Get in touch for pricing and availability
          </p>
          <Link
            href={`https://wa.me/919876543210?text=Hi! I'm interested in ${data.title}.`}
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

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `Decors of ${slug} `,
    description: `White and green decors ${slug} decors`,
  };
}
