import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Product from "@/lib/models/product";
import Section from "@/lib/models/section";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const c = parseInt(searchParams.get("c") || "6"); // kitni categories
  const l = parseInt(searchParams.get("l") || "4"); // har category ke kitne cards

  try {
    // Active sections lao — order se sorted, limit c
    const sections = await Section.find({ isActive: true })
      .sort({ order: 1 })
      .limit(c)
      .lean();


    if (!sections.length) {
      return NextResponse.json({ success: true, res: [] });
    }

    // Har section ke liye products fetch karo by type = section.slug
    const results = await Promise.all(
      sections.map(async (section) => {
        const products = await Product.find({
          isActive: true,
          sectionId: section._id, // Product.type === Section.slug
        })
          .sort({ order: 1 })
          .limit(l)
          .lean();

        return {
          type: section.slug,
          label: section.title,
          products,
        };
      })
    );


    // Sirf wahi categories jisme kam se kam 1 product ho
    const filtered = results.filter((r) => r.products.length > 0);


    return NextResponse.json({ success: true, res: filtered });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}