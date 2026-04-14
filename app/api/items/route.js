import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Section from "@/lib/models/section";
import Product from "@/lib/models/product";

export async function GET() {
  await connectDB();

  const sections = await Section.find({ isActive: true })
    .sort({ order: 1 })
    .lean();

  const sectionWithProducts = await Promise.all(
    sections.map(async (section) => {
      const cards = await Product.find({
        sectionId: section._id,
        isActive: true,
      })
        .sort({ order: 1 })
        .lean();
      return { ...section, cards };
    }),
  );

  if (!sectionWithProducts) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(sectionWithProducts);
}
