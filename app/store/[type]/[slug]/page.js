import ProductStructure from "../../components/product";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/items/${slug}`,
    { cache: "no-store" },
  );

  const data = await res.json();
  const item = data.item;

  return {
    title: `${item.title} | White Green Decors`,
    description:
      item.description?.slice(0, 150) ||
      "Premium decoration services by White Green Decors.",

    alternates: {
      canonical: `https://whitegreendecors.com/services/${slug}`,
    },

    openGraph: {
      title: item.title,
      description:
        item.description?.slice(0, 150) ||
        "Premium decoration services for your special occasions.",
      url: `https://whitegreendecors.com/services/${slug}`,
      siteName: "White Green Decors",
      images: [
        {
          url: item.image,
          width: 800,
          height: 600,
          alt: item.title,
        },
      ],
      type: "website",
    },
  };
}

export default async function Product({ params }) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/items/${slug}`,
  );
  const data = await res.json();

  return (
    <ProductStructure item={data.item} similarProducts={data.similarProduct} />
  );
}
