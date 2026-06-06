import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Section from "@/lib/models/section";
import Product from "@/lib/models/product";

export async function GET(request) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const showcaseOnly = searchParams.get("showcase") === "true";

    const query = { isActive: true };
    if (showcaseOnly) query.isShowcase = true;

    const AllSections = await Section.find(query).sort({ order: 1 }).lean();

    const sectionWithCard = await Promise.all(
      AllSections.map(async (section) => {
        const card = await Product.findOne({
          sectionId: section._id,
          isActive: true,
        })
          .sort({ order: 1 })
          .lean();
        return {
          ...section,
          cardImage: card?.image ?? null,
          image: section.bannerImage ?? card?.image ?? null, // bannerImage first, fallback to product image
          href: section.slug,
        };
      }),
    );

    return NextResponse.json({ result: sectionWithCard });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 404 });
  }
}
