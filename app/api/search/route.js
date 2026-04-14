import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Product from "@/lib/models/product";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    const popular = await Product.find({ isActive: true })
      .sort({ order: 1 })
      .limit(6)
      .lean();
    return NextResponse.json(popular);
  }

  const results = await Product.find({
    isActive: true,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { type: { $regex: query, $options: "i" } },
    ],
  })
    .limit(6)
    .lean();

  return NextResponse.json(results);
}
