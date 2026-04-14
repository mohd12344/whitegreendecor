import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import Product from "@/lib/models/product";

export async function GET(_, { params }) {
  await connectDB();
  const { slug } = await params;

  const item = await Product.findOne({ slug }).lean();

  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const similarProduct = await Product.find({
    sectionId: item.sectionId,
    isActive: true,
    _id: { $ne: item._id },
  })
    .sort({ order: 1 })
    .limit(4)
    .lean();


  return NextResponse.json({ item, similarProduct });
}
