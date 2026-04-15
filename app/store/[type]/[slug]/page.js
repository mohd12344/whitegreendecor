import { Suspense } from "react";
import { notFound } from "next/navigation";
import { FetchSingleProduct } from "@/lib/db/queries";
import { ProductDetailSkeleton } from "@/components/services/skeletons/SectionSkeleton";
import ProductStructure from "../../components/product";
import ScrollToTop from "@/components/services/scrollTop";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { item } = await FetchSingleProduct(slug);

  if (!item) {
    return { title: "Not Found | White Green Decors" };
  }

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

  const { item, similarProduct } = await FetchSingleProduct(slug);

  if (!item) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ScrollToTop />{" "}
      <ProductStructure item={item} similarProducts={similarProduct} />
    </Suspense>
  );
}
