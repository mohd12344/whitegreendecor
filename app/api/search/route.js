import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Product from "@/lib/models/product";
import Section from "@/lib/models/section";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  // ── No query: popular sections + popular products ──
  if (!query || query.length < 2) {
    const [sections, products] = await Promise.all([
      Section.find({ isActive: true }).sort({ order: 1 }).limit(4).lean(),
      Product.find({ isActive: true }).sort({ order: 1 }).limit(5).lean(),
    ]);
    return NextResponse.json({ sections, products });
  }

  // ── With query: search both ──
  const regex = { $regex: query, $options: "i" };
  const [sections, products] = await Promise.all([
    Section.find({ isActive: true, $or: [{ title: regex }, { slug: regex }] })
      .limit(4)
      .lean(),
    Product.find({ isActive: true, $or: [{ title: regex }, { type: regex }] })
      .limit(5)
      .lean(),
  ]);

  return NextResponse.json({ sections, products });
}